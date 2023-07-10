<template>
  <div>
    <div v-if="trackRiderData.latitude && trackRiderData.longitude">
      <h3>Rider id: {{ trackRiderData.riderId }}</h3>

      <div v-if="!show">
        <LeafletMap :riderLocation="[trackRiderData.latitude, trackRiderData.longitude]" />
      </div>
      <div class="delivery-card" v-if="show">
        <v-card class="mx-auto" max-width="344">

          <div v-if="sCor.length > 1">
            <LRoutingMachine :sCor="sCor" :eCor="eCor" />
          </div>

          <v-card-title>
            Request Delivery ID: {{ trackRiderData.preDelivery.preDeliId }}
          </v-card-title>

          <v-card-subtitle class="text-h5">
            Pickup address: {{ trackRiderData.preDelivery.pickupAddressText }}
          </v-card-subtitle>

          <v-card-actions>
            <v-btn color="success lighten-2" text @click="handleConfirmDelivery">
              Confirm
            </v-btn>
            <v-btn color="warning lighten-2" text @click="show = !show">
              Cancel
            </v-btn>

            <v-spacer></v-spacer>

            <v-btn icon @click="showExtend = !showExtend">
              <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
            </v-btn>
          </v-card-actions>

          <v-expand-transition>
            <div v-show="showExtend">
              <v-divider></v-divider>

              <v-card-text>
                Customer name: Customer Name<br>
                Receiver name: {{ trackRiderData.preDelivery.receiverName }}<br>
                Receiver Phone Number: {{ trackRiderData.preDelivery.receiverPhone }}<br>
              </v-card-text>
            </div>
          </v-expand-transition>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { API_KEY } from '@/utils/apiKey';
import { connectWebSocket, sendMessage, subscribeToDestination, disconnectWebSocket } from '@/utils/websocketconfig';
import LeafletMap from '../leafletMap/LeafletMap.vue';
import LRoutingMachine from '../leafletMap/LRoutingMachine.vue';
import L from 'leaflet';

export default {
  components: {
    LeafletMap,
    LRoutingMachine,
  },

  data() {
    return {
      sCor: [],
      eCor: [],
      center: {},
      zoom: 12,
      osmUrl: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      showExtend: false,
      show: false,

      confirmDelivery: {
        preDeliId: '',
        riderId: this.$route.params.id,
      },

      trackRiderData: {
        deliveryId: 0,
        preDelivery: null,
        riderId: this.$route.params.id,
        latitude: '',
        longitude: '',
        postalCode: '',
        status: 'OFFLINE',
      },
      riderMarkerIcon: L.icon({
        iconUrl: require('@/assets/riderbikeicon.png'),
        iconSize: [50, 50],
      }),
    };
  },

  created() {
    connectWebSocket(this.subscribeWebSocketMessage);

    setInterval(() => {
      this.trackRiderLocation();
    }, 3000);
    
  },

  mounted() {
    window.addEventListener('beforeunload', this.handleBeforeUnload);

  },

  methods: {
    getPostalCode(lat, lng) {
      const language = 'my';
      return new Promise((resolve, reject) => {
        axios
          .get(
            `https://api.opencagedata.com/geocode/v1/json?key=${API_KEY}&q=${lat}+${lng}&language=${language}`
          )
          .then((response) => {
            const result = response.data.results[0].components;
            if (result) {
              const { postcode } = result;
              console.log(postcode);
              this.trackRiderData.postalCode = postcode;
              resolve(postcode);
            } else {
              reject(new Error('Unable to get postal code'));
            }
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    trackRiderLocation() {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.trackRiderData.latitude = position.coords.latitude;
          this.trackRiderData.longitude = position.coords.longitude;
          this.getPostalCode(
            this.trackRiderData.latitude,
            this.trackRiderData.longitude
          );
          this.sendWebSocketMessage(this.trackRiderData);
        },
        (error) => {
          console.error(error);
        }
      );
    },

    setRiderStatus(status) {
      this.trackRiderData.status = status;
    },

    handleConfirmDelivery() {


      axios.post('http://localhost:7071/delivery/confirm', this.confirmDelivery)
        .then(response => {

          const respData = response.data;

          this.trackRiderData.deliveryId = respData.deliveryId;

          console.log("Rider track data: ", this.trackRiderData);

        }).catch(error => console.error(error));



    },

    sendWebSocketMessage(rider) {
      this.setRiderStatus('ONLINE');
      console.log('Rider data:', rider);
      sendMessage('/app/track-rider', JSON.stringify(rider));
    },

    subscribeWebSocketMessage() {
      subscribeToDestination('/package-delivery/rider/get-pre-delivery/' + this.trackRiderData.riderId, this.handleRequestDelivery);
    },

    handleRequestDelivery(message) {
      const preDeliveryData = JSON.parse(message.body);
      this.trackRiderData.preDelivery = preDeliveryData;
      this.confirmDelivery.preDeliId = preDeliveryData.preDeliId;

      console.log(
        'Request pre Delivery Response from server to each rider',
        this.trackRiderData.preDelivery
      );

      this.sCor[0] = preDeliveryData.pickupLat;
      this.sCor[1] = preDeliveryData.pickupLng;

      this.sCor[0] = preDeliveryData.destinationLat;
      this.eCor[1] = preDeliveryData.destinationLng;

      this.show = true;
    },

    handleBeforeUnload(event) {
      event.preventDefault();
      this.setRiderStatus('OFFLINE');
      sendMessage('/app/track-rider', JSON.stringify(this.trackRiderData));
    },
  },

  beforeDestroy() {
    disconnectWebSocket();
    this.setRiderStatus('OFFLINE');
    sendMessage('/app/track-rider', JSON.stringify(this.trackRiderData));
    window.removeEventListener('beforeunload', this.handleBeforeUnload);
  },
};
</script>

<style></style>

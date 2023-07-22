<template>
  <div>

    <UserNavBar/>

    <v-container class="mt-15">
      <v-row>
        <v-col>
          <div>
            <v-card class="mx-auto" max-width="344" outlined height="auto">
              <v-list-item three-line>
                <v-list-item-content>
                  <div class="text-overline mb-4">
                    Customer Delivery
                  </div>
                  <v-list-item-title class="text-h5 mb-5">
                    Delivery ID: {{ delivery.deliveryId }}
                  </v-list-item-title>
                  <v-list-item-subtitle class="text-subtitle-1 mb-3">
                    To: {{ delivery.destinationAddressText }}
                  </v-list-item-subtitle>
                  <v-list-item-subtitle class="text-subtitle-1 mb-3">
                    Recipent Name: {{ delivery.receiverName }}
                  </v-list-item-subtitle>
                  <v-list-item-subtitle class="text-subtitle-1 mb-3">
                    Phone no: {{ delivery.receiverPhone }}
                  </v-list-item-subtitle>
                  <v-list-item-subtitle class="text-subtitle-1 mb-3">
                    Payment: Cash On Deli
                  </v-list-item-subtitle>

                </v-list-item-content>

                <v-list-item-avatar tile size="80" color="grey">
                  <v-avatar rounded="0" size="80"><v-img src="../../assets/profileAvatar.jpg"></v-img></v-avatar>
                </v-list-item-avatar>
              </v-list-item>

              <v-card-actions>

                <v-btn outlined rounded text @click="navigateToRiderDeliveryNavigate" color="#000">
                  Done
                </v-btn>
                <v-btn outlined rounded text @click="navigateToRiderDeliveryNavigate" color="#000">
                  Fail
                </v-btn>


              </v-card-actions>
            </v-card>
          </div>
        </v-col>
        <div>

        </div>
        <v-col>
          <div v-if="trackRiderData.latitude != null && trackRiderData.longitude != null">
            <LRoutingMachine :sCor="[trackRiderData.latitude, trackRiderData.longitude]"
              :eCor="[deliveryData.destinationLat, deliveryData.destinationLng]" />
          </div>

          <div v-if="trackRiderData.latitude == null || trackRiderData.longitude == null">
            <LoadingComp />
          </div>

        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>

import axios from 'axios';
import LRoutingMachine from '../leafletMap/LRoutingMachine.vue';
import { mapGetters } from 'vuex'
import { connectWebSocket, sendMessage, disconnectWebSocket } from '@/utils/websocketconfig';
import { API_KEY } from '@/utils/apiKey';
import UserNavBar from '@/components/UserNavBar.vue';
import LoadingComp from '@/components/LoadingComp.vue';
export default {

  components: {
    LRoutingMachine,
    UserNavBar,
    LoadingComp,
  },

  data() {
    return {

      deliveryData: {},

      trackRiderData: {
        deliveryId: 0,
        preDelivery: null,
        riderId: this.$route.params.id,
        latitude: null,
        longitude: null,
        deliStatus: '',
        postalCode: '',
        status: 'OFFLINE',
      },
    }
  },

  computed: {
    ...mapGetters(['delivery'])
  },

  created() {
    this.trackRiderData.deliveryId = this.delivery.deliveryId;
    this.deliveryData = this.delivery;
  },

  mounted() {
    connectWebSocket(this.sendWebSocketMessage);
      this.getRiderCurrentLocation();
  
    //this.getRiderCurrentLocation();
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

    getRiderCurrentLocation() {
      navigator.geolocation.watchPosition(
        (pos) => {
          this.trackRiderData.latitude = pos.coords.latitude;
          this.trackRiderData.longitude = pos.coords.longitude;

          this.getPostalCode(
            this.trackRiderData.latitude,
            this.trackRiderData.longitude
          );

          console.log(this.trackRiderData);
          this.sendWebSocketMessage(this.trackRiderData);
        },

        (error) => {
          console.error(error);
        }
      )

    },

    setRiderStatus(status) {
      this.trackRiderData.status = status;
    },

    setRiderDeliStatus(status) {
      this.trackRiderData.deliStatus = status;
    },

    sendWebSocketMessage(rider) {
      this.setRiderStatus('ONLINE');
      this.setRiderDeliStatus("DELIVERING");
      console.log('Rider data:', rider);
      sendMessage('/app/track-rider', JSON.stringify(rider));
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

}
</script>

<style></style>
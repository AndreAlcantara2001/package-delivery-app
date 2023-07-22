<template>
    <div>
        <UserNavBar />
        <div class="pa-10 mt-15">
            <div v-if="rider.riderId > 0 && pickupLocation.length > 1" style="margin-top: 5rem;">
                {{ rider }}

                <div>
                    <LRoutingMachine :sCor="[pickupLocation[0], pickupLocation[1]]" :eCor="[ rider.latitude , rider.longitude ]"/>
                </div>
                
            </div>
            <div v-else>
                <LoadingComp/>
            </div>
        </div>
    </div>
</template>

<script>
import { connectWebSocket, subscribeToDestination } from '@/utils/websocketconfig';
import LRoutingMachine from '../leafletMap/LRoutingMachine.vue';
import axios from 'axios';
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
            rider: {},
            deliveryId: this.$route.params.id,

            notAvailable: false,

            pickupLocation: [],
            riderLocation: [],

        }
    },

    mounted() {
        this.getDelivery();
        connectWebSocket(this.subscribeWebSocketMessage);
    },

    methods: {

        getDelivery() {
            axios.get(`http://localhost:7071/delivery/getById/${this.deliveryId}`)
                .then(response => {

                    if (response != null) {
                        const data = response.data;
                        this.pickupLocation[0] = data.pickupLat;
                        this.pickupLocation[1] = data.pickupLng;

                        console.log("Pickup Cors: ", this.pickupLocation);
                    } else {
                        console.log("delivery id is not available")
                    }

                }).catch(error => {
                    console.error(error)
                    this.notAvailable = true;
                });
        },

        subscribeWebSocketMessage() {
            subscribeToDestination(`/package-delivery/rider/track-rider/${this.deliveryId}`, this.handleRiderMessage);
        },

        handleRiderMessage(message) {
            const riderData = JSON.parse(message.body);
            this.rider = riderData;
            console.log("Rider: ", this.rider);
        },



    },




}
</script>

<style></style>
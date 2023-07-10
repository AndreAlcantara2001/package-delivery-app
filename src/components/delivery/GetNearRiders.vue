<template>
    <div>
        <div v-if="nearRiders && pickupLocation">
            Near riders will appear here

        <LeafletMap :currentLocation="pickupLocation" :riders="nearRiders"/>
            
        </div>

      
        <div v-else>
            There are no near riders
        </div>

    </div>
</template>

<script>
import axios from 'axios';
import LeafletMap from '../leafletMap/LeafletMap.vue';
import { connectWebSocket, subscribeToDestination } from '@/utils/websocketconfig';
export default {

    components:{
        LeafletMap,
    },

    data() {
        return {
            
            deliveryId: '',
            preDeliId: this.$route.params.id,
            nearRiders: null,
            pickupLocation: [],
        }
    },
    mounted() {
        connectWebSocket(this.subscribeWebSocketMessage);
        this.getNearRiders();
        
    },
    methods: {

        getNearRiders() {
            const url = 'http://localhost:7071/delivery/getNearRiders/'+ this.preDeliId;

            axios.get(url)
                .then(response => {
                    const respData = response.data;
                    
                    this.nearRiders = respData.nearRiders;

                    this.pickupLocation[0] = respData.pickupLat;
                    this.pickupLocation[1] = respData.pickupLng;

                    console.log("Pickup Cors: ", this.pickupLocation);
                    console.log("near riders: ", this.nearRiders);
                })
                .catch(error => console.error(error))
        },

        subscribeWebSocketMessage(){
            subscribeToDestination('/package-delivery/customer/get-delivery-id/', this.handleDeliveryIdMessage);
            
        },
        handleDeliveryIdMessage(message){
            const deliveryIdData = JSON.parse(message.body);
            this.deliveryId = deliveryIdData;
            console.log("Delivery Id: ",this.deliveryId);
            this.$router.push({name: 'TrackRider', params: { id: this.deliveryId}})
        },


    }
}
</script>

<style></style>

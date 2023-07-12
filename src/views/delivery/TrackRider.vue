<template>
  <div>
    <div v-if="rider">
        {{ rider }}

        <div>
            <LeafletMap />
        </div>
    </div>
  </div>
</template>

<script>
import { connectWebSocket, subscribeToDestination } from '@/utils/websocketconfig';
import LeafletMap from '../leafletMap/LeafletMap.vue';
import axios from 'axios';
export default {

    components:{
        LeafletMap
    },

    data(){
        return{
            rider: null,
            deliveryId: this.$route.params.id,

            pickupLocation:[],
        }
    },

    mounted(){
        this.getDelivery();
        connectWebSocket(this.subscribeWebSocketMessage);
    },

    methods:{

        getDelivery(){
            axios.get(`http://localhost:7071/delivery/getById/${this.deliveryId}`)
            .then(response => {
                const data = response.data;
                this.pickupLocation[0] = data.pickupLat;
                this.pickupLocation[1] = data.pickupLng;

                console.log("Pickup Cors: ", this.pickupLocation);
            }).catch(error => console.error(error));
        },

        subscribeWebSocketMessage(){
            subscribeToDestination(`/package-delivery/rider/track-rider/${this.deliveryId}`, this.handleRiderMessage);
        },

        handleRiderMessage(message){
            const riderData = JSON.parse(message.body);
            this.rider = riderData;
        },



    },

    


}
</script>

<style>

</style>
<template>
  <div>
    <div v-if="rider">
        {{ rider }}
    </div>
  </div>
</template>

<script>
import { connectWebSocket, subscribeToDestination } from '@/utils/websocketconfig';
export default {

    data(){
        return{
            rider: null,
            deliveryId: this.$route.params.id,
        }
    },

    mounted(){
        connectWebSocket(this.subscribeWebSocketMessage());
    },

    methods:{

        subscribeWebSocketMessage(){
            subscribeToDestination(`/package-delivery/rider/track-rider/${this.deliveryId}`, this.handleRiderMessage);
        },

        handleRiderMessage(message){
            const riderData = JSON.parse(message.body);
            this.rider = riderData;
        }

    }

}
</script>

<style>

</style>
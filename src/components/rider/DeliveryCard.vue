<template>
  <div class="request-delivery-card" v-if="show">
            <v-card class="mx-auto" max-width="344">

                <div v-if="waypoints[0].lat != null">
                    <l-map style=" height:200px;" :zoom="zoom" :center="[waypoints[0].lat, waypoints[0].lng]">
                        <l-tile-layer :url="osmUrl" /><!-- addWaypoints: false-->
                        <l-routing-machine :waypoints="waypoints" />
                    </l-map>
                </div>

                <v-card-title>
                    Request Delivery ID: {{ requestDelivery.requestId }}
                </v-card-title>

                <v-card-subtitle class="text-h5">
                    pickup address: {{ address.road }} {{ address.suburb }} {{ address.state }}
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
                            customer name: Customer Name
                            Receiver name: {{ requestDelivery.receiver_name }} <br>
                            Receiver Phone Number: {{ requestDelivery.receiver_phone_no }} <br>

                        </v-card-text>
                    </div>
                </v-expand-transition>
            </v-card>
        </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
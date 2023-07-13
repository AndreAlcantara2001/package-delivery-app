<template>
    <div>
      <CustomerNavBar />
  
      <v-container fluid>
        <v-card outlined class="my-6">
          <v-row align="center" no-gutters>
            <v-col cols="auto">
              <v-icon size="60" color="primary">mdi-truck-delivery</v-icon>
            </v-col>
            <v-col>
              <v-card-title class="headline">Delivery Service</v-card-title>
              <v-card-text>
                <p>Send your package and get real-time updates on the delivery status.</p>
              </v-card-text>
            </v-col>
          </v-row>
          <v-card-actions>
            <v-btn color="primary" text @click="navigateToTrackDelivery">Send a package</v-btn>
          </v-card-actions>
        </v-card>
      </v-container>
    </div>
  </template>
  
  <script>
  import CustomerNavBar from '@/components/CustomerNavBar.vue'
  
  export default {
    components: {
      CustomerNavBar
    },
    methods: {
      navigateToTrackDelivery() {
        this.$router.push({ name: 'PreDelivery', params: {id: this.$route.params.id} });
      }
    }
  }
  </script>
  
  <style scoped>
  /* Add custom styles for the card if needed */
  .headline {
    font-size: 20px;
    font-weight: bold;
  }
  </style>
  
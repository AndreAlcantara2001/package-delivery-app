<template>
  <div class="home">

    <AdminNavBar class="mb-10" v-if="admin" :adminId="admin.adminId" />

    <UsExpressSlogan />

    <!-- CONFIRMED DELIVERY -->
    <div class="tables pa-6" style="width: 50%">
      <h3 class="d-flex mt-6 ml-2">Confirmed Delivery</h3>

      <v-data-table ml-12 :headers="headers" :items="deliveries" :items-per-page="5" class="elevation-1">
      </v-data-table>

      <!-- Riders REPORT -->

      <h3 class="d-flex mt-6 ml-2">Riders Report</h3>

      <div>
        <v-data-table :headers="headers" :items="reports" :items-per-page="5" class="elevation-1">
        </v-data-table>
      </div>
    </div>

    <!-- Set Price and Promotion -->

    <h3 class="d-flex pa-5 mt-6 ml-2">Set Price and Promotion</h3>

    <div class="ml-11">
      <v-row>
        <v-col cols="12" sm="9">
          <v-card class="justify-left pa-7" style="
              border-radius: 20px;
              box-shadow: 2px 2px 2px 3px #00000040 inset,
                0px 2px 2px 0px rgba(0, 0, 0, 0.25);
              width: 65%;
            ">
            <v-card-text>
              <v-form @submit.prevent="login">
                <v-row>
                  <v-col cols="12" lg="6" md="6">
                    <v-text-field v-model="KG" label="Cost per Weight (KG)" required outlined></v-text-field>
                  </v-col>
                  <v-col cols="12" lg="6" md="6">
                    <v-text-field v-model="percent" label="Discount Percentage" required outlined></v-text-field>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="12" lg="6" md="6">
                    <v-text-field v-model="KM" label="Cost per Distance (KM)" required outlined></v-text-field>
                  </v-col>

                </v-row>

                <!-- Date Picker -->

                <!-- <v-row>
                  <v-col cols="12" sm="6">
                    <v-date-picker v-model="dates" range color="black"></v-date-picker>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field v-model="dateRangeText" label="Date range" prepend-icon="mdi-calendar"
                      readonly></v-text-field>
                    model: {{ dates }}
                  </v-col>
                </v-row>

                <v-btn type="save" color="grey" class="mt-6 mx-auto d-block">Save</v-btn> -->
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>

import AdminNavBar from '@/components/AdminNavBar.vue';
import UsExpressSlogan from '@/components/UsExpressSlogan.vue';
export default {
  name: "AdminHome",
  components: {
    AdminNavBar,
    UsExpressSlogan,
  },

  data() {
    return {

      admin: JSON.parse(sessionStorage.getItem('admin')),

      headers: [
        { text: "Delivery ID", value: "id" },
        { text: "Sender", value: "sender" },
        { text: "Receiver", value: "receiver" },
        { text: "Payment", value: "payment" },
        { text: "Cost", value: "cost" },
      ],

      deliveries: [
        {
          id: 1,
          sender: "Moe moe",
          receiver: "kyaw kyaw",
          payment: "Kpay",
          cost: "5000 ks",
        },
        {
          id: 2,
          sender: "A",
          receiver: "B",
          payment: "COD",
          cost: "3000 ks",
        },
      ],

      reports: [],

      // DATE RANGE
      dates: [],

      computed: {
        dateRangeText() {
          return this.dates.join(" ~ ");
        },
      },
    };
  },
};
</script>
<template>
    <v-app-bar app color="primary" dark>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>


        <v-toolbar-title>UsEXPRESS</v-toolbar-title>

        <v-spacer></v-spacer>

        <!--Customer-->
        <div v-if="userRole === 'CUSTOMER'">
            <v-text-field text v-if="showTrack" exact placeholder="Track Delivery" v-model="deliveryId">
            </v-text-field>

            <v-btn icon @click="toggleSearch">
                <v-icon>mdi-magnify</v-icon>
            </v-btn>

            <v-btn text v-if="userData" exact>
                <router-link class="link"
                    :to="{ name: 'CustomerProfile', params: { id: this.userId } }">Profile</router-link>
            </v-btn>

            <v-btn text v-if="userData" exact>
                <router-link class="link" :to="{ name: 'CustomerHome', params: { id: this.userId } }">Home</router-link>
            </v-btn>


            <v-btn text v-if="userData" exact>
                <router-link class="link"
                    :to="{ name: 'CustomerDeliveryHistory', params: { id: this.userId } }">History</router-link>
            </v-btn>
        </div>
        <!--Customer-->


        <!--Rider-->

        <div v-if="userRole === 'RIDER'">

            <v-btn text v-if="userData" exact>
                <router-link class="link" :to="{ name: 'RiderHome', params: { id: this.userId } }">Home</router-link>
            </v-btn>

            <v-btn text v-if="userData" exact>
                <router-link class="link" :to="{ name: 'RiderProfile', params: { id: this.userId } }">Profile</router-link>
            </v-btn>

        </div>

        <!--Rider-->

        <div class="notification-icon" @click="toggleNotifications">
            <i class="fa fa-bell"></i>
            <span v-if="notificationCount > 0" class="notification-count">{{ notificationCount }}</span>
        </div>
        <NotificationPopup v-if="showNotifications" :notifications="notifications" @close="toggleNotifications" />

        <v-btn text to="/customer-login" v-if="!isCustomer" exact>
            Login
        </v-btn>
        <v-btn text to="/customer-registration" v-if="!isCustomer" exact>
            Register
        </v-btn>
        <v-btn text to="/" v-if="isCustomer" exact @click="logout">
            Logout
        </v-btn>
    </v-app-bar>
</template>
  
<script>
import axios from 'axios';
export default {

    name: 'CustomerNavBar',
    data() {
        return {
            showNotifications: false,
            notifications: [],
            showTrack: false,
            deliveryId: '',
        }
    },
    computed: {
        computed: {

            userRole() {
                return this.$store.state.userRole;
            },

            userData() {
                return this.$store.state.userData;
            },

            userId() {
                if (this.userRole === "CUSTOMER") {
                    return this.userData.customerId;
                } else if (this.userRole == "RIDER") {
                    return this.userData.riderId;
                } else {
                    return null;
                }
            },

            notificationCount() {
                return this.notifications.filter(notification => !notification.read).length;
            },

        },
    },
    created() {
        // Retrieve user notifications from session storage


    },

    mounted() {
    },
    methods: {
        toggleSearch() {

            if (this.showTrack) {
                this.$router.push({ name: "TrackRider", params: { id: this.deliveryId } })
            }
            this.showTrack = !this.showTrack;
        },

        toggleNotifications() {
      this.showNotifications = !this.showNotifications;
      if (this.showNotifications) {
        // Fetch notifications for the current user from the backend
        // and update the 'notifications' array.
        
        if (this.userRole === "RIDER" ) {
        axios.get(`http://localhost:7071/notification/get-rider-noti-by-id/${this.userId}`)
        .then(reponse => {
           const respData = reponse.data;
            this.notifications = respData;
        }).catch(error => console.error(error))
    }else if (this.userRole === "CUSTOMER"){
        axios.get(`http://localhost:7071/notification/get-cus-noti-by-id/${this.userId}`)
        .then(reponse => {
           const respData = reponse.data;
            this.notifications = respData;
        }).catch(error => console.error(error))
    }else{
        this.notifications = [];
    }

      }
    },

        logout() {
            // Perform logout logic, clear user data from store and session storage
            this.$store.commit('setUserRole', null);
            this.$store.commit('setUserData', null); // Clear the user role in Vuex
            //sessionStorage.removeItem('userRole'); // Remove the user role from session storage
            // ... Additional logout actions if needed
            this.$router.push('/'); // Redirect to the home page or login page
        },

    },
};
</script>

<style scoped>
.link {
    color: white;
    text-decoration: none;
    cursor: pointer;
}
</style>
  
<template>
    <v-app-bar app color="primary" dark>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
        <v-toolbar-title v-if="isCustomer">Customer Navigation</v-toolbar-title>
        <v-spacer></v-spacer>

        <v-text-field text v-if="showTrack" exact placeholder="Track Delivery" v-model="deliveryId">
        </v-text-field>

        <v-btn icon @click="toggleSearch">
            <v-icon>mdi-magnify</v-icon>
        </v-btn>

        <v-btn text v-if="isCustomer" exact>
            <router-link class="link" :to="{ name: 'CustomerHome', params: { id: customerId } }">Home</router-link>
        </v-btn>

        <v-btn text v-if="isCustomer" exact>
            <router-link class="link" :to="{ name: 'CustomerProfile', params: { id: customerId } }">Profile</router-link>
        </v-btn>
        <v-btn text v-if="isCustomer" exact>
            <router-link class="link"
                :to="{ name: 'CustomerDeliveryHistory', params: { id: customerId } }">History</router-link>
        </v-btn>


        <v-btn icon v-if="isCustomer" @click="showNotifications = !showNotifications">
            <v-badge v-if="hasCustomerNotifications" :content="userNotifications.length" color="error" overlap>
                <v-icon>mdi-bell</v-icon>
            </v-badge>
            <v-icon v-else>mdi-bell</v-icon>
        </v-btn>
        <!-- ... Rest of the code ... -->
        <v-menu v-if="showNotifications" offset-y>
            <v-list>
                <v-list-item v-for="notification in userNotifications" :key="notification.id">
                    <v-list-item-title>{{ notification }}</v-list-item-title>
                    <!-- <v-list-item-subtitle>{{ notification.description }}</v-list-item-subtitle> -->
                </v-list-item>
            </v-list>
        </v-menu>

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
export default {

    props: [
        'customerId',
    ],
    name: 'CustomerNavBar',
    data() {
        return {
            showNotifications: false,
            userNotifications: [],
            deliveryId: '',
            showTrack: false,
        }
    },
    computed: {
        isCustomer() {
            // Check if the user is a customer (based on your role-checking logic)
            const userRole = this.$store.state.userRole;
            return userRole === 'customer';
        },

        hasCustomerNotifications() {
            return this.userNotifications.length > 0;
        }
    },
    created() {
        // Retrieve user notifications from session storage


    },

    mounted() {
        setInterval(() => {
            this.getNotification();
        }, 100);
    },
    methods: {
        toggleSearch(){

            if(this.showTrack){
                this.$router.push({name: "TrackRider", params: {id: this.deliveryId}})
            }
            this.showTrack = !this.showTrack;
        },
        getNotification() {
            const notifications = JSON.parse(sessionStorage.getItem('notifications'));
            if (notifications) {
                this.userNotifications = notifications;
            }
        },
        logout() {
            // Perform logout logic, clear user data from store and session storage
            this.$store.commit('setUserRole', null); // Clear the user role in Vuex
            sessionStorage.removeItem('userRole'); // Remove the user role from session storage
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
  
import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

import HomeView from '../views/HomeView.vue'

import CustomerRegistration from '../views/customer/CustomerRegistration.vue'
import CustomerLogin from '../views/customer/CustomerLogin.vue'
import CustomerHome from '../views/customer/CustomerHome.vue'
import PreDelivery from '../views/delivery/PreDelivery.vue'
import GetNearRiders from '../views/delivery/GetNearRiders.vue'
import TrackRider from '../views/delivery/TrackRider.vue'

import RiderLogin from '../views/rider/RiderLogin.vue'
import RiderRegistration from '../views/rider/RiderRegistration.vue'
import RiderHome from '../views/rider/RiderHome.vue'

import AdminHome from '../views/admin/AdminHome.vue'
import AdminLogin from '../views/admin/AdminLogin.vue'
import AdminMaps from '../views/admin/AdminMaps.vue'
import AdminRiders from '../views/admin/AdminRiders.vue'
import AdminCustomers from '../views/admin/AdminCustomers.vue'
import UserProfile from '../components/UserProfile.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },


  {
    path: '/user/profile',
    name: 'UserProfile',
    component: UserProfile
  },


  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/customer-registration',
    name: 'CustomerRegistration',
    component: CustomerRegistration
  },
  {
    path: '/rider-registration',
    name: 'RiderRegistration',
    component: RiderRegistration
  },
  {
    path: '/customer-login',
    name: 'CustomerLogin',
    component: CustomerLogin,

  },

  {
    path: '/customer-home/:id',
    name: 'CustomerHome',
    component: CustomerHome,
    meta: {
      requiredRole: 'customer',
    },
  },

  {
    path: '/delivery/pre-delivery/:id',
    name: 'PreDelivery',
    component: PreDelivery,
    meta: {
      requiredRole: 'customer',
    },
  },
  {
    path: '/delivery/get-near-riders/:id',
    name: 'GetNearRiders',
    component: GetNearRiders,
    meta: {
      requiredRole: 'customer',
    },
  },
  {
    path: '/delivery/track-rider/:id',
    name: 'TrackRider',
    component: TrackRider,
    meta: {
      requiredRole: 'customer',
    },

  },


  {
    path: '/rider-login',
    name: 'RiderLogin',
    component: RiderLogin
  },

  {
    path: '/rider-home/:id',
    name: 'RiderHome',
    component: RiderHome,
    meta: {
      requiredRole: 'rider',
    },
  },

  {
    path: '/admin/login',
    name: 'AdminLogin',
    component: AdminLogin
  },
  
  {
    path: '/admin/home/:id',
    name: 'AdminHome',
    component: AdminHome,
    meta: {
       requiredRole: 'admin',
    },
  },

  {
    path: '/admin/maps/:id',
    name: 'AdminMaps',
    component: AdminMaps,
    meta: {
       requiredRole: 'admin',
    },
  },

  {
    path: '/admin/riders/:id',
    name: 'AdminRiders',
    component: AdminRiders,
    meta: {
       requiredRole: 'admin',
    },
  },

  {
    path: '/admin/customers/:id',
    name: 'AdminCustomers',
    component: AdminCustomers,
    meta: {
       requiredRole: 'admin',
    },
  },




]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {

  const requiredRole = to.meta.requiredRole;
  // Check if the user role matches the required role for the route
  if (requiredRole && store.state.userRole !== requiredRole) {
    // Redirect to an appropriate route based on the user's role
    switch (store.state.userRole) {
      case 'customer':
        next({ name: 'CustomerLogin' });
        break;
      case 'rider':
        next({ name: 'RiderLogin' });
        break;
      case 'admin':
        next({ name: 'AdminLogin' });
        break;
      default:
        next({ name: 'home' });
        break;
    }
  } else {
    // User has the required role, allow navigation to the target route
    next();
  }
});

export default router

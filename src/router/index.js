import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CustomerRegistration from '../components/customer/CustomerRegistration.vue'
import CustomerLogin from '../components/customer/CustomerLogin.vue'
import PreDelivery from '../components/delivery/PreDelivery.vue'
import RiderLogin from '../components/rider/RiderLogin.vue'
import RiderRegistration from '../components/rider/RiderRegistration.vue'
import RiderHome from '../components/rider/RiderHome.vue'
import GetNearRiders from '../components/delivery/GetNearRiders.vue'
import TrackRider from '../components/delivery/TrackRider.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
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
    component: CustomerLogin
  },
  {
    path: '/rider-login',
    name: 'RiderLogin',
    component: RiderLogin
  },
  {
    path: '/delivery/pre-delivery/:id',
    name: 'PreDelivery',
    component: PreDelivery
  },

  {
    path: '/delivery/get-near-riders/:id',
    name: 'GetNearRiders',
    component: GetNearRiders
  },

  {
    path: '/delivery/track-rider/:id',
    name: 'TrackRider',
    component: TrackRider
  },


  {
    path: '/rider-home/:id',
    name: 'RiderHome',
    component: RiderHome
  },



]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

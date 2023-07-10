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
import RiderTest from '../components/rider/RiderTest.vue'
import LRoutingMachine from '../components/leafletMap/LRoutingMachine.vue'
import RequestDelivery from '../components/delivery/RequestDelivery.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },

  {
    path: '/LRoutingMachine',
    name: 'LRoutingMachine',
    component: LRoutingMachine
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
    path: '/delivery/request-delivery',
    name: 'RequestDelivery',
    component: RequestDelivery
  },

  {
    path: '/rider-home/:id',
    name: 'RiderHome',
    component: RiderHome
  },

  {
    path: '/rider-test/:id',
    name: 'RiderTest',
    component: RiderTest
  },


]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

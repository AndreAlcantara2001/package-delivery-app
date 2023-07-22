<template>
  <div>
    <user-nav-bar />
    <hello-world />
  </div>
  
</template>

<script>
  import HelloWorld from '../components/HelloWorld'
  import UserNavBar from '@/components/UserNavBar.vue';

  export default {
    name: 'HomeView',

    components: {
      HelloWorld,
      UserNavBar,
    },
  }
</script>

<template>
  <Header />
  <router-view></router-view>
  <Message />
</template>

<script>

import Header from './components/header.vue';
import Message from './components/message.vue';

export default {
  name: 'App',
  components: {
    Header,
    Message,
  },
  computed: {

  },
  mounted() {
    console.log(this.$store.getters);
  }
}
</script>

<style>
  @import url('../public/base.css');

</style>

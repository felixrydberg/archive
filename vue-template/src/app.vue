<template>
  <header-component></header-component>
  <router-view></router-view>
</template>

<script>
import headerComponent from './views/header.vue';

export default {
  name: 'app',
  data() {
    return {

    }
  },
  methods: {

  },
  mounted() {
  },
  updated() {

  },
  components: {
    headerComponent
  },
}
</script>

<style scoped>

</style>

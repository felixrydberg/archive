<template>
    <form @submit="submit">
      <input required type="text" v-model="this.$store.state.vmodel.name" placeholder="Username or Mail">
      <input required type="password" v-model="this.$store.state.vmodel.pwd" placeholder="Password">
      <button type="submit">login</button>
    </form>
</template>

<script>
export default {
  name: 'login-page',
  methods: {
    submit(event) {
      event.preventDefault();
      this.$store.dispatch('loginUser', {
        name: this.$store.state.vmodel.name,
        pwd: this.$store.state.vmodel.pwd,
      })
    }
  },
}
</script>

<style>
</style>
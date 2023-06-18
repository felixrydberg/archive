<template>
    <form @submit="submit">
      <input required type="text" v-model="this.$store.state.vmodel.name" placeholder="username">
      <label>Username is case sensitive</label>
      <input required type="email" v-model="this.$store.state.vmodel.mail" placeholder="mail">
      <input required type="password" v-model="this.$store.state.vmodel.pwd" placeholder="Password">
      <input required type="password" v-model="this.$store.state.vmodel.pwdRepeat" placeholder="Repeat Password">
      <button type="submit">Register</button>
    </form>
</template>

<script>
export default {
  name: 'register-page',
  methods: {
    submit(event) {
      event.preventDefault();
      this.$store.dispatch('registerUser', {
        name: this.$store.state.vmodel.name,
        mail: this.$store.state.vmodel.mail,
        pwd: this.$store.state.vmodel.pwd,
        pwdRepeat: this.$store.state.vmodel.pwdRepeat,
      })
    }
  },
  created() {
    this.$store.state.vmodel.name = '';
    this.$store.state.vmodel.mail = '';
    this.$store.state.vmodel.pwd = '';
    this.$store.state.vmodel.pwdRepeat = '';
  }
};
</script>

<style>
</style>
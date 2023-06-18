<template>
  <header>
    <nav>
      <div class="general-navigation">
        <router-link to="/">Home</router-link>
        <router-link to="/join-us">Join us</router-link>
        <router-link to="/about">Abous us</router-link>
      </div>
      <!-- <div v-if="this.$store.state.user.dummy" class="dummy-container">
          <div class="dummy-text"><div></div></div>
          <div class="dummy-text"><div></div></div>
      </div> -->
      <div class="specific-navigation">
        <div v-if="$store.state.user.name">
          <router-link to="/profile">Profile</router-link>
          <a class="logout" @click="this.$store.dispatch('logoutUser')">Log out</a>
        </div>
        <div v-else class="specific-navigation">
          <router-link to="/login">Login</router-link>
          <router-link to="/register">Register</router-link>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'header-comp',
  mounted() {

  }
};
</script>

<style scoped>
  nav {
    display: flex;
    justify-content: space-between;
  }

  a {
    display: block;
    font-size: 1rem;
    padding: 1rem 1.5rem 1rem 1.5rem;
    text-decoration: none;
    color: white;
  }

  .logout {
    cursor: pointer;
  }

  .dummy-text div {
    width: 75px;
  }

  .dummy-container, .general-navigation, .specific-navigation div{
    display: flex;
    flex-direction: row;
  }

</style>

<template lang="html">
  <nav class="navbar navbar-expand-lg navbar-yellow">
    <router-link :to="{ name: 'home', params: {} }" class="navbar-brand bb"><b>UVTX</b></router-link>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
    <div class="navbar-nav">
      <div v-if="!loggedIn" class="">
        <router-link :to="{ name: 'home', params: {} }" class="nav-item nav-link active bb">Home</router-link>
      </div>
      <div v-if="!loggedIn" class="">
        <router-link :to="{ name: 'about', params: {} }" class="nav-item nav-link bb">About</router-link>
      </div>
      <div v-if="loggedIn" class="">
        <router-link :to="{ name: 'map', params: {} }" class="nav-item nav-link bb">map</router-link>
      </div>
      <div v-if="loggedIn" class="">
        <router-link :to="{ name: 'profile', params: {} }" class="nav-item nav-link bb">Profile</router-link>
      </div>
      <div v-if="loggedIn" class="">
        <router-link :to="{ name: 'favorites', params: {} }" class="nav-item nav-link bb">Favorites</router-link>
      </div>
      <div v-if="loggedIn" class="">
        <router-link :to="{ name: 'refresh', params: {} }" class="nav-item nav-link bb">Refresh</router-link>
      </div>
    </div>
    <div class="navbar-collapse collapse w-100 order-3 dual-collapse2">
      <ul class="navbar-nav ml-auto">
        <form v-if="loggedIn" v-on:submit.prevent="logout">
          <button class="btn btn-danger logout">Logout</button>
        </form>
        <div v-if="!loggedIn" class="">
          <router-link :to="{ name: 'login', params: {} }" class="nav-item nav-link bb">Login</router-link>
        </div>
        <div v-if="!loggedIn" class="">
          <router-link :to="{ name: 'signup', params: {} }" class="nav-item nav-link bb">Signup</router-link>
        </div>
      </ul>
    </div>
  </div>
</nav>
</template>

<script>
export default {
  computed: {
    loggedIn() {
      return this.$store.getters.loggedIn;
    }
  },
  data() {
    return {};
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
      this.$store.commit("setOrigin", [3.42882159671311, -76.54704415637336]);
      this.$store.commit("setDestiny", [3.4329340857995096, -76.48538692422893]);

      //La redireccion deberia hacerse despues de que se ejecute la promesa
      //Como lo que se hizo en el Login
      this.$router.push({ name: "home" });
    }
  }
};
</script>

<style lang="css">
.navbar-yellow {
  background-color: #ffc107;
}
.bb {
  color: black;
}
.transparent {
  background-color: #ffc107;
}
.logout {
  margin-left: 47px;
}
</style>

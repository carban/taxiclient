<template>
  <div class="divHome">
    <link href="https://fonts.googleapis.com/css?family=Pompiere" rel="stylesheet">
    <h1 id="title">Univalle Taxi</h1>
    <img src="@/assets/taxi2.png">
    <router-link :to="{ name: 'login', params: {} }" class="btn btn-warning">Get Started!</router-link>
  </div>


</template>

<script>
export default {
  name: 'home',
  data () {
    return {

    }
  }
}
</script>

<style>
#title{
  font-family: 'Pompiere', cursive;
  font-size: 90px;
  margin-top: 155px;
}
</style>

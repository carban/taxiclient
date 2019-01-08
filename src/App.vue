<template>
  <div id="app">
    <head>
      <link rel="shortcut icon" type="image/png" href="@/assets/taxi2.png">
      <title class="animated bounceInUp">Univalle Taxi</title>
    </head>

    <navi></navi>
    <router-view/>
  </div>
</template>

<script>
import navbar from '@/components/navbar.vue';
export default {
  name: 'App',
  components: {'navi': navbar}
}
</script>

<style>
  body{
    background-color: #e8e8e8;
  }
  #app{
    text-align: center;
  }
</style>

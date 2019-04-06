<template lang="html">
  <div class="">
    <center><h1>TRAVELING...</h1></center>
    <img src="https://media.giphy.com/media/WiRSc43NGmDo4/giphy-downsized-large.gif" alt="">
  </div>


</template>

<script>
export default {
  computed: {
    youllbeawoman(){
      return this.$store.getters.youllbeawoman;
    }
  },
  beforeCreate(){
    this.$store.commit('youllbeawoman', false);
  },
  created(){
    console.log(this.youllbeawoman);
    if (!this.youllbeawoman) {
      //Lo pongo falso para que no haga n consultas cada vez que se visita la pagina
      //this.$store.commit('youllbeawoman');
      const localStore = this.$store;
      setInterval(function() {
        console.log('Pregundando por si se efectual el pago');
      }, 15 * 1000);
    }
  }
}
</script>

<style lang="css" scoped>
h1{
  margin-top: 13%;
}
</style>

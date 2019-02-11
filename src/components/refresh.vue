<template>
  <div>
    <h1>{{consultData.length}}</h1>
    <b-modal v-model="modalShow">
      Hello From Modal!
    </b-modal>
  </div>
</template>

<script>
export default {
  computed: {
    consultData(){
      return this.$store.getters.mapdata;
    },
    firstTimeForAInterval(){
      return this.$store.getters.firstTimeForAInterval;
    }
  },
  data () {
    return {
      modalShow: false

    }
  },
  created(){
    // if (this.firstTimeForAInterval) {
    //   //Lo pongo falso para que no haga n consultas cada vez que se visita la pagina
    //   this.$store.commit('firstTimeForAInterval');
    //   const localStore = this.$store;
    //   setInterval(function() {
    //     localStore.dispatch('infoMap');
    //   }, 5 * 1000);
    // }
  },
  updated(){
    console.log("COMPUTED: ",this.consultData);
  }
}
</script>

 <!--  -->

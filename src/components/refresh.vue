<template>
  <div>
    <h1>{{consultData.length}}</h1>
    <button v-on:click="showPopUp" >show</button>
    <b-modal v-model="modalShow">
      Hello From Modal!
    </b-modal>
  </div>
</template>

<script>
export default {
  computed: {
    consultData(){
      var data = this.$store.getters.mapdata;
      if (data.length > 0) {
        this.showPopUp();
      }
      return data;
    },
    youllbeawoman(){
      return this.$store.getters.youllbeawoman;
    }
  },
  data () {
    return {
      modalShow: false
    }
  },
  methods: {
    showPopUp(){
      this.modalShow = true;
    }
  },
  created(){
    if (this.youllbeawoman) {
      //Lo pongo falso para que no haga n consultas cada vez que se visita la pagina
      this.$store.commit('youllbeawoman');
      const localStore = this.$store;
      setInterval(function() {
        localStore.dispatch('infoMap');
      }, 15 * 1000);
    }
  },
  updated(){
    // console.log("COMPUTED: ",this.consultData);
  }
}
</script>

 <!--  -->

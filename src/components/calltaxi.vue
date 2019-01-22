<template lang="html">
  <div class="row-lg-12">
      <div class="calltaxibg">
        <div class="card-body">
          <form class="container">
            <div class="row">
              <div class="tag">
                <b>From:</b>
              </div>
              <div class="col">
                <select name="phone" value="" class="form-control" placeholder="Password">
                  <option value="0">Select a favorite Origin</option>
                  <option v-for="(item, index) in favorites" :key="index" v-on:click="setOrigin(item.coor)">{{item.title}}</option>
                </select>
              </div>
              <div class="tag">
                <b>To:</b>
              </div>
              <div class="col">
                <select name="phone" value="" class="form-control" placeholder="Password">
                  <option value="0">Select a favorite Destiny</option>
                  <option v-for="(item, index) in favorites" :key="index" v-on:click="setDestiny(item.coor)">{{item.title}}</option>
                </select>
              </div>
              <div class="col">
                <button class="btn btn-success btn-block" v-on:click.prevent="travel">Travel</button>
              </div>
            </div>
          </form>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  computed: {
    favorites(){
      return this.$store.getters.favorites;
    }
  },
  data(){
    return {
      wee: null
    }
  },
  methods: {
    setOrigin(coor){
      console.log(coor)
      this.$store.commit('setOrigin', coor);
    },
    setDestiny(coor){
      console.log(coor)
      this.$store.commit('setDestiny', coor);
    },
    travel(){
      console.log(this.Haversine(this.$store.getters.origin, this.$store.getters.destiny));
    },
    Haversine(p1, p2){
      const earth_radio = 6356.752 ;
      return 2*earth_radio*Math.asin(Math.sqrt(this.sin2((p2[0]-p1[0])/2)+Math.cos(p1[0])*Math.cos(p2[0])*this.sin2((p2[1]-p1[1])/2)))
    },
    sin2(n){
      return Math.pow(Math.sin(n), 2);
    }
  },
  beforeCreate(){
    this.$store.dispatch('favoritesInfo');
  }
}
</script>

<style lang="css">
  .calltaxibg{
    background: linear-gradient(to bottom, #fec007 0%, #a8810000 99%);
    /* background-color: yellow; */

  }
  .tag{
    margin-right: 0px;
    width:40px;
  }
</style>

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
                <button v-on:click.prevent="mapinfo" class="btn btn-success btn-block disabled">Travel</button>
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
    mapinfo(){
      this.$store.dispatch('infoMap');
    },
    setOrigin(coor){
      this.$store.commit('setOrigin', coor);
    },
    setDestiny(coor){
      this.$store.commit('setDestiny', coor);
    }
  },
  beforeCreate(){
    this.$store.dispatch('favoritesInfo');
  }
}
</script>

<style lang="css">
  .calltaxibg{
    /* background: linear-gradient(to bottom, #fec007 0%, #e8e8e8 100%); */
    background-color: #fec007;
  }
  .tag{
    margin-right: 0px;
    width:40px;
  }
</style>

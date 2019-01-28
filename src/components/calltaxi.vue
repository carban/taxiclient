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
                <b-btn v-b-modal.traveling class="btn btn-success btn-block" v-on:click.prevent="travel">Travel</b-btn>
              </div>
              <b-modal id="traveling" title="Travel">
                <img src="@/assets/taxi-driver.png">
                <table class="table">
                  <tbody>
                    <tr>
                      <td>Driver Name: </td>
                      <td class="tdstyle"><b>Rick</b></td>
                    </tr>
                    <tr>
                      <td>Driver Phone:</td>
                      <td class="tdstyle"><b>Rick</b></td>
                    </tr>
                    <tr>
                      <td>Vehicle Model:</td>
                      <td class="tdstyle"><b>Rick</b></td>
                    </tr>
                    <tr>
                      <td>Vehicle Plate:</td>
                      <td class="tdstyle"><b>Rick</b></td>
                    </tr>
                    <tr>
                      <td>Distance:</td>
                      <td class="tdstyle"><b>{{distance}} Km.</b></td>
                    </tr>
                    <tr>
                      <td>Price per Km:</td>
                      <td class="tdstyle"><b>${{price_per_km}}</b></td>
                    </tr>
                    <tr class="list-group-item-success">
                      <td>Price:</td>
                      <td class="tdstyle"><b>${{price}}</b></td>
                    </tr>
                  </tbody>
                </table>
              </b-modal>
            </div>
          </form>
        </div>
      </div>
  </div>
</template>

<script>
const haversine = require('haversine');
export default {
  computed: {
    favorites(){
      return this.$store.getters.favorites;
    }
  },
  data(){
    return {
      distance: 0,
      price: 0,
      price_per_km : 1000
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
      const start = {
        latitude: this.$store.getters.origin[0],
        longitude: this.$store.getters.origin[1]
      }

      const end = {
        latitude: this.$store.getters.destiny[0],
        longitude: this.$store.getters.origin[1]
      }

      this.distance = Math.floor(haversine(start, end)*100)/100;
      this.price = Math.trunc(this.distance*this.price_per_km);
    },

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

  table{
    text-align: left;
  }

  .tdstyle{
    text-align: right;
  }

  .modal-body{
    padding-top: 0px;
  }
</style>

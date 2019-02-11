<template lang="html">
  <div class="row-lg-12">
      <div class="calltaxibg">
        <div class="card-body">
          <form class="container">
            <div class="row">
              <div class="tag">
                <p id="hide2">{{firstTimeForAInterval}}</p>
                <b>From:</b>
              </div>
              <div class="col">
                <!-- :disabled = "destinyAndTime.length > 0 ? true:false" -->
                <select  name="phone" value="" class="form-control" placeholder="Password">
                  <option value="0" class="greenBg" >Select a favorite Origin</option>
                  <option class="greenBg" v-for="(item, index) in favorites" :key="index" v-on:click="setOrigin(item.coor)">{{item.title}}</option>
                </select>
              </div>
              <div class="tag">
                <b>To:</b>
              </div>
              <div class="col">
                <!-- :disabled = "destinyAndTime.length > 0 ? true:false" -->
                <select  name="phone" value="" class="form-control" placeholder="Password">
                  <option value="0">Select a favorite Destiny</option>
                  <option v-for="(item, index) in favorites" :key="index" v-on:click="setDestiny(item.coor)">{{item.title}}</option>
                </select>
              </div>
              <div class="col">
                <!-- :disabled = "destinyAndTime.length > 0 ? false:true" -->
                <b-btn  v-b-modal.traveling class="btn btn-success btn-block" v-on:click.prevent="travel">Travel</b-btn>
              </div>
              <b-modal id="traveling" title="Travel" @ok="startingTravel">
                <img src="@/assets/taxi-driver.png">
                <table class="table">
                  <tbody>
                    <tr>
                      <td>Driver Name: </td>
                      <td class="tdstyle"><b>{{driverData.first_name}} {{driverData.last_name}}</b></td>
                    </tr>
                    <tr>
                      <td>Driver Phone:</td>
                      <td class="tdstyle"><b>{{driverData.phone}}</b></td>
                    </tr>
                    <tr>
                      <td>Vehicle Model:</td>
                      <td class="tdstyle"><b>{{taxiData.model}}</b></td>
                    </tr>
                    <tr>
                      <td>Vehicle Plate:</td>
                      <td class="tdstyle"><b>{{taxiData.plate}}</b></td>
                    </tr>
                    <tr>
                      <td>Driver Calification:</td>
                      <td class="tdstyle"><b id="cal">* * * * *</b></td>
                    </tr>
                    <tr>
                      <td>Distance:</td>
                      <td class="tdstyle"><b>{{destinyAndTime[0]}} Km.</b></td>
                    </tr>
                    <tr>
                      <td>Time:</td>
                      <td class="tdstyle"><b>{{destinyAndTime[1]}} Mins.</b></td>
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
    },
    destinyAndTime(){
      return this.$store.getters.destinyAndTime;
    },
    firstTimeForAInterval(){
      var res = this.$store.getters.firstTimeForAInterval;
      this.price = Math.trunc(this.destinyAndTime[0]*this.price_per_km);
      return res;
    },
  },
  data(){
    return {
      distance: 0,
      time: 0,
      price: 0,
      price_per_km : 1000,
      fix: false,
      driverData: {first_name: null, last_name: null, phone: null},
      taxiData: {model: null, plate: null}
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
      // const start = {
      //   latitude: this.$store.getters.origin[0],
      //   longitude: this.$store.getters.origin[1]
      // }
      //
      // const end = {
      //   latitude: this.$store.getters.destiny[0],
      //   longitude: this.$store.getters.destiny[1]
      // }
      this.$store.commit('firstTimeForAInterval')
      //AQUI FUNCION PARA TRAER LA INFORMACION DEL CONDUCTOR Y VEHICULO MAS CERCANO
      this.driverData =  {first_name: "fd", last_name: "dfdfd", phone: "fdhfj"};
      this.taxiData = {model: "fgfgf", plate: "dsdsd"};
      // this.price = Math.trunc(this.destinyAndTime[0]*this.price_per_km);
      // this.distance = Math.floor(haversine(start, end)*100)/100;
      // this.price = Math.trunc(this.distance*this.price_per_km);
    },
    startingTravel(){
      console.log("holi");
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
    /* background-color: red; */
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

  select > option{
    background-color: lime;
  }

  #cal{
      /* font-size: 15px; */
  }

  #hide2{
    display: none;
  }
</style>

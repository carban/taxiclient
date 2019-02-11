<template>
  <div class="row">
    <div class="col-lg-12">
      <div class="row-lg-12">
        <div class="pop">
              <flash-message autoHide variant="success" transitionIn="animated rubberBand"></flash-message>
        </div>
        <calltaxi id="calltaxi"></calltaxi>
      </div>
      <h1 id="hide">{{firstTimeForAInterval}}</h1>
      <l-map id="myMap" ref="myMap" :min-zoom="minzoom" :max-zoom="maxzoom" :zoom="zoom" :center="center" v-on:click="print" class="row-lg-12">
        <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
        <!-- <l-marker :lat-lng="marker" :icon="icon"></l-marker> -->
        <!-- <l-marker v-for="(mark, err) in myMarkers" :key="err" :lat-lng="mark.coor"></l-marker> -->
        <!--ORIGIN COOR  -->
        <l-marker :icon="iconOrigin" :lat-lng="originCoor">
        </l-marker>
        <!-- DESTINY COOR -->
        <l-marker :icon="iconDestiny" :lat-lng="destinyCoor">
        </l-marker>
        <!-- MENU COOR -->
        <l-marker :icon="iconMenu" v-if="!summary_bool" :lat-lng="menuCoor">
          <l-popup>
            <b-button variant="info" v-on:click="newOrigin">Ok Origin</b-button>
            <b-button variant="info" v-on:click="newDestiny">Ok Destiny</b-button>
          </l-popup>
        </l-marker>
        <!--  -->
        <!-- <l-polyline
          :lat-lngs="mypolyline.latlngs"
          :color="mypolyline.color">
        </l-polyline> -->
        <!--  -->
        <l-marker v-for="(dat, index) in consultData" :key="index" :lat-lng="dat.coor" :icon="icon"></l-marker>
        <!--  -->
        <!-- <div class="iron leaflet-right">
          <div class="leaflet-routing-container leaflet-control">
            <button type="button" name="button" v-on:click="summ" class="btn btn-info btn-block">Fix Route</button>
          </div>
        </div> -->
      </l-map>

    </div>
      <!-- <button-counter></button-counter> -->
  </div>
</template>

<script>

//COORDENADAS CALI 3.4516, -76.5320
const Routing = require('leaflet-routing-machine');

import calltaxi from '@/components/calltaxi'
import { LMap, LTileLayer, LMarker, LIcon, LPopup, LPolyline } from 'vue2-leaflet';
import "leaflet/dist/leaflet.css";
export default {
  name: 'example',
  components: {
    calltaxi,
    LMap,
    LTileLayer,
    LMarker,
    LIcon,
    LPopup,
    LPolyline
  },
  computed: {
    consultData(){
      return this.$store.getters.mapdata;
    },
    originCoor(){
      return this.$store.getters.origin;
    },
    destinyCoor(){
      return this.$store.getters.destiny;
    },
    mypolyline() {
      return {
        latlngs: [this.originCoor, this.destinyCoor],
        color: 'blue'
      }
    },
    firstTimeForAInterval(){
      var res = this.$store.getters.firstTimeForAInterval;
      if (!res) {
        // console.log(this.machineControl._routes[0].summary);
        this.$store.commit('destinyAndTime', [Math.ceil(this.machineControl._routes[0].summary.totalDistance/100)/10, Math.ceil(this.machineControl._routes[0].summary.totalTime/60)]);
        // this.$store.commit('firstTimeForAInterval');
      }
      return res;
    }
  },
  data () {
    return {
      zoom:11 /*13*/,
      minzoom:13, //1 or 13
      maxzoom:18, //18
      center: L.latLng(3.4216, -76.5120),
      url:'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution:'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      marker: L.latLng(3.4516, -76.5320),
      icon: L.icon({
        iconUrl: 'static/taxi.png',
        iconSize: [52, 37],
        iconAnchor: [26, 17]
      }),
      iconOrigin: L.icon({
        iconUrl: 'static/greenshadow.png',
        iconSize: [60, 60],
        iconAnchor: [30, 30]
      }),
      iconDestiny: L.icon({
        iconUrl: 'static/redshadow.png',
        iconSize: [60, 60],
        iconAnchor: [30, 30]
      }),
      iconMenu: L.icon({
        iconUrl: 'static/add-place.png',
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -35]
      }),
      menuCoor: L.latLng(3.4216, -76.5120),
      summary: [0, 0],
      summary_bool: false,
      myMarkers: [],
      myData: [],
      machineControl : null
    }
  },
  methods: {
    print(event){
      // this.myMarkers.push({ coor: L.latLng(event.latlng.lat, event.latlng.lng)});
      // console.log(event.latlng);
      // this.$store.commit('setOrigin', event.latlng);
      this.menuCoor = [event.latlng.lat, event.latlng.lng];
    },
    newOrigin(event){
      this.$store.commit('setOrigin', this.menuCoor);
    },
    newDestiny(event){
      this.$store.commit('setDestiny', this.menuCoor);
    },
    summ(){
      // if(this.summary_bool){
      //   this.$store.commit('destinyAndTime', []);
      //   this.summary_bool = !this.summary_bool;
      // }else{
      //   this.$store.commit('destinyAndTime', [Math.ceil(this.machineControl._routes[0].summary.totalDistance/100)/10, Math.ceil(this.machineControl._routes[0].summary.totalTime/60)]);
      //   this.summary_bool = !this.summary_bool;
      // }
      // this.$store.commit('firstTimeForAInterval');

    }
  },
  beforeCreate(){
    this.$store.dispatch('infoMap');
  },
  created(){
  },
  mounted() {
    this.$nextTick(() => {
      var mapp = this.$refs.myMap.mapObject // work as expected

     this.machineControl = L.Routing.control({
       // waypoints: [
       //   [3.42882159671311, -76.54704415637336],
       //   [3.4329340857995096, -76.48538692422893]
       // ],
       // router: new L.Routing.OSRMv1({
       //     serviceUrl: "http://download.geofabrik.de/south-america/colombia-latest.osm.pbf"
       // }),
       lineOptions: {
         styles: [{color: 'blue', opacity: .7, weight: 4}],
         missingRouteStyles: [{color: 'black', opacity: 0.15, weight: 7}]
       }
     }).addTo(mapp)
    });
  },
  updated(){
      this.machineControl.spliceWaypoints(0, 1, this.originCoor);
      this.machineControl.spliceWaypoints(1, 1, this.destinyCoor);
  }
}
</script>

<style lang="css">
@import 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css';
  #myMap{
    width: 100%;
    height: 650px;
  }
  #calltaxi{
    width: 100%;
    padding-right: 0px;
    padding-left: 0px;
  }
  .pop{
    width: 100%;
  }
  .iron{
    padding-top: 410px;
    height:15px;
  }
  .leaflet-routing-container-button {
    border: none;
  }
  #hide{
    display: none;
  }

</style>

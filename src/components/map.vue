<template>
  <div class="row">
    <div class="col-lg-12">
      <div class="row-lg-12">
        <div class="pop">
              <flash-message autoHide variant="success" transitionIn="animated rubberBand"></flash-message>
        </div>
        <calltaxi id="calltaxi"></calltaxi>
      </div>
      <l-map id="myMap" ref="myMap" :min-zoom="minzoom" :max-zoom="maxzoom" :zoom="zoom" :center="center" v-on:click="print" class="row-lg-12">
        <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
        <!-- <l-marker :lat-lng="marker" :icon="icon"></l-marker> -->
        <!-- <l-marker v-for="(mark, err) in myMarkers" :key="err" :lat-lng="mark.coor"></l-marker> -->
        <l-marker :lat-lng="originCoor">
          <l-popup>
            <b-button variant="primary" v-b-modal.paymentModal>Ok Origin</b-button>
          </l-popup>
        </l-marker>
        <!--  -->
        <l-marker :lat-lng="destinyCoor">
          <l-popup>
            <b-button variant="primary">Ok Destiny</b-button>
          </l-popup>
        </l-marker>
        <!--  -->
        <l-polyline
          :lat-lngs="mypolyline.latlngs"
          :color="mypolyline.color">
        </l-polyline>
        <!--  -->
        <l-marker v-for="(dat, index) in consultData" :key="index" :lat-lng="dat.coor" :icon="icon"></l-marker>
        <!--  -->
        <!-- the modal -->
        <b-modal id="paymentModal" ref="paymentModal" title="Driver info" @ok="payment">
          <form>
          </form>
        </b-modal>
      </l-map>
    </div>
      <!-- <button-counter></button-counter> -->
  </div>
</template>

<script>
//COORDENADAS CALI 3.4516, -76.5320
//import Vue2Leaflet from 'vue2-leaflet';
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
      myMarkers: [],
      myData: []
    }
  },
  methods: {
    print(event){
      // this.myMarkers.push({ coor: L.latLng(event.latlng.lat, event.latlng.lng)});
      console.log(event.latlng);
      this.$store.commit('setOrigin', event.latlng);
    },
    payment(){
      console.log('payment');
    },
  },
  beforeCreate(){
    this.$store.dispatch('infoMap');
  },
  mounted() {
    /*
    this.$nextTick(() => {
      this.map = this.$refs.map.mapObject // work as expected
    })*/
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

</style>
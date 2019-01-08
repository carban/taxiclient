<template lang="html">
  <div class="container signup" id="content">
      <div class="row">
        <div class="col-md-12 col-lg-5" id="updater">
          <div class="card shadow-lg bg-white">
            <div class="card-header">
              <h2>Profile</h2>
            </div>
            <div class="card-body">
              <form v-on:submit.prevent="">
                <b>Basic Data</b>
                <div class="form-group">
                  <input type="text" v-model="user.first_name" class="form-control" placeholder="First Name">
                </div>
                <div class="form-group">
                  <input type="text" v-model="user.last_name" class="form-control" placeholder="Last Name">
                </div>
                <div class="input-group form-group">
                  <div class="input-group-prepend">
                    <div class="input-group-text">+57</div>
                  </div>
                  <input type="number" v-model="user.phone" class="form-control" id="inlineFormInputGroupUsername" placeholder="Phone">
                </div>
                <hr>
                <b>Favorite Places</b>
                <div v-for="(item, index) in favorite_places" :key="index" v-on:click="showingPlace(index)" class="alert alert-primary alert-dismissible fade show pdleft">
                  {{item.title}}
                  <button v-on:click="remove(item.id)" class="close" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                  <button v-on:click="updateObj(item.id, item.title)" class="close myclose" v-b-modal.myEditModal>
                    <img src="@/assets/edit3.png">
                  </button>
                </div>
                <div class="form-group">
                  <div>
                    <!-- the modal -->
                    <b-modal id="myModal" ref="myModal" title="Title Place" @ok="addNewPlace">
                      <form @submit.stop.prevent="addNewPlace">
                        <b-form-input type="text" placeholder="Enter a title for the new place" v-model="placeTitle" autofocus></b-form-input>
                      </form>
                    </b-modal>
                    <!-- the modal -->
                    <b-modal id="myEditModal" ref="myEditModal" title="Edit title" @ok="editPlace">
                      <form @submit.stop.prevent="editPlace">
                        <b-form-input type="text" placeholder="Enter a new title for place" v-model="editingPlaceTitle" autofocus></b-form-input>
                      </form>
                    </b-modal>
                  </div>
                </div>
                <hr>
                <div class="form-group">
                  <button class="btn btn-success btn-block">Update</button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div id="profileMap" class="col-lg-7 col-md-12">
          <l-map ref="profMap" :zoom="zoom" :min-zoom="minzoom" :max-zoom="maxzoom" :center="center" v-on:click="mapEvent">
            <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
            <l-marker v-for="(place, index) in favorite_places" :key="index" :lat-lng="place.coor">
              <l-tooltip>{{place.title}}</l-tooltip>
            </l-marker>
            <l-marker :lat-lng="newMarker">
              <l-popup>
                <b-button v-b-modal.myModal variant="primary">New</b-button>
              </l-popup>
            </l-marker>
          </l-map>
        </div>
      </div>
    </div>

</template>

<script>
import { LMap, LTileLayer, LMarker, LIcon, LTooltip, LPopup } from 'vue2-leaflet';
import "leaflet/dist/leaflet.css";
export default {
  name: 'example2',
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LIcon,
    LTooltip,
    LPopup
  },
  computed:{
    favorite_places(){
      return this.$store.getters.favorites;
    },
    user(){
      return this.$store.getters.profile;
    }
  },
  data(){
    return{
      zoom:12 /*13*/,
      minzoom:12,
      maxzoom:18,
      center: L.latLng(3.4216, -76.5120),
      url:'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution:'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      placeTitle: null,
      editingPlaceTitle: null,
      editingobj: null,
      newMarker: L.latLng(0, 0)
    }
  },
  beforeCreate(){
    //Consult Profile Info
    this.$store.dispatch('profileInfo')
      // .then(res => {
      //   console.log('consult Profile');
      //   this.user = this.$store.getters.profile;
      // })
      // .catch(err => {
      //   console.log(err);
      // })
    //Consult Favorites Info
    this.$store.dispatch('favoritesInfo');
    // .then(res => {
    //   console.log('consult favorites');
    //   this.favorite_places = this.$store.getters.favorites;
    // })
    // .catch(err => {
    //   console.log(err);
    // })
  },
  methods: {
    showingPlace(i){
      //Se valida porque cuando se ejecuta el evento remove, tambien llama a showingPlace
      if (this.favorite_places[i]) {
        this.center = this.favorite_places[i].coor;
      }
    },
    remove(id){
      // this.favorite_places.splice(i, 1); //a partir de la posicion i empezar a eliminar 1 elemento
      // console.log('deleted '+i);
      this.$store.dispatch('deleteFavorite', id)
        .then(res => {
          this.$store.dispatch('favoritesInfo');
        })

    },
    updateObj(id, title){
      this.editingobj = {id, title};
      this.editingPlaceTitle = title;
    },
    editPlace(){
      this.$store.dispatch('updateFavorite', {id: this.editingobj.id, newtitle: this.editingPlaceTitle})
        .then(res => {
          this.$store.dispatch('favoritesInfo');
          this.$refs.myEditModal.hide();
        })
    },
    addNewPlace (evt) {
      // Prevent modal from closing
      evt.preventDefault()
      if (!this.placeTitle) {
        alert('Please enter a title')
      } else {
        // console.log({id: len, title: this.placeTitle, coor: this.newMarker});
        // this.favorite_places.push({id: len, title: this.placeTitle, coor: this.newMarker});
        this.$store.dispatch('sendNewFavorite', {title: this.placeTitle, coor: this.newMarker})
          .then(res => {
            this.$store.dispatch('favoritesInfo')
              .then(res => {
                this.placeTitle = null;
                this.center = this.newMarker;
                this.newMarker = L.latLng(0, 0);
                this.$refs.myModal.hide();
              })

          })
          .catch(err => {
             console.log(err);
          })
      }
    },
    mapEvent(e){
      this.newMarker = [e.latlng.lat, e.latlng.lng];
    }
  }
}
</script>

<style lang="css">
  .signup{
    margin-top: 25px;
  }
  .pdleft{
    padding-left: 15%;
  }
  #profileMap{
    height: 600px;
  }
  .myclose{
    margin-right: 50px;
    width:12px;
  }

</style>

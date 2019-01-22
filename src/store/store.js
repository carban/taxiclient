import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios'
import { createFlashStore } from 'vuex-flash';
import jwtDecode from 'jwt-decode';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state:{
    token: localStorage.getItem('access_token') || null,
    mapdata: [],
    profile: {first_name: null, last_name: null, phone: null},
    // favorites: {title: null, coor: null},
    // favorites: [
    //   {id: 0, title: 'Casa', coor: [3.4516, -76.5320]},
    //   {id: 1, title: 'Universidad', coor: [3.3730, -76.5320]},
    //   {id: 2, title: 'La casa de ella', coor: [3.3500, -76.5370]},
    // ]
    favorites: null,
    origin: [0,0],
    destiny: [0,0]
  },
  //Sirve para obtener datos del state
  getters: {
    token: state => {
      return state.token;
    },
    loggedIn: state => {
      return state.token !== null;
    },
    profile: state => {
      return state.profile;
    },
    mapdata: state => {
      return state.mapdata;
    },
    favorites: state => {
      return state.favorites;
    },
    origin: state => {
      return state.origin;
    },
    destiny: state => {
      return state.destiny;
    }
  },
  //Modifican los datos del estado
  //Las mutiaciones son sincronas
  mutations: {
    tokenMutation: (state, token) => {
      state.token = token;
    },
    destroyToken: state => {
      state.token = null;
    },
    setProfile: (state, pro) => {
      state.profile = pro;
    },
    setFavorites: (state, fav) => {
      state.favorites = fav;
    },
    removeProfile: state => {
      state.profile = null;
    },
    setOrigin: (state, coor) => {
      state.origin = coor;
    },
    setDestiny: (state, coor) => {
      state.destiny = coor;
    },
    removeMapdata: state => {
      state.mapdata = [];
    },
    mapinfo: (state, data) => {
      state.mapdata = data;
    }
  },
  //Se utiliza para hacer llamadas al servidor
  //Se llaman funciones de las mutaciones para cambiar los estados
  //Las acciones son asincronas
  actions: {
    api_register: (context, credentials) => {
      return new Promise((resolve, reject) => {
        axios.post('http://localhost:8000/api/signup', credentials)
          .then(res => {
            console.log(res.data);
            resolve(res);
          })
          .catch(err => {
            //console.log(err);
            reject(err);
          })
      })
    },
    api_login: (context, credentials) => {
      return new Promise((resolve, reject) => {
        axios.post('http://localhost:8000/api/login',
        {phone: credentials.phone, password: credentials.password})
          .then(res => {
            console.log(res.data);
            const token = res.data;
            localStorage.setItem('access_token', token);
            context.commit('tokenMutation', token);
            resolve(res);
          })
          .catch(err => {
            reject(err);
          })
      });
    },
    logout: context =>{
      if(context.getters.loggedIn){
        context.commit('removeMapdata');
        localStorage.removeItem('access_token');
        context.commit('removeProfile');
        context.commit('destroyToken');
      }
    },
    profileInfo: context => {
      return new Promise((resolve, reject) => {
        console.log('Profile consulted');
        const decoded = jwtDecode(context.getters.token);
        console.log(decoded);
        axios.post('http://localhost:8000/api/profile', decoded)
          .then(res => {
            context.commit('setProfile', res.data);
            resolve(res);
          })
          .catch(err => {
            reject(err);
          })
      });
    },
    favoritesInfo: context => {
      return new Promise((resolve, reject) => {
        console.log('Favorites consulted');
        const decoded = jwtDecode(context.getters.token);
        axios.post('http://localhost:8000/api/profile/favorites', decoded)
          .then(res => {
            var data = res.data;
            var array = []
            for(var i in data){
              var fid = data[i].favid;
              var lat = data[i].geom.coordinates[0];
              var lng = data[i].geom.coordinates[1];
              var t = data[i].title;
              array.push({id: fid, title: t, coor: [lat, lng]});
            }
            context.commit('setFavorites', array);
            resolve(res);
          })
          .catch(err => {
            reject(err);
          })
      });
    },
    sendNewFavorite: (context, item) => {
      return new Promise((resolve, reject) => {
        //console.log(context.getters.token);
        const decoded = jwtDecode(context.getters.token);
        // const phoneNumber = context.getters.profile.phone;
        const obj = {f_item: item, phone: decoded.phone};
        axios.post('http://localhost:8000/api/profile/new-favorite', obj)
          .then(res => {
            console.log(res.data);
            resolve(res);
          })
          .catch(err => {
            reject(err);
          })
      });
    },
    deleteFavorite: (context, favID) => {
      return new Promise((resolve, reject) => {
        //console.log(context.getters.token);
        const decoded = jwtDecode(context.getters.token);
        const obj = {fav: favID, phone: decoded};
        axios.post('http://localhost:8000/api/profile/delete-favorite', obj)
          .then(res => {
            console.log(res.data);
            resolve(res);
          })
          .catch(err => {
            reject(err);
          })
      });
    },
    updateFavorite: (context, obj) => {
      return new Promise((resolve, reject) => {
        //console.log(context.getters.token);
        const decoded = jwtDecode(context.getters.token);
        const object = {fav: obj.id, phone: decoded, newTitle: obj.newtitle};
        axios.post('http://localhost:8000/api/profile/update-favorite', object)
          .then(res => {
            console.log(res.data);
            resolve(res);
          })
          .catch(err => {
            reject(err);
          })
      });
    },
    infoMap: context => {
      axios.get('http://localhost:8000/api/map/info')
        .then(res => {
          console.log(res.data.mapdata);
          var data = res.data.mapdata;
          var array = []
          for(var i in data){
            var lat = data[i].geom.coordinates[0];
            var lng = data[i].geom.coordinates[1];
            array.push({coor: [lat, lng]});
          }
          //console.log(array);
          context.commit('mapinfo', array);
        })
        .catch(err => {
          console.log(err);
        })
    }
  },
  plugins: [
    createFlashStore()
  ]
})

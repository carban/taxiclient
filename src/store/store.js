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
    profile: {nombrecliente: null, apellidocliente: null, telefonocliente: null},
    driverData: {nombreconductor: null, apellidoconductor: null, telefonoconducor: null},
    travelsinfo: {kms: 0, viajes: 0},
    driver_calification: 0,
    // favorites: {title: null, coor: null},
    // favorites: [
    //   {id: 0, title: 'Casa', coor: [3.4516, -76.5320]},
    //   {id: 1, title: 'Universidad', coor: [3.3730, -76.5320]},
    //   {id: 2, title: 'La casa de ella', coor: [3.3500, -76.5370]},
    // ]
    favorites: null,
    origin: [3.42882159671311, -76.54704415637336],
    destiny: [3.4329340857995096, -76.48538692422893],
    id_tarifa: null,
    cost_per_km: 0,
    price_service: 0,
    destinyAndTime: [],
    firstTimeForAInterval: true,
    youllbeawoman: true
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
    travelsinfo: state => {
      return state.travelsinfo;
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
    },
    id_tarifa: state => {
      return state.id_tarifa;
    },
    cost_per_km: state => {
      return state.cost_per_km;
    },
    price_service: state => {
      return state.price_service;
    },
    driver_calification: state => {
      return state.driver_calification;
    },
    destinyAndTime: state => {
      return state.destinyAndTime;
    },
    firstTimeForAInterval: state => {
      return state.firstTimeForAInterval;
    },
    youllbeawoman: state => {
      return state.youllbeawoman;
    },
    driverData: state => {
      return state.driverData;
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
    setTravelsinfo: (state, val) => {
      state.travelsinfo = val;
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
    id_tarifa: (state, id) => {
      state.id_tarifa = id;
    },
    cost_per_km: (state, cost) => {
      state.cost_per_km = cost;
    },
    price_service: (state, price) => {
      state.price_service = price;
    },
    driver_calification: (state, val) => {
      state.driver_calification = val;
    },
    removeMapdata: state => {
      state.mapdata = [];
    },
    mapinfo: (state, data) => {
      state.mapdata = data;
    },
    destinyAndTime: (state, arr) => {
      state.destinyAndTime = arr;
      state.firstTimeForAInterval = !state.firstTimeForAInterval;
    },
    firstTimeForAInterval: (state) => {
      state.firstTimeForAInterval = !state.firstTimeForAInterval;
    },
    youllbeawoman: (state, value) => {
      state.youllbeawoman = value;
    },
    driverData: (state, data) => {
      state.driverData = data;
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
            console.log(res.data.errors);
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
            const {phone} = jwtDecode(context.getters.token)
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
        // console.log(decoded);
        axios.post('http://localhost:8000/api/profile', decoded)
          .then(res => {
            console.log(res.data);
            context.commit('setProfile', res.data.profileInfo);
            context.commit('setTravelsinfo', res.data.travelsInfo);

            resolve(res);
          })
          .catch(err => {
            reject(err);
          })
      });
    },
    updateProfileInfo: (context, newProfile) => {
      return new Promise((resolve, reject) => {
        const decoded = jwtDecode(context.getters.token);
        const object = {newProfile: newProfile, phone: decoded.phone}
        axios.post('http://localhost:8000/api/update-profile', object)
          .then(res => {
            resolve(res);
          })
          .catch(err => {
            reject(err);
          })
      });
    },
    changePassword: (context, obj) => {
      return new Promise((resolve, reject) => {
        const decoded = jwtDecode(context.getters.token);
        axios.post('http://localhost:8000/api/change-password', {phone: decoded.phone, pass:obj.new_pass})
          .then(res => {
            resolve(res);
          })
          .catch(err => {
            reject(err);
          })
      });
    },
    changePicture: (context, obj) => {
      return new Promise((resolve, reject) => {
        const decoded = jwtDecode(context.getters.token);
        axios.post('http://localhost:8000/api/change-pic', {phone: decoded.phone, pic:obj.new_pic})
          .then(res => {
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
              var fid = data[i].id_favorito;
              var lat = data[i].geom.coordinates[0];
              var lng = data[i].geom.coordinates[1];
              var t = data[i].titulo;
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
    near: context => {
      axios.post('http://localhost:8000/api/near-taxi', {coordenada: context.getters.origin})
        .then(res => {
          //console.log(res.data);
          context.commit('driverData', res.data.theNear[0]);
          context.commit('cost_per_km', res.data.theRateCost[0].preciokm);
          context.commit('id_tarifa', res.data.theRateCost[0].id_tarifa);
          context.commit('driver_calification', Math.round(res.data.prom[0].promedio_cal));
        })
        .catch(err => {
          console.log(err);
        })
    },
    service: context => {
      var obj = {
        'telefonocliente': jwtDecode(context.getters.token).phone,
        'telefonoconductor':context.getters.driverData.telefonoconductor,
        'placa':context.getters.driverData.placa,
        'id_tarifa': context.getters.id_tarifa,
        'distancia': context.getters.destinyAndTime[0],
        'tiempo': context.getters.destinyAndTime[1],
        'precio':context.getters.cost_per_km*context.getters.destinyAndTime[0],
        'calificacion': null,
        'origen_coor':context.getters.origin,
        'destino_coor':context.getters.destiny
        };
        //console.log(obj);
      axios.post('http://localhost:8000/api/service-notification', obj)
        .then(res => {
          console.log(res.data.msg);
        })
        .catch(err => {
          console.log(err);
        })
    },
    doCalification: (context, calification) => {
      return new Promise((resolve, reject) => {
        //console.log(context.getters.token);
        const decoded = jwtDecode(context.getters.token);
        const driverphone = context.getters.driverData.telefonoconductor;
        const object = {phonecli: decoded.phone, phonedri: driverphone, cali:calification};
        axios.post('http://localhost:8000/api/service-calification', object)
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
            //var fname = data[i].first_name;
            //var lname = data[i].last_name;
            //var phone = data[i].phone;
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

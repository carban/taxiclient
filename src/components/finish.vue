<template lang="html">
  <div class="container login" id="content">
      <div class="row p-4">
        <div class="col-md-11  col-lg-11 mx-auto">
          <div class="card shadow-lg bg-white">
            <div class="card-header">
              <h2>in a few minutes you will reach your destination</h2>
            </div>
            <div class="card-body">
               <h3>You wish to rate  {{driverData.nombreconductor}} {{driverData.apellidoconductor}}</h3>
               <select  v-model="calification" class="form-control">
                 <option v-on:click="cal()" value="0">No</option>
                 <option v-on:click="cal()" value="5">5 Stars</option>
                 <option v-on:click="cal()" value="4">4 Stars</option>
                 <option v-on:click="cal()" value="3">3 Stars</option>
                 <option v-on:click="cal()" value="2">2 Stars</option>
                 <option v-on:click="cal()" value="1">1 Stars</option>
                </select>
                <h1>{{smile}}</h1>
               <table class="table">
                 <tbody>
                   <tr class="list-group-item-success">
                     <td>Price:</td>
                     <td class="tdstyle"><b>${{price}}</b></td>
                   </tr>
                 </tbody>
               </table>
               <button v-on:click="finishAndCal" class="btn btn-danger" name="button">Finish</button>
            </div>
          </div>
        </div>

      </div>
    </div>
</template>

<script>
export default {
  computed: {
    driverData(){
      return this.$store.getters.driverData;
    },
    price(){
      return this.$store.getters.price_service;
    }
  },
  data(){
    return{
      calification: 0,
      smile: ":)"
    }
  },
  methods: {
    cal(){
      if (this.calification < 3) {
        this.smile = ":(";
      }else{
        this.smile = ":)";
      }
    },
    finishAndCal(){
      this.$store.dispatch('doCalification', {cal: this.calification})
      .then(response => {
        this.$router.push({name: 'profile'})
      })
      .catch(err => {

      })
    }
  }

}
</script>

<style lang="css" scoped>
.login{
  margin-top: 100px;
}
</style>

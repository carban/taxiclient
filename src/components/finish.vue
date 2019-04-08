<template lang="html">
  <div class="container login" id="content">
      <div class="row p-4">
        <div class="col-md-11  col-lg-11 mx-auto">
          <div class="card shadow-lg bg-white">
            <div class="card-header">
              <h2>Travel Finished</h2>
            </div>
            <div class="card-body">
               <h3>Deseas Calificar a {{driverData.nombreconductor}} {{driverData.apellidoconductor}}</h3>
               <table class="table">
                 <tbody>
                   <tr class="list-group-item-success">
                     <td>Price:</td>
                     <td class="tdstyle"><b>${{price}}</b></td>
                   </tr>
                 </tbody>
               </table>
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
    destinyAndTime(){
      return this.$store.getters.destinyAndTime;
    },
    price_per_km(){
      return this.$store.getters.cost_per_km;
    },
  },
  data(){
    return{
      price: Math.trunc(this.destinyAndTime[0]*this.price_per_km)
    }
  }

}
</script>

<style lang="css" scoped>
.login{
  margin-top: 100px;
}
</style>

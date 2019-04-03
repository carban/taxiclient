  <template lang="html">
  <div class="container prof" id="content">
    <flash-message v-if="flashalert" class="" autoHide variant="success" transitionIn="animated rubberBand"></flash-message>
    <div class="row p-6">
      <div class="col-md-8  col-lg-10 mx-auto">
        <div class="card shadow-lg bg-white">
          <div class="card-header">
            <h2>Profile</h2>
          </div>
          <div class="card-body">
            <!-- AQUI -->
            <center>
            <div class="imgcontainer">
              <img v-bind:src="user.image" alt="Avatar" class="img">
              <div class="middle">
                <b-btn v-b-modal.changePic class="btn btn-warning btn-block">Change Pic</b-btn>
              </div>
            </div>
            <hr>
            </center>
            <div class="row">
            <div class="col-sm-6">

            <div class="form-group">
              <div>
              <form v-on:submit.prevent="updateProfileInfo()">
                <b>Basic Data</b>
                </br>
                <div class="input-group form-group">
                  <div class="input-group-prepend">
                    <div class="input-group-text">+57</div>
                  </div>
                  <input type="number" v-model="user.telefonocliente" class="form-control" id="inlineFormInputGroupUsername" placeholder="Phone" disabled>
                </div>
                <div class="form-group">
                  <input type="text" v-model="user.nombrecliente" class="form-control" placeholder="First Name">
                </div>
                <div class="form-group">
                  <input type="text" v-model="user.apellidocliente" class="form-control" placeholder="Last Name">
                </div>
                <div class="form-group">
                  <input type="text" v-model="user.direccioncliente" class="form-control" placeholder="Direction">
                </div>
                <div class="form-group">
                  <input type="text" v-model="user.emailcliente" class="form-control" placeholder="Email">
                </div>
                <div class="form-group">
                  <input type="text" v-model="user.tarjetacliente" class="form-control" placeholder="Credit-card Number">
                </div>
                <div class="form-group">
                  <button class="btn btn-outline-success btn-block">Update</button>
                </div>
                </form>

              <b-btn v-b-modal.changePassword class="btn btn-outline-warning btn-block">Change password</b-btn>
              <b-modal id="changePassword" title="Change your password" @ok="">
                <div class="form-group">
                  <input class="form-control" type="password" name="" value="" placeholder="New Password">
                  </br>
                  <input class="form-control" type="password" name="" value="" placeholder="Confirm Password">
                </div>
              </b-modal>


              <b-modal id="changePic" title="Change your Profile pic" @ok="">
                <div class="form-group">
                  <input class="form-control" type="text" name="" value="" placeholder="New Url">
                </div>
              </b-modal>
                </div>
              </div>
            </div>
            <div class="col-sm-6">
              <b>Travels Information</b>
              </br>
              <div class="profileItems">
                <h4>Travels: 0</h4>
              </div>
              <div class="profileItems">
                <h4>KM of travel: 0</h4>
              </div>
              <div class="profileItems">
                <h4>Time of travel: 0</h4>
              </div>
              <img class="aimage" src="@/assets/taxi2.png">
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>

    </div>

</template>

<script>
export default {
  computed:{
    user(){
      return this.$store.getters.profile;
    }
  },
  data(){
    return{
      flashalert: false
    }
  },
  beforeCreate(){
    //Consult Profile Info
    this.$store.dispatch('profileInfo')

  },
  methods: {
    updateProfileInfo(){
      var newProfile = {
        nombrecliente: this.user.nombrecliente,
        apellidocliente: this.user.apellidocliente,
        emailcliente: this.user.emailcliente,
        tarjetacliente: this.user.tarjetacliente,
        direccioncliente: this.user.direccioncliente
      }
      this.$store.dispatch('updateProfileInfo', newProfile)
        .then(res => {
          console.log(res.data.msg);
          this.$store.dispatch('profileInfo')
            .then(res => {
              this.flashalert = true;
              this.flashMe({ message: 'Profile Updated', variant: 'success' });
            })
        })
    }
  },
  updated(){
    setTimeout(() => {
      this.flashalert = false;
    }, 2000);
  }
}
</script>

<style lang="css">
  .prof{
    margin-top: 25px;
  }
  #profileMap{
    height: 600px;
  }
  .myclose{
    margin-right: 50px;
    width:12px;
  }
  .img{
    padding-bottom: 15px;
    width:240px;
    height:250px;
    opacity: 1;
    display: block;
    transition: .5s ease;
    backface-visibility: hidden;
    border-radius: 15%;
  }

  .imgcontainer {
    position: relative;
    width:240px;
    height:250px;
    border-radius: 15%;
  }

  .middle {
    transition: .5s ease;
    opacity: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    text-align: center;
  }

  .imgcontainer:hover .img {
    opacity: 0.3;
  }

  .imgcontainer:hover .middle {
    opacity: 1;
  }

  .text {
    background-color: #4CAF50;
    color: white;
    font-size: 16px;
    padding: 16px 32px;
  }

  .profileItems{
    background-color:  #2c3e50 ;
    margin-bottom: 10px;
    height:50px;
    padding-top: 10px;
    color: white;
  }

  .profileItems:hover{
    background-color: #17A2B8;
  }

  .aimage{
    margin-top: 50px;
  }

</style>

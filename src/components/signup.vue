<template lang="html">
  <div class="container signup" id="content">
    <flash-message v-if="err" class="" autoHide variant="danger" transitionIn="animated rubberBand"></flash-message>
      <div class="row p-4">
        <div class="col-md-10 col-lg-5 mx-auto">
          <div class="card shadow-lg bg-white">
            <div class="card-header">
              <h2>Sign Up</h2>
            </div>
            <div class="card-body">
              <form v-on:submit.prevent="register">
                <div class="form-group">
                  <input type="text" v-model="user.fname" class="form-control" placeholder="First Name">
                </div>
                <div class="form-group">
                  <input type="text" v-model="user.lname" class="form-control" placeholder="Last Name">
                </div>
                <div class="input-group form-group">
                  <div class="input-group-prepend">
                    <div class="input-group-text">+57</div>
                  </div>
                  <input type="number" v-model="user.phone" class="form-control" id="inlineFormInputGroupUsername" placeholder="Phone">
                </div>
                <div class="form-group">
                  <input type="text" v-model="user.email" class="form-control" placeholder="Email">
                </div>
                <div class="form-group">
                  <input type="text" v-model="user.credit_card" class="form-control" placeholder="Credit Card">
                </div>
                <div class="form-group">
                  <input type="password" v-model="user.password" class="form-control" placeholder="Password">
                </div>
                <div class="form-group">
                  <input type="password" v-model="user.passConf" class="form-control" placeholder="Password Confirmation">
                </div>
                <div class="form-group">
                  <button class="btn btn-warning btn-block">Register</button>
                </div>
              </form>
            </div>
          </div>
        </div>

      </div>
    </div>
</template>

<script>

export default {
  data(){
    return{
      user: {
        fname: null,
        lname: null,
        phone: null,
        email: null,
        credit_card: null,
        password: null,
        passConf: null
      },
      err: false
    }
  },
  methods: {
    register(){
      this.$store.dispatch('api_register', this.user)
      .then(response => {
        this.flashMe({ message: 'some message', variant: 'success' });
        this.$router.push({name: 'login'});
      })
      .catch(err => {
        this.err = true;
        this.flashMe({ message: 'some message', variant: 'danger' });
      })
    }
  },
  updated(){
    setTimeout(() => {
      this.err = false;
    }, 1500);
  }
}
</script>

<style lang="css">
  .signup{
    margin-top: 50px;
  }
</style>

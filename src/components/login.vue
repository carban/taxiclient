<template lang="html">
  <div class="container login" id="content">
      <flash-message v-if="err" class="" autoHide variant="danger" transitionIn="animated rubberBand"></flash-message>
      <flash-message class="" autoHide variant="success" transitionIn="animated rubberBand"></flash-message>

      <div class="row p-4">
        <div class="col-md-8  col-lg-4 mx-auto">
          <div class="card shadow-lg bg-white">
            <div class="card-header">
              <h2>Login</h2>
            </div>
            <div class="card-body">
              <form v-on:submit.prevent="login">
                <div class="input-group form-group">
                  <div class="input-group-prepend">
                    <div class="input-group-text">+57</div>
                  </div>
                  <input v-model="access.phone" type="number" class="form-control" id="inlineFormInputGroupUsername" placeholder="Phone">
                </div>
                <div class="form-group">
                  <input v-model="access.password" type="password" name="phone" value="" class="form-control" placeholder="Password">
                </div>
                <div class="form-group">
                  <button class="btn btn-warning btn-block">Sign In</button>
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
    return {
      access: {
        phone: null,
        password: null
      },
      err: false
    }
  },
  methods: {
    login(){
      this.$store.dispatch('api_login', this.access)
        .then(response => {
          this.$router.push({name: 'map'})
        })
        .catch(err => {
          console.log(this.err);
          this.err = true;
          this.flashMe({ message: 'some message', variant: 'danger' });

        });
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
@import 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css';
  .login{
    margin-top: 100px;
  }
</style>

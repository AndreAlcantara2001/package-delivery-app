<template>
  <!--   <v-form ref="form" @submit.prevent="loginCustomer">
    <v-container>
      <v-row>
        <v-col cols="12" v-if="showError">
          <p>Username or password is wrong</p>
        </v-col>
        <v-col cols="12">
          <v-text-field v-model="loginData.username" label="Username" required></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-text-field v-model="loginData.password" label="Password" type="password" required></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-btn color="primary" type="submit">Login</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form> -->

  <v-container fluid fill-height>
    <div class="background"></div>

    <div v-if="showLoading">
      <LoadingComp />
    </div>


    <v-row v-else class="justify-center">
      <v-col cols="12" lg='4' sm="6" md="5">

        <v-card class="pa-6" style="border-radius: 30px ;
            box-shadow: 4px 4px 4px 4px rgba(0, 0, 0, 0.25) 
            inset, 0px 4px 4px 0px rgba(0, 0, 0, 0.25);">

          <v-card-title>
            <h2>Login</h2>
          </v-card-title>
          <v-card-text>
            <v-form ref="form" @submit.prevent="loginCustomer">
              <v-text-field v-model="loginData.username" label="Username" required outlined></v-text-field>
              <v-text-field v-model="loginData.password" label="Password" required outlined
                type="password"></v-text-field>

              <div v-if="showError" class="showingError">
                <span style="color: #E92626;">Username or password is wrong</span>
              </div>

              <div class="btnContainer">
                <v-btn :disabled="!(loginData.username && loginData.password)" class="signInbutton"
                  style="border-radius: 30px; color: white;" color="#204286" type="submit">Sign
                  In</v-btn>
              </div>

            </v-form>

            <div class="forgotPwd">
              <h5>Forgot your password?</h5>
            </div>

            <div class="seperator">
            </div>

            <div class="register">
              <span>Don’t have an account? <span class="registerHere" @click="toRegister">Register here</span></span>
            </div>

          </v-card-text>

        </v-card>
      </v-col>
      <v-col cols="12" lg='5' sm="6" md="5">
        <div class="backgroundImg">

        </div>
      </v-col>
    </v-row>

  </v-container>
</template>

<script>
import axios from 'axios';
import LoadingComp from '../LoadingComp.vue';
export default {
  components:{
    LoadingComp,
  },
  data() {
    return {
      showError: false,
      showLoading: false,
      customer: {},
      loginData: {
        username: '',
        password: ''
      }
    };
  },
  methods: {
    loginCustomer() {
      this.showLoading = true;

      if (this.$refs.form.validate()) {
        axios.post('http://localhost:7071/customer/login', this.loginData)
          .then(response => {
            // Successful login
            console.log('Login Response:', response.data);
            // Perform further actions or navigate to a different page
            this.$store.commit("setLoginUser", this.customer)
            this.$router.push({ name: 'PreDelivery', params: { id: response.data.customerId } });
            this.loginData.username = '';
            this.loginData.password = '';
            this.showLoading = false;
          })
          .catch(error => {
            // Error handling
            console.error('Error:', error.response.data);
            if (error.response.status === 401) {
              // Unauthorized: Incorrect username or password
              // Display an error message or take appropriate action

              this.showLoading = false;
              this.showError = true;

              setTimeout(() => {
                this.showError = false;
              }, 5000);


            } else {
              // Other error occurred
              // Display a generic error message or handle the error
              console.error("Other errors")
            }
          });
      }
    },
    toRegister() {
      this.$router.push('/customer-registration');
    }
  }
};
</script>

<style scoped>
.backgroundImg {
  width: 100%;
  height: 100%;
  background-image: url("../../assets/templateImg.svg");
  background-size: 70% auto;
  background-position: center;
}
</style>

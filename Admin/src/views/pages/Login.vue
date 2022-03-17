<template>
  <CContainer class="d-flex content-center min-vh-100">
    <CRow>
      <CCol>
        <CCardGroup>
          <CCard class="p-4">
            <!-- <CCardHeader>
            </CCardHeader> -->
            <CCardBody>
            <!-- error alert -->
              <CForm @submit.prevent="login" method="POST">
                <CAlert :show.sync="dismissError" color="danger" closeButton fade >
                  {{ message }}
                </CAlert>
                <h1>Login</h1>
                <p class="text-muted">Sign In to your account</p>
                <CInput
                  v-model="email"
                  prependHtml="<i class='cui-user'></i>"
                  placeholder="Username"
                  autocomplete="username email"
                >
                  <template #prepend-content><CIcon name="cil-user"/></template>
                </CInput>
                <CInput
                  v-model="password"
                  prependHtml="<i class='cui-lock-locked'></i>"
                  placeholder="Password"
                  type="password"
                  autocomplete="curent-password"
                >
                  <template #prepend-content><CIcon name="cil-lock-locked"/></template>
                </CInput>
                <CRow>
                  <CCol col="12">
                    <CButton type="submit" color="primary" class="px-4">Login</CButton>
                  </CCol>
                  <CCol col="12" >
                    <!-- <CButton color="link" class="px-0">Forgot password ?</CButton> -->
                  </CCol>
                </CRow>
              </CForm>
            </CCardBody>
          </CCard>
          <!-- <CCard
            color="primary"
            text-color="white"
            class="text-center py-5 d-md-down-none"
            body-wrapper
          >
            <h2>Sign up</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <CButton
              color="primary"
              class="active mt-3"
              @click="goRegister()"
            >
              Register Now!
            </CButton>
          </CCard> -->
        </CCardGroup>
      </CCol>
    </CRow>
  </CContainer>
</template>

<script>

import axios from "axios";

    export default {
      name: 'Login',
      data() {
        return {
          email: '',
          password: '',
          // showMessage: false,
          dismissSecs: 10,
          dismissError: 0,
          message: '',
        }
      },
      methods: {
        goRegister(){
          this.$router.push({ path: 'register' });
        },
        showAlertError(){ this.dismissError = this.dismissSecs },
        login() {
          let self = this;
          let Credentials = { email: self.email,password: self.password }
          axios.post(  this.$apiAdress + '/api/login',Credentials, {
            withCredentials : true,
            Credentials : 'include',
          }).then(function (response) {
            self.email = '';
            self.password = '';
            localStorage.setItem("api_token", response.data.data.access_token);
            localStorage.setItem('roles', response.data.data.roles);
            self.$router.push({ path: 'appointments/create' });
          })
          .catch(function (error) {
            self.message = 'Incorrect E-mail or password';
            // self.showMessage = true;
            self.showAlertError()
            console.log(error);
          });
  
        }
      }
    }

</script>

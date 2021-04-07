<template>

  <CRow>
    <CCol col="12" >
      <CCard no-header>
        <CCardBody>
          <h3>
            Create
          </h3>
          <CAlert
            :show.sync="dismissCountDown"
            color="primary"
            fade
          >
            ({{dismissCountDown}}) {{ message }}
          </CAlert>
          <CRow>
            <CInput class="col-4" label="Name" type="text" placeholder="Name" v-model="callCenter.name"></CInput>
            <CInput class="col-4" label="email" type="email" placeholder="email@mail.com" v-model="callCenter.email"></CInput>
            <CInput class="col-4" label="phone" type="phone" placeholder="010000000000" v-model="callCenter.phone"></CInput>
          </CRow>
          <CRow>
            <CInput class="col-6" label="password" type="password" placeholder="*******" v-model="callCenter.password"></CInput>
            <CInput class="col-6" label="confirm password" type="password" placeholder="*******" v-model="callCenter.password_confirmation"></CInput>
          </CRow>
          <CRow>
            <CInput class="col-6" label="ID_number" type="text" placeholder="75653453213426234" v-model="callCenter.ID_number"></CInput>
          </CRow>
          <CRow>
            <CInput class="col-6" label="nationality" type="text" placeholder="egyption" v-model="callCenter.nationality"></CInput>
            <CInput class="col-6" label="bankAccount" type="text" placeholder="" v-model="callCenter.bankAccount"></CInput>
          </CRow>
          <CRow>
            <CInput class="col-4" label="country" type="text" placeholder="" v-model="callCenter.country"></CInput>
            <CInput class="col-4" label="governorate" type="text" placeholder="" v-model="callCenter.governorate"></CInput>
            <CInput class="col-4" label="city" type="text" placeholder="" v-model="callCenter.city"></CInput>
          </CRow>
          <CRow>
            <CInput class="col-6" label="shift" type="text" placeholder="" v-model="callCenter.shift"></CInput>
          </CRow>

          <CButton color="primary" @click="store()">Create</CButton>
          <CButton color="dark float-right" @click="goBack">Back</CButton>
          
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import axios from 'axios'
export default {
  name: 'CreateCallCenter',
  /*
  props: {
    caption: {
      type: String,
      default: 'CallCenter key'
    },
  },
  */
  data: () => {
    return {
        callCenter: {
          name: '',
          email: '',
          password: '',
          password_confirmation: '',
          phone: '',
          ID_number: '',
          nationality: '',
          bankAccount: '',
          country: '',
          governorate: '',
          city: '',
          shift: '',
          },
        message: '',
        dismissSecs: 7,
        dismissCountDown: 0,
        showDismissibleAlert: false
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
      // this.$router.replace({path: '/callCenters'})
    },
    store() {
        let self = this;
        axios.post(  this.$apiAdress + '/api/callCenters?token=' + localStorage.getItem("api_token"),
          {
            name:     self.admin.name,
            email:    self.admin.email,
            password: self.admin.password,
            password_confirmation: self.admin.password_confirmation,
            phone:        self.admin.phone,
            ID_number:    self.admin.ID_number,
            nationality:  self.admin.nationality,
            bankAccount:  self.admin.bankAccount,
            country:      self.admin.country,
            governorate:  self.admin.governorate,
            city:   self.admin.city,
            shift:  self.admin.shift,
          }
        )
        .then(function (response) {
            self.note = {
              title: '',
              content: '',
              applies_to_date: '',
              status_key: null,
              note_type: '',
            };
            self.message = 'Successfully created callCenter.';
            self.showAlert();
        }).catch(function (error) {
            if(error.response.data.data.message == 'The given data was invalkey.'){
              self.message = '';
              for (let key in error.response.data.data.errors) {
                if (error.response.data.data.errors.hasOwnProperty(key)) {
                  self.message += error.response.data.data.errors[key][0] + '  ';
                }
              }
              self.showAlert();
            }else{
              console.log(error);
              self.$router.push({ path: 'login' }); 
            }
        });
    },
    countDownChanged (dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
    showAlert () {
      this.dismissCountDown = this.dismissSecs
      self.$router.push({ path: 'callCenters' }); 
    },
  },
  mounted: function(){
    let self = this;
    axios.get(  this.$apiAdress + '/api/callCenters?token=' + localStorage.getItem("api_token"))
    .then(function (response) {
        self.statuses = response.data.data;
    }).catch(function (error) {
        console.log(error);
        self.$router.go({ path: 'login' });
    });
  }
}

</script>

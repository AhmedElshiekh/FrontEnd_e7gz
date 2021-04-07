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
            <CInput class="col-6" label="Name" type="text" placeholder="Name" v-model="doctor.name"></CInput>
            <CInput class="col-6" label="email" type="email" placeholder="email@mail.com" v-model="doctor.email"></CInput>
          </CRow>
          <CRow>
            <CInput class="col-6" label="password" type="password" placeholder="*******" v-model="doctor.password"></CInput>
            <CInput class="col-6" label="confirm password" type="password" placeholder="*******" v-model="doctor.password_confirmation"></CInput>
          </CRow>
          <CRow>
            <CInput class="col-6" label="phone" type="phone" placeholder="010000000000" v-model="doctor.phone"></CInput>
            <CInput class="col-6" label="ID_number" type="text" placeholder="75653453213426234" v-model="doctor.ID_number"></CInput>
          </CRow>
          <CRow>
            <CInput class="col-6" label="nationality" type="text" placeholder="egyption" v-model="doctor.nationality"></CInput>
            <CInput class="col-6" label="bankAccount" type="text" placeholder="" v-model="doctor.bankAccount"></CInput>
          </CRow>
          <CRow>
            <CInput class="col-6" label="country" type="text" placeholder="" v-model="doctor.country"></CInput>
            <CInput class="col-6" label="governorate" type="text" placeholder="" v-model="doctor.governorate"></CInput>
          </CRow>
          <CRow>
            <CInput class="col-6" label="city" type="text" placeholder="" v-model="doctor.city"></CInput>
            <CInput class="col-6" label="shift" type="text" placeholder="" v-model="doctor.shift"></CInput>
          </CRow>

          <CRow>
            <CInput class="col-6" label="department" type="text" placeholder="" v-model="doctor.department"></CInput>
            <CInput class="col-6" label="sessionLength" type="text" placeholder="" v-model="doctor.sessionLength"></CInput>
          </CRow>
          <CRow>
            <CInput class="col-6" label="minPatient" type="text" placeholder="" v-model="doctor.minPatient"></CInput>
            <CInput class="col-6" label="maxPatient" type="text" placeholder="" v-model="doctor.maxPatient"></CInput>
          </CRow>
          <CRow>
            <CInput class="col-6" label="average" type="text" placeholder="" v-model="doctor.average"></CInput>
            <CInput class="col-6" label="clinicName" type="text" placeholder="" v-model="doctor.clinicName"></CInput>
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
  name: 'CreateDoctor',
  /*
  props: {
    caption: {
      type: String,
      default: 'Doctor key'
    },
  },
  */
  data: () => {
    return {
        doctor: {
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
      // this.$router.replace({path: '/doctors'})
    },
    store() {
        let self = this;
        axios.post(  this.$apiAdress + '/api/doctors?token=' + localStorage.getItem("api_token"),
          {
            name: self.doctor.name,
            email: self.doctor.email,
            password: self.doctor.password,
            password_confirmation: self.doctor.password_confirmation,
            phone: self.doctor.phone,
            ID_number: self.doctor.ID_number,
            nationality: self.doctor.nationality,
            bankAccount: self.doctor.bankAccount,
            country: self.doctor.country,
            governorate: self.doctor.governorate,
            city: self.doctor.city,
            shift: self.doctor.shift,
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
            self.message = 'Successfully created doctor.';
            self.showAlert();
        }).catch(function (error) {
            console.log(error.data.data.message)
            // if(error.response.data.data.message == 'The given data was invalkey.'){
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
    },
  },
  mounted: function(){
    let self = this;
    axios.get(  this.$apiAdress + '/api/doctors/create?token=' + localStorage.getItem("api_token"))
    .then(function (response) {
        self.statuses = response.data.data;
    }).catch(function (error) {
        console.log(error);
        self.$router.push({ path: 'login' });
    });
  }
}

</script>

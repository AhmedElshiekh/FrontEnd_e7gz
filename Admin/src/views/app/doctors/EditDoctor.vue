<template>
  <CRow>
    <CCol col="12" >
      <CCard no-header id="head">
        <CCardBody >
          <CForm>
            <template slot="header" >
              Edit Doctor key:  {{ $route.params.id }}
            </template>
            <CAlert
              :show.sync="dismissCountDown"
              color="primary"
              fade
            >
              ({{dismissCountDown}}) {{ message }}
            </CAlert>
             <!-- error alert -->
          <CAlert :show.sync="dismissError" color="danger" closeButton fade >
            ({{dismissError}}) {{ msgError }}
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
            <!-- <CInput class="col-6" label="bankAccount" type="text" placeholder="" v-model="doctor.bankAccount"></CInput> -->
          </CRow>
          <CRow>
            <div class="filter-group">
              <h5>Specailist</h5>
              <label for=""></label>
              <select name="" id="specailists">
                <option value="">Select</option>
                <option :value="specailist.key" v-for="specailist in specailists" :key="specailist.key">{{ specailist.name }}</option>
              </select>
            </div>
          </CRow>
          <CRow>
            <div class="cal-4"> 
              <label for="" >Governate </label><br>
              <select name="" id="governorates" @change="selectCity($event.target.selectedIndex)">
                <option value="">Select</option>
                <option :value="governorate.name" v-for="governorate in governorates" :key="governorate.key" >{{ governorate.name }}</option> 
              </select>
            </div>
            <div class="cal-4">
              <label for="" >City </label><br>
              <select name="" id="cities" disabled>
                <option value="">select</option>
                <option :value="city.name" v-for="city in cities" :key="city.key">{{ city.name }}</option>
              </select>
            </div>
            <CInput class="col-4" label="address" type="text" placeholder="" v-model="doctor.address"></CInput>
          </CRow>

          <CRow>
            <!-- <CInput class="col-6" label="department" type="text" placeholder="" v-model="doctor.department"></CInput> -->
            <CInput class="col-6" label="sessionLength" type="text" placeholder="" v-model="doctor.sessionLength"></CInput>
            <CInput class="col-6" label="clinicName" type="text" placeholder="" v-model="doctor.clinicName"></CInput>
          </CRow>
          <CRow>
            <CInput class="col-4" label="minPatient" type="text" placeholder="" v-model="doctor.minPatient"></CInput>
            <CInput class="col-4" label="maxPatient" type="text" placeholder="" v-model="doctor.maxPatient"></CInput>
            <CInput class="col-4" label="average" type="text" placeholder="" v-model="doctor.average"></CInput>
          </CRow>
            <CButton color="primary" @click="update()">Save</CButton>
            <CButton color="dark float-right" @click="goBack">Back</CButton>
          </CForm>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import axios from 'axios'
export default {
  name: 'EditDoctor',
  // props: {
  //   caption: {
  //     type: String,
  //     default: 'Doctor key'
  //   },
  // },
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
          address: '',
          department: '',
          sessionLength: '',
          minPatient: '',
          maxPatient: '',
          average: '',
          clinicName: '',
          },
        specailists: {},
        governorates: {},
        cities: {},
        message: '',
        dismissSecs: 10,
        dismissCountDown: 0,
        msgError:'',
        dismissError: 0,
        showDismissibleAlert: false,
        showDismAlert: 'Faild'
    }
  },
  methods: {
    catchData(){
      let self = this ;
      axios
        .all([
          axios.get(this.$apiAdress + '/api/specialists?token=' + localStorage.getItem("api_token"),{}),
          axios.get(this.$apiAdress + '/api/governorates?token=' + localStorage.getItem("api_token"),{}),
          axios.get(this.$apiAdress + '/api/doctors/'+ self.$route.params.id +'?token=' + localStorage.getItem("api_token"),{}),
        ])
        .then(
          axios.spread((...responses) => {
            self.specailists = responses[0].data.data ;
            self.governorates = responses[1].data.data;

            self.doctor.name           = responses[2].data.data.name;
            self.doctor.email          = responses[2].data.data.email;
            self.doctor.phone          = responses[2].data.data.phone;
            self.doctor.ID_number      = responses[2].data.data.ID_number;
            self.doctor.nationality    = responses[2].data.data.nationality;
            self.doctor.bankAccount    = responses[2].data.data.bankAccount;
            self.doctor.address        = responses[2].data.data.address;
            self.doctor.sessionLength  = responses[2].data.data.sessionLength;
            self.doctor.clinicName     = responses[2].data.data.clinicName;
            self.doctor.minPatient     = responses[2].data.data.minPatient;
            self.doctor.maxPatient     = responses[2].data.data.maxPatient;
            self.doctor.average        = responses[2].data.data.average;
          }
        ))
        .catch(err => console.log(err));
    },
    goBack() {
      this.$router.go(-1)
      // this.$router.replace({path: '/Doctors'})
    },
    update() {
        var selectedGover = document.getElementById("governorates").value;
        var selectedCity  = document.getElementById("cities").value;
        let self = this;
        axios.post(  this.$apiAdress + '/api/doctors/' + self.$route.params.id + '?token=' + localStorage.getItem("api_token"),
        {
            _method: 'PUT',
            name: self.doctor.name,
            email: self.doctor.email,
            password: self.doctor.password,
            password_confirmation: self.doctor.password_confirmation,
            phone: self.doctor.phone,
            ID_number: self.doctor.ID_number,
            nationality: self.doctor.nationality,
            bankAccount: self.doctor.bankAccount,
            governorate: selectedGover,
            city: selectedCity,
            country: 'مصر',
            department: self.doctor.department,
            sessionLength: self.doctor.sessionLength,
            minPatient: self.doctor.minPatient,
            maxPatient: self.doctor.maxPatient,
            average: self.doctor.average,
            clinicName: self.doctor.clinicName,
        })
        .then(function (response) {
            self.message = 'Successfully updated Doctor.';
            document.getElementById('head').scrollIntoView();
            self.showAlert();
        }).catch(function (error) {
            self.msgError = '';
            for (let key in error.response.data.massage) {
              if (error.response.data.massage.hasOwnProperty(key)) {
                self.msgError += error.response.data.massage[key] + '  ';
              }
            }
            document.getElementById('head').scrollIntoView();
            self.showAlertError();
        });
    },
    selectCity(selectedGover){
      console.log(selectedGover);
      if(selectedGover){
        document.getElementById("cities").removeAttribute("disabled");
        let self = this ;
        axios
          .get(this.$apiAdress + `/api/citiesFromGov/${selectedGover}?token=` + localStorage.getItem("api_token"))
          .then(res => self.cities = res.data.data);
      }
    },
    countDownChanged (dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
    showAlert () {
      this.dismissCountDown = this.dismissSecs
    },
    countErrorChanged (dismissError) {
      this.dismissError = dismissError
    },
    showAlertError () {
      this.dismissError = this.showDismAlert
    },
  },
  mounted: function(){
      this.catchData();
    }
  }


</script>

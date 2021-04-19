<template>
  <CRow>
    <CCol col="12" id="head">
      <CCard no-header>
        <CCardBody>
          <CForm>
            <template slot="header">
              Edit CallCenter key:  {{ $route.params.id }}
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
              <CInput class="col-4" label="Name" type="text" placeholder="Name" v-model="callCenter.name"></CInput>
              <CInput class="col-4" label="email" type="email" placeholder="email@mail.com" v-model="callCenter.email" ></CInput>
              <CInput class="col-4" label="phone" type="phone" placeholder="010000000000" v-model="callCenter.phone"></CInput>
            </CRow>
            <CRow>
              <CInput class="col-6" label="password" type="password" placeholder="*******" v-model="callCenter.password"></CInput>
              <CInput class="col-6" label="confirm password" type="password" placeholder="*******" v-model="callCenter.password_confirmation"></CInput>
            </CRow>
            <CRow>
              <CInput class="col-4" label="ID_number" type="text" placeholder="75653453213426234" v-model="callCenter.ID_number"></CInput>
              <CInput class="col-4" label="nationality" type="text" placeholder="egyption" v-model="callCenter.nationality"></CInput>
              <CInput class="col-4" label="shift" type="text" placeholder="" v-model="callCenter.shift"></CInput>
            </CRow>
            
            <CRow>
              <CInput class="col-6" label="address" type="text" placeholder="" v-model="callCenter.address"></CInput>
              <div class="cal-3"> 
                <label for="" >Governate </label><br>
                <select name="" id="governorates" @change="selectCity($event.target.selectedIndex)">
                  <option value="">Select</option>
                  <option :value="governorate.name" v-for="governorate in governorates" :key="governorate.key" >{{ governorate.name }}</option> 
                </select>
              </div>
              <div class="cal-3">
                <label for="" >City </label><br>
                <select name="" id="cities" disabled>
                  <option value="">select</option>
                  <option :value="city.name" v-for="city in cities" :key="city.key">{{ city.name }}</option>
                </select>
              </div>
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
  name: 'EditCallCenter',
  props: {
    caption: {
      type: String,
      default: 'CallCenter key'
    },
  },
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
          shift: '',
          country: '',
          governorate: '',
          city: '',
          address: '',
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
          axios.get(this.$apiAdress + '/api/governorates?token=' + localStorage.getItem("api_token"),{}),
          axios.get(this.$apiAdress + '/api/callCenters/'+ self.$route.params.id +'?token=' + localStorage.getItem("api_token"),{}),
        ])
        .then(
          axios.spread((...responses) => {
            self.governorates = responses[0].data.data;

            self.callCenter.name           = responses[1].data.data.name;
            self.callCenter.email          = responses[1].data.data.email;
            self.callCenter.phone          = responses[1].data.data.phone;
            self.callCenter.ID_number      = responses[1].data.data.ID_number;
            self.callCenter.nationality    = responses[1].data.data.nationality;
            self.callCenter.shift          = responses[1].data.data.shift;
            self.callCenter.address        = responses[1].data.data.address;
          }
        ))
        .catch(err => console.log(err));
    },
    goBack() {
      this.$router.go(-1)
      // this.$router.replace({path: '/CallCenters'})
    },
    update() {
        var selectedGover = document.getElementById("governorates").value;
        var selectedCity  = document.getElementById("cities").value;
        let self = this;
        axios.post(  this.$apiAdress + '/api/callCenters/' + self.$route.params.id + '?token=' + localStorage.getItem("api_token"),
        {
            _method: 'PUT',
            name: self.callCenter.name,
            email: self.callCenter.email,
            password: self.callCenter.password,
            password_confirmation: self.callCenter.password_confirmation,
            phone: self.callCenter.phone,
            ID_number: self.callCenter.ID_number,
            nationality: self.callCenter.nationality,
            shift: self.callCenter.shift,
            governorate: selectedGover,
            city: selectedCity,
            country: 'مصر',
        })
        .then(function (response) {
            document.getElementById('head').scrollIntoView();
            self.message = 'Successfully updated CallCenter info.';
            self.showAlert();
        }).catch(function (error) {
            self.msgError = '';
            // console.log(error.response.data.massage)
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

<template>
  <CRow>
    <CCol col="12" >
      <CCard no-header>
        <CCardBody>
          <h3 id="head">
            Create
          </h3>
          <CAlert  :show.sync="dismissCountDown"  color="primary"  fade >
            ({{dismissCountDown}}) {{ message }}
          </CAlert>
          
          <!-- error alert -->
          <CAlert :show.sync="dismissError" color="danger" closeButton fade >
            ({{dismissError}}) {{ msgError }}
          </CAlert>
          <CRow>
            <CInput class="col-4" label="Name" type="text" placeholder="Name" v-model="admin.name"></CInput>
            <CInput class="col-4" label="email" type="email" placeholder="email@mail.com" v-model="admin.email" ></CInput>
            <CInput class="col-4" label="phone" type="phone" placeholder="010000000000" v-model="admin.phone"></CInput>
          </CRow>
          <CRow>
            <CInput class="col-6" label="password" type="password" placeholder="*******" v-model="admin.password"></CInput>
            <CInput class="col-6" label="confirm password" type="password" placeholder="*******" v-model="admin.password_confirmation"></CInput>
          </CRow>
          <CRow>
            <CInput class="col-4" label="ID_number" type="text" placeholder="75653453213426234" v-model="admin.ID_number"></CInput>
            <CInput class="col-4" label="nationality" type="text" placeholder="egyption" v-model="admin.nationality"></CInput>
            <CInput class="col-4" label="shift" type="text" placeholder="" v-model="admin.shift"></CInput>
          </CRow>
          
          <CRow>
            <CInput class="col-6" label="address" type="text" placeholder="" v-model="admin.address"></CInput>
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
  name: 'CreateAdmin',
  props: {
    caption: {
      type: String,
      default: 'Admin key'
    },
  },
  data: () => {
    return {
        admin: {
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
          axios.get(this.$apiAdress + '/api/governorates?token=' + localStorage.getItem("api_token"),{})
        ])
        .then(
          axios.spread((...responses) => {
            self.governorates = responses[0].data.data;
          }
        ))
        .catch(err => console.log(err));
    },
    goBack() {
      this.$router.go(-1)
      // this.$router.replace({path: '/admins'})
    },
    store() {
        var selectedGover       = document.getElementById("governorates").value;
        var selectedCity        = document.getElementById("cities").value;
        let self = this;
        axios.post(  this.$apiAdress + '/api/admins?token=' + localStorage.getItem("api_token"),
          {
            name: self.admin.name,
            email: self.admin.email,
            password: self.admin.password,
            password_confirmation: self.admin.password_confirmation,
            phone: self.admin.phone,
            ID_number: self.admin.ID_number,
            nationality: self.admin.nationality,
            shift: self.admin.shift,
            country: self.admin.country,
            governorate: selectedGover,
            city: selectedCity,
            country: 'مصر',
            address: self.admin.address,          
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
            self.message = 'Successfully created admin.';
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
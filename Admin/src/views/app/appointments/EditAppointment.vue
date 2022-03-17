<template>
<div>
  <CRow>
    <CCol col="12">
      <CCard no-header>
        <CCardBody>
          <CForm>
            <template slot="header">
              Edit Appointment id:  {{ $route.params.id }}
            </template>
            <CAlert
              :show.sync="dismissCountDown"
              color="primary"
              fade
            >
              ({{dismissCountDown}}) {{ message }}
            </CAlert>
            <CRow>
              <CCol>
                <CInput type="text" label="Patient Name"   placeholder="patientName"   v-model="appoint.patientName"></CInput>
              </CCol>
              <CCol>
                <CInput type="text" label="Patient Phone"  placeholder="patientPhone"  v-model="appoint.patientPhone"></CInput>
              </CCol>
              <CCol>
                <label for="" style="margin-right: 14px">Status </label><br>
                <select class="form-select form-select-lg mb-3 px-5 py-1 " aria-label="Default select example" id="statusSelect" >
                  <option value="">Select</option>
                  <option 
                    :value="status.name" 
                    v-for="status in status_appoint" 
                    :selected="appoint.status_key == status.key" 
                    :key="status.key" 
                  >
                    {{ status.value }}
                  </option> 
                </select>
              </CCol>
            </CRow>
            <CRow>
              <CCol>
                <CInput type="date" label="Date" id="date" placeholder="dateSession" @change="dateUpdate()" v-model="dateSession"></CInput>
              </CCol>
              <CCol>
                <CInput type="time" label="Time" @click="timeUpdate()" placeholder="timeFrom"   v-model="appoint.timeFrom"></CInput>
              </CCol>
              <CCol>
                 <CInput type="text" label="Doctor Name"   disabled   placeholder="doctorName"  v-model="appoint.doctorName"></CInput>
              </CCol>
            </CRow>
            <!-- <CInput type="text" label="Email" placeholder="Email" v-model="email"></CInput> -->
            <CButton color="primary" @click="update()">Save</CButton>
            <CButton color="dark" class="float-right" @click="goBack">Back</CButton>
          </CForm>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
    <CModal :show.sync="seeDoc" @update:show="doModalSelect()">
      <row v-if="docTimesAv !== 'Request failed with status code 404'">
        <div v-for="docTime in docTimesAv" :key="docTime.key" >
            <div v-bind:class="docTime.timeStatus == 'available'?'Availab':'notAvailab'"> 
              <input v-bind:class="docTime.timeStatus == 'available'?'':'disabled'" 
                type="radio" 
                name="timeDocSelect"
                @change="doctimechng($event)"
                v-bind:value="docTime.key" 
              >
              <input type="time" :value="docTime.timeFrom" hidden class="timeHours" >
              {{docTime.timeFrom}}
            </div>
        </div>
        <br><br>
      </row>
      <row v-if="docTimesAv == 'Request failed with status code 404'">
        <div >
            No time available in {{dateSession}}
        </div>
        <br><br>
      </row>
    </CModal>

  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'EditAppointment',
  props: {
    caption: {
      type: String,
      default: 'Appointment id'
    },
  },
  data: () => {
    return {
      appoint: {
        patientName   :'',
        patientPhone  :'',
        dateSession   :'',
        timeFrom   :'',
        doctorName      :'',
        doctor_key      :'',
        status_key      :'',
        time_key      :'',
      },
      dateSession:'',
      status_appoint:[
        {
          key:1,
          value:'New'
        },
        {
          key:2,
          value:'Return'
        },
        {
          key:3,
          value:'Canceled'
        },
        {
          key:4,
          value:'Finished'
        },
      ],
      showMessage: false,
      message: '',
      seeDoc: false,
      dismissCountDown: 0,
      dismissSecs: 7,
      NewTime: '',
      NewDate: '',
      docTimesAv: {},
      showDismissibleAlert: false
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
      // this.$router.replace({path: '/Appointments'})
    },
    update() {
        let self = this;
        var statusUpdate = document.getElementById("statusSelect").selectedIndex;
        // alert(statusUpdate)
        var NewTime = self.NewTime ?? ''
        var NewDate = self.NewTime ? self.NewDate : self.appoint.dateSession
        axios.post(  this.$apiAdress + '/api/appointments/' + self.$route.params.id + '?token=' + localStorage.getItem("api_token"),
        {
          _method: 'PUT',
          patientName:  self.appoint.patientName,
          patientPhone: self.appoint.patientPhone,
          dateSession:  NewDate,
          time_key:     NewTime,
          status_key:   statusUpdate,
        })
        .then(function (response) {
            self.message = 'Successfully updated Appointment.';
            self.showAlert();
        }).catch(function (error) {
            console.log(error);
            // self.$router.push({ path: '/login' });
        });
    },
    // start Method to change time
    timeUpdate(){  
      this.seeDoc = true; 
      var selectedDate = document.getElementById("date").value;
      var doc = this.appoint.doctor_key;
      axios
        .get(this.$apiAdress + '/api/dayTimes/'+selectedDate+'/'+doc+'?token=' + localStorage.getItem("api_token"))
        .then(res => this.docTimesAv = res.data.data)
        .catch(err => this.docTimesAv = err.message);
    },
    dateUpdate(){ 
      this.timeUpdate()
    },
    doctimechng(event) {
      this.docTimeChng = event.target.value;
    },
    doModalSelect(){
      let self = this ;
      self.NewTime  = this.docTimeChng;
      self.NewDate  = document.getElementById("date").value;
      self.appoint.timeFrom = document.getElementsByClassName("timeHours").value;
    },
    // end Method change time

    countDownChanged (dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
    showAlert () {
      this.dismissCountDown = this.dismissSecs
    },
  },
  mounted: function(){
    let self = this;
    axios.get(  this.$apiAdress + '/api/appointments/show/' + self.$route.params.id + '?token=' + localStorage.getItem("api_token"))
    .then(function (response) {
        self.appoint.patientName  = response.data.data.patientName;
        self.appoint.patientPhone = response.data.data.patientPhone;
        self.appoint.dateSession  = response.data.data.dateSession;
        self.dateSession          = response.data.data.dateSession;
        self.appoint.timeFrom     = response.data.data.timeFrom;
        self.appoint.doctorName   = response.data.data.doctorName;
        self.appoint.doctor_key   = response.data.data.doctor_key;
        self.appoint.status_key   = response.data.data.status_key;
    }).catch(function (error) {
      console.log(respoerrornse);
        // self.$router.push({ path: '/login' });
    });
  }
}

</script>
<style lang="scss" scoped>
   .notAvailab{
    float: left;
    color:red;
  }
  .Availab{
    float: left;
    color:blue;
  }
  .disabled {
    pointer-events:none;
    opacity:0.5;
  }
</style>
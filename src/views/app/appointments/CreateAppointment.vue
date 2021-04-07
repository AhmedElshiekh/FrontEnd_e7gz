<template>
  <CRow>
    <CCol col="12" lg="6">
      <CCard no-header>
        <CCardBody>
          <h3>
            New Appointment
          </h3>
          <!-- <ais-instant-search
            index-name="instant_search"
            :search-client="searchClient"
          >
          </ais-instant-search> -->
          <CAlert
            :show.sync="dismissCountDown"
            color="primary"
            fade
          >
            ({{dismissCountDown}}) {{ message }}
          </CAlert>

          <CInput label="Name" type="text" placeholder="Name" v-model="appointment.name"></CInput>

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
  name: 'CreateAppointments',
  /*
  props: {
    caption: {
      type: String,
      default: 'User id'
    },
  },
  */
  data: () => {
    return {
        appointment: {
          name: '',
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
      // this.$router.replace({path: '/users'})
    },
    store() {
        let self = this;
        axios.post(  this.$apiAdress + '/api/appointments?token=' + localStorage.getItem("api_token"),
          {
            name: self.appointment.name,
          }
        )
        .then(function (response) {
            self.note = {
              title: '',
              content: '',
              applies_to_date: '',
              status_id: null,
              note_type: '',
            };
            self.message = 'Successfully created appointment.';
            self.showAlert();
        }).catch(function (error) {
            if(error.response.data.data.message == 'The given data was invalid.'){
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
    axios.get(  this.$apiAdress + '/api/appointments/create?token=' + localStorage.getItem("api_token"))
    .then(function (response) {
        self.statuses = response.data.data;
    }).catch(function (error) {
        console.log(error);
        self.$router.push({ path: 'login' });
    });
  }
}

</script>

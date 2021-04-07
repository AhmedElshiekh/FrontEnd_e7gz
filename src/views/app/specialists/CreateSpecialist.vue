<template>
  <CRow>
    <CCol col="12" lg="6">
      <CCard no-header>
        <CCardBody >
          <h3>
            Create Specialist
          </h3>
          <CAlert
            :show.sync="dismissCountDown"
            color="primary"
            fade
          >
            ({{dismissCountDown}}) {{ message }}
          </CAlert>

          <CInput label="Name" type="text" placeholder="Name" v-model="specialist.name"></CInput>
          <CInput label="description" type="text" placeholder="description" v-model="specialist.description"></CInput>

          <CButton color="primary" @click="store()">Create</CButton>
          <CButton class="float-right" color="dark" @click="goBack">Back</CButton>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import axios from 'axios'
export default {
  name: 'CreateSpecialist',
  data: () => {
    return {
        specialist: {
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
      // this.$router.go(-1)
      this.$router.replace({path: '/specialists'})
    },
    store() {
        let self = this;
        let Credentials = { name: self.specialist.name,description: self.specialist.description }
        axios.post(  this.$apiAdress + '/api/specialists?token=' + localStorage.getItem("api_token"),Credentials, {
          withCredentials : true,
          Credentials : 'include',
        }).then(function (response) {
            self.note = {
              title: '',
              content: '',
              applies_to_date: '',
              status_id: null,
              note_type: '',
            };
            self.message = 'Successfully created specialist.';
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
    axios.post(  this.$apiAdress + '/api/specialists?token=' + localStorage.getItem("api_token"))
    .then(function (response) {
        self.statuses = response.data.data;
    }).catch(function (error) {
        console.log(error);
        // self.$router.push({ path: 'login' });
    });
  }
}

</script>

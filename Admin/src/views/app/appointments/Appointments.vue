<template>
  <CRow>
    <CCol col="12" >
      <transition name="slkeye">
      <CCard>
        <CCardHeader>
            Appointments
            <CButton color="success float-right" @click="createAppointment()">Create</CButton>
        </CCardHeader>
        
        <CDiv class="text-center">
          <CRow class="text-center">
              <CInput 
                @input="getAppointments" @change="getAppointments"  vale class="mx-auto" v-model="date" label="Date" type="date" name="date" 
              />
          </CRow>
        </CDiv>

        <CCardBody>
          <CAlert
            :show.sync="dismissCountDown"
            color="primary"
            fade
          >
            ({{dismissCountDown}}) {{ message }}
          </CAlert>
          <CDataTable
            class='text-center'
            :items="items"
            :fields="fields"
            column-filter
            table-filter
            items-per-page-select
            :items-per-page="5"
            hover
            sorter
            pagination
          >
            <template #status_key="{item}">
              <td>
                <CBadge :color="getBadge(item.status_key)">
                  {{  item.status_key == 1 ? 'New':
                      item.status_key == 2 ? 'Return':
                      item.status_key == 3 ? 'Canceled':
                      item.status_key == 4 ? 'Finished':
                      'None'}}
                  </CBadge>
                </td>
                <td class="py-2" >
                  <CButton color="primary" size="sm" @click="editAppointment( item.key )">Edit</CButton>
                </td>
                <td class="py-2">
                  <!-- <CButton v-bind:color="item.status_key == '3'?'dark':'danger'" size="sm" @click="deleteAppointment( item )">Cancel</CButton> -->
                </td>
            </template>
          </CDataTable>
        </CCardBody>
      </CCard>
      </transition>
    </CCol>
  </CRow>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Appointments',
  data: () => {
    return {
      items: [],
      fields: [ 'bookedBy', 'doctorName', 'patientName', 'timeFrom', 'status_key'],
      currentPage: 1,
      perPage: 5,
      totalRows: 0,
      you: null,
      message: '',
      showMessage: false,
      dismissSecs: 7,
      dismissCountDown: 0,
      date: new Date().toISOString().slice(0,10),
      showDismissibleAlert: false
    }
  },
  paginationProps: {
    align: 'center',
    doubleArrows: false,
    previousButtonHtml: 'prev',
    nextButtonHtml: 'next'
  },
  methods: {
     getBadge (status) {
      return status == 1 ? 'success'
        : status == 4 ? 'secondary'
          : status == 2 ? 'warning'
            : status == 3 ? 'danger' : 'primary'
    },
    DepartmentLink (key) {
      return `appointments/${key.toString()}`
    },
    editLink (key) {
      return `appointments/${key.toString()}/edit`
    },
    showAppointment ( key ) {
      const appointmentLink = this.appointmentLink( key );
      this.$router.push({path: appointmentLink});
    },
    toggleDetails (item) {
      this.$set(this.items[item.id], '_toggled', !item._toggled)
      this.collapseDuration = 300
      this.$nextTick(() => { this.collapseDuration = 0})
    },
    editAppointment ( key ) {
      const editLink = this.editLink( key );
      this.$router.push({path: editLink});
    },
    createAppointment () {
      this.$router.push({path: 'appointments/create'});
    },
    deleteAppointment ( item ) {
      let self = this;
      axios.post(  this.$apiAdress + '/api/appointments/' + item.key + '?token=' + localStorage.getItem("api_token"), {
        _method: 'PUT',
        patientName:  item.patientName,
        patientPhone:  item.patientPhone,
        dateSession:  item.dateSession,
        time_key:     item.time_key,
        status_key:   3,
      })
      .then(function (response) {
          self.message = 'Successfully cancel appointment.';
          self.showAlert();
          self.getAppointments();
      }).catch(function (error) {
        console.log(error);
      });
    },
    countDownChanged (dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
    showAlert () {
      this.dismissCountDown = this.dismissSecs
    },
    getAppointments (date){
      let self = this;
      
      if (date == null){
        date = new Date().toISOString().substr(0, 10)
      }
      let endpoint = '/api/appointments/' + date + '?token=' ;

      axios.get(  this.$apiAdress + endpoint + localStorage.getItem("api_token"))
      .then(function (response) {
        self.items = response.data.data;
      }).catch(function (error) {
        console.log(error);
      });
    },
     intervalFetchData () {
      setInterval(() => {    
        this.getAppointments();
      }, 4000);    
    },
  },
  mounted: function(){
    this.getAppointments();
    // this.intervalFetchData();
  }
}
</script>

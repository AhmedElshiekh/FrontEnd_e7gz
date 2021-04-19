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
                @input="getAppointments" @change="getAppointments" vale class="mx-auto" label="Date" type="date" name="date" 
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
            <template #actions="{item}" >
              <tr>
                <!-- <td>
                  <CButton color="primary" variant="outline" @click="showAppointment( item.key )">Show</CButton>
                </td> -->
                <td class="py-2">
                  <CButton  
                    color="primary"
                    variant="outline"
                    square
                    size="sm"
                    @click="toggleDetails(item, index)"
                  >
                    {{Boolean(item._toggled) ? 'Hide' : 'Show'}}
                  </CButton>
                </td>
                <td class="py-2" >
                  <CButton color="primary" size="sm" @click="editAppointment( item.key )">Edit</CButton>
                </td>
                <td class="py-2">
                  <CButton color="danger" size="sm" @click="deleteAppointment( item.key )">Delete</CButton>
                </td>
              </tr>
            </template>
            <!-- <template #details="{item}">
              <CCollapse :show="Boolean(item._toggled)" :duration="collapseDuration">
                <CCardBody>
                  <CMedia :aside-image-props="{ height: 102 }">
                    <h4>
                      {{item.doctorName}}
                    </h4>
                    <p class="text-muted">User since: {{item.address}}</p>
                  </CMedia>
                </CCardBody>
              </CCollapse>
            </template> -->
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
      fields: ['key', 'bookedBy', 'doctorName', 'patientName', 'timeFrom', 'timeTo', 'actions'],
      currentPage: 1,
      perPage: 5,
      totalRows: 0,
      you: null,
      message: '',
      showMessage: false,
      dismissSecs: 7,
      dismissCountDown: 0,
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
      return status === 'Active' ? 'success'
        : status === 'Inactive' ? 'secondary'
          : status === 'Pending' ? 'warning'
            : status === 'Banned' ? 'danger' : 'primary'
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
    deleteAppointment ( key ) {
      let self = this;
      axios.post(  this.$apiAdress + '/api/appointments/' + key + '?token=' + localStorage.getItem("api_token"), {
        _method: 'DELETE'
      })
      .then(function (response) {
          self.message = 'Successfully deleted appointment.';
          self.showAlert();
          self.getAppointments();
      }).catch(function (error) {
        console.log(error);
        // self.$router.push({ path: '/login' });
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

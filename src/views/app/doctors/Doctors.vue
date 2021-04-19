<template>
  <CRow>
    <CCol col="12" >
      <transition name="slkeye">
      <CCard>
        <CCardHeader>
            Doctors
            <CButton color="success float-right" @click="createDoctor()">Create</CButton>
        </CCardHeader>
        <CCardBody>
          <CAlert
            :show.sync="dismissCountDown"
            color="primary"
            fade
          >
            ({{dismissCountDown}}) {{ message }}
          </CAlert>
          <CDataTable
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
          <template #status="{item}">
            <td>
              <CBadge :color="getBadge(item.status)">{{ item.status }}</CBadge>
            </td>
            <td >
              <CButton class="btn-sm" color="primary" variant="outline" @click="showDoctor( item.key )">Show</CButton>
            </td>
            <td>
              <CButton  class="btn-sm" color="primary" @click="editDoctor( item.key )">Edit</CButton>
            </td>
            <td>
              <CButton class="btn-sm" v-if="you!=item.key" color="danger" @click="deleteDoctor( item.key )">Delete</CButton>
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
  name: 'Doctors',
  data: () => {
    return {
      items: [],
      fields: ['key', 'name', 'email', 'phone', 'department', 'status'],
      currentPage: 1,
      perPage: 10,
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
    doctorLink (key) {
      return `doctors/${key.toString()}/show`
    },
    editLink (key) {
      return `doctors/${key.toString()}/edit`
    },
    showDoctor ( key ) {
      const doctorLink = this.doctorLink( key );
      this.$router.push({path: doctorLink});
    },
    editDoctor ( key ) {
      const editLink = this.editLink( key );
      this.$router.push({path: editLink});
    },
    deleteDoctor ( key ) {
      let self = this;
      let doctorId = key;
      axios.post(  this.$apiAdress + '/api/doctors/' + key + '?token=' + localStorage.getItem("api_token"), {
        _method: 'DELETE'
      })
      .then(function (response) {
          self.message = 'Successfully deleted doctor.';
          self.showAlert();
          self.getDoctors();
      }).catch(function (error) {
        console.log(error);
        self.$router.push({ path: '/login' });
      });
    },
    createDoctor () {
      this.$router.push({path: 'doctors/create'});
    },
    countDownChanged (dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
    showAlert () {
      this.dismissCountDown = this.dismissSecs
    },
    getDoctors (){
      let self = this;
      axios.get(  this.$apiAdress + '/api/doctors?token=' + localStorage.getItem("api_token"))
      .then(function (response) {
        self.items = response.data.data;
        // self.you = response.data.data.you;
      }).catch(function (error) {
        console.log(error);
        self.$router.push({ path: '/login' });
      });
    }
  },
  mounted: function(){
    this.getDoctors();
  }
}
</script>

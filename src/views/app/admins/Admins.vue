<template>
  <CRow>
    <CCol col="12" >
      <transition name="slkeye">
      <CCard>
        <CCardHeader>
            Admins
            <CButton color="success float-right" @click="createAdmin()">Create</CButton>
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
            hover
            striped
            :items="items"
            :fields="fields"
            :items-per-page="5"
            pagination
          >
          <template #status="{item}">
            <td>
              <CBadge :color="getBadge(item.status)">{{ item.status }}</CBadge>
            </td>
          </template>
          <template #show="{item}">
            <td>
              <CButton color="primary" @click="showAdmin( item.key )">Show</CButton>
            </td>
          </template>
          <template #edit="{item}">
            <td>
              <CButton color="primary" @click="editAdmin( item.key )">Edit</CButton>
            </td>
          </template>
          <template #delete="{item}">
            <td>
              <CButton v-if="you!=item.key" color="danger" @click="deleteAdmin( item.key )">Delete</CButton>
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
  name: 'Admins',
  data: () => {
    return {
      items: [],
      fields: ['key', 'name', 'email', 'phone', 'status', 'show', 'edit', 'delete'],
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
    adminLink (key) {
      return `admins/${key.toString()}`
    },
    editLink (key) {
      return `admins/${key.toString()}/edit`
    },
    showAdmin ( key ) {
      const adminLink = this.adminLink( key );
      this.$router.push({path: adminLink});
    },
    editAdmin ( key ) {
      const editLink = this.editLink( key );
      this.$router.push({path: editLink});
    },
    deleteAdmin ( key ) {
      let self = this;
      let adminId = key;
      axios.post(  this.$apiAdress + '/api/admins/' + key + '?token=' + localStorage.getItem("api_token"), {
        _method: 'DELETE'
      })
      .then(function (response) {
          self.message = 'Successfully deleted admin.';
          self.showAlert();
          self.getAdmins();
      }).catch(function (error) {
        console.log(error);
        self.$router.push({ path: '/login' });
      });
    },
    countDownChanged (dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
    showAlert () {
      this.dismissCountDown = this.dismissSecs
    },
    createAdmin () {
      this.$router.push({path: 'admins/create'});
    },
    getAdmins (){
      let self = this;
      axios.get(  this.$apiAdress + '/api/admins?token=' + localStorage.getItem("api_token"))
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
    this.getAdmins();
  }
}
</script>

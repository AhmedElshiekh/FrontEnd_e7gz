<template>
  <CRow>
    <CCol col="12" xl="6">
      <transition name="slide">
      <CCard>
        <CCardHeader>
            Locations
            <CButton color="primary float-right" @click="createRole()">Create Location</CButton>
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
              <CButton color="primary" @click="showLocation( item.id )">Show</CButton>
            </td>
          </template>
          <template #edit="{item}">
            <td>
              <CButton color="primary" @click="editLocation( item.id )">Edit</CButton>
            </td>
          </template>
          <template #delete="{item}">
            <td>
              <CButton v-if="you!=item.id" color="danger" @click="deleteLocation( item.id )">Delete</CButton>
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
  name: 'Locations',
  data: () => {
    return {
      items: [],
      fields: ['id', 'name','country', 'edit', 'delete'],
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
    locationLink (id) {
      return `locations/${id.toString()}`
    },
    editLink (id) {
      return `locations/${id.toString()}/edit`
    },
    showLocation ( id ) {
      const locationLink = this.locationLink( id );
      this.$router.push({path: locationLink});
    },
    editLocation ( id ) {
      const editLink = this.editLink( id );
      this.$router.push({path: editLink});
    },
    deleteLocation ( id ) {
      let self = this;
      let locationId = id;
      axios.post(  this.$apiAdress + '/api/locations/' + id + '?token=' + localStorage.getItem("api_token"), {
        _method: 'DELETE'
      })
      .then(function (response) {
          self.message = 'Successfully deleted location.';
          self.showAlert();
          self.getLocations();
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
    getLocations (){
      let self = this;
      axios.get(  this.$apiAdress + '/api/locations?token=' + localStorage.getItem("api_token"))
      .then(function (response) {
        self.items = response.data.data.locations;
        self.you = response.data.data.you;
      }).catch(function (error) {
        console.log(error);
        self.$router.push({ path: '/login' });
      });
    }
  },
  mounted: function(){
    this.getLocations();
  }
}
</script>

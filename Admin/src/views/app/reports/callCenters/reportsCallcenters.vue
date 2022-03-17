<template>
  <CRow>
    <CCol col="12" >
      <transition name="slkeye">
      <CCard>
        <CCardHeader>
            CallCenters
            <CButton color="success float-right" @click="createCallCenter()">Create </CButton>
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
            :items-per-page="10"
            pagination
          >
          <template #status="{item}">
            <td>
              <CBadge :color="getBadge(item.status)">{{ item.status }}</CBadge>
            </td>
          </template>
          <template #show="{item}">
            <td>
              <CButton class="btn-sm" color="primary" @click="showCallCenter( item.key )">Show</CButton>
            </td>
          </template>
          <!-- <template #edit="{item}">
            <td>
              <CButton class="btn-sm" color="primary" @click="editCallCenter( item.key )">Edit</CButton>
            </td>
          </template>
          <template #delete="{item}">
            <td>
              <CButton class="btn-sm" v-if="you!=item.key" color="danger" @click="deleteCallCenter( item.key )">Delete</CButton>
            </td>
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
  name: 'reportsCallcenters',
  data: () => {
    return {
      items: [],
      fields: ['key', 'name', 'email', 'phone','countBooked', 'show'],
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
    // getBadge (status) {
    //   return status === 'Active' ? 'success'
    //     : status === 'Inactive' ? 'secondary'
    //       : status === 'Pending' ? 'warning'
    //         : status === 'Banned' ? 'danger' : 'primary'
    // },
    callCenterLink (key) {
      return `reportsCallcenters/${key.toString()}/details`
    },
    // editLink (key) {
    //   return `callCenters/${key.toString()}/edit`
    // },
    showCallCenter ( key ) {
      const callCenterLink = this.callCenterLink( key );
      this.$router.push({path: callCenterLink});
    },
    // editCallCenter ( key ) {  
    //   const editLink = this.editLink( key );
    //   this.$router.push({path: editLink});
    // },
    // deleteCallCenter ( key ) {
    //   let self = this;
    //   let callCenterId = key;
    //   axios.post(  this.$apiAdress + '/api/callCenters/' + key + '?token=' + localStorage.getItem("api_token"), {
    //     _method: 'DELETE'
    //   })
    //   .then(function (response) {
    //       self.message = 'Successfully deleted callCenter.';
    //       self.showAlert();
    //       self.getCallCenters();
    //   }).catch(function (error) {
    //     console.log(error);
    //     self.$router.push({ path: '/login' });
    //   });
    // },
    // createCallCenter () {
    //   this.$router.push({path: 'callCenters/create'});
    // },
    countDownChanged (dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
    showAlert () {
      this.dismissCountDown = this.dismissSecs
    },
    getCallCenters (){
      let self = this;
      axios.get(  this.$apiAdress + '/api/callCenterReports?token=' + localStorage.getItem("api_token"))
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
    this.getCallCenters();
  }
}
</script>

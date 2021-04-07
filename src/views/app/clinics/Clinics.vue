<template>
  <CRow>
    <CCol col="12"  >
      <transition name="slide">
      <CCard>
        <CCardHeader>
            Clinics
            <CButton color="success float-right" @click="createClinic()">Create Clinic</CButton>
        </CCardHeader>
        <CCardBody class="text-center">
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
            <!-- <template #hierarchy="{item}">
              <td>
                <strong>{{item.hierarchy}}</strong>
              </td>
            </template> -->
            <template #status="{item}">
              <td>
                <CBadge :color="getBadge(item.status)">{{ item.status }}</CBadge>
              </td>
            </template>
            <template #show="{item}">
              <td>
                <CButton color="primary" @click="showClinic( item.key )">Show</CButton>
              </td>
            </template>
            <template #edit="{item}">
              <td>
                <CButton color="primary" @click="editClinic( item.key )">Edit</CButton>
              </td>
            </template>
            <template #delete="{item}">
              <td>
                <CButton v-if="item.key" color="danger" @click="deleteClinic( item.key )">Delete</CButton>
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
  name: 'Clinics',
  data: () => {
    return {
      items: [],
      fields: ['key', 'name', 'address','show', 'edit', 'delete'],
      currentPage: 1,
      perPage: 5,
      totalRows: 0,
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
    clinicLink (key) {
      return `clinics/${key.toString()}`
    },
    editLink (key) {
      return `clinics/${key.toString()}/edit`
    },
    showClinic ( key ) {
      const clinicLink = this.clinicLink( key );
      this.$router.push({path: clinicLink});
    },
    editClinic ( key ) {
      const editLink = this.editLink( key );
      this.$router.push({path: editLink});
    },


    /**
     *  deleted Function
     **/
    deleteClinic ( key ) {
      let self = this;
      let Credentials = key + '?token=' + localStorage.getItem("api_token");
      // axios.delete(  this.$apiAdress + '/api/clinics/delete/'+ Credentials)
      axios.delete(  this.$apiAdress + '/api/clinics/' + key + '?token=' + localStorage.getItem("api_token"))
      .then(function (response) {
          self.message = 'Successfully deleted clinic.';
          self.showAlert();
          self.getClinics();
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
    
    createClinic () {
      this.$router.push({path: 'clinics/create'});
    },


    /**
     * Get All Clinics Method
     */
    getClinics (){
      let self = this;
      axios.get(  this.$apiAdress + '/api/clinics?token=' + localStorage.getItem("api_token"))
      .then(function (response) {
        self.items = response.data.data;
      }).catch(function (error) {
        console.log(error);
        self.$router.push({ path: '/login' });
      });
    },
    
  },
  mounted: function(){
    this.getClinics();
  }
}
</script>

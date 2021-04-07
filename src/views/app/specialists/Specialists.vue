<template>
  <CRow>
    <CCol col="12"  >
      <transition name="slide">
      <CCard>
        <CCardHeader>
            Specialists
            <CButton color="success float-right" @click="createSpecialist()">Create</CButton>
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
            <!-- <template #show="{item}">
              <td>
                <CButton color="primary" @click="showSpecialist( item.id )">Show</CButton>
              </td>
            </template> -->
            <template #edit="{item}">
              <td>
                <CButton color="primary" @click="editSpecialist( item.key )">Edit</CButton>
              </td>
            </template>
            <template #delete="{item}">
              <td>
                <CButton v-if="item.key" color="danger" @click="deleteSpecialist( item.key )">Delete</CButton>
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
  name: 'Specialists',
  data: () => {
    return {
      items: [],
      fields: ['key', 'name', 'desc', 'edit', 'delete'],
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
    specialistLink (key) {
      return `specialists/${key.toString()}`
    },
    editLink (key) {
      return `specialists/${key.toString()}/edit`
    },
    // showSpecialist ( id ) {
    //   const specialistLink = this.specialistLink( id );
    //   this.$router.push({path: specialistLink});
    // },
    editSpecialist ( key ) {
      const editLink = this.editLink( key );
      this.$router.push({path: editLink});
    },


    /**
     *  deleted Function
     **/
    deleteSpecialist ( key ) {
      let self = this;
      let Credentials = key + '?token=' + localStorage.getItem("api_token");
      // axios.delete(  this.$apiAdress + '/api/specialists/delete/'+ Credentials)
      axios.delete(  this.$apiAdress + '/api/specialists/' + key + '?token=' + localStorage.getItem("api_token"))
      .then(function (response) {
          self.message = 'Successfully deleted specialist.';
          self.showAlert();
          self.getSpecialists();
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
    
    createSpecialist () {
      this.$router.push({path: 'specialists/create'});
    },


    /**
     * Get All Specialists Method
     */
    getSpecialists (){
      let self = this;
      axios.get(  this.$apiAdress + '/api/specialists?token=' + localStorage.getItem("api_token"))
      .then(function (response) {
        self.items = response.data.data;
      }).catch(function (error) {
        console.log(error);
       // self.$router.push({ path: '/login' });
      });
    },
    
  },
  mounted: function(){
    this.getSpecialists();
  }
}
</script>

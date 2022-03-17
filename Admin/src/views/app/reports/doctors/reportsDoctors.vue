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
            :items-per-page="10"
            hover
            sorter
            pagination
            class="text-center"
          >

          <template #invoices="{item}" class="text-center" >
            <td :if="item.balanceMonth.length > 0" v-for="(month, index) in item.balanceMonth" :key="index">
              <CButton class="btn-sm" color="primary" variant="outline" @click="showDoctor( item.key, month )">{{month}}</CButton>
            </td>
            <td :if="item.balanceMonth.length == 0" >
              <CButton class="btn-sm" color="primary" variant="outline" @click="showDoctor( item.key )">show</CButton>
            </td>
          </template>
          <!-- <template #invoices="{item}" class="text-center" v-if="item.balanceMonth.length = 0">
            <td v-for="(month, index) in item.balanceMonth" :key="index">
              <CButton class="btn-sm" color="primary" variant="outline" @click="showDoctor( item.key, month )">{{month}}</CButton>
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
  name: 'reportsDoctors',
  data: () => {
    return {
      items: [],
      fields: ['name', 'email', 'phone', 'balance','invoices'],
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
    doctorLinkWithMonth (key, month) {
      return `reportsDoctors/${key.toString()}/${month.toString()}/details`
    },
    doctorLink (key) {
      return `reportsDoctors/${key.toString()}/details`
    },
    showDoctor ( key , month) {
      const doctorLink = month ? this.doctorLinkWithMonth( key ,month) : this.doctorLink( key )
      this.$router.push({path: doctorLink});
    },
    countDownChanged (dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
    showAlert () {
      this.dismissCountDown = this.dismissSecs
    },
    getDoctors (){
      let self = this;
      axios.get(  this.$apiAdress + '/api/doctorsReports?token=' + localStorage.getItem("api_token"))
      .then(function (response) {
        self.items = response.data.data;
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

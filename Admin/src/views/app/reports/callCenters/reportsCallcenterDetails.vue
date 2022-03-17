<template>
  <CRow>
    <CCol col="12">
      <CCard>
        <CCardHeader>
          <!-- CallCenter key:  {{ $route.params.id }} -->
        </CCardHeader>
        <CDiv class="text-center">
          <CRow class="text-center">
              <CInput 
                @input="getReportDetails" @change="getReportDetails"  vale class="mx-auto" v-model="date" label="Date" type="month" name="date" 
              />
          </CRow>
        </CDiv>
        <CCardBody>
          <download-excel
            class   = "btn btn-default"
            :data   = "items"
            :fields = "fields"
            name    = "filename.xls"
            >
            <CButton color="success">Download Excel</CButton>
          </download-excel>
          <!-- <vue-html2pdf
          >
              <section slot="pdf-content">
              </section>
          </vue-html2pdf> -->
          <table class="table" id="datatable">
            <thead>
              <tr>
                <th>ID</th>
                <th>Booked By</th>
                <th>Patient Name</th>
                <th>Patient Phone</th>
                <th>Date Session</th>
                <th>Time start</th>
                <th>Time end</th>
                <th>Doctor name</th>
                <th>Address</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in items" :key="item.key">
                <td>{{index+1}}</td>
                <td>{{item.bookedBy}}</td>
                <td>{{item.patientName}}</td>
                <td>{{item.patientPhone}}</td>
                <td>{{item.dateSession}}</td>
                <td>{{item.timeFrom}}</td>
                <td>{{item.timeTo}}</td>
                <td>{{item.doctorName}}</td>
                <td>{{item.address}}</td>
              </tr>
            </tbody>
          </table>    
        </CCardBody>
        <CCardFooter>
          <CButton color="primary" @click="goBack">Back</CButton>
        </CCardFooter>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
// import VueMonthlyPicker from 'vue-monthly-picker'
// import VueHtml2pdf from 'vue-html2pdf'
import axios from 'axios'


export default {
  name: 'reportsCallcenterDetails',
  data: () => {
    return {
      items: [],
      date: new Date().toISOString().substring(0,7),
    }
  },
  // components: {
  //   // VueMonthlyPicker
  //   VueHtml2pdf
  // },
  methods: {
    generateReport () {
        this.$refs.html2Pdf.generatePdf()
    },
    goBack() {
      this.$router.go(-1)
    },
    getReportDetails(date){
      let self = this;

      if (date == null){
        date = new Date().toISOString().substr(0, 7)
      }
      self.items = null;
      axios.post(  this.$apiAdress + '/api/callCenterReportsDetails?token=' + localStorage.getItem("api_token"),
      {
        key_callCenter:  self.$route.params.id,
        date: self.date,
      }).then((response) =>{
        self.items = response.data.data;
        console.log(response.data.data.length)
      }).catch(function (error) {
        console.log(error);
        // self.$router.push({ path: '/login' });
      });
    }
  },
  mounted: function(){
    this.getReportDetails();
  }
}
</script>

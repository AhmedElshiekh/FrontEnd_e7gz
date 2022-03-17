<template>  
  <CRow>
    <CCol col="12">
      <CCard>
        <CCardHeader>
          <!-- Doctor key:  {{ $route.params.id }} -->
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
          <CButton color="success" @click="createPDF">Download PDF</CButton>

          <div ref="content" id="pdfTable" >
            <!-- <ag-grid-vue
              ref="agGridTable"
              :components="components"
              :gridOptions="gridOptions"
              class="ag-theme-material ag-grid-table"
              :columnDefs="columnDefs"
              :defaultColDef="defaultColDef"
              :rowData="usersData"
              rowSelection="multiple"
              colResizeDefault="shift"
              :animateRows="true"
              :floatingFilter="true"
              :pagination="true"
              :paginationPageSize="paginationPageSize"
              :suppressPaginationPanel="true"
              > -->
            <table class="table" id="datatable">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Doctor name</th>
                  <th>Patient Name</th>
                  <th>Patient Phone</th>
                  <th>Booked By</th>
                  <th>Date Session</th>
                  <th>Time start</th>
                  <th>Time end</th>
                  <th>Address</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in items" :key="item.key">
                  <td>{{index+1}}</td>
                  <td>{{item.doctorName}}</td>
                  <td>{{item.patientName}}</td>
                  <td>{{item.patientPhone}}</td>
                  <td>{{item.bookedBy}}</td>
                  <td>{{item.dateSession}}</td>
                  <td>{{item.timeFrom}}</td>
                  <td>{{item.timeTo}}</td>
                  <td>{{item.address}}</td>
                </tr>
              </tbody>
            </table>    
            <!-- </ag-grid-vue> -->

          </div>
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
import { jsPDF } from "jspdf";

export default {
  name: 'reportsDoctorDetails',
  data: () => {
    return {
      items: [],
      date: null,
    }
  },
  // components: {
  //   // VueMonthlyPicker
  //   VueHtml2pdf
  // },
  methods: {

     createPDF (){
      const doc = new jsPDF();
      doc.html(this.$refs.content.innerHTML, {
          callback: function (doc) {
            doc.save('classroom report.pdf');
          },
          x: 5,
          y: 5
      });

    },
    // generateReport () {
    //     this.$refs.html2Pdf.generatePdf()
    // },
    goBack() {
      this.$router.go(-1)
    },
    getReportDetails(date){
      let self = this;

      if (date == null){
        self.date = self.$route.params.month ?? new Date().toISOString().substr(0, 7);
      }
      self.items = null;
      axios.post(  this.$apiAdress + '/api/doctorReportsDetails?token=' + localStorage.getItem("api_token"),
      {
        key_doctor:  self.$route.params.id,
        date: self.date,
      }).then((response) =>{
        self.items = response.data.data;
        console.log(response.data.data.length);
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
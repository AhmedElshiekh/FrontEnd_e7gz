<template>
  <CRow>
    <CCol col="12" lg="6">
      <CCard>
        <CCardHeader>
          Clinic key:  {{ $route.params.key }}
        </CCardHeader>
        <CCardBody>
          <CDataTable 
            striped 
            small 
            fixed
            :items="items" 
            :fields="fields"
          >
            <template slot="value" slot-scope="data">
              <strong>{{data.item.value}}</strong>
            </template>
          </CDataTable>  
        </CCardBody>
        <CCardFooter>
          <CButton color="primary" @click="goBack">Back</CButton>
        </CCardFooter>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Clinic',
  data: () => {
    return {
      items: [],
      fields: [
        {key: 'key'},
        {key: 'value'},
      ],
    }
  },
  methods: {
    getClinicData (key) {
      const clinic = clinicsData.find((clinic, index) => index + 1 == key)
      const clinicDetails = clinic ? Object.entries(clinic) : [['key', 'Not found']]
      return clinicDetails.map(([key, value]) => { return { key, value } })
    },
    goBack() {
      this.$router.go(-1)
    }
  },
  mounted: function(){
    let self = this;
    axios.get(  this.$apiAdress + '/api/clinics/' + self.$route.params.key + '?token=' + localStorage.getItem("api_token"))
    .then(function (response) {
      const items = Object.entries(response.data.data);
      self.items = items.map(([key, value]) => {return {key: key, value: value}});
    }).catch(function (error) {
      console.log(error);
      self.$router.push({ path: '/login' });
    });
  }
}
</script>

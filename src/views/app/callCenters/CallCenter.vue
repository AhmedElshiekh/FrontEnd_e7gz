<template>
  <CRow>
    <CCol col="12" lg="6">
      <CCard>
        <CCardHeader>
          CallCenter key:  {{ $route.params.key }}
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
          <CButton color="dark float-right" @click="goBack">Back</CButton>
        </CCardFooter>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Doctory',
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
    getCallCenterData (key) {
      const callCenter = callCentersData.find((callCenter, index) => index + 1 == key)
      const callCenterDetails = callCenter ? Object.entries(callCenter) : [['key', 'Not found']]
      return callCenterDetails.map(([key, value]) => { return { key, value } })
    },
    goBack() {
      this.$router.go(-1)
    }
  },
  mounted: function(){
    let self = this;
    axios.get(  this.$apiAdress + '/api/callCenters/' + self.$route.params.key + '?token=' + localStorage.getItem("api_token"))
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

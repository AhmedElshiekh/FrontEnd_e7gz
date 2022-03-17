<template>
  <CRow>
    <CCol col="12" lg="6">
      <CCard>
        <CCardHeader>
          Admin key:  {{ $route.params.key }}
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
  name: 'Admin',
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
    getAdminData (key) {
      const admin = adminsData.find((admin, index) => index + 1 == key)
      const adminDetails = admin ? Object.entries(admin) : [['key', 'Not found']]
      return adminDetails.map(([key, value]) => { return { key, value } })
    },
    goBack() {
      this.$router.go(-1)
    }
  },
  mounted: function(){
    let self = this;
    axios.get(  this.$apiAdress + '/api/admins/' + self.$route.params.key + '?token=' + localStorage.getItem("api_token"))
    .then(function (response) {
      const items = Object.entries(response.data.data);
      self.items = items.map(([key, value]) => {return {key: key, value: value}});
    }).catch(function (error) {
      console.log(error);
      // self.$router.push({ path: '/login' });
    });
  }
}
</script>

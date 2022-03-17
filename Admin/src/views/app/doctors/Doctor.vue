<template>
  <CRow>
    <CCol col="12" lg="6">
      <CCard>
        
        <CCardBody>
          <table class="table" >
              <thead class="thead">
                <tr> <h3> doctor info</h3></tr>
              </thead>
              <tbody>
                <tr>
                  <td>avatar</td>
                  <td><img v-bind:src="$apiAdress + dataDoc.avatar" alt="" width="100" height="100"></td>
                </tr>
                <tr>
                  <td>name</td>
                  <td>{{dataDoc.name}}</td>
                </tr>
                <tr>
                  <td>email</td>
                  <td>{{dataDoc.email}}</td>
                </tr>
                <tr>
                  <td>phone</td>
                  <td>{{dataDoc.phone}}</td>
                </tr>
                <tr>
                  <td>ID_number</td>
                  <td>{{dataDoc.ID_number}}</td>
                </tr>
                <tr>
                  <td>nationality</td>
                  <td>{{dataDoc.nationality}}</td>
                </tr>
                <tr>
                  <td>country</td>
                  <td>{{dataDoc.country}}</td>
                </tr>
                <tr>
                  <td>governorate</td>
                  <td>{{dataDoc.governorate}}</td>
                </tr>
                <tr>
                  <td>city</td>
                  <td>{{dataDoc.city}}</td>
                </tr>
                <tr>
                  <td>address</td>
                  <td>{{dataDoc.address}}</td>
                </tr>
                <tr>
                  <td>department</td>
                  <td>{{dataDoc.department}}</td>
                </tr>
                <tr>
                  <td>session length</td>
                  <td>{{dataDoc.sessionLength}}</td>
                </tr>
                <tr>
                  <td>min patient</td>
                  <td>{{dataDoc.minPatient}}</td>
                </tr>
                <tr>
                  <td>max patient</td>
                  <td>{{dataDoc.maxPatient}}</td>
                </tr>
                <tr>
                  <td>average</td>
                  <td>{{dataDoc.average}}</td>
                </tr>
                <tr>
                  <td>Fees</td>
                  <td>{{dataDoc.price}}</td>
                </tr>
                <tr>
                  <td>sessionLength</td>
                  <td>{{dataDoc.sessionLength}}</td>
                </tr>
              </tbody>
          </table>
          <!-- <CDataTable 
            striped 
            small 
            fixed
            :items="items" 
            :fields="fields"
          >
            <template  slot="value" slot-scope="data">
              <strong
               v-if="data.item.key !== 'avatar' 
               || data.item.key == 'doctorStatus'
               || data.item.key == 'price'
               " >
                {{data.item.value}}
              </strong>
              <strong v-if="data.item.key == 'avatar'" >
                <img v-bind:src="$apiAdress + data.item.value" alt="" width="100" height="100">
              </strong>
            </template>
          </CDataTable>   -->
        </CCardBody>
        <CCardFooter>
          <CButton color="dark" @click="goBack">Back</CButton>
        </CCardFooter>
      </CCard>
    </CCol>
    <CCol col="12" lg="6">
      <CCard>
        <CCardHeader>
         Attatiments
        </CCardHeader>
        <CCardBody>
          <div class="text-center" v-for="attach in attachs" :key="attach.key">
            <a v-bind:href="$apiAdress + attach.path">
              <img v-bind:src="$apiAdress + attach.path" alt="" width="400" >
            </a>
          </div>
        </CCardBody>
        <CCardFooter>
            Active Doctor
          <CSwitch
            class="float-right"
            :key="key"
            color="success"
            shape= 'pill'
            id="tt"
            :checked="dataDoc.doctorStatus == 2"
            @update:checked="activeDoc()"
          /> 
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
      attachs: [],
      dataDoc: [],
      checked: {
        type: Boolean,
        value: '',
      },
    }
  },
  methods: {
    catchData(){
      let self = this ;
      axios
        .all([
          axios.get(this.$apiAdress + '/api/doctors/' + self.$route.params.id + '?token='  + localStorage.getItem("api_token"),{}),
          axios.get(this.$apiAdress + '/api/attachment/'+ self.$route.params.id +'?token=' + localStorage.getItem("api_token"),{}),
        ])
        .then(
          axios.spread((...responses) => {

            const items = Object.entries(responses[0].data.data);
            self.items = items.map(([key, value]) => {return {key: key, value: value}});
            self.dataDoc = responses[0].data.data;
            
            self.attachs = responses[1].data.data;
          },
        ))
        .catch(err => console.log(err));
    },
    getDoctorData (key) {
      const doctor = doctorsData.find((doctor, index) => index + 1 == key)
      const doctorDetails = doctor ? Object.entries(doctor) : [['key', 'Not found']]
      return doctorDetails.map(([key, value]) => { return { key, value } })
    },
    activeDoc(){
      var check = document.getElementById("tt").checked
      let self = this ;
      var statusKey = check == true ? 2 : 3;
      
      axios
        .post(this.$apiAdress + '/api/activeDoc?token=' + localStorage.getItem("api_token"),{
          doctor_key: self.$route.params.id,
          status: statusKey,
        })
        .then(res =>console.log(res))
        .catch(err => console.log(err));
    },
    goBack() {
      this.$router.go(-1)
    },
  },
  mounted: function(){
    this.catchData()
  }
}
</script>

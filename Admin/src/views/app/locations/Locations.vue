<template>
  <div>
    <CRow>
      <CCol col="12" xl="6">
        <transition name="slkeye">
        <CCard>
          <CCardHeader>
              governorates
              <CButton color="success float-right" @click="createGove()">Add governorate</CButton>
              <CModal title="Add Govenorate" :show.sync="addGovenorate"  @update:show="addGove()">
                  <CInput class="col-12" label="Name" type="text" placeholder="name governorate" id="NewGovernorate"  value=""></CInput>
                  <!-- <CSelect class="col-12" label="Name" type="text" :placeholder="mcity.governorate" id="NewName" :value="mcity.governorate"></CSelect> -->
              </CModal>
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
              :items-per-page="5"
              pagination
            >
            <template #status="{item}">
              <td>
                <CBadge :color="getBadge(item.status)">{{ item.status }}</CBadge>
              </td>
            </template>
            <template #show="{item}">
              <td>
                <CButton class="btn-sm" color="dark" @click="showGovernit( item.key )">Show</CButton>
              </td>
            </template>
            <template #edit="{item}">
              <td>
                <CButton class="btn-sm" color="primary" @click="editGovernit(item)">Edit</CButton>
                
              </td>
            </template>
            <template #delete="{item}">
              <td>
                <CButton class="btn-sm" v-if="you!=item.key" color="danger" @click="deleteLocation( item.key )">Delete</CButton>
              </td>
            </template>
          </CDataTable>
          </CCardBody>
          <CModal title="Edit Governate" :show.sync="editGoveModel"  @update:show="editGove(mgove.key)">
              <CInput class="col-12" label="Name" type="text" :placeholder="mgove.name" id="NewNameGove" :value="mgove.name"></CInput>
          </CModal>
        </CCard>
        </transition>
      </CCol>
      <CCol col="12" xl="6">
        <transition name="slkeye">
        <CCard>
          <CCardHeader>
              Cities
              <CButton color="success float-right" @click="createCity()">Add city</CButton>
              <CModal title="Add Govenorate" :show.sync="addCity"  @update:show="addCities()">
                  <CInput class="col-12" label="Name" type="text" placeholder="name city" id="NewCity"  value=""></CInput>
                  <div class="col-12 form-group">
                    <label for="">Select governorate</label>
                    <select name="" class="form-control" id="govToCitu" >
                      <option value="">Select</option>
                      <option :value="governorate.key" v-for="governorate in items" :key="governorate.key" >{{ governorate.name }}</option> 
                    </select>
                  </div>
              </CModal>
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
              :items="city.items"
              :fields="city.fields"
              :items-per-page="5"
              pagination
            >
            <template #status="{item}">
              <td>
                <CBadge :color="getBadge(item.status)">{{ item.status }}</CBadge>
              </td>
            </template>
            <template #show="{item}">
              <td>
                <CButton class="btn-sm" color="primary" @click="showLocation( item.key )">Show</CButton>
              </td>
            </template>
            <template #edit="{item}">
              <td>
                <CButton class="btn-sm" color="primary" @click="editCityselect( item )">Edit</CButton>
              </td>
            </template>
            <template #delete="{item}">
              <td>
                <CButton class="btn-sm" v-if="you!=item.key" color="danger" @click="deleteCity( item.key )">Delete</CButton>
              </td>
            </template>
          </CDataTable>
          <CModal title="Edit City" :show.sync="editCityModel"  @update:show="editCity(mcity.key)">
              <CInput class="col-12" label="Name" type="text" :placeholder="mcity.name" id="newNameCity" :value="mcity.name"></CInput>
              <!-- <CSelect class="col-12" label="Name" type="text" :placeholder="mcity.governorate" id="NewName" :value="mcity.governorate"></CSelect> -->
              <div class="col-12 form-group">
                <label for="">Select governorate</label>
                <select name="" class="form-control" id="govToCite" >
                  <option value="">Select</option>
                  <option :value="gov.key" v-for="gov in items" :selected="mcity.governorate == gov.name" :key="gov.key" >
                    {{ gov.name }}
                  </option> 
                </select>
              </div>
          </CModal>
          </CCardBody>
        </CCard>
        </transition>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Locations',
  data: () => {
    return {
      items: [],
      fields: [ 'name','country', 'edit',  'show'],
      currentPage: 1,
      perPage: 5,
      totalRows: 0,
      you: null,
      message: '',
      showMessage: false,
      dismissSecs: 7,
      editGoveModel: false,
      editCityModel: false,
      addGovenorate: false,
      addCity: false,
      mgove:[],
      mcity:[],
      dismissCountDown: 0,
      showDismissibleAlert: false,
      city:{
        items:[],
        fields: [ 'name','governorate', 'edit', 'delete'],
      }
    }
  },
  paginationProps: {
    align: 'center',
    doubleArrows: false,
    previousButtonHtml: 'prev',
    nextButtonHtml: 'next'
  },
  methods: {
    getBadge (status) {
      return status === 'Active' ? 'success'
        : status === 'Inactive' ? 'secondary'
          : status === 'Pending' ? 'warning'
            : status === 'Banned' ? 'danger' : 'primary'
    },
    locationLink (key) {
      return `locations/${key.toString()}`
    },
    editLink (key) {
      return `locations/${key.toString()}/edit`
    },
    showGovernit ( key ) {
      let self = this;
      axios.get(  this.$apiAdress + '/api/citiesFromGov/'+ key +'?token=' + localStorage.getItem("api_token"))
      .then(function (response) { self.city.items = response.data.data; })
      .catch(function (error) { console.log(error); });
    },
    editGovernit (key) {
      this.editGoveModel = true; 
      this.mgove = key
    },
    editGove(key){
      let self = this;
      var NewNameGove = document.getElementById("NewNameGove").value
      axios.post(  this.$apiAdress + '/api/governorates/' + key + '?token=' + localStorage.getItem("api_token"), {
        _method: 'PUT',
        name : NewNameGove
      })
      .then(function (response) {
          self.getLocations()
          self.message = 'Successfully Edit governorate.';
      }).catch(function (error) {console.log(error);});
    },


    editCityselect(key){
      this.editCityModel = true; 
      this.mcity = key
    },
    editCity(key){
      let self = this;
      var NewNameCity = document.getElementById("newNameCity").value
      var govToCite = document.getElementById("govToCite").value
      axios.post(  this.$apiAdress + '/api/cities/' + key + '?token=' + localStorage.getItem("api_token"), {
        _method: 'PUT',
        name : NewNameCity,
        governorate_id : govToCite
      })
      .then(function (response) { self.showGovernit(1)})
      .catch(function (error) {console.log(error);});
    },


    createGove(){ this.addGovenorate = true; },
    addGove(){
      var NewGovernorate = document.getElementById("NewGovernorate").value
      let self = this;
      axios.post(  this.$apiAdress + '/api/governorates?token=' + localStorage.getItem("api_token"), {
        name : NewGovernorate,
        country_id : 1
      })
      .then(function (response) { self.getLocations()})
      .catch(function (error) {console.log(error);}); 
    },

    createCity(){ this.addCity = true; },
    addCities(){
      var NewCity = document.getElementById("NewCity").value
      var govToCitu = document.getElementById("govToCitu").value
      let self = this;
      axios.post(  this.$apiAdress + '/api/cities?token=' + localStorage.getItem("api_token"), {
        name : NewCity,
        governorate_id : govToCitu
      })
      .then(function (response) { self.getLocations()})
      .catch(function (error) {console.log(error);}); 
    },

    deleteCity ( key ) {
      let self = this;
      let locationId = key;
      axios.post(  this.$apiAdress + '/api/cities/' + key + '?token=' + localStorage.getItem("api_token"), {
        _method: 'DELETE'
      })
      .then(function (response) {
          self.message = 'Successfully deleted location.';
          self.showAlert();
          self.getLocations();
      }).catch(function (error) {
        console.log(error);
      });
    },
    countDownChanged (dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
    showAlert () {
      this.dismissCountDown = this.dismissSecs
    },
    getLocations (){
      let self = this;
      axios.get(  this.$apiAdress + '/api/governorates?token=' + localStorage.getItem("api_token"))
      .then(function (response) {
        self.items = response.data.data;
      }).catch(function (error) {
        console.log(error);
        // self.$router.push({ path: '/login' });
      });
    }
  },
  mounted: function(){
    this.getLocations();
  }
}
</script>

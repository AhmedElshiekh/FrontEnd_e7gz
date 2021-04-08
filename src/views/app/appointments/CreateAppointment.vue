<template>
  <!-- <CRow>
    <CCol col="12" lg="6">
      <CCard no-header>
        <CCardBody>
          <h3>
            New Appointment
          </h3> -->
          <!-- <ais-instant-search
            index-name="instant_search"
            :search-client="searchClient"
          >
          </ais-instant-search> -->
          <!-- <CAlert
            :show.sync="dismissCountDown"
            color="primary"
            fade
          >
            ({{dismissCountDown}}) {{ message }}
          </CAlert>

          <CInput label="Name" type="text" placeholder="Name" v-model="appointment.name"></CInput>

          <CButton color="primary" @click="store()">Create</CButton>
          <CButton color="dark float-right" @click="goBack">Back</CButton>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow> -->
  <div>

    <!-- filter button -->
    <!-- start -->
    <div class="filter-con">
      <button>Filter</button>
    </div>
    <!-- end -->

    <!-- filter page -->
    <!-- start -->
    <div>

    </div>
    <!-- end -->

    <!-- appointments container -->
    <!-- start -->
    <div class="appointments-con">
      <div class="appoi-card" v-for="num in nums" :key="num">
        <ul class="appoi-info">
          <li class="item"><span class="title">Doctor: </span><span class="info">Bohame Namero</span></li>
          <li class="item"><span class="title">Specialist: </span><span class="info">Diagnoses</span></li>
          <li class="item"><span class="title">Location: </span><span class="info">Karofr</span></li>
          <li class="item"><span class="title">Date: </span><span class="info">1/1/2012</span></li>
        </ul>
        <div class="create-appoi">
          <button>Create</button>
        </div>
      </div>
    </div>
    <!-- end -->

  </div>
</template>

<script>

import axios from 'axios'
export default {
  name: 'CreateAppointments',
  /*
  props: {
    caption: {
      type: String,
      default: 'User id'
    },
  },
  */
  data: () => {
    return {
        appointment: {
          name: '',
        },
        message: '',
        dismissSecs: 7,
        dismissCountDown: 0,
        showDismissibleAlert: false,
        nums:[1,0,0,0,0,0,0,0,1,2,5,2,5,2,35,511,51,5,55,5,5,5,5]
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
      // this.$router.replace({path: '/users'})
    },
    store() {
        let self = this;
        axios.post(  this.$apiAdress + '/api/appointments?token=' + localStorage.getItem("api_token"),
          {
            name: self.appointment.name,
          }
        )
        .then(function (response) {
            self.note = {
              title: '',
              content: '',
              applies_to_date: '',
              status_id: null,
              note_type: '',
            };
            self.message = 'Successfully created appointment.';
            self.showAlert();
        }).catch(function (error) {
            if(error.response.data.data.message == 'The given data was invalid.'){
              self.message = '';
              for (let key in error.response.data.data.errors) {
                if (error.response.data.data.errors.hasOwnProperty(key)) {
                  self.message += error.response.data.data.errors[key][0] + '  ';
                }
              }
              self.showAlert();
            }else{
              console.log(error);
              self.$router.push({ path: 'login' }); 
            }
        });
    },
    countDownChanged (dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
    showAlert () {
      this.dismissCountDown = this.dismissSecs
    },
  },
  mounted: function(){
    let self = this;
    axios.get(  this.$apiAdress + '/api/appointments/create?token=' + localStorage.getItem("api_token"))
    .then(function (response) {
        self.statuses = response.data.data;
    }).catch(function (error) {
        console.log(error);
        self.$router.push({ path: 'login' });
    });
  }
}

</script>

<style lang="scss" scoped>

//== filter button style ==//
//== start ==//
.filter-con{
  margin-top: 20px;
  margin-left: 20px;
   button{
     background-color: rgba(56, 56, 243, 0.801);
     color: white ;
     border: none;
     outline: none;
     padding: 10px;
     width: 150px;
     border-radius: 6.5px;
   }
}
//== end ==//

//== appointment crads style ==//
//== start ==//
.appointments-con{
  width: 100%;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 20px;
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  overflow: hidden;
  justify-content: center;
  .appoi-card{
    background-color: white;
    border: 1px solid rgba(204, 203, 203, 0.63);
    min-width: 24.35%;
    height: 150px;
    border-radius: 6.5px;
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;

    //== appointment info style ==//
    //== start ==//
    .appoi-info{
      list-style-type: circle;
      list-style: rgba(56, 56, 243, 0.801);
      .item{
        .title{
          color: rgba(56, 56, 243, 0.801);
          letter-spacing: 1.2px;
          margin-right: 5px;
        }
        &::marker{
          color: rgba(56, 56, 243, 0.801);
        }
      }
    }
    //== end ==//

    //== create appiontment btn style ==//
    //== start ==//
    .create-appoi{
      position: absolute;
      bottom: 10px;
      right: 10px;
        button{
        background-color: rgba(56, 56, 243, 0.801);
        color: white ;
        border: none;
        outline: none;
        padding: 10px;
        border-radius: 6.5px;
      }
    }
    //== end ==//

  }
}
//== end ==//

//== appointment contanier media ==//
//== start ==//
@media screen and (max-width: 1290px){
  
}
//== end ==//


</style>

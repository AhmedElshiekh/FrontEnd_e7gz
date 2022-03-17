<template>
  <!-- <CRow>
    <CCol col="12" lg="6">
    </CCol>
  </CRow> -->
  <div>
    <CAlert :show.sync="dismissCountDown" color="primary" closeButton fade >
      {{ message }}
    </CAlert>
    <!-- error alert -->
    <CAlert :show.sync="dismissError" color="danger" closeButton fade >
      {{ msgError }}
    </CAlert>

    <!-- filter -->
    <!-- start -->
    <div class="filter-con">
      <input type="text" v-model="keyword" @input="searchDoc" style="border-radius: 15px;" placeholder="Enter doctor name ...">
      <!-- <button @click="openFilterBox()">Filter</button> -->
    </div>
    <!-- start -->

    <!-- filter box -->
    <!-- start -->
    <div class="filter-box" >
      <div class="filter-group">
        <h5>Specailist</h5>
        <label for=""></label>
        <select name="" id="specailists">
          <option value="">Select</option>
          <option :value="specailist.key" v-for="specailist in specailists" :key="specailist.key">{{ specailist.name }}</option>
        </select>
      </div>
      <div class="filter-group">
        <h5>Location</h5>
        <div> 
          <label for="" style="margin-right: 14px">Governate: </label>
          <select name="" id="governorates" @change="selectCity($event.target.selectedIndex)">
            <option value="">Select</option>
            <option :value="governorate.name" v-for="governorate in governorates" :key="governorate.key" >{{ governorate.name }}</option> 
          </select>
        </div>
        <div>
          <label for="" style="margin-right: 55px">City: </label>
          <select name="" id="cities" disabled>
            <option value="">select</option>
            <option :value="city.name" v-for="city in cities" :key="city.key">{{ city.name }}</option>
          </select>
        </div>
      </div>
      <div class="filter-group">
        <h5>Date</h5>
      <label for=""></label>
       <input style="border-radius: 10px; border: none; padding: 4px;" v-model="date" type="date" name="" id="date">
      <button @click="makeFilter()">Filter</button>
      </div>
    </div>
    <!-- end -->

    <!-- appiontments cards -->
    <!-- start -->
    <div class="appointments-con">
      <div class="appointment-card" v-for="appoi in todayAppointments" :key="appoi.key">
        <div class="top-side">
          <div class="left-side">
            <div class="img-con">
              <img src="img/avatars/6.jpg" alt="avatar">
            </div>
            <div class="img-info">
              <h4>{{ appoi.doctorName }}</h4>
              <h5><small>{{appoi.department?specailists[appoi.department].name:"no specailist"}}</small></h5>
              <span>{{ appoi.country }} . {{appoi.governorate}} . {{ appoi.city }}</span><br>
              <small>{{ appoi.address }}</small>
            <span style="color: #cc0000">{{ appoi.timeFrom }} </span>
            </div>
          </div>
          <div class="right-side position-relative">
            <!-- <button style="margin-top: 2.5rem;" @click="showDoctor(appoi.doctor_key)">See Doctor</button> -->
            <button style="margin-top: 2.5rem;" @click="showDoctor(appoi.doctor_key)">Book</button>
          </div>
        </div>
        <div class="bottom-side">
          <span></span>
          <!-- <button @click="booked()" >Book</button> -->
        </div>

        <CModal title="Booking" color="dark" :show.sync="bookedModal" @update:show="doModal(appoi.key)">
          <CRow>
            <CInput class="col-12" label="patientName" type="text" placeholder="Name" v-model="book.patientName"></CInput>
          </CRow>
          <CRow>
            <CInput class="col-12" label="patientPhone" type="text" placeholder="Phone" v-model="book.patientPhone"></CInput>
          </CRow>
        </CModal>

        <CModal title="Booking" color="dark" :show.sync="seeDoc" @update:show="doModalSelect()">
          <row>
            <div v-for="docTime in doctorTimes" :key="docTime.key">
                <div v-bind:class="docTime.timeStatus == 'available'?'Availab':'notAvailab'"> 
                  <input v-bind:class="docTime.timeStatus == 'available'?'':'disabled'" 
                    type="radio" 
                    name="timeDocSelect" 
                    @change="doctimechng($event)"
                    v-bind:value="docTime.key" 
                  >
                  {{docTime.timeFrom}}
                </div>
            </div>
            <br><br>
          </row>
            <br><br>
          <CRow>
            <CInput class="col-12" label="patientName" type="text" placeholder="Name" v-model="book.patientName"></CInput>
          </CRow>
          <CRow>
            <CInput class="col-12" label="patientPhone" type="text" placeholder="Phone" v-model="book.patientPhone"></CInput>
          </CRow>
        </CModal>
        
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
      dismissError: 0,
      showDismissibleAlert: false,
      // loading : true,
      bookedModal: false,
      seeDoc: false,
      book:{
        patientName:'',
        patientPhone:''
      },
      date: new Date().toISOString().slice(0,10),
      //== data catch variables ==//
      //== start ==//
      // apiUrl: "http://e7gz.aisent/api",
      nums:[1,2,3,4,5,6],
      todayAppointments: {},
      specailists: {},
      governorates: {},
      doctorTimes: {},
      cities: {},
      docTimeChng:'',
      counter: 4 ,
      //== end ==//
    }
  },
  methods: {

    //== my functions==//
    //== start ==//
    catchTodayData(){
      let self = this ;
      
      axios
        .all([
          axios.get(this.$apiAdress + '/api/specialists?token=' + localStorage.getItem("api_token"),{}),
          axios.get(this.$apiAdress + '/api/governorates?token=' + localStorage.getItem("api_token"),{}),
          // axios.post(this.$apiAdress + '/api/filterTimes?token=' + localStorage.getItem("api_token"),{}),
        ])
        .then(
          axios.spread((...responses) => {
            self.specailists = responses[0].data.data ;
            self.governorates = responses[1].data.data;
            // self.todayAppointments = responses[2].data.data ;
          },
        ))
        .catch(err => console.log(err));
    },

    openFilterBox(){
      var filterBox = document.querySelector(".filter-box");
      if(this.counter%2 == 0){
        filterBox.style.display = "flex";
      }else{
        filterBox.style.display = "none";
      }
      this.counter ++ ;
      console.log(this.counter);
    },
    showDoctor(doctorKey){
      var selectedDate    = document.getElementById("date").value;
      var currentDate     = new Date().toISOString().slice(0,10);
      var date = selectedDate ?? currentDate;
      this.seeDoc = true;
      let self = this ;
      axios.get(this.$apiAdress + '/api/dayTimes/' + date +'/'+ doctorKey + '?token=' + localStorage.getItem("api_token"),{})
      .then(res => { self.doctorTimes = res.data.data})
      .catch(err => console.log(err));

    },

    booked(){ this.bookedModal = true; },
    doModal(keyTimeBook){
      var selectedDate    = document.getElementById("date").value;
      var currentDate     = new Date().toISOString().slice(0,10);
      console.log(currentDate);
      let self = this;
      axios.post(  this.$apiAdress + '/api/appointments?token=' + localStorage.getItem("api_token"),
        {
          patientName: self.book.patientName,
          patientPhone: self.book.patientPhone, 
          dateSession: selectedDate ?? currentDate,
          time_key: keyTimeBook,
        }).then(res =>
         { 
            this.loading = false,
            this.makeFilter();
            self.message = 'Booked has done';
            self.showAlert();
          }
        )
        .catch(err => {
          console.log(err)
          self.msgError = 'Not booked',
          self.showAlertError()
        });
    },
    doctimechng(event) {
      this.docTimeChng = event.target.value;
    },
    doModalSelect(){
      var timeDocSelect   = this.docTimeChng;
      var selectedDate    = document.getElementById("date").value;
      var currentDate     = new Date().toISOString().slice(0,10);
      let self = this;
      
      axios.post(  this.$apiAdress + '/api/appointments?token=' + localStorage.getItem("api_token"),
        {
          patientName: self.book.patientName,
          patientPhone: self.book.patientPhone, 
          dateSession: selectedDate ?? currentDate,
          time_key: timeDocSelect,
        }).then(res =>
         { 
            this.loading = false, 
            this.makeFilter();
            self.message = 'Booked has done';
            self.showAlert();
          }
        )
        .catch(err => {
          console.log(err),
          self.msgError = 'Not booked',
          self.showAlertError()}
          );
    },
    selectCity(selectedGover){
      // var selectedGover = document.getElementById("governorates") ;
      console.log(selectedGover);
      if(selectedGover){
        document.getElementById("cities").removeAttribute("disabled");
        let self = this ;
        axios
          .get(this.$apiAdress + `/api/citiesFromGov/${selectedGover}?token=` + localStorage.getItem("api_token"))
          .then(res => self.cities = res.data.data);
      }
    },
    searchDoc(){
      if (this.keyword.length > 3)
        axios.get(this.$apiAdress + 'api/search'+this.keyword)
          .then(res => (this.results = res.data))
          .catch(err => console.log(err));
      
    },
    makeFilter(){
      var selectedGover       = document.getElementById("governorates").value;
      var selectedCity        = document.getElementById("cities").value;
      var selectedspecailist  = document.getElementById("specailists").value;
      var selectedDate        = document.getElementById("date").value;
    
      let self = this ;
      self.todayAppointments = null
      axios
        .post(this.$apiAdress + '/api/filterTimes?token=' + localStorage.getItem("api_token"),{
          date: selectedDate,
            // user_id: 24,
          department: selectedspecailist,
          governorate: selectedGover,
          city: selectedCity
        }).then(res =>
         { 
            this.loading = false,
            self.todayAppointments = res.data.data
          }
        )
        .catch(err => console.log(err));
    },

    showAlert () { this.dismissCountDown = this.dismissSecs },
    showAlertError () { this.dismissError = this.dismissSecs },
    //== end ==//

    goBack() {
      this.$router.go(-1)
      // this.$router.replace({path: '/users'})
    },
  },
  mounted: function(){
    //== catching data first ==//
    //== start ==//
    this.catchTodayData();
    ///== end ==//
  }
}

</script>

<style lang="scss" scoped>

  //== filter style ==//
  //== start ==//
  .filter-con{
    display: flex;
    justify-content: space-between;
    input{
      border: none;
      outline: none;
      border-radius: 0 5px 0 5px;
      width: 350px;
      padding-left: 15px;
      font-size: 15px;
      padding: 12px;
      
    }
    button{
      background-color: #3C4B64;
      color: White;
      padding: 10px;
      border: none;
      outline: none;
      width: 120px;
      border-radius: 0 5px 0 5px;
      cursor: pointer;
      &:hover{
            transition: all 0.3s;
            opacity: 0.8;
      }
    }
  }
  //== end ==//

  //== filter box style ==//
  //== start ==//
  .filter-box{
    display: flex;
    flex-wrap: wrap;
    margin-top: 20px;
    transition: 0.3s ease all;
    .filter-group{
      margin-right: 70px;
      transition: 0.3s ease all;
      select{
        width: 180px;
        border: none;
        outline: none;
        padding: 5px;
        border-radius: 10px;
         transition: 0.3s ease all;
         animation: movedown 0.3s ease 0.1s forwards;
         transform: scale(1);
      }
    }
    
  }
.disabled {
  pointer-events:none;
  opacity:0.5;
}
  .notAvailab{
    float: left;
    color:red;
  }
  .Availab{
    float: left;
    color:blue;
  }
  //== end ==//

  //== apointments card style ==//
  //== start ==//
  .appointments-con{
    margin-top: 25px;
    .appointment-card{
      background-color: white;
      border-radius: 12px;
      padding: 21px;
      box-shadow: 7px 14px 16px -15px grey;
      margin-bottom: 20px;
      .top-side{
        display: flex;
        justify-content: space-between;
        .left-side{
          display: flex;
          justify-content: flex-start;
          align-items: center;
          .img-con{
            width: 100px;
            margin-right: 20px;
            img{
              width: 100%;
            }
          }
          .img-info{
            h4{
              margin: 0;
              font-size: 20px;
            }
            h5{
              margin: 0;
              margin-bottom: 10px;
              color: #ccc;
              font-weight: 500;
              text-transform: capitalize;
            }
            span{
              margin: 0;
              color: rgb(71, 94, 114);
              font-size: 12px;
              text-transform: capitalize;
            }
          }
        }
        .right-side{
          span{
            font-size: 17px;
            font-weight: 500;
            color: #3C4B64;
          }
        }
      }
      .bottom-side{
        display: flex;
        justify-content: space-between;
        align-items: center;
        span{
          color: #ccc;
          cursor: pointer;
          font-weight: 500;
          margin-top: 10px;
          &:hover{
            transition: all 0.3s;
            color: #2052a8;
          }
          
        }
        button{
          background-color: #3C4B64;
          color: White;
          padding: 10px;
          border: none;
          outline: none;
          width: 120px;
          border-radius: 0 5px 0 5px;
          cursor: pointer;
          text-transform: uppercase;
          &:hover{
            transition: all 0.3s;
            opacity: 0.8;
          }
        }
      }
    }
  }
  //== end ==//
.filter-box button{
    background-color: #3C4B64;
    color: White;
    padding: 10px;
    border: none;
    outline: none;
    width: 120px;
    border-radius: 0 5px 0 5px;
    cursor: pointer;
    margin-left: 6rem;
}

.right-side button{
    background-color: #24acf0;
    color: White;
    padding: 10px;
    border: none;
    outline: none;
    width: 120px;
    border-radius: 0 5px 0 5px;
    cursor: pointer;
    margin-left: 6rem;
}



// .specailists{
//   margin-top: 0vh;
//   min-width: 18em;
//   min-height: 3em;
//   max-height: 3em;
//   overflow: hidden;
//   cursor: pointer;
//   text-align: left;
//   white-space: nowrap;
//   color: #444;
//   outline: none;
//   border: 0.06em solid transparent;
//   border-radius: 1em;
//   transition: 0.3s all ease-in-out;
// }
// // .specailists select:focus + label {
// //   background: #def;
// // }

// .specailists select {
//   width: 1px;
//   height: 1px;
//   display: inline-block;
//   position: absolute;
//   opacity: 0.01;
// }
// .specailists label {
//   border-top: 0.06em solid #d9d9d9;
//   display: block;
//   height: 2em;
//   line-height: 2em;
//   padding-left: 1em;
//   padding-right: 3em;
//   cursor: pointer;
//   position: relative;
//   transition: 0.3s color ease-in-out;
// }
// // .specailists label:nth-child(2) {
// //   margin-top: 2em;
// //   border-top: 0.06em solid #d9d9d9;
// // }
// // .specailists select:checked + label {
// //   display: block;
// //   border-top: none;
// //   position: absolute;
// //   top: 0;
// //   width: 100%;
// // }
// // .specailists select:checked + label:nth-child(2) {
// //   margin-top: 0;
// //   position: relative;
// // }
// .specailists select::after {
//   content: "";
//   position: absolute;
//   right: 0.8em;
//   top: 0.9em;
//   border: 0.3em solid #3694d7;
//   border-color: #3694d7 transparent transparent transparent;
//   transition: 0.4s all ease-in-out;
// }
// // .specailists .expanded {
// //   border: 0.06em solid #3694d7;
// //   background: #fff;
// //   border-radius: 0.25em;
// //   padding: 0;
// //   box-shadow: rgba(0, 0, 0, 0.1) 3px 3px 5px 0px;
// //   max-height: 15em;
// // }
// // .specailists .expanded label {
// //   border-top: 0.06em solid #d9d9d9;
// // }
// // .specailists.expanded label:hover {
// //   color: #3694d7;
// // }
// // .specailists.expanded select:checked + label {
// //   color: #3694d7;
// // }
// .specailists .expanded::after {
//   transform: rotate(-180deg);
//   top: 0.55em;
// }
.filter-box .filter-group{
  margin-right: 50px;
}

</style>

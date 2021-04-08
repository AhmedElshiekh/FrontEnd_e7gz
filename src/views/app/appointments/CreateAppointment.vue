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

    <!-- filter -->
    <!-- start -->
    <div class="filter-con">
      <input type="text" placeholder="Enter doctor name ...">
      <button>Filter</button>
    </div>
    <!-- start -->

    <!-- appiontments cards -->
    <!-- start -->
    <div class="appointments-con">
      <div class="appointment-card" v-for="num in nums" :key="num">
        <div class="top-side">
          <div class="left-side">
            <div class="img-con">
              <img src="img/avatars/6.jpg" alt="avatar">
            </div>
            <div class="img-info">
              <h4>Ahmed Zaki</h4>
              <h5><small>nose and ear specialist</small></h5>
              <span>Egypt . Cairo . Nasr City</span><br>
              <small>11/12/2020</small>
            </div>
          </div>
          <div class="right-side">
            <span>11:30:00</span>
          </div>
        </div>
        <div class="bottom-side">
          <span>See Doctor</span>
          <button>Book</button>
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

</style>

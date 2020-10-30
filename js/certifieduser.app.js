var app = new Vue({
  el: '#ocfrPage',
  data: {
    certList: [],
    cmList: [],
    memberList: [],
    newCertificationForm: {},
    newMemberForm: {},
    newUserForm: {},
    selectedMember: null,
    selectedMemberId: 0,
    selectedCertification: null,
    selectedCertificationId: 0,
    selectedCertificationS: null,
    certifyID: 0,
    certificationsformember: []
  },

  methods: {
    newCertificationData() {
      return {
        certifyID: "",
        certifyName: "",
        certifyAgency: "",
        expirePeriod: "",
      }
    },
    newUserData() {
      return {
        personID: "",
        certifyID: "",
        certifiedYear: "",
        renewedDate: "",
      }
    },
    newMemberData() {
      return {
        personID: "",
        firstName: "",
        lastName: "",
        position: "",
        gender: "",
        email: "",
        address: "",
        dateofBirth: "",
        phoneNumber: "",
        isActive: "",
        radioNumber: "",
       stationNumber: "",
     }
 },


      handleNewUserForm( evt ) {
          console.log("New Certified Member form submitted!");
          fetch('api/certifiedmembers/create.php', {
                method:'POST',
                body: JSON.stringify(this.newUserForm),
                headers: {
                  "Content-Type": "application/json; charset=utf-8",
                  "Accept": "application/json"
              }
            })
            .then( response => response.json() )
            .then( json => {
              console.log("Returned from post:", json);
              // TODO: test a result was returned!
              this.cmList = json;
              this.newUserForm = this.newUserData();
            });
          },

       handleDeleteCertifiedUser(index) {
            console.log("Certified User deleted!");

            fetch('api/certifiedmembers/delete.php', {
                  method:'POST',
                  body: JSON.stringify(index),
                  headers: {
                    "Content-Type": "application/json; charset=utf-8"
                  }
                })
             },

      },



  created() {
    fetch("api/certifications/get.php", {
      headers : {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    .then( response => response.json() )
    .then( json => {
      this.certList = json;

      console.log(json)}
    );


    fetch("api/certifiedmembers/get.php")
    .then( response => response.json() )
    .then( json => {
      this.cmList = json;

      console.log(json)}
    );

    fetch("api/members/get.php", {
      headers : {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    .then( response => response.json() )
    .then( json => {
      this.memberList = json;

      console.log(json)}
    );



  this.newCertificationForm = this.newCertificationData();
  this.newMemberForm = this.newMemberData();
  this.newUserForm = this.newUserData();
  }
})

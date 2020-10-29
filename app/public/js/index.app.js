var app = new Vue({
  el: '#ocfrPage',
  data: {
    certList: [],
    userList: [],
    memberList: [],
    newCertificationForm: {},
    newMemberForm: {},
    newUserForm: {},
    selectedMember: null,
    selectedMemberId: 0,
    selectedCertification: null,
    selectedCertificationId: 0
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

     handleNewCertificationForm( evt ) {
      console.log("Certification form submitted!");

      fetch('api/certifications/create.php', {
            method:'POST',
            body: JSON.stringify(this.newCertificationForm),
            headers: {
              "Content-Type": "application/json; charset=utf-8",
              "Accept": "application/json"
            }
          })
          .then( response => response.json() )
          .then( json => {
              console.log("Returned from post:", json);
              this.certList = json;
              this.newCertificationForm = this.newCertificationData();
            });
            },

     handleNewMemberForm( evt ) {
        console.log("Member form submitted!");
        fetch('api/members/create.php', {
              method:'POST',
              body: JSON.stringify(this.newMemberForm),
              headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Accept": "application/json"
            }
          })
          .then( response => response.json() )
          .then( json => {
            console.log("Returned from post:", json);
            // TODO: test a result was returned!
            this.memberList = json;
            this.newMemberForm = this.newMemberData();
          });
        },

     // fetchcertifiedUser() {
     //      fetch("api/certifiedmembers/get.php")
     //      .then( response => response.json() )
     //      .then( json => {
     //        this.userList = json;
     //        console.log(this.userList);
     //      });
     //
     //  },

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
              this.userList = json;
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

        selectMember ( evt ) {
          console.log("Selecting a member", this.selectedMemberId);
          this.selectedMember = this.memberList.find( item => item.personID == this.selectedMemberId);
          console.log("found", this.selectedMember);
          //add fetch to an sql statement for certification table
        },

        selectCertification ( evt ) {
          console.log("Selecting a certification", this.selectedCertificationId);
          this.selectedCertification = this.certList.find( item => item.certifyID == this.selectedCertificationId);
          console.log("found", this.selectedCertification);
          //add fetch to an sql statement for certification table
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
      this.userList = json;

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

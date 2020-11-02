var app = new Vue({
  el: '#ocfrPage',
  data: {
    certList: [],
    cmList: [],
    memberList: [],
    newCertificationForm: {},
    newMemberForm: {},
    newUserForm: {},
    activeUser: {},
    updateUserForm: {},
    selectedMember: null,
    selectedMemberId: 0,
    selectedCertification: null,
    selectedCertificationId: 0,
    selectedCertificationS: null,
    certifyID: 0,
    certificationsformember: [],
    expireDate: '',
    cmList2:''
  },

  methods: {
    newCertificationData() {
      return {
        certifyID: "",
        certifyName: "",
        certifyAgency: "",
        expirePeriod: ""
      }
    },
    newUserData() {
      return {
        certifiedUserID: "",
        personID: "",
        certifyID: "",
        certifiedDate: "",
        renewedDate: ""
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
        primaryNumber: "",
        secondaryNumber: "",
        isActive: "",
        radioNumber: "",
        stationNumber: ""
      }
    },
    updateUserData() {
      return {
        certifiedUserID: "",
        personID: "",
        certifyID: "",
        certifiedDate: "",
        renewedDate: ""
      }
    },

    fetchcertifiedUser() {
      fetch("api/certifiedmembers/get.php")
      .then( response => response.json() )
      .then( json => {
        this.cmList = json;
        console.log(this.cmList);
      });

   },

    handleNewCertificationForm(evt) {
      console.log("Certification form submitted!");

      fetch('api/certifications/create.php', {
          method: 'POST',
          body: JSON.stringify(this.newCertificationForm),
          headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Accept": "application/json"
          }
        })
        .then(response => response.json())
        .then(json => {
          console.log("Returned from post:", json);
          this.certList = json;
          this.newCertificationForm = this.newCertificationData();
        });
    },

    handleNewMemberForm(evt) {
      console.log("Member form submitted!");
      fetch('api/members/create.php', {
          method: 'POST',
          body: JSON.stringify(this.newMemberForm),
          headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Accept": "application/json"
          }
        })
        .then(response => response.json())
        .then(json => {
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

    handleNewUserForm(evt) {
      console.log("New Certified Member form submitted!");
      fetch('api/certifiedmembers/create.php', {
          method: 'POST',
          body: JSON.stringify(this.newUserForm),
          headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Accept": "application/json"
          }
        })
        .then(response => response.json())
        .then(json => {
          console.log("Returned from post:", json);
          // TODO: test a result was returned!
          this.cmList = json;
          this.newUserForm = this.newUserData();
        });
    },

    handleDeleteCertifiedUser(index) {
      console.log("Certified User deleted!");

      fetch('api/certifiedmembers/delete.php', {
        method: 'POST',
        body: JSON.stringify(index),
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        }
      })
      .then(this.fetchcertifiedUser());
    },

    handleUpdateUserForm(evt) {
      console.log("Updating..." + this.activeUser.certifiedUserID);
      fetch('api/certifiedmembers/update.php', {
          method: 'POST',
          body: JSON.stringify(this.activeUser),
          headers: {
            "Content-Type": "application/json; charset=utf-8"
          }
        })
        .then(response => response.json())
        .then(json => {
          console.log("Returned from post:", json);
          this.cmList = json;
          this.activeUser = this.updateUserData();
        });
      console.log("Creating (POSTing...!");
      console.log(this.activeUser);
    },

    selectMember(evt) {
      console.log("Selecting a member. Member ID =", this.selectedMemberId);
      this.selectedMember = this.memberList.find(item => item.personID == this.selectedMemberId);
      console.log("found", this.selectedMember);
      console.log("Selecting certifications");
      this.selectedCertificationS = this.cmList.find(item => item.personID == this.selectedMemberId);
      console.log("found", this.selectedCertificationS);

      try {
        this.certificationsformember = this.certList.find(item => item.certifyID == this.selectedCertificationS.certifyID);
        console.log("found certifications for member", this.certificationsformember);
      } catch (error) {
        console.log('try catch');
        console.log(error);
        this.certificationsformember.certifyID = '';
      }
    },

    selectCertification(evt) {
      console.log("Selecting a certification", this.selectedCertificationId);
      this.selectedCertification = this.cmList.find(item => item.certifyID == this.selectedCertificationId);
      console.log("found", this.selectedCertification);

      try {
        this.membersforcertification = this.memberList.find(item => item.personID == this.selectedCertification.personID);
        console.log("found members for certification", this.membersforcertification);
      } catch (error) {
        console.log('try catch');
        console.log(error);
        this.membersforcertification.personID = '';
      }
    },


    // inc() {
    //   for (var i =0; i<this.cmList.length;i++) {
    //   // this.expireDate.setDate(this.cm.certifiedDate.getDate() + this.cm.expirePeriod)
    //   // this.expireDate = new Date(this.expireDate)     //  create a new date and assign to this.date
    //   console.log("cm list date="+this.cmList[i].certifiedDate);
    //   this.expireDate = this.expirePeriod + this.certifiedDate;
    //   console.log(this.expireDate);
    //   }
    // },



  },



  created() {
    fetch("api/certifications/get.php", {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })
      .then(response => response.json())
      .then(json => {
        this.certList = json;

        console.log(json)
      });


      fetch("api/certifiedmembers/get.php")
       .then(response => response.json())
       .then(json => {
         this.cmList = json;

         console.log(json)
       });

       fetch("api/certifiedmembers/get2.php", {
           headers: {
             'Content-Type': 'application/json',
             'Accept': 'application/json'
           }
         })
        .then(response => response.json())
        .then(json => {
          this.cmList2 = json;

          console.log(json)
        });

    fetch("api/members/get.php", {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })
      .then(response => response.json())
      .then(json => {
        this.memberList = json;

        console.log(json)
      });



    this.newCertificationForm = this.newCertificationData();
    this.newMemberForm = this.newMemberData();
    this.newUserForm = this.newUserData();
    this.updateUserForm = this.updateUserData();
  }
})

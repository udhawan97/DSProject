var app = new Vue({
  el: '#ocfrPage',
  data: {
    certList: [],
    cmList: [],
    memberList: [],
    newCertificationForm: {},
    newMemberForm: {},
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


        selectMember ( evt ) {
          console.log("Selecting a member. Member ID =", this.selectedMemberId);
          this.selectedMember = this.memberList.find( item => item.personID == this.selectedMemberId);
          console.log("found", this.selectedMember);
          console.log("Selecting certifications");
          this.selectedCertificationS = this.cmList.find( item => item.personID == this.selectedMemberId);
          console.log("found", this.selectedCertificationS);

            try { this.certificationsformember = this.certList.find( item => item.certifyID == this.selectedCertificationS.certifyID);
            console.log("found certifications for member", this.certificationsformember);}
            catch (error) { console.log('try catch');
				                    console.log(error);
                            this.certificationsformember.certifyID = '';
			}
          //add fetch to an sql statement for certification table
        },

        selectCertification ( evt ) {
          console.log("Selecting a certification", this.selectedCertificationId);
          this.selectedCertification = this.certList.find( item => item.certifyID == this.selectedCertificationId);
          console.log("found", this.selectedCertification);
          //add fetch to an sql statement for certification table
        },

        selectCertificationS ( evt ) {

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
  }
})

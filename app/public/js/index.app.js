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
    certificationsformember: [],
    cmList2:'',
    memberdeets:''


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
        primaryNumber: "",
        secondaryNumber: "",
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
          this.selectedCertificationS = this.cmList.filter( item => item.personID == this.selectedMemberId);
          console.log("found", this.selectedCertificationS);

        },


        selectCertification(evt) {
              console.log("Selecting a certification", this.selectedCertificationId);
              this.selectedCertification = this.cmList.filter(item => item.certifyID == this.selectedCertificationId);
              console.log("found", this.selectedCertification);
              this.memberdeets = this.cmList.find(item => item.certifyID == this.selectedCertificationId);
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

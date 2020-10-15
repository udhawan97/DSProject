var app = new Vue({
  el: '#ocfrPage',
  data: {
    certList: [],
    cmList: [],
    memberList: [],
    newCertificationForm: {},
    newMemberForm: {}
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
        }
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

  fetch("api/certification/create.php")
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

    fetch("api/members/create.php")
      .then( response => response.json() )
      .then( json => {
         this.memberList = json;

         console.log(json)}
       );


  this.newCommentForm = this.newCommentData();
  this.newMemberForm = this.newCommentData();
  }
})

var app = new Vue({
  el: '#ocfrPage',
  data: {
    certList: [],
    cmList: [],
    memberList: {},
    newCertificationForm: {},
    newMemberForm: {}
  },
  computed: {
    activePtName() {
      return this.activePt ? this.activePt.lastName + ', ' + this.activePt.firstName : ''
    }
  },
  methods: {
    newPtData() {
      return {
        firstName: "",
        lastName: "",
        dob: "",
        sexAtBirth: ""
      }
    },
    newTriageData() {
      return {
        priority: "",
        visitDate: "",
        visitDescription: ""
      }
    },
    newCertificationData() {
      return {
        certifyID: "",
        certifyName: "",
        certifyAgency: "",
        expirePeriod: "",
      }
    // newMemberData() {
    //   return {
    //     personID: "",
    //     firstName: "",
    //     lastName: "",
    //     position: "",
    //     gender: "",
    //     email: "",
    //     address: "",
    //     dateofBirth: "",
    //     phoneNumber: "",
    //     isActive: "",
    //     radioNumber: "",
    //     stationNumber: "",
    //     }
    // },

    // dateSince(d) {
    //   // Uses Luxon date API (see comment in index.html file)
    //   return moment.utc(d).local().calendar();
    // },
    // age(d) {
    //   return moment().diff(moment(d), 'years');
    // },
    /**
     * Given a priority, returns triage class
     * or "" if not found
     **/
    // priorityClass(p) {
    //   const priorityClass = {
    //     low: "triageMinor",
    //     medium: "triageUrgent",
    //     high: "triageCritical"
    //   };
    //
    //   return p in priorityClass ? priorityClass[p] : "";
    // },

    handleNewPtForm( evt ) {
      // evt.preventDefault();  // Redundant w/ Vue's submit.prevent

      // TODO: Validate the data!
    }
      fetch('api/records/post.php', {
        method:'POST',
        body: JSON.stringify(this.newPtForm),
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        }
      })
      .then( response => response.json() )
      .then( json => {
        console.log("Returned from post:", json);
        // TODO: test a result was returned!
        this.certList.push(json[0]);
        this.newPtForm = this.newPtData();
      });

      console.log("Creating (POSTing)...!");
      console.log(this.newPtForm);
    },
    // handleTriageForm( evt ) {
    //   console.log("Triage form submitted!");
    //
    //   if (!this.activePt) {
    //     alert("ERROR: No patient selected!");
    //     return false;
    //   }
    //   this.triageForm.patientGuid = this.activePt.patientGuid;
    //
    //   var tempTime = this.triageForm.visitDate == "" ? moment() : moment(this.triageForm.visitDate);
    //   this.triageForm.visitDateUtc = tempTime.utc().format('YYYY-MM-DD HH:mm:ss');
    //   console.log(this.triageForm);
    //
    //   fetch('api/visits/create.php', {
    //     method:'POST',
    //     body: JSON.stringify(this.triageForm),
    //     headers: {
    //       "Content-Type": "application/json; charset=utf-8"
    //     }
    //   })
    //   .then( response => response.json() )
    //   .then( json => {
    //     console.log("Returned from triage create:", json);
    //     this.cmList = json;
    //     this.newTriageForm = this.newTriageData();
    //   });
    // },
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
      // TODO: test a result was returned!
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
    this.memList = json;
    this.newMemberForm = this.newMemberData();
  });
}

},
  created() {
    fetch("api/certifications/get.php")
    .then( response => response.json() )
    .then( json => {
      this.certList = json;

      console.log(json)}
    );

    fetch("api/members/get.php")
    .then( response => response.json() )
    .then( json => {
      this.memberList = json;

      console.log(json)}
    );

    fetch("api/certifiedmembers/get.php")
    .then( response => response.json() )
    .then( json => {
      this.cmList = json;

      console.log(json)}
    );


    fetch("api/certifications/create.php")
    .then( response => response.json() )
    .then( json => {
      this.certList = json;

      console.log(json)}
    );
  //   fetch("api/members/create.php")
  //   .then( response => response.json() )
  //   .then( json => {
  //     this.memberList = json;
  //
  //     console.log(json)}
  //   );
  //
  //   this.newMemberForm = this.newMemberData();
  //   this.newCertificationForm = this.newCertificationData();
  //   this.newPtForm = this.newPtData();
  //   this.newTriageForm = this.newTriageData();
  // }

})

var app = new Vue({
  el: '#ocfrPage',
  data: {
    certList: [],
    cmList: [],
    memberList: [],
    triageForm: {},
    newPtForm: {}
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
    dateSince(d) {
      // Uses Luxon date API (see comment in index.html file)
      return moment.utc(d).local().calendar();
    },
    age(d) {
      return moment().diff(moment(d), 'years');
    },
    /**
     * Given a priority, returns triage class
     * or "" if not found
     **/
    priorityClass(p) {
      const priorityClass = {
        low: "triageMinor",
        medium: "triageUrgent",
        high: "triageCritical"
      };

      return p in priorityClass ? priorityClass[p] : "";
    },
    handleNewPtForm( evt ) {
      // evt.preventDefault();  // Redundant w/ Vue's submit.prevent

      // TODO: Validate the data!

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
    handleTriageForm( evt ) {
      console.log("Triage form submitted!");

      if (!this.activePt) {
        alert("ERROR: No patient selected!");
        return false;
      }
      this.triageForm.patientGuid = this.activePt.patientGuid;

      var tempTime = this.triageForm.visitDate == "" ? moment() : moment(this.triageForm.visitDate);
      this.triageForm.visitDateUtc = tempTime.utc().format('YYYY-MM-DD HH:mm:ss');
      console.log(this.triageForm);

      fetch('api/visits/create.php', {
        method:'POST',
        body: JSON.stringify(this.triageForm),
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        }
      })
      .then( response => response.json() )
      .then( json => {
        console.log("Returned from triage create:", json);
        this.cmList = json;
        this.newTriageForm = this.newTriageData();
      });
    }
  },
  created() {
    fetch("api/certifications/")
    .then( response => response.json() )
    .then( json => {
      this.certList = json;

      console.log(json)}
    );

    fetch("api/certifiedmembers/")
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

    this.newPtForm = this.newPtData();
    this.newTriageForm = this.newTriageData();
  }
})

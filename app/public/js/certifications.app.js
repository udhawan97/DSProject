var app = new Vue({
  el: '#ocfrPage',
  data: {
    certList: [],
    newCertificationForm: {},
    deleteCertification: ''
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

    fetchcertification() {
      fetch("api/certifications/get.php")
      .then( response => response.json() )
      .then( json => {
        this.certList = json;
        console.log(this.certList);
      });

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
              this.certList.push(json[0]);
              this.newCertificationForm = this.newCertificationData();
            });
              console.log("Creating (POSTing...!");
              console.log(this.newCertificationForm);
            },

      // handleDeleteCertification(_index) {
      //     this.certList.splice(_index);
      //   }
      // },

      handleDeleteCertification(index) {
        console.log("Certification deleted!");

        fetch('api/certifications/delete.php', {
              method:'POST',
              body: JSON.stringify(index),
              headers: {
                "Content-Type": "application/json; charset=utf-8"
              }
            })
           .then(this.fetchcertification());
         },

      // deleteCertification( evt ) {
      //   console.log("Certification deleted!");
      //
      //   fetch('api/certifications/delete.php', {
      //         method:'POST',
      //         body: JSON.stringify(this.deleteCertification),
      //         headers: {
      //           "Content-Type": "application/json; charset=utf-8",
      //           "Accept": "application/json"
      //         }
      //       })
      //       .then( response => response.json() )
      //       .then( json => {
      //           console.log("Returned from post:", json);
      //           this.certList = json;
      //         });
   },




  created() {
    // fetch("api/certifications/get.php", {
    //   headers : {
    //     'Content-Type': 'application/json',
    //     'Accept': 'application/json'
    //   }
    // })
    // .then( response => response.json() )
    // .then( json => {
    //   this.certList = json;
    //
    //   console.log(json)}
    // );
    this.fetchcertification();




  this.newCertificationForm = this.newCertificationData();
  }
})

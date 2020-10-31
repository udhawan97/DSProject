var app = new Vue({
  el: '#ocfrPage',
  data: {
    memberList: [],
    newMemberForm: {},
    activeMember: {},
    updateMemberForm: {},
    deleteMember: ''
  },

  methods: {
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
       stationNumber: ""
     }
 },

 updateMemberData() {
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
    stationNumber: ""
   }
 },

 fetchmember() {
   fetch("api/members/get.php")
   .then( response => response.json() )
   .then( json => {
     this.memberList = json;
     console.log(this.memberList);
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
            this.memberList.push(json[0]);
            this.newMemberForm = this.newMemberData();
            this.fetchmember();
          })

            console.log("Creating (POSTing...!");
            console.log(this.newMemberForm);
        },

        handleUpdateMemberForm( evt ) {
           console.log("Updating..." + this.activeMember.personID);
           fetch('api/members/update.php', {
                 method:'POST',
                 body: JSON.stringify(this.activeMember),
                 headers: {
                   "Content-Type": "application/json; charset=utf-8"
                 }
               })
               .then( response => response.json() )
               .then( json => {
                   console.log("Returned from post:", json);
                   this.memberList = json;
                   this.activeMember = this.updateMemberData();
                   this.fetchmember();
                 });
                   console.log("Creating (POSTing...!");
                   console.log(this.activeMember);
          },

      handleDeleteMember(index) {
        console.log("Member deleted!");

        fetch('api/members/delete.php', {
              method:'POST',
              body: JSON.stringify(index),
              headers: {
                "Content-Type": "application/json; charset=utf-8"
              }
            })
           .then(this.fetchmember());
         },
    },

  created() {
    // fetch("api/members/get.php", {
    //   headers : {
    //     'Content-Type': 'application/json',
    //     'Accept': 'application/json'
    //   }
    // })
    // .then( response => response.json() )
    // .then( json => {
    //   this.memberList = json;
    //
    //   console.log(json)}
    // );

    this.fetchmember();



  this.newMemberForm = this.newMemberData();
  this.activeMember = this.updateMemberData();
  }
})

AirBNB

// Slack Api key

let key = "xoxp-283145054819-283362751653-282621723136-4d89b6b7a3afd4fc960208c423988f6e" 
let bot_api = "xoxb-283216961808-lniGVELHenLERCHhfBt8Ku33"

onst slack_token =
  "xoxp-283145054819-283362751653-282621723136-4d89b6b7a3afd4fc960208c423988f6e";

// console.log(slack);

const chats = [
  {
    id: 200,
    title: "RTA - Dec 16th, 2017",
    subtitle: "last updated 3 minutes ago",
    active: true,
    members: [
      {
        user: {
          uid: 222,
          displayName: "Todd",
          memberType: "Real Time Analyst"
        }
      }
    ]
  },
  {
    id: 204,
    title: "RTA - Dec 16th, 2017",
    subtitle: "last updated 3 minutes ago",
    active: true,
    members: [
      {
        user: {
          uid: 222,
          displayName: "Todd",
          memberType: "Real Time Analyst"
        }
      }
    ]
  },
  {
    id: 155,
    title: "Late - Dec 16th, 2017",
    subtitle: "last updated 3 minutes ago",
    active: false,
    members: [
      {
        user: {
          uid: 555,
          displayName: "Bertha Ye",
          memberType: "Real Time Analyst"
        }
      },
      {
        user: {
          uid: 333,
          displayName: "Kenny",
          memberType: "Performance Coach",
          perm: "employee_app/employees/berthaye"
        }
      }
    ]
  }
];

window.members = [
  {
    kenny123: {
      _perm: "/htk_profiles/kenny123",
      memberType: "Performance Coach",
      birthday: "November 11, 1992",
      level: 1,
      location: "San Francisco, CA, USA",
      twitter: "@fake-bertha",

      user: {
        phoneNumber: "1-570-788-4003",

        email: "kenny.walnut@pccwteleservices.com",
        photoURL:
          "https://firebasestorage.googleapis.com/v0/b/oompa-loompa-aeb91.appspot.com/o/berthaye.png?alt=media&token=e65a55b1-f27d-403b-ad70-8ae89a081303",

        displayName: "Kenny W."
      }
    },
    todd789: {
      _perm: "/htk_profiles/todd789",
      memberType: "Real Time Analyst",
      birthday: "April 3, 1982",
      level: 5,
      location: "San Francisco, CA, USA",
      reports: {
        cody456: true,
        tanyabearden: true
      },
      twitter: "@fake-Todd",

      user: {
        email: "todd.toomuchsauce@pccwteleservices.com",

        photoURL:
          "https://firebasestorage.googleapis.com/v0/b/oompa-loompa-aeb91.appspot.com/o/georgebrown.png?alt=media&token=d958b887-ff50-4166-a8c0-a032304abf6f",

        displayName: "Todd T",
        phoneNumber: "1-707-658-7561"
      }
    },
    kellyelrod: {
      _perm: "/htk_profiles/kellyelrod",

      birthday: "July 8, 1989",

      level: 2,
      location: "Portland, CA, USA",

      memberType: "Marketing Manager",
      twitter: "@fake-kelly",

      user: {
        email: "kellyelrod@pccwteleservices.com",

        photoURL:
          "https://firebasestorage.googleapis.com/v0/b/oompa-loompa-aeb91.appspot.com/o/kellyelrod.png?alt=media&token=bd2501c9-2491-4c00-9d40-53923485c836",
        displayName: "Kelly Elrod",
        phoneNumber: "1-847-384-3036"
      }
    },
    lydiabennet: {
      reports: {
        kellyelrod: true
      },
      twitter: "@fake-lydia",
      _perm: "/htk_profiles/lydiabennet",
      memberType: "VP of Marketing",
      birthday: "November 20, 1979",

      level: 4,
      location: "San Francisco, CA, USA",

      user: {
        email: "lydiabennet@pccwteleservices.com",

        photoURL:
          "https://firebasestorage.googleapis.com/v0/b/oompa-loompa-aeb91.appspot.com/o/lydiabennet.png?alt=media&token=e022d0c2-df05-49d5-945c-d1f29e2e2b71",
        displayName: "Lydia Bennet",
        phoneNumber: "1-309-423-4299"
      }
    },
    cody456: {
      _perm: "/htk_profiles/cody456",
      memberType: "Real Time Analyst",

      birthday: "May 18, 1980",

      level: 4,
      location: "Boston, MA, USA",

      reports: {
        staceyhansen: true
      },
      twitter: "@fake-marcelo",

      user: {
        email: "cody.washerdryer@pccwteleservices.com",

        photoURL:
          "https://firebasestorage.googleapis.com/v0/b/oompa-loompa-aeb91.appspot.com/o/marcelovaldez.png?alt=media&token=e8ddfda2-5395-40dc-baf1-197dbae9318d",
        displayName: "Cody W.",
        phoneNumber: "1-978-401-9913"
      }
    },
    staceyhansen: {
      _perm: "/htk_profiles/staceyhansen",
      memberType: "Sales Representative",
      level: 1,
      location: "San Francisco, CA, USA",

      twitter: "@fake-leslie",
      birthday: "April 29, 1990",

      user: {
        email: "staceyhansen@pccwteleservices.com",
        displayName: "Stacey Hansen",
        phoneNumber: "1-936-524-2834",
        photoURL:
          "https://firebasestorage.googleapis.com/v0/b/oompa-loompa-aeb91.appspot.com/o/staceyhansen.png?alt=media&token=9100f50f-2740-4dd2-bf1d-58e066e0722b"
      }
    },
    tanyabearden: {
      _perm: "/htk_profiles/tanyabearden",
      memberType: "VP of Engineering",
      level: 4,
      birthday: "December 20, 1982",
      reports: {
        berthaye: true,
        tiffanycaldwell: true
      },
      twitter: "@fake-tanya",
      location: "Portland, OR, USA",

      user: {
        email: "tanyabearden@pccwteleservices.com",
        photoURL:
          "https://firebasestorage.googleapis.com/v0/b/oompa-loompa-aeb91.appspot.com/o/tanyabearden.png?alt=media&token=bb575a43-8cef-43b0-b680-9bc400f9b181",

        displayName: "Tanya Bearden",
        phoneNumber: "1-518-822-6241"
      }
    },
    sirwhite324668: {
      _perm: "/htk_profiles/sirwhite324668",
      memberType: "Sr Software Engineer",
      level: 2,
      birthday: "April 10, 1991",
      location: "Boston, CA, USA",
      twitter: "@fake-tiffany",
      user: {
        email: "sirwhite324668@pccwteleservices.com",
        photoURL:
          "https://firebasestorage.googleapis.com/v0/b/oompa-loompa-aeb91.appspot.com/o/tiffanycaldwell.png?alt=media&token=1f6c4a8d-4567-4a8a-9673-77295e8e950f",

        displayName: "Tiffany Caldwell",
        phoneNumber: "1-336-524-5631"
      }
    }
  }
];

// trapp.map((trap, key) => {
//   window.app.base.push("chat", { trap }).then(() => { });
//   // console.log(trap);
// });

// Object.keys(members[0]).map((key) => {
//   const trap = members[0][key]
//   window.app.base.push('/profiles', { data: trap }).then(() => { });
//   // console.log(trap.user.phoneNumber);
//   // console.log(trap.user.photoURL);
//   console.log(trap._perm);
// });


//ranks.map((trap)=>{
//  str = trap.CREWBIE.replace(/\s+/g, '_').toLowerCase();
//  window.app.base.post('/hkt/ranks/nov/'+str, { data: trap }).then(() => { });
//});






# default features

## 



## future addons

auto text expander
start live help
request time off
slack chat
google drive
updates
- company news

preact

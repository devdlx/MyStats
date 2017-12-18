import "./style";
import { Component, render } from "preact";

import { Router } from "preact-router";
import { Card } from "preact-material-components";
import Drawer from "preact-material-components/Drawer";

import firebase from "firebase";
import firebaseui from "firebaseui";

import Rebase from "re-base";

import Header from "./components/header";

import Dashboard from "./components/dashboard";
import Profile from "./components/profile";
import Page from "./components/page";
import SupportPage from "./components/supportPage";

let app = window.app || {};

var config = {
  apiKey: "AIzaSyDvobc7q9T-jf9XEQIyPLSA4Jh8E0u49Ss",
  authDomain: "dlxstudios-843cf.firebaseapp.com",
  databaseURL: "https://dlxstudios-843cf.firebaseio.com",
  projectId: "dlxstudios-843cf",
  storageBucket: "dlxstudios-843cf.appspot.com",
  messagingSenderId: "598281436032"
};

// console.log(firebase.apps.length);
// console.dir(firebase.initializeApp(config))
if (firebase.apps.length === 0) {
  // window.firebase = firebase;
  // window.firebase.initializeApp(config);
  app.firebaseApp = firebase.initializeApp(config);
  app.db = firebase.database(app.firebaseApp);
  app.base = Rebase.createClass(app.db);
} else {
  console.log(app.base);
}

window.app = app;

export default class App extends Component {
  // Database refs
  refs = {
    current_user_profile_ref: "",
    user_profile_ref: ""
  };
  // constructor
  constructor(props) {
    super(props);
    this.state = {
      app: {
        sidebar: {
          items: []
        }
      },
      waiting: true,
      user: null,
      profile: {user:{}},
      profile_ref: {}
    };

    window.app.api = this;
  }

  componentDidMount() {
    document.body.classList.add("mdc-theme--dark");

    // FIREBASE APP

    // FIREBASE UI

    var uiConfig = {
      signInSuccessUrl: "/",
      signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        // firebase.auth.GithubAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.PhoneAuthProvider.PROVIDER_ID
      ],
      // Terms of service url.
      tosUrl: "<your-tos-url>"
    };

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.splash.classList.remove("fadeIn");
        this.splash.classList.add("fadeOut");
        this.splash.classList.add("invis");
      } else {
        this.splash.classList.remove("invis");
        this.splash.classList.remove("fadeOut");
        this.splash.classList.add("fadeIn");

        if (!app.firebase_ui) {
          app.firebase_ui = new firebaseui.auth.AuthUI(firebase.auth());
          // console.log(firebase.auth());

          // console.log(app.firebase_ui);
        }
        app.firebase_ui.start(this.loginUI, uiConfig);
      }

      if (user) {
        // console.log('user')
        // User is signed in.
        var displayName = user.displayName;
        var email = user.email;
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var uid = user.uid;
        var phoneNumber = user.phoneNumber;
        var providerData = user.providerData;
        user.getIdToken().then(accessToken => {
          var _user = {
            displayName: displayName,
            email: email,
            emailVerified: emailVerified,
            phoneNumber: phoneNumber,
            photoURL: photoURL,
            uid: uid,
            accessToken: accessToken,
            providerData: providerData
          };


          if (app.base) {
            app.base
              .post(`/hkt/profiles/${uid}`, {
                data: {user:_user}
              }) 
              .then(data => {
                console.log(`app`, data)
                this.setState({
                  profile: data,
                  waiting: false,
                  login: false
                });
              })
              .catch(error => {
                //handle error
              });
          }


          if (app.base) {
            app.base
              .fetch(`/hkt/profiles/${uid}`, {
                context: this
              })
              .then(data => {
                this.setState({
                  profile: data,
                  waiting: false,
                  login: false
                });
              })
              .catch(error => {
                //handle error
              });
          }



          



          // this.current_user_profile_ref = firebase
          //   .database()
          //   .ref(`hkt/profiles/${uid}`);
          // this.current_user_profile_ref.child('user').set(_user);
          // this.current_user_profile_ref.child('meta').on('value', metaSnap => {
          //   // console.log(metaSnap.val() || {});
          //   var _meta = metaSnap.val() || {};
          //   this.setState({
          //     user: _user,
          //     waiting: false,
          //     login: false,
          //     profile: _meta
          //   });
          // });

          // _user.signOut = this.userSignOut
          // this.setState({ user: _user, waiting: false, login: false });
          // console.log({user:_user, waiting:false, login:false});
        });
      } else {
        this.setState({
          user: null,
          login: true,
          waiting: true,
          profile: {}
        });
        // console.log('no user')
        try {
          // Initialize the FirebaseUI Widget using Firebase.
        } catch (err) {
          //console.error(err.message);
        }
      }
    }, function(error) {
      console.error(error);
    });

    // bind firebase
  }

  handleRoute = e => {
    this.currentUrl = e.url;
  };

  userSignOut() {
    firebase
      .auth()
      .signOut()
      .then(() => {
        // Sign-out successful.
      })
      .catch(function(error) {
        // An error happened.
      });
  }

  render() {
    const { waiting, app, profile, profile_ref } = this.state;
    console.log(app, profile );

    return (
      <div
        className="app"
        ref={app => {
          this.app = app;
        }}
      >
        <Header app={app} waiting={waiting} profile={profile} />

        <div
          class="splash animated fadeIn"
          ref={splash => {
            this.splash = splash;
          }}
        >
          <h1 class="">RankUp</h1>

          <div
            className={`loginDialog animated animated__dlx ${
              waiting &&
              "fadeIn"} `}
          >
            <div
              id="firebaseui-auth-container"
              ref={loginUI => {
                this.loginUI = loginUI;
              }}
            />
          </div>
        </div>

        <Drawer.PersistentDrawer />

        <main
          className={`mdc-toolbar-fixed-adjust animated animated__dlx ${!waiting &&
            "fadeIn"}
            
            ${waiting ? "invis" : ""}
             `}
        >
          <Router onChange={this.handleRoute}>
            <Dashboard path="/" />
            <Profile path="/profile/" userid="me" profile={profile} />
            <Profile path="/profile/:userid" />
            <SupportPage.Root path="/support" profile={profile} />
            <SupportPage.Details path="/support/:chatId" profile={profile} />
          </Router>
        </main>
      </div>
    );
  }
}

if (typeof window !== "undefined") {
  render(<App />, document.getElementById("root"));
}

//   <Page path="/:page" />

// fetch('https://dlxstudios-843cf.firebaseio.com/hkt.json')
//   .then(response => {
//     return response.json();
//     // console.log(response.headers.get('Content-Type'))
//     // console.log(response.headers.get('Date'))
//     // console.log(response.status)
//     // console.log(response.statusText)
//   })
//   .then(data => {
//     // console.dir(data)
//     this.setState({ app: data });
//   });

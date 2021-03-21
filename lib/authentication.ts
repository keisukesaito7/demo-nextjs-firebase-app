import firebase from 'firebase/app'

function authenticate() {
  firebase
    .auth()
    .signInAnonymously()
    .catch(function (error) {
      // Handle Errors here.
      const errorCode = error.code
      const errorMessage = error.message
      // eslint-disable-next-line no-console
      console.log(errorCode, errorMessage)
      // ...
    })

  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      // eslint-disable-next-line no-console
      console.log(user.uid)
      // eslint-disable-next-line no-console
      console.log(user.isAnonymous)
    } else {
      // User is signed out.
      // ...
    }
    // ...
  })
}

if (process.browser) {
  authenticate()
}

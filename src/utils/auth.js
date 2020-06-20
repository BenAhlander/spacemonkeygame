export function isUserSignedIn() {
  //Use something else
  //Create Hook With Amplify AUTH
  return localStorage.getItem("amplify-signin-with-hostedUI") ? true : false;
}

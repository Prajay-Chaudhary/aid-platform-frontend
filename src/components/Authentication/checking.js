import jwtDecode from 'jwt-decode'
import { token } from '../../utils/auth';

//function for removing token from sessionStorage after token expires
export const checkingToken = () => {

  if (token) {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000; // Convert to seconds
    console.log("testsss :", decodedToken.exp)
    console.log("current time :", currentTime)

    if (decodedToken.exp < currentTime) {
      // Token has expired, remove it from session storage
      window.sessionStorage.removeItem('token');
      window.location = "/login" //redirect to the login page
    }
  }
}

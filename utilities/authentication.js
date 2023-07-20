// import axios from 'axios';
import { BACKEND_URL } from './constants';
// const API_KEY = 'AIzaSyACL36F2uc9XExLMYFx2_OvCa4r5InA7Bc';

// async function authenticate(mode, email, password) {
//     const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;
  
//     const response = await axios.post(url, {
//       email: email,
//       password: password,
//       returnSecureToken: true,
//     });
  
//     const token = response.data.idToken;
//     return token;
// }


export async function createUser( name,email, password,confirmPassword) {
    const res = await fetch(`${BACKEND_URL}api/v1/users/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "name":name,
          "email":email,
          "password":password,
          "passwordConfirm":confirmPassword,
        }),
      });
  
      const data = await res.json();
     
    if(data.status === "success"){
        return data.token;
        // dispatch(userActions.replaceUser( data.data.user));
        // router.push("/");
    } else{

        throw new Error(data.message);
    }
    // return await authenticate('signUp', email, password);
}

export async function login(email, password) {
    const res = await fetch(`${BACKEND_URL}api/v1/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "email":email,
          "password":password,
        }),
      });
  
    
    const data = await res.json();


    if(data.status === "success"){
        return data.token;
    } else{
        throw new Error(data.message);
    }

    // return await authenticate('signInWithPassword', email, password);
}
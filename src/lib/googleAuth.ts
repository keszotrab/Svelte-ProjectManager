import { onAuthStateChanged, signInWithPopup, signOut, getAuth, GoogleAuthProvider } from "firebase/auth";
import { auth, googleProvider } from "./firebase";


export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    // Zalogowany użytkownik
    const user = result.user;
    //console.log('User logged in:', user);



    const idToken = await user.getIdToken();
    const response = await fetch('/api/auth/google', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ idToken }),
    });



    return true;
  } catch (error) {
    console.error('Error during Google login:', error);
  }
};

  //to powinno monitorować stan zalogowania
export const monitorAuthState = (callback: any) => {
  onAuthStateChanged(auth, (user: any) => {
    if (user) {
      callback(user);
    } else {
      callback(null);
    }
  });
};

export const logOut = async () => {
  try {
    await signOut(auth);
    console.log('User logged out');
  } catch (error) {
    console.error('Error logging out:', error);
  }
};


/*
export const signInWithGoogle = async () => {
  //const auth = getAuth();
  //const provider = new GoogleAuthProvider();

  try {
    const result = await signInWithPopup(auth, googleProvider);
    const token = await result.user.getIdToken(); // Pobranie tokenu Firebase

    console.log('====================================');
    console.log("firebase userIdTOken:"+ token);
    console.log('====================================');

    // Wysyłanie tokenu Firebase do backendu
    const response = await fetch('/api/auth/googleAuth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    });

    const data = await response.json();

    if (data.token) {
      // Jeśli JWT jest zwrócony, możesz go zapisać w ciasteczkach
      document.cookie = `token=${data.token}; path=/`;
    }

    return result.user;
  } catch (error) {
    console.error('Error during Google login:', error);
  }
};



*/




/*

*/

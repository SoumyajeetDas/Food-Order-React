import Cookie from 'js-cookie'

/**********************Register*************************/

const register = async (user) => {
    let res = await fetch(`${process.env.REACT_APP_Working_URL}/api/v1/authenticate/signup`, {
        method: "POST",
        mode: "cors",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },

        // To send the credential(cookies) with the request to the backend side of another domain or same domain. 
        // Due to the CORS policy we have to add the credentials:true so that the server in a particular doamin
        // can borrow credential from another domain
        'credentials': 'include',


        body: JSON.stringify(user)
    });

    let response = await res.json();;

    // If registration done store the token and user details 
    if (res.status === 201) {

        // localStorage.setItem('user', JSON.stringify(response.data));

        // Expires in 1d
        // See sameSite and secure definition from React/Node JS Notes
        Cookie.set('userregisterData', JSON.stringify(response.data), 
        { expires: 1, sameSite: 'strict', secure: `${process.env.REACT_APP_ENV === 'production' ? true : false}` })
    }

    return response;
}




/**********************Login*************************/
export const login = async (user) => {
    let res = await fetch(`${process.env.REACT_APP_Working_URL}/api/v1/authenticate/login`, {
        method: "POST",
        mode: "cors",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },


        // To send the credential(cookies) with the request to the backend side of another domain or same domain. 
        // Due to the CORS policy we have to add the credentials:true so that the server in a particular doamin
        // can borrow credential from another domain
        'credentials': 'include',


        body: JSON.stringify(user)
    });

    let response = await res.json();;

    // If registration done store the token and user details 
    if (res.status === 200) {

        // localStorage.setItem('user', JSON.stringify(response.data));


        // Expires in 1d
        // See sameSite and secure definition from React/Node JS Notes
        Cookie.set('userregisterData', JSON.stringify(response.data), 
        { expires: 1, sameSite: 'strict', secure: process.env.REACT_APP_ENV === 'production' ? true : false });
    }

    return response;
}



/**********************Logout*************************/
export const logout = async () => {
    // localStorage.removeItem('user');

    Cookie.remove('userregisterData');
}



/**********************Forgot Password*************************/

const passwordUpdate = async (user) => {
    let res = await fetch(`${process.env.REACT_APP_Working_URL}/api/v1/authenticate/forgotPassword`, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },


        // To send the credential(cookies) with the request to the backend side of another domain or same domain. 
        // Due to the CORS policy we have to add the credentials:true so that the server in a particular doamin
        // can borrow credential from another domain
        'credentials': 'include',


        body: JSON.stringify(user)
    });

    let response = await res.json();

    return response;
}



const authService = {
    register,
    login,
    logout,
    passwordUpdate
}


export default authService;



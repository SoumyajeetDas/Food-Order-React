import Cookie from 'js-cookie'

/**********************Register*************************/ 

const register = async (user) => {
    let res = await fetch('http://localhost:6001/api/v1/authenticate/signup', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });

    let response = await res.json();;

    // If registration done store the token and user details 
    if (res.status === 201) {

        // localStorage.setItem('user', JSON.stringify(response.data));
        Cookie.set('userregisterData', JSON.stringify(response.data))
    }

    return response;
}




/**********************Login*************************/ 
export const login = async (user) => {
    let res = await fetch('http://localhost:6001/api/v1/authenticate/login', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });

    let response = await res.json();;

    // If registration done store the token and user details 
    if (res.status === 200) {

        // localStorage.setItem('user', JSON.stringify(response.data));

        Cookie.set('userregisterData', JSON.stringify(response.data));
    }

    return response;
}



/**********************Logout*************************/ 
export const logout = async () => {
    // localStorage.removeItem('user');

    Cookie.remove('userregisterData');
}




const authService = {
    register,
    login,
    logout
}


export default authService;


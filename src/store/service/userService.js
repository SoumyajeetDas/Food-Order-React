const getUser = async(token)=>{
    // If the cookie gets expired then the token coming as undefined.
    let data = await fetch(`${process.env.REACT_APP_Working_URL}/api/v1/user/profile`, {
        method: 'GET',
        mode: "cors",
        headers: {
            Authorization: 'Bearer ' + token
        }
    });

    let response = await data.json();

    return response;
}

const userService = {
    getUser
}

export default userService;
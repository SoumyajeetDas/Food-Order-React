/**********************Get the cart Data*************************/

const getCart = async (token) => {
    let data = await fetch(`${process.env.REACT_APP_Working_URL}/api/v1/cart/getCart`, {
        method: 'GET',
        mode: "cors",
        headers: {
            Authorization: 'Bearer ' + token
        },


        // To send the credential(cookies) with the request to the backend side of another domain or same domain. 
        // Due to the CORS policy we have to add the credentials:true so that the server in a particular doamin
        // can borrow credential from another domain
        'credentials': 'include'
    });

    let response = await data.json();

    return response;
}



/**********************Upadting the cart*************************/
const updateCart = async (token, cartData) => {

    // console.log("CartData", cartData.items);

    let data = await fetch(`${process.env.REACT_APP_Working_URL}/api/v1/cart/updateCart`, {
        method: "PUT",
        headers: {
            Authorization: 'Bearer ' + token,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },


        // To send the credential(cookies) with the request to the backend side of another domain or same domain. 
        // Due to the CORS policy we have to add the credentials:true so that the server in a particular doamin
        // can borrow credential from another domain
        'credentials': 'include',

        
        body: JSON.stringify({
            items: cartData.items,
            totalPrice: cartData.totalPrice
        })
    });

    let response = await data.json();

    // console.log("Response",response)

    return response;
}


const cartService = {
    getCart,
    updateCart
}


export default cartService;
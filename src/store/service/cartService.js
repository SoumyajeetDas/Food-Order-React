/**********************Get the cart Data*************************/ 

const getCart = async(token)=>{
    let data = await fetch('http://localhost:6001/api/v1/cart/getCart', {
        method: 'GET',
        headers: {
            Authorization: 'Bearer ' + token
        }
    });

    let response = await data.json();

    return response;
}



/**********************Upadting the cart*************************/ 
const updateCart = async(token,cartData)=>{

    // console.log("CartData", cartData.items);

    let data = await fetch('http://localhost:6001/api/v1/cart/updateCart', {
        method: "PUT",
        headers: {
            Authorization: 'Bearer ' + token,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            items: cartData.items,
            totalPrice:cartData.totalPrice
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
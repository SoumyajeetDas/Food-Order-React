/**********************Get All Foods*************************/ 

const getAllFoods = async (token) => {

    let data = await fetch(`${process.env.REACT_APP_Working_URL}/api/v1/bengalifood`, {
        method: 'GET',
        headers: {
            Authorization: 'Bearer ' + token
        }
    });

    let response = await data.json();

    return response;
}



/**********************Get the Type of Food like Breakfast, Lunch etc.*************************/ 
const getFoodTypeFoods = async (type, token) => {

    let data;

    if (type === 'all') {
        data = await fetch(`${process.env.REACT_APP_Working_URL}/api/v1/bengalifood`, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + token
            }
        });
    }

    else {
        data = await fetch(`${process.env.REACT_APP_Working_URL}/api/v1/bengalifood/${type}`, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + token
            }
        });
    }


    let response = await data.json();

    return response;
}




/**********************Search the food*************************/ 
const getSearchedFoods = async (key, token) => {


    let data = await fetch(`${process.env.REACT_APP_Working_URL}/api/v1/bengalifood/search/${key}`, {
        method: 'GET',
        headers: {
            Authorization: 'Bearer ' + token
        }
    });



    let response = await data.json();

    return response;
}

const foodService = {
    getAllFoods,
    getFoodTypeFoods,
    getSearchedFoods
}


export default foodService;

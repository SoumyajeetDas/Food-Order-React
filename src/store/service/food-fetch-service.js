const getAllFoods = async (token) => {

    let data = await fetch('http://localhost:6001/api/v1/bengalifood', {
        method: 'GET',
        headers: {
            Authorization: 'Bearer ' + token
        }
    });

    let response = await data.json();

    return response;
}

const getFoodTypeFoods = async (type, token) => {

    let data;

    if (type === 'all') {
        data = await fetch('http://localhost:6001/api/v1/bengalifood', {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + token
            }
        });
    }

    else {
        data = await fetch(`http://localhost:6001/api/v1/bengalifood/${type}`, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + token
            }
        });
    }


    let response = await data.json();

    return response;
}


const getSearchedFoods = async (key, token) => {


    let data = await fetch(`http://localhost:6001/api/v1/bengalifood/search/${key}`, {
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

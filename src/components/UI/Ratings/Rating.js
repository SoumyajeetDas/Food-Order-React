import React, { useEffect, useState } from 'react';
import ReactStars from "react-rating-stars-component";

export default function Rating(props) {

    const [rating, setRating] = useState(0);
    const [isFirst, setIsFirst] = useState(true);



    const updateRating = async (foodId, token) => {
        let data = await fetch(`${process.env.REACT_APP_Working_URL}/api/v1/review/addReview/${foodId}`, {
            method: "POST",
            headers: {
                Authorization: 'Bearer ' + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                rating
            })
        });

        if(data.status===201){
            props.setModalShow(true);
        }

        else if (data.status === 500) console.log("Rating not getting updated");
    }




    const ratingChanged = (newRating) => {
        setRating(newRating);
    };



    useEffect(() => {

        // On first time load of component to prevent rating get updated automatically
        if (isFirst) {
            setIsFirst(false);
            return;
        }
        updateRating(props.foodId, props.token);

        // eslint-disable-next-line
    }, [rating])

    return (

            <div className="d-flex align-items-center justify-content-md-start justify-content-center mt-4" style={{ flexWrap: "wrap" }}>
                <small className="text-white"><i>Please add your valuable rating</i> &nbsp;</small>
                <ReactStars
                    count={5}
                    onChange={ratingChanged}
                    size={24}
                    isHalf={true}
                    emptyIcon={<i className="far fa-star"></i>}
                    halfIcon={<i className="fa fa-star-half-alt"></i>}
                    fullIcon={<i className="fa fa-star"></i>}
                    activeColor="#ffd700"

                />
            </div>

    )
}

import React from 'react'

function Item(props) {
    return (
        <div className="item">
            <input className="check-box" type="checkbox" />
            <label className="city-name" >{props.cityName}</label>
        </div>
    )
}

export default Item;

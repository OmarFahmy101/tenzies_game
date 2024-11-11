import React from "react"

export default function Die(props) {
    return (
        <div className={props.isHeld ? "isHeld--face" : "die--face"} onClick={props.toggleHeld}>
            <h2 className="die--num">{props.value}</h2>
        </div>
    )
}

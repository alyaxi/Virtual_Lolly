import React from 'react'
import LollySvg from '../svg/lolly'

export default function NewLolly() {
    const [topFlavor, setTopFlavor] = React.useState("7D5A50")
    const [MidFlavor, setMidFlavor] = React.useState("")
    const [BottomFlavor, setBottomFlavor] = React.useState("")
    return (
        <div>
            <LollySvg topFlavor={topFlavor}/>
            <input type="color" value={topFlavor} onChange={(e) => {setTopFlavor(e.target.value)}}/>
        </div>
    )
}

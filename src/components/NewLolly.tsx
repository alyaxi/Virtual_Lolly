import { gql } from '@apollo/client/core'
import React from 'react'
import LollySvg from '../svg/lolly'
import FormField from './Form'

// const ADD_LOLLY_DATA = gql`

// `


export default function NewLolly() {
    const [topFlavor, setTopFlavor] = React.useState<string>("#7D5A50")
    const [MidFlavor, setMidFlavor] = React.useState<string>("#0A1931")
    const [BottomFlavor, setBottomFlavor] = React.useState<string>("#FFC947")
    return (
        <div>
            <LollySvg topFlavor={topFlavor} MidFlavor={MidFlavor} BottomFlavor={BottomFlavor} />
            <input type="color" value={topFlavor} onChange={(e) => {setTopFlavor(e.target.value)}}/>
            <input type="color" value={MidFlavor} onChange={(e) => {setMidFlavor(e.target.value)}}/>
            <input type="color" value={BottomFlavor} onChange={(e) => {setBottomFlavor(e.target.value)}}/>
            <div>
            <FormField />
            </div>
        </div>
    )
}

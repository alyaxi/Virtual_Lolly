import React from 'react'
import { useQuery , gql } from '@apollo/client';

const GET_LOLLIES = gql`
    query gettingLollypath($lollypath: String){
        gettingLollypath(lollypath: $lollypath){
            sender
            message
            reciever
            topFlavor
            MidFlavor
            BottomFlavor
            lollypath
        }
    }

`
const Showlolly = ({location}) => {
    console.log(location);
    
    return (
        <div>
            
        </div>
    )
}

export default Showlolly

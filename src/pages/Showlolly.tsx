import React from 'react'
import { useQuery , gql } from '@apollo/client';

const GET_LOLLIES = gql`
  query getLollypath($lollypath: String!) {
        getLollypath(lollypath: $lollypath) {
            sender
            message
            reciever
            topFlavor
            MidFlavor
            BottomFlavor
            lollypath
    }
  }
`;
const Showlolly =  (props) => {
    const id = props.location.search
    const newID = id.slice(4).toString
    // const NewID = toString(newID)


    
    

    const {loading, error, data} =  useQuery(GET_LOLLIES, {
        
        variables : {
            lollypath: newID
        }

       
    })
    if(loading)
    return <div>Loading</div>

    if(error)
    return <div>{Error}</div>
    console.log("show lolly"+ data)
    
    return (
        <div>
            {JSON.stringify(data.getLollypath)}
          
           
        </div>
    )
}

export default Showlolly

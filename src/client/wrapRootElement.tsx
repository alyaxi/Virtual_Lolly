import {ApolloProvider} from "@apollo/client"
import {client} from "./apollo"

export default function WrapRootElement({element}){
    return(
        <ApolloProvider client={client}>{element}</ApolloProvider>
    )
}
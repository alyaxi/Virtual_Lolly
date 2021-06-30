import {ApolloProvider} from "@apollo/client"
import {client} from "./apollo"
import React from 'react'

export const wrapRootElement =  ({element}) => (
<ApolloProvider client={client}> {element} </ApolloProvider>
 )
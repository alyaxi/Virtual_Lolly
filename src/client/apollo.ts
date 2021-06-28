import {InMemoryCache, ApolloClient, HttpLink} from "@apollo/client";
import fetch from "cross-fetch";

export const client = new ApolloClient({
    link: new HttpLink({
        uri: "/.netlify/functions/lolli_crud/",
        fetch
    }),
    cache: new InMemoryCache()
})
const { ApolloServer, gql } = require('apollo-server-lambda')
const faunadb = require("faunadb")
const q = faunadb.query;
const shortid = require("shortid")
const dotenv = require("dotenv")
dotenv.config();


const typeDefs = gql`
  type Query {
    
    LollyData: [Lolly!]
    gettingLollypath(lollypath: String) : Lolly
  
    
  }
  type Lolly {
    sender: String
    message: String
    reciever: String
    topFlavor: String
    MidFlavor: String
    BottomFlavor: String
    lollypath: String

  }
  type Mutation {
    addLolly(sender: String, message: String, reciever: String, topFlavor: String, MidFlavor: String, BottomFlavor: String, lollypath: String): Lolly
  }
`



const resolvers = {
  Query: {
    LollyData: async () => {
     try {
      const client = new faunadb.Client({
        secret: process.env.FAUNA_SERVER_SECRET
      })
     } catch (error) {
       console.log(error);
     }
    }
  },
  Mutation: {
    addLolly: async (_, args) => {
      try {
        const client = new faunadb.Client({
          secret: process.env.FAUNA_SERVER_SECRET
        })
        let id = shortid.generate()
        args.lollypath = id
        const result = await client.query(
          q.Create(
            q.Collection("Virtual_lolly"),{
              data: args
            }
          )
          )
          console.log("added into db" + result.data);
          return result.data
        
      } catch (error) {
        console.log(error);
      }
        
      } 
}
}
const server = new ApolloServer({
  typeDefs,
  resolvers,
})

const handler = server.createHandler()

module.exports = { handler }

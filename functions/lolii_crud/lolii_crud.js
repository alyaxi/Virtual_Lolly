const { ApolloServer, gql } = require('apollo-server-lambda')
const faunadb = require("faunadb")
const q = faunadb.query;
const shortid = require("shortid")
const dotenv = require("dotenv")
dotenv.config();


const typeDefs = gql`

  type Query { 
    LollyData: [Lolly!]
    getLollypath(lollypath: String!):Lolly
  }

  type Lolly {
    sender: String!
    message: String!
    reciever: String!
    topFlavor: String!
    MidFlavor: String!
    BottomFlavor: String!
    lollypath: String

  }
  type Mutation {
    addLolly(sender: String!, message: String!, reciever: String!, topFlavor: String!, MidFlavor: String!, BottomFlavor: String!, lollypath: String): Lolly
  }
`



const resolvers = {
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
},
Query : {
  getLollypath : async (_ , {lollypath}) => {
    console.log("ID " , lollypath)
  
    try {
      const client = new faunadb.Client({secret: process.env.FAUNA_SERVER_SECRET});
       const result = await client.query(
        q.Get(q.Ref(q.Collection('Virtual_lolly'), lollypath )
       ))
       console.log("result" , result)

        return result.data
      }
    
    catch(err){
      console.log(err);
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

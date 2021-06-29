const { ApolloServer, gql } = require('apollo-server-lambda')
require(dotenv).config()
const faunadb = require("faunadb")
const q = faunadb.query()


const typeDefs = gql`
  type Query {
    
    LollyData: [Lolly!]
    getLoly(path): Lolly
    
  }
  type Lolly {
    sender: String!
    message: String!
    reciever: String!
    topFlavor: String!
    MidFlavor: String!
    BottomFlavor: String!
    path: String!

  }
`



const resolvers = {
  Query: {
    LollyData: async (_, args) => {
      try {
        const client = new faunadb.Client({
          secret: process.env.FAUNA_SERVER_SECRET
        })
        console.log("Connection established");
        const result = await client.query(
          q.Map(
            q.Paginate(q.Match(q.Index("lolly"))),
            q.Lambda(x => q.Get(x))
          )
          )
          console.log(result);
      } catch (error) {
        console.log(error);
      }
    }
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

const handler = server.createHandler()

module.exports = { handler }

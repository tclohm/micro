import { ApolloServer } from 'apollo-server';
import { createTestClient } from 'apollo-server-testing';
import typeDefs from '../typeDefs';
import resolvers from '../resolvers';

const createTestServer = ctx => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    mockEntireSchema: false,
    mocks: true,
    context: () => ctx
  })

  return createTestClient(server)
}

export default createTestServer;
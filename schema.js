const axios = require('axios');
const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
  GraphQLSchema,
} = require('graphql');

// Root Query
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    launches: {
      type: new GraphQLList(LaunchType),
      resolve: (parent, args) => {
        return axios
          .get('https://api.spacexdata.com/v3/launches')
          .then((res) => res.data);
      },
    },
  }),
});

// Launch Type
const LaunchType = new GraphQLObjectType({
  name: 'Launch',
  fields: () => ({
    flight_number: { type: GraphQLInt },
    launch_date_local: { type: GraphQLString },
    launch_success: { type: GraphQLBoolean },
    launch_year: { type: GraphQLString },
    mission_name: { type: GraphQLString },
    rocket: { type: RocketType },
  }),
});

// Rocket Type
const RocketType = new GraphQLObjectType({
  name: 'Rocket',
  fields: () => ({
    rocket_id: { type: GraphQLString },
    rocket_name: { type: GraphQLString },
    rocket_type: { type: GraphQLString },
  }),
});

module.exports = new GraphQLSchema({ query: RootQuery });
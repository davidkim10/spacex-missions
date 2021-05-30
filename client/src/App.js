import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';

import './App.css';
import Header from './components/Header/Header';
import Launches from './components/Launches';
import LaunchDetails from './components/LaunchDetails';

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Header />
        <div className="container">
          <Route exact path="/" component={Launches} />
          <Route
            exact
            path="/launch/:flight_number"
            component={LaunchDetails}
          />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;

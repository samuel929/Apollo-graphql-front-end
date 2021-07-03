import HomePage from './components/HomePage';
import './App.css';
import {GraphQLClient,ClientContext} from 'graphql-hooks';
import {Switch,Route,Link} from 'react-router-dom';
import DetailPage from './components/DetailPage'
const client= new GraphQLClient({
  url:"http://localhost:4000/graphql"
})

function App() {
  return (
    <ClientContext.Provider value={client}>
      <Switch>
        <Route  exact path="/">
           <HomePage/>
        </Route>
        <Route path="/details/:name">
           <DetailPage/>
        </Route>
      </Switch>
     
    </ClientContext.Provider>
  );
}

export default App;

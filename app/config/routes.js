var React = require("react");
var router = require("react-router");
var Route = router.Route;
var Router = router.Router;

var hashHistory = router.hashHistory;

var Main = require("../components/Main");
var Saved = require("../components/Saved.js");
var Search = require("../components/Search.js");
var Results = require("../components/Results.js");
var IndexRoute = router.IndexRoute;


// Export the Routes
module.exports = (

  // The high level component is the Router component
  <Router history={hashHistory}>
    <Route path="/" component={Main}>

      {/* If user selects Info or Chat show the appropriate component */}
      
      <Route path="Search" component={Search} />
      <Route path="Results" component={Results} />
      <Route path="Saved" component={Saved} />
      {/* If user selects any other path... we get the Info Route */}
      <IndexRoute component={Search} />

    </Route>
  </Router>


);
import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./Components/login";
import Register from "./Components/Register";
import Dashboard from "./Components/Dashboard/Dashboard";
import AddLocation from "./Components/AddLocation/AddLocation";
import HeaderSearch from "./Components/Search/HeaderSearch";
import Filter from './Components/Filter'
import Picklist from './Components/Picklist_Expanded';


// Test Hierarchy
import Hierarchy from './Components/DisplayInventory/Hierarchy'


export default (
  <Switch>
    <Route exact path="/" component={Login} />
    <Route path='/filter' component={Filter} />
    <Route path="/register" component={Register} />
    <Route path="/dashboard" component={Dashboard} />
    <Route path="/picklist" component={Picklist} />
    
    <Route path="/addlocation" component={AddLocation} />
    
    {/* Test Component */}
    <Route path="/api/test" component={HeaderSearch} />
    {/* Test Hierarchy */}
    <Route path='/api/hierarchy' component={Hierarchy}/>

  </Switch>
);

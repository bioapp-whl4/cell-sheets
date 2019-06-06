import React from 'react'
import {Switch,Route} from 'react-router-dom'
import Login from './components/login'
import Register from './components/Register'
import Dashboard from './components/Dashboard/Dashboard'
import AddLocation from './components/AddLocation/AddLocation'
import FreezerCane from './components/FreezerCane/FreezerCane'
import FreezerBox from './components/FreezerBox/FreezerBox'

import FreezerNav from './components/SingleViewDisplay/FreezerNav'

export default (
    <Switch>
        <Route path='/register' component={Register}/>
        <Route exact path='/' component={Login}/>
        <Route path='/dashboard' component={Dashboard}/>
        <Route path='/api/freezer/canes/:id' component={FreezerCane}/>
        <Route path='/addlocation' component={AddLocation}/>
        <Route path='/api/cane/boxes/:id' component={FreezerBox}/>
        {/* Test Component */}
        <Route path='/api/test' component={FreezerNav}/>
    </Switch>
)
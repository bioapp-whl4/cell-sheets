import React from 'react'
import {Switch,Route} from 'react-router-dom'
import Login from './Componenets/login'
import Register from './Componenets/Register'

export default (
    <Switch>
        <Route path='/register' component={Register}/>
        <Route exact path='/' component={Login}/>
    </Switch>
)
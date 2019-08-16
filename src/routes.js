import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Landing from './Components/Landing/Landing'
import Dashboard from './Components/Dashboard/Dashboard'
import MyProfile from './Components/MyProfile/MyProfile'
import Register from './Components/Register/Register'
import Profile from './Components/Profile/Profile'


export default (
    <Switch>
        <Route path='/'exact component={Landing} />
        <Route path='/register' component={Register} />
        <Route path='/dashboard' component={Dashboard} />
        <Route path='/my-profile/:username' component={MyProfile} />
        <Route path='/profile/:username' component={Profile} />
    </Switch>
)
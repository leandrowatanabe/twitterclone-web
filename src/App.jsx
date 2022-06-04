import React from 'react'

import Timeline from './Pages/Timeline'
import Login from './Pages/Login'
import SignUp from './Pages/SignUp'

export function App(){
  const [user, setUser] = React.useState()

  if( user ){
    return <Timeline loggedInUser={user}/>
  }

  return window.location.pathname === '/signup'
    ?<SignUp signInUser={setUser}/>
    :<Login signInUser={setUser} />

  // return user ? <Timeline user={user} />:<Login signInUser={setUser} />

  return 
}

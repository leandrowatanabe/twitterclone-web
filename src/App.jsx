import React from 'react'

import Timeline from './Pages/Timeline'
import Login from './Pages/Login'
import SignUp from './Pages/SignUp'
import Users from './Pages/Users'

export function App(){
  const [user, setUser] = React.useState()

  // if( user ){
  //   return <Timeline loggedInUser={user}/>
  // }

  if( user ){
      return window.location.pathname === '/users'
      ?<Users loggedInUser={user}/>
      :<Timeline loggedInUser={user}/>
  }

  return window.location.pathname === '/signup'
    ?<SignUp signInUser={setUser}/>
    :<Login signInUser={setUser} />

}

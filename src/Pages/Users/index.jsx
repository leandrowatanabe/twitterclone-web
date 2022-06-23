import { useEffect, useState } from 'react'
import axios from 'axios'

import Avatar from '../../assets/avatar.svg'

export default function Users( {loggedInUser} ){
  const [users, setUsers] = useState([])
  
  async function getUsers() {
    const res = await axios.get(`${import.meta.env.VITE_API_HOST}/users`, {
      headers:{
        Authorization: `Bearer ${loggedInUser.accessToken}`
      }
    })
    setUsers(res.data)
  }

  useEffect(()=>{
    getUsers()
  },[])

  console.log(users)

  return(
    <>
    {users.length && users.map(user=>{return(
      
      <div className="flex space-x-3 p-4 border-b border-silver" key={user.id} >
        <div >
          <img src={Avatar}  />
        </div>
        <div className='space-y-1'>
            <span className='font-bold text-sm'> {user.name} </span>
            <span className='text-sm text-silver'>@{user.username}</span>

            <div className='flex space-x-1 text-silver font-bold text-sm items-center'>
              <span>{user.tweets.length} Tweets</span>
            </div>
        </div>
      </div>)
    })}
    </>    
  )
}
import { useEffect, useState } from 'react'
import axios from 'axios'

import Avatar from '../../assets/avatar.svg'

import TweetForm from '../../components/TweetForm'
import Tweet from '../../components/Tweet'

export default function Timeline( {loggedInUser} ){
  const [tweets, setTweets] = useState([])
  
  async function getTweets() {
    const res = await axios.get(`${import.meta.env.VITE_API_HOST}/tweets`, {
      headers:{
        Authorization: `Bearer ${loggedInUser.accessToken}`
      }
    })
    setTweets(res.data)
  }

  useEffect(()=>{
    getTweets()
  },[])




  return(
    <>
    
      <TweetForm loggedInUser={loggedInUser} onSuccess={getTweets}/>

      {tweets.length && tweets.map(tweet=>{return(
        <Tweet 
          key={tweet.id} 
          name={tweet.user.name} 
          username={tweet.user.username} 
          avatar={Avatar} 
          timestamp={tweet.timestamp}
          likes={tweet.likes}
        >
          {tweet.text}
        </ Tweet >)
      })}
      
    </>
  )
}
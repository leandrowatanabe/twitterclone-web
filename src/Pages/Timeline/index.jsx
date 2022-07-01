import { useEffect, useState } from 'react'
import axios from 'axios'

import Avatar from '../../assets/avatar.svg'

import TweetForm from '../../components/TweetForm'
import Tweet from '../../components/Tweet'

export default function Timeline( {loggedInUser} ){
  const [renderTweets, setRenderTweets] = useState([])
  const [tweets, setTweets] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  
  async function getTweets() {
    const res = await axios.get(`${import.meta.env.VITE_API_HOST}/tweets`, {
      headers:{
        Authorization: `Bearer ${loggedInUser.accessToken}`
      }
    })
    setRenderTweets(await res.data)
  }

  async function refreshTweets(){
    const res = await axios.get(`${import.meta.env.VITE_API_HOST}/tweets`, {
      headers:{
        Authorization: `Bearer ${loggedInUser.accessToken}`
      }
    })
    setTweets(res.data)
    if(tweets.length > renderTweets.length && !isOpen){
      setIsOpen(true)
    }
  }

  function test(){
    return(
      isOpen
      ?<div className="flex p-4 border-b border-silver justify-center" onClick={()=>{
        setRenderTweets(tweets)
        setTweets(renderTweets)
        setIsOpen(false)
      }}>
          {tweets.length - renderTweets.length > 0? tweets.length - renderTweets.length : setIsOpen(false)} tweets
        </div>
      :<></>
    )
  }

  useEffect(()=>{
    getTweets()
  },[])

  useEffect(()=>{
    const period = setInterval(refreshTweets, 2000)
    return () => clearInterval(period)
  },[tweets])

  return(
    <>
      <TweetForm loggedInUser={loggedInUser} onSuccess={getTweets}/>

      {test()}

      {renderTweets.length && renderTweets.map(tweet=>{return(
        <Tweet 
          key={tweet.id} 
          name={tweet.user.name} 
          username={tweet.user.username} 
          avatar={Avatar} 
          timestamp={tweet.timestamp}
          likes={tweet.likes}
        >
          {tweet.text}
        </ Tweet >
        )
      })}
      
    </>
  )
}
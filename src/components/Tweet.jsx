import React from 'react'
import { HeartIcon } from '@heroicons/react/outline'

export default function Tweet({ name, username, avatar, children, timestamp, likes }){
  
  const postedAt = new Date(parseInt(timestamp))
  const min = Math.floor((Date.now() - postedAt)/60000)
  
  var time = ''
  if(min > 10080){
    time = Math.floor(min/10080) + 'w'
  }else if(min > 1440){
    time = Math.floor(min/1440) + 'd'
  }else if(min>60){
    time = Math.floor(min/60) + 'h'
  }else if(min > 0){
    time = min + 'm'
  }else{
    time = 'just now'
  }


  return(
    <div className="flex space-x-3 p-4 border-b border-silver">
      <div >
        <img src={avatar}  />
      </div>
      <div className='space-y-1'>
          <span className='font-bold text-sm'> {name} </span>
          <span className='text-sm text-silver'>@{username}</span>
          <span className='text-sm text-silver'> - {time}</span>
          <p>
            {children}
          </p>
          <div className='flex space-x-1 text-silver text-sm items-center'>
            <HeartIcon className="w-6 stroke-1"/>
            <span>0</span>
          </div>
      </div>
    </div>
  )
}
import { useState } from 'react'
import axios from 'axios'
import { useFormik } from 'formik'

import Avatar from '../assets/avatar.svg'

const MAX_TWEET_CHAR = 140

export default function TweetForm( {loggedInUser , onSuccess} ){
  const formik = useFormik({
    onSubmit: async (values, form) => {
      await axios({
        method: 'post',
        url: `${import.meta.env.VITE_API_HOST}/tweets`,
        headers:{
          Authorization: `Bearer ${loggedInUser.accessToken}`
        },        
        data:{
          text: values.text
        }
      })
      form.setFieldValue('text','')
      onSuccess()
    },
    initialValues:{
      text: ''
    }
  })
    
    return(
      <div className='border-b border-silver p-4 space-y-4'>
        <div className='flex space-x-5'>
          <img src={Avatar} className="w-7" />
          <h1 className='font-bold text-xl'> Página Inicial </h1>
        </div>
        <form className='pl-12 text-lg flex flex-col disabled:opacity-50' onSubmit={formik.handleSubmit} >
          <textarea 
            name="text"
            value={formik.values.text}
            placeholder="O que está acontecendo?"
            className='bg-transparent outline-none'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={formik.isSubmitting}
          />
          
          <div className='flex justify-end items-center space-x-3'>
            <span className='text-sm'>
              <span>{formik.values.text.length}</span> / <span className='text-birdBlue'>{MAX_TWEET_CHAR}</span>
            </span>
            <button 
              className='bg-birdBlue px-5 py-2 rounded-full disabled:opacity-50'
              disabled={formik.values.text.length > MAX_TWEET_CHAR || formik.isSubmitting}
            >
              Tweet
            </button>
          </div>
  
        </form>
      </div>
    )
  }
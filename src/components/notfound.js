import React from 'react'
import { Link } from 'react-router-dom'

export const Error = () => {
  return (
    <div className='container-fluid'>
      <p>Error 404 check for spelling mistakes and please go back and try again.</p>
      <Link to = '/home'>Get To the Homepage</Link>
    </div>
  )
}

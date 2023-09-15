import React from 'react'
import spinner from './Spinner.gif'
function LoadingSpinner() {
  return (
    <div className='spinner'>
      <img src={spinner} alt='Loading...'/>
    </div>
  )
}

export default LoadingSpinner

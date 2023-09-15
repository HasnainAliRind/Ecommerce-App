import React from 'react'
import { useDispatch } from 'react-redux'
import { setSidebar } from '../Redux/Slice'

function Shadow() {
  let dispatch = useDispatch()
  return (
    <div className='shadow' onClick={()=>{
      dispatch(setSidebar(false))
    }}>
      
    </div>
  )
}

export default Shadow

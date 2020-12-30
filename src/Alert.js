import React, { useEffect } from 'react'

const Alert = ({msg,type,removeAler}) => {
  useEffect(() => {
   const setNotShowAler = setTimeout(() => {
     removeAler()
   }, 3000);
   return()=> clearInterval(setNotShowAler)
  }, [])
  return <p className={`alert alert-${type}`}>{msg}</p> 
}

export default Alert

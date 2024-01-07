import React from 'react'

const Box = ({value, onClick,winner} : {
  value:string | null,
  onClick: () => void 
  winner: boolean
}) => {
  return (
    <button 
    className='box'
    
    onClick={() => {!winner && onClick()}}
    >{value}</button>
  )
}

export default Box
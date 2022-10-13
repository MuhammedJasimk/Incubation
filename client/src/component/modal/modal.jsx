import React from 'react'

const style={
  position:'fixed',
  top:'30%',
  left:'30%',
  right:'30%',
  bottom:'30%',
  transform:'transilate(-50%,-50%)',
  backgroundColor:'#fff',
  padding:'50px',
  zIndex:1000,
}

const overLay={
  position:'fixed',
  top:0,
  left:0,
  right:0,
  bottom:0,
  backgroundColor:'rgba(0,0,0,.5)',
  zIndex:1000
}


function Modal({open,children,onclose}) {
  if(!open) {return null}else{
  return (
    <>
    <div style={overLay}/>
    <div className='rounded' style={style}>
       <button className='absolute top-[10px] right-[10px]' onClick={onclose}>X</button>
        {children}
    </div>
    </>
  )
}
}

export default Modal
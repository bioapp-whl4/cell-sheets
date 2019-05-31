import React from 'react'

export default function Square(props){
    return(
        <>
        <div style={{
            border: '1px solid black', 
            width: '100px', 
            height: '100px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            {props.children}
        </div>
        </>
    )
}
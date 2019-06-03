import React from 'react'

export default function Sample(props){
    if(props.color === 'blue'){
        return (
            <div style={{backgroundColor: 'blue',
            borderRadius: '50% / 50%',
            width: '50px',height: '50px',
            textAlign: 'center'}}
            >
                {props.number}
            </div>
        )
    }
    return (
        <div style={{backgroundColor: 'red',borderRadius: '50% / 50%',width: '50px',height: '50px',textAlign: 'center'}}>{props.number}</div>
    )
}
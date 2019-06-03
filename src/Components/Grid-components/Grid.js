import React from 'react'
import Sample from './Sample'
import Square from './Square'

export default function Grid(props){
    function setColor(j){
        if(j % 2 === 0) return 'red'
        else return 'blue'
    }
    function renderSquare(i, position){
        const x = i % 9
        const y = Math.floor(i / 9)
        var occupied
        var index
        var color
        for(let j = 0; j < position.length; j++){
            if(x === position[j][0] && y === position[j][1]){
                occupied = true
                index = j
                color = setColor(j)
            }
        }

        const sample = occupied ? <Sample color ={color} index={index} get={props.get}/> : null

        return(
            // onClick={() => props.move(x,y,index)}
            <div key={i}>
                <Square move={props.move} index={index} x={x} y={y}>{sample}</Square>
            </div>
        )
    }
    
    var squares = []
    for(let i = 0; i < 81; i++){
        squares.push(renderSquare(i, props.positions))
    }

    return(
        <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            width: '920px',
            height: '920px'
        }}>
            {squares}
        </div>
    )
}
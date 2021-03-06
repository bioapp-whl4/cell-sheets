import React from 'react'
import Sample from './Sample'
import Square from './Square'

export default function Grid(props){
    function setColor(j){
        if(j % 2 === 0) return 'red'
        else return 'blue'
    }

    function renderSquare(i, specimens){
        const x = i % props.x
        const y = Math.floor(i / props.x)
        var occupied
        var index
        var color
        for(let j = 0; j < specimens.length; j++){
            if(x === specimens[j].location[0] && y === specimens[j].location[1]){
                occupied = true
                index = j
                color = setColor(j)
            }
        }

        const sample = occupied ? <Sample color ={color} index={index} get={props.get}/> : null

        return(
            <div key={i} onMouseOver={() => props.showData(specimens[index])} onMouseOut={props.hideData}>
                <Square move={props.move} index={index} x={x} y={y}>{sample}</Square>
            </div>
        )
    }
    
    var squares = []
    const totalLength = props.x * props.y
    for(let i = 0; i < totalLength; i++){
        squares.push(renderSquare(i, props.specimens))
    }

    return(
        <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            width: '680px',
            height: '645px'
        }}>
            {squares}
        </div>
    )
}
import React from 'react'
import Sample from './Sample'
import Square from './Square'

export default function Grid(props){
    function setColor(j){
        if(j % 2 === 0) return 'red'
        else return 'blue'
    }

    function showData(specimen, index){
        return index !== undefined ? console.log(specimen) : null
    }

    function renderSquare(i, specimens){
        const x = i % 9
        const y = Math.floor(i / 9)
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
            <div key={i} onMouseOver={() => showData(specimens[index], index)}>
                <Square move={props.move} index={index} x={x} y={y}>{sample}</Square>
            </div>
        )
    }
    
    var squares = []
    for(let i = 0; i < 81; i++){
        squares.push(renderSquare(i, props.specimens))
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
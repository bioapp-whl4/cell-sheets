import React from 'react'
import {DropTarget} from 'react-dnd'

const ItemTypes = {
    SAMPLE: 'sample'
}

const squareTarget = {
    drop(props, monitor){
        props.move(props.x, props.y, props.index)
        monitor.getItem()
    }
}

function collect(connect, monitor){
    return{
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver()
    }
}

function Square(props){
    const {connectDropTarget, children} = props
    return connectDropTarget(
        <div style={{
            border: '1px solid black', 
            width: '100px', 
            height: '100px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
            }}>
            {children}
        </div>
    )
}

export default DropTarget(ItemTypes.SAMPLE, squareTarget, collect)(Square)
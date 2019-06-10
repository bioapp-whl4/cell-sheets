import React from 'react'
import {DragSource} from 'react-dnd'

const ItemTypes = {
    SAMPLE: 'sample'
}

const sampleSource = {
    beginDrag(props){
        props.get(props.index)
        return{sampleIndex: props.index}
    }
}

function collect(connect, monitor){
    return{
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    }
}

function Sample(props){
    const {connectDragSource, isDragging} = props
    if(props.color === 'blue'){
        return connectDragSource(
            <div style={{
                backgroundColor: 'blue',
                borderRadius: '50% / 50%',
                width: '50px',
                height: '50px',
                textAlign: 'center',
                opacity: isDragging ? '0.5' : '1',
                cursor: 'grab'
            }}>
                {props.index}
            </div>
        )
    }
    return connectDragSource(
        <div style={{
            backgroundColor: 'red',
            borderRadius: '50% / 50%',
            width: '50px',
            height: '50px',
            textAlign: 'center',
            opacity: isDragging ? '0.5' : '1',
            cursor: 'grab'
        }}>
            {props.index}
        </div>
    )
}

export default DragSource(ItemTypes.SAMPLE, sampleSource, collect)(Sample)
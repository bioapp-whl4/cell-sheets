import React from 'react'
import GridContainer from './Grid-components/GridContainer'
import {DragDropContextProvider} from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

export default function ContextProvider(){
    return(
        <DragDropContextProvider backend={HTML5Backend}>
            <GridContainer/>
        </DragDropContextProvider>
    )
}
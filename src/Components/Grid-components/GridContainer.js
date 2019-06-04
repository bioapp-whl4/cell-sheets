import React, {Component} from 'react';
import Grid from './Grid'

export default class GridContainer extends Component {
  constructor(){
    super()
    this.state = {
      positions: [[7,4],[3,6],[1,2],[0,0],[1,1],[4,3]],
      originIndex: null,
    }
    this.moveItem = this.moveItem.bind(this)
  }

  getIndex = (index) => {
    this.setState({
      originIndex: index
    })
  }

  moveItem(x, y, index){
    let targetIndex = -1
    for(let i = 0; i < this.state.positions.length; i++){
      if(this.state.positions[i][0] === x && this.state.positions[i][1] === y){
        targetIndex = i
      }
    }
    let tempArr = this.state.positions
    if(targetIndex !== -1){
      const target = this.state.positions[targetIndex]
      const origin = this.state.positions[this.state.originIndex]
      tempArr[this.state.originIndex] = target
      tempArr[index] = origin
    }
    else{
      tempArr[this.state.originIndex] = [x,y]
    }

    this.setState({
      positions: tempArr,
      originIndex: null
    })
  }
  
  render(){
    return (
        <Grid move={this.moveItem} get={this.getIndex} positions={this.state.positions}/>
    );
  }
}
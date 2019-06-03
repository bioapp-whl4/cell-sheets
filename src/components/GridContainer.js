import React, {Component} from 'react';
import Grid from './GridContainer-components/Grid'

class GridContainer extends Component {
  constructor(){
    super()
    this.state = {
      positions: [[7,4],[3,6],[1,2],[0,0],[1,1],[4,3]],
      index: null,
      targetIndex: null
    }
    this.selectItem = this.selectItem.bind(this)
  }

  async selectItem(index){
    if(this.state.index !== null){
      await this.setState({
        targetIndex: index
      })
      const target = this.state.positions[this.state.targetIndex]
      const origin = this.state.positions[this.state.index]
      let tempArr = this.state.positions
      tempArr[this.state.index] = target
      tempArr[this.state.targetIndex] = origin
      this.setState({
        positions: tempArr,
        index: null,
        targetIndex: null
      })
      return
    }
    
    this.setState({
        index
    })
  }

  moveItem = (position) => {
    if(this.state.index === null) return;
    let tempArr = this.state.positions
    tempArr.splice(this.state.index, 1, position)
    
    this.setState({
      positions: tempArr,
      index: null
    })
  }
  
  render(){
    return (
      <div>
        <Grid move={this.moveItem} select={this.selectItem} positions={this.state.positions}/>
      </div>
    );
  }
}

export default GridContainer;
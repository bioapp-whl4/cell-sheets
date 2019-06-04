import React, {Component} from 'react';
import Grid from './Grid'
import AddSpecimens  from './AddSpecimens'

export default class GridContainer extends Component {
  constructor(){
    super()
    this.state = {
      specimens: [],
      originIndex: null,
    }
    this.moveItem = this.moveItem.bind(this)
  }

  getSpecimens = (specimens) => {
    this.setState({
      specimens
    })
  }

  getIndex = (index) => {
    this.setState({
      originIndex: index
    })
  }

  moveItem(x, y, index){
    let targetIndex = -1
    for(let i = 0; i < this.state.specimens.length; i++){
      if(this.state.specimens[i].location[0] === x && this.state.specimens[i].location[1] === y){
        targetIndex = i
      }
    }
    let tempArr = this.state.specimens
    if(targetIndex !== -1){
      const target = this.state.specimens[targetIndex]
      const origin = this.state.specimens[this.state.originIndex]
      tempArr[this.state.originIndex] = target
      tempArr[index] = origin
    }
    else{
      tempArr[this.state.originIndex].location = [x,y]
    }

    this.setState({
      specimens: tempArr,
      originIndex: null
    })
  }
  
  render(){
    return (
      <>
        <Grid move={this.moveItem} get={this.getIndex} specimens={this.state.specimens}/>
        <AddSpecimens getSpecimens={this.getSpecimens}/>
      </>
    );
  }
}
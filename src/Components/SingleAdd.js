import React, {Component} from 'react'

export default class SingleAdd extends Component{
    constructor(props){
        super(props)
        this.state = {
            name: '',
            description: '',
            box_position: [],
            freeze_date: '',
            cell_vial: '',
            culture_condition: '',
            freezing_medium_id: '',
            expanded_note: '',
            show1: false,
            show2: false,
            show3: false,
            add1: '',
            add2: '',
            add3: '',
            locations: [],
            availableLocations: null,
            x: null,
            y: null
        }
        this.componentDidMount = this.componentDidMount.bind(this)
    }

    async componentDidMount(){
        var samples = this.props.specimens.map(sample => (
            sample.location
        ))
        const {x,y} = this.props
        let tempArr = []
        const totalSpaces = x * y
        await this.setState({
            locations: samples,
        })
        for(let i = 0; i < totalSpaces; i++){
            let tempX = i % x
            let tempY = Math.floor(i / x)
            var occupied = false
            for(let j = 0; j < this.state.locations.length; j++){
                if(tempX === this.state.locations[j][0] && tempY === this.state.locations[j][1]){
                    occupied = true
                }
            }
            if(!occupied){
                tempArr.push([tempX, tempY])
            }
        }
        this.setState({
            availableLocations: tempArr
        })

    }

    //axios.post("/api/sample")

    submitForm = (e) => {
        e.preventDefault()
        this.setState({
            name: '',
            description: '',
            box_position: [],
            freeze_date: '',
            cell_vial: '',
            culture_condition: '',
            freezing_medium_id: '',
            expanded_note: '',
            add1: '',
            add2: '',
            add3: ''
        })
    }

    addField = () => {
        if(!this.state.show1){
            this.setState({show1: true})
            return
        }
        if(!this.state.show2){
            this.setState({show2: true})
            return
        }
        if(!this.state.show3){
            this.setState({show3: true})
            return
        }
    }

    handleInput = (e) => {
        const {value} = e.target
        this.setState({
            [e.target.name]: value
        })
    }
    
    render(){
        return(
        <>
        <form onSubmit={this.submitForm}>
            <input onChange={this.handleInput} value={this.state.name} placeholder='Sample ID' name='name'/>
            <input onChange={this.handleInput} value={this.state.freeze_date} placeholder='Freeze Date' name='freeze_date'/>
            <input onChange={this.handleInput} value={this.state.cell_vial} placeholder='Culture Size' name='cell_vial'/>
            <input onChange={this.handleInput} value={this.state.culture_condition} placeholder='Culture Conditions' name='culture_condition'/>
            <input onChange={this.handleInput} value={this.state.freezing_medium_id} placeholder='Freezing Medium' name='freezing_medium_id'/>
            <input onChange={this.handleInput} value={this.state.description} placeholder='Description' name='description'/>
            <input onChange={this.handleInput} value={this.state.expanded_note} placeholder='Additional Notes' name='expanded_note'/>
            {this.state.show1 && <input onChange={this.handleInput} value={this.state.add1} placeholder='Additional Field 1' name='add1'/>}
            {this.state.show2 && <input onChange={this.handleInput} value={this.state.add2} placeholder='Additional Field 2' name='add2'/>}
            {this.state.show3 && <input onChange={this.handleInput} value={this.state.add3} placeholder='Additional Field 3' name='add3'/>}
            {!this.state.show3 && <p style={{color:'blue', textDecorationLine: 'underline', cursor: 'pointer'}} onClick={this.addField}>Add field</p>}
            <button>Submit</button>
        </form>
        </>
        )
    }
}
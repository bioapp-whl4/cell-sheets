import React, {Component} from 'react'
import axios from 'axios'

export default class AddSamples extends Component{
    constructor(props){
        super(props)
        this.state = {
            name: '',
            description: '',
            box_position: null,
            freeze_date: '',
            cell_vial: null,
            culture_condition: '',
            freezing_medium_id: null,
            expanded_note: '',
            show1: false,
            show2: false,
            show3: false,
            add1: '',
            add2: '',
            add3: '',
            add4: '',
            add5: '',
            locations: [],
            availableLocations: [],
            selectedLocations: [],
            x: null,
            y: null
        }
        this.componentDidMount = this.componentDidMount.bind(this)
        this.submitForm = this.submitForm.bind(this)
    }

    async componentDidMount(){
        let samples = this.props.specimens.map(sample => (
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

    async submitForm(e){
        e.preventDefault()
        
        //test data
        const user_key = 'Test'
        const location_id = 1
        const cane_id = 1
        const freezer_id = 1
        //const user_id = 1
        //const experiment_name = 'test experiment'
        //test data
        const {box_id} = this.props.box_id
        const {name, description, box_position, freeze_date, cell_vial, culture_condition, freezing_medium_id, expanded_note, add1, add2, add3, add4, add5} = this.state
        await axios.post("/api/sample", {name, description, box_id, box_position, freeze_date, cell_vial, culture_condition, freezing_medium_id, expanded_note, add1, add2, add3, add4, add5, /*test data*/ user_key, location_id, freezer_id, cane_id, /*user_id, experiment_name*/})

        this.props.updateSamples()

        this.setState({
            name: '',
            description: '',
            box_position: null,
            freeze_date: '',
            cell_vial: null,
            culture_condition: '',
            freezing_medium_id: null,
            expanded_note: '',
            add1: '',
            add2: '',
            add3: '',
            add4: '',
            add5: ''
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
        if(!this.state.show4){
            this.setState({show4: true})
            return
        }
        if(!this.state.show5){
            this.setState({show5: true})
            return
        }
    }

    handleInput = (e) => {
        var {value} = e.target
        if(e.target.name === "box_position" && value === 'null'){
            this.setState({
                box_position: null
            })
            return
        }
        if(e.target.name === "freezing_medium_id" && value === 'null'){
            this.setState({
                freezing_medium_id: null
            })
            return
        }
        if(e.target.name === "box_position"){
            let tempValue = value.split(',').map(Number)
            this.setState({
                box_position: tempValue
            })
            return
        }
        if(e.target.name === 'freezing_medium_id'){
            let tempValue = Number(value)
            this.setState({
                freezing_medium_id: tempValue
            })
            return
        }
        this.setState({
            [e.target.name]: value
        })
    }

    chooseSquare = (x,y) => {
        let tempArr = this.state.selectedLocations
        for(let i = 0; i < this.state.selectedLocations.length; i++){
            if(x === this.state.selectedLocations[i][0] && y === this.state.selectedLocations[i][1]){
                tempArr.splice(i, 1)
                this.setState({
                    selectedLocations: tempArr
                })
                return
            }
        }
        this.setState({
            selectedLocations: [...this.state.selectedLocations, [x,y]]
        })
    }
    
    render(){
        let samples = JSON.parse(JSON.stringify(this.state.availableLocations))
        samples.forEach((sample) => {
            sample[1] += 1
            switch(sample[0]){
                case 0:
                    sample[0] = 'A'
                    break
                case 1:
                    sample[0] = 'B'
                    break
                case 2:
                    sample[0] = 'C'
                    break
                case 3:
                    sample[0] = 'D'
                    break
                case 4:
                    sample[0] = 'E'
                    break
                case 5:
                    sample[0] = 'F'
                    break
                case 6:
                    sample[0] = 'G'
                    break
                case 7:
                    sample[0] = 'H'
                    break
                case 8:
                    sample[0] = 'I'
                    break
                default:
                    break
            }
        })

        const compare = (a,b) => {
            if(a[0] > b[0]) return 1
            if(a[0] < b[0]) return -1
            if(a[0] === b[0]){
                if(a[1] < b[1]) return -1
                if(a[1] > b[1]) return 1
            }
            return 0
        }

        this.state.availableLocations.sort(compare)
        samples.sort(compare)
        
        const options = samples.map((sample, i) => {
            return(
                <option key={i} value={this.state.availableLocations[i]}>{`${sample[0]}${sample[1]}`}</option>
            )
        })

        var displaySquares = []
        for(let i = 0; i < (this.props.x * this.props.y); i++){
            const x = i % this.props.x
            const y = Math.floor(i / this.props.x)
            let taken = false
            for(let j = 0; j < this.state.locations.length; j++){
                if(x === this.state.locations[j][0] && y === this.state.locations[j][1]){
                   taken = true
                }
            }
            if(taken){
                displaySquares.push(
                    <div key={i} style={{border: '1px solid black', width: '100px', height: '100px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '2rem'}}>
                        X
                    </div>
                )
            }
            else if(this.state.selectedLocations.length !== 0){
                for(let j = 0; j < this.state.selectedLocations.length; j++){
                    if(x === this.state.selectedLocations[j][0] && y === this.state.selectedLocations[j][1]){
                        displaySquares.push(
                            <div key={i} onClick={() => this.chooseSquare(x,y)} style={{border: '1px solid black', width: '100px', height: '100px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '2rem', cursor: 'pointer'}}>
                                {'\u2713'}
                            </div>
                        )
                        taken = true
                    }
                }
            }
            if(!taken){
                displaySquares.push(
                    <div key ={i} onClick={() => this.chooseSquare(x,y)} style={{border: '1px solid black', width: '100px', height: '100px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '3rem', cursor: 'pointer'}}></div>
                )
            }
        }

        return(
        <>
        <div style={{display: 'flex', flexWrap: 'wrap', height: '920px', width: '920px'}}>{displaySquares}</div>
        <form onSubmit={this.submitForm}>
            <input onChange={this.handleInput} value={this.state.name} placeholder='Sample ID' name='name'/>
            <select name='box_position' onChange={this.handleInput} value={this.state.box_position}>
                <option value='null'>Position</option>
                {options}
            </select>
            <input type='date' onChange={this.handleInput} value={this.state.freeze_date} name='freeze_date'/>
            <input onChange={this.handleInput} value={this.state.cell_vial} placeholder='Culture Size' name='cell_vial'/>
            <input onChange={this.handleInput} value={this.state.culture_condition} placeholder='Culture Conditions' name='culture_condition'/>
            <select name='freezing_medium_id' onChange={this.handleInput} value={this.state.freezing_medium_id}>
                <option value='null'>Freezing Medium</option>
                <option value={1}>Cryostor 100%</option>
            </select>
            <input onChange={this.handleInput} value={this.state.description} placeholder='Description' name='description'/>
            <input onChange={this.handleInput} value={this.state.expanded_note} placeholder='Additional Notes' name='expanded_note'/>
            {this.state.show1 && <input onChange={this.handleInput} value={this.state.add1} placeholder='Additional Field 1' name='add1'/>}
            {this.state.show2 && <input onChange={this.handleInput} value={this.state.add2} placeholder='Additional Field 2' name='add2'/>}
            {this.state.show3 && <input onChange={this.handleInput} value={this.state.add3} placeholder='Additional Field 3' name='add3'/>}
            {this.state.show4 && <input onChange={this.handleInput} value={this.state.add4} placeholder='Additional Field 4' name='add4'/>}
            {this.state.show5 && <input onChange={this.handleInput} value={this.state.add5} placeholder='Additional Field 5' name='add5'/>}
            {!this.state.show5 && <p style={{color:'blue', textDecorationLine: 'underline', cursor: 'pointer', width: 'fit-content'}} onClick={this.addField}>Add field</p>}
            <button>Submit</button>
        </form>
        </>
        )
    }
}
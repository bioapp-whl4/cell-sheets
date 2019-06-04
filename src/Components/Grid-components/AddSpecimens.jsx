import React, { Component } from 'react'
import Swal from 'sweetalert2';

class Filter extends Component{
    constructor(props){
        super(props)
        this.state = {
            specimens: [],
            rows: 0,
            columns: 0,
            row_to_edit: 0,
            column_to_edit: 0
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    
    addSpecimens = async (e) => {
        e.preventDefault()
        const {value: experiment_id} = await Swal.fire({
            title: 'Experiment ID',
            input: 'text',
            inputPlaceholder: 'Experiment ID'
            })
        const {value: specimen_id} = await Swal.fire({
            title: 'Default Specimen ID',
            input: 'text',
            inputPlaceholder: 'Enter the Default Specimen ID'
            })
        const {value: freeze_date} = await Swal.fire({
            title: 'Enter the Freeze Date',
            input: 'text',
            inputPlaceholder: 'Enter the Freeze Date'
            })
        const {value: description} = await Swal.fire({
            title: 'Default Description',
            input: 'text',
            inputPlaceholder: 'Default Description'
            })

        let specimens = []
        for (let i = 0; i < this.state.rows; i++){
            for (let j = 0; j < this.state.columns; j++){
                let new_specimen = {
                    location: [j, i],
                    experiment_id,
                    specimen_id,
                    freeze_date,
                    description
                }
                specimens.push(new_specimen)
            }
        }
        await this.setState({
            specimens
        })

        this.props.getSpecimens(this.state.specimens)
    }

    editRowsColumns = (rows, columns) => {
        rows.forEach(this.editRow)
        columns.forEach(this.editColumn)
    }

    // [row, column]
    editRow = async (e) => {
        e.preventDefault()
        const {value: field_to_edit} = await Swal.fire({
            title: 'Select the field to edit',
            input: 'select',
            inputOptions: {
              'specimen_id': 'Specimen ID',
              'experiment_id': 'Experiment ID',
              'freeze_date': 'Freeze Date',
              'description': 'Description'
            },
            inputPlaceholder: 'Select a field',
            showCancelButton: true
            })
            const {value: new_value} = await Swal.fire({
                title: 'Updated Value',
                input: 'text',
                inputPlaceholder: 'Updated Value'
            })
        let row_to_edit = this.state.row_to_edit - 1
        let new_specimens = this.state.specimens.map(spec => {
            if (spec.location[1] === row_to_edit){
                let updated_spec = {
                    ...spec,
                    [field_to_edit]: new_value
                }
                return updated_spec
            } else {
                return spec
            }
        })
        await this.setState({
            specimens: new_specimens
        })

        this.props.getSpecimens(this.state.specimens)
    }

    editColumn = async (e) => {
        e.preventDefault()
        const {value: field_to_edit} = await Swal.fire({
            title: 'Select the field to edit',
            input: 'select',
            inputOptions: {
              'specimen_id': 'Specimen ID',
              'experiment_id': 'Experiment ID',
              'freeze_date': 'Freeze Date',
              'description': 'Description'
            },
            inputPlaceholder: 'Select a field',
            showCancelButton: true
            })
            const {value: new_value} = await Swal.fire({
                title: 'Updated Value',
                input: 'text',
                inputPlaceholder: 'Updated Value'
            })
        let column_to_edit = this.state.column_to_edit - 1
        let new_specimens = this.state.specimens.map(spec => {
            if (spec.location[0] === column_to_edit){
                let updated_spec = {
                    ...spec,
                    [field_to_edit]: new_value
                }
                return updated_spec
            } else {
                return spec
            }
        })
        this.setState({
            specimens: new_specimens
        })

        this.props.getSpecimens(this.state.specimens)
    }

    showGrid = () => {
        console.log(this.state.specimens)
    }


    render(){
        return(
            <div>
                <form onSubmit={this.addSpecimens}>
                    <header>
                        Create a new grid of Specimens:
                    </header>
                    <div>
                        <span>Rows:</span>
                        <input onChange={this.handleChange} type='number' placeholder='Rows' name='rows' value={this.state.rows}/>
                        <span>Columns:</span>
                        <input onChange={this.handleChange} type='number' placeholder='Columns' name='columns' value={this.state.columns}/>
                    </div>
                    <button>Create Grid</button>
                </form>
                <form onSubmit={this.editRow}>
                    <header>
                        Edit an ENTIRE ROW of Specimens:
                    </header>
                    <div>
                        <span>Row:</span>
                        <input onChange={this.handleChange} type='number' placeholder='Row to Edit' name='row_to_edit' value={this.state.row_to_edit}/>
                    </div>
                    <button>Edit Row</button>
                </form>
                <form onSubmit={this.editColumn}>
                    <header>
                        Edit an ENTIRE COLUMN of Specimens:
                    </header>
                    <div>
                        <span>Column:</span>
                        <input onChange={this.handleChange} type='number' placeholder='Column to Edit' name='column_to_edit' value={this.state.column_to_edit}/>
                    </div>
                    <button>Edit Column</button>
                </form>
                <button onClick={this.showGrid}> Show me the grid!</button>
            </div>
        )
    }
}

export default Filter
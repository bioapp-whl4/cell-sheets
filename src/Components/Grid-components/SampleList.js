import React from 'react'
import {submit_picklist} from '../../redux/display.reducer'
import {connect} from 'react-redux'

function SampleList(props){
    var samples = JSON.parse(JSON.stringify(props.specimens))

    samples.forEach((sample) => {
        sample.location[1] += 1
        switch(sample.location[0]){
            case 0:
                sample.location[0] = 'A'
                break
            case 1:
                sample.location[0] = 'B'
                break
            case 2:
                sample.location[0] = 'C'
                break
            case 3:
                sample.location[0] = 'D'
                break
            case 4:
                sample.location[0] = 'E'
                break
            case 5:
                sample.location[0] = 'F'
                break
            case 6:
                sample.location[0] = 'G'
                break
            case 7:
                sample.location[0] = 'H'
                break
            case 8:
                sample.location[0] = 'I'
                break
            default:
                break
        }
    })

    const compare = (a,b) => {
        if(a.location[0] > b.location[0]) return 1
        if(a.location[0] < b.location[0]) return -1
        if(a.location[0] === b.location[0]){
            if(a.location[1] < b.location[1]) return -1
            if(a.location[1] > b.location[1]) return 1
        }
        return 0
    }

    samples.sort(compare)

    function handleCheck(sample){
        let new_picklist
        let removed = props.picklist.filter(pl_item => {
            return pl_item.specimen_id !== sample.specimen_id
        })
        if (removed.length === props.picklist.length){
            new_picklist = [...props.picklist, sample]
        } else {
            new_picklist = removed
        }
        props.submit_picklist(new_picklist)
    }

    const displaySamples = samples.map((sample, i) => (
        <div key={i}>
            <h3>{sample.location}</h3> 
            <div>
                <input type="checkbox" name="experiment_id" onClick={() => {handleCheck(sample)}} defaultUnChecked/>
                <label>Experiment ID</label>
            </div>  
            <p>Sample ID: {sample.sample_name}</p>
            <p>Experiment ID: {sample.experiment_id}</p>
            <p>Culture Conditions: {sample.culture_condition}</p>
            <p>Cells/Vial: {sample.cell_vial}</p>
            <p>Freeze Date: {sample.freeze_date}</p>
            <p>Description: {sample.description}</p>
        </div>
    ))

    return(
        <div>
            {displaySamples}
        </div>
    )

}

const mapDispatchToProps = {submit_picklist}
const mapStateToProps = (reduxState) => {
    const { picklist } = reduxState.display
    return { picklist } 
}

export default connect(mapStateToProps, mapDispatchToProps)(SampleList)


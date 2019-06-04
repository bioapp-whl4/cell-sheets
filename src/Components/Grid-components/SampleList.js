import React from 'react'

export default function SampleList(props){
    const samples = JSON.parse(JSON.stringify(props.specimens))
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
        return 0
    }

    samples.sort(compare)

    const displaySamples = samples.map((sample, i) => (
        <div key={i}>
            <h3>{sample.location}</h3>
            <p>Sample ID: {sample.specimen_id}</p>
            <p>Experiment ID: {sample.experiment_id}</p>
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
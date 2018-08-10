import React, {Component} from 'react'

const style = {
    loading: {
        fontSize: 30,
        fontWeight: 'bold',
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        color: 'red'
    }
}

export default class Loading2 extends Component {
    render () {
        return (
            <div style={style.loading}>
                Loading...
            </div>
        )
    }
}

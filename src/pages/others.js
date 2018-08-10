import React from 'react';
import { Link } from 'react-router-dom';
console.log('others')


export default class Others extends React.Component {
    render() {
        return (
            <div>
                <h3>Others</h3>
                <Link to="/">跳到 Home 页</Link>
                <Link to='/user'>跳到 User 页</Link>
            </div>
        )
    }
}

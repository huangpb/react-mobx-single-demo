import React from 'react';
import { Link } from 'react-router-dom';
console.log('User')


export default class User extends React.Component {
    componentWillMount() {
        console.log(this.props)
    }

    render() {
        return (
            <div>
                <h3>User</h3>
                <Link to="/">跳到 Home 页</Link>
                <Link to="/others">跳到 Others 页</Link>
            </div>
        )
    }
}

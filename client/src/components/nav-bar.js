import React from 'react';
import { Link } from 'react-router-dom';

export default class NavBar extends React.Component {

    render() {
        return (
            <h1>
                <Link style={noTextDecoration} to="/bots">Bots</Link>{' '}
                <Link style={noTextDecoration} to="/bot/create">Add new bot</Link>{' '}
            </h1>
        )
    }
}

const noTextDecoration = {
    textDecoration: 'none'
};
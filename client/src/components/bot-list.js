import React from 'react';
import { Link } from 'react-router-dom';
import { ListGroup, ListGroupItem, Label } from 'react-bootstrap';

export default function BotList({ bots, deleteBot }) {
    const emptyMessage = <p>There are no bots yet in your collection.</p>;
    const rows = [];

    bots.forEach((bot) => {
        rows.push(
            <ListGroupItem key={bot._id}>
                {bot.name} {'  '}
                {bot.description}
                <h4>
                    <Label bsStyle="info">
                        <Link style={noTextDecoration} to={`/bots/${bot._id}`}>Edit</Link></Label>{' '}
                    <Label bsStyle="danger"
                        onClick={() => deleteBot(bot._id)}>
                        Delete
                        </Label>
                </h4>
            </ListGroupItem>
        );
    });

    return (
        <ListGroup>
            {bots.length === 0 ? emptyMessage : rows}
        </ListGroup>
    );
}


const noTextDecoration = {
    textDecoration: 'none'
};
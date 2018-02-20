import React from 'react';
import { Button, Label, FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';

class BotForm extends React.Component {
    state = {
        name: this.props.bot ? this.props.bot.name : '',
        description: this.props.bot ? this.props.bot.description : '',
        _id: this.props.bot ? this.props.bot._id : null,
        errors: {},
        loading: false
    };

    componentWillReceiveProps = nextProps => {
        this.setState({
            _id: nextProps.bot._id,
            name: nextProps.bot.title,
            description: nextProps.bot.description
        });
    };

    handleChange = e => {
        if (!!this.state.errors[e.target.name]) {
            let errors = Object.assign({}, this.state.errors);
            delete errors[e.target.name];
            this.setState({ [e.target.name]: e.target.value, errors });
        } else {
            this.setState({ [e.target.name]: e.target.value });
        }
    };

    handleSubmit = e => {
        e.preventDefault();

        // validation
        let errors = {};
        if (this.state.name === '') errors.name = "Can't be empty";
        this.setState({ errors });
        const isValid = Object.keys(errors).length === 0;

        if (isValid) {
            const { _id, name, description } = this.state;
            this.setState({ loading: true });
            this.props.saveBot({ _id, name, description })
                .catch(err =>
                    err
                        .response.json()
                        .then(({ errors }) => this.setState({ errors, loading: false })));
        }
    };

    render() {
        return (
            <div>
                <h1>Add new bot</h1>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <FieldGroup
                            label="Name"
                            name="name"
                            value={this.state.name}
                            onChange={this.handleChange}
                            placeholder="Enter name"
                            type="text"
                            id="name" />

                        <Label bsStyle="danger">{this.state.errors.name}</Label>
                    </div>

                    <FieldGroup
                        label="Description"
                        name="description"
                        placeholder="Enter description"
                        value={this.state.description}
                        onChange={this.handleChange}
                        type="text"
                        id="description" />


                    <Button type="submit">Save</Button>
                </form>
            </div>
        );
    }
}

function FieldGroup({ id, label, help, getValidationState, ...props }) {
    return (
        <FormGroup controlId={id}>
            <ControlLabel>{label}</ControlLabel>
            <FormControl {...props} />
            {help && <HelpBlock>{help}</HelpBlock>}
        </FormGroup>
    );
}

export default BotForm;

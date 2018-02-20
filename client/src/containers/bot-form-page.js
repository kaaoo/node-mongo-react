import React from 'react';
import { connect } from 'react-redux';
import { saveBot, fetchBot, updateBot } from '../actions';
import { Redirect } from 'react-router-dom';
import BotForm from '../components/bot-form';

class BotFormPage extends React.Component {
  state = {
    redirect: false
  };

  componentDidMount = () => {
    if (this.props.match.params._id) {
      this.props.fetchBot(this.props.match.params._id);
    }
  };

  saveBot = ({ _id, name, description }) => {
    if (_id) {
      return this.props.updateBot({ _id, name, description }).then(() => {
        this.setState({ redirect: true });
      });
    } else {
      return this.props.saveBot({name, description }).then(() => {
        this.setState({ redirect: true });
      });
    }
  };

  render() {
    return (
      <div>
        {this.state.redirect
          ? <Redirect to="/bots" />
          : <BotForm bot={this.props.bot} saveBot={this.saveBot} />}
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  if (props.match.params._id) {
    return {
      bot: state.bots.find(item => item._id === props.match.params._id)
    };
  }

  return { bot: null };
}

export default connect(mapStateToProps, { saveBot, fetchBot, updateBot })(
  BotFormPage
);

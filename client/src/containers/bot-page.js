import React from 'react';
import { connect } from 'react-redux';
import BotList from '../components/bot-list';
import { fetchBots, deleteBot } from '../actions';

class BotPage extends React.Component {
  componentDidMount() {
    this.props.fetchBots();
  }

  render() {
    return (
      <div>
        <h2>Bot List</h2>

        <BotList
          bots={this.props.bots}
          deleteBot={this.props.deleteBot}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    bots: state.bots
  };
}

export default connect(mapStateToProps, { fetchBots, deleteBot })(BotPage);

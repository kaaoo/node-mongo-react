import {
    SET_BOTS,
    ADD_BOT,
    BOT_FETCHED,
    BOT_UPDATED,
    BOT_DELETED
  } from '../actions';
  
  export default function bots(state = [], action = {}) {
    switch (action.type) {
      case ADD_BOT:
        return [...state, action.bot];
  
      case BOT_FETCHED:
        const index = state.findIndex(item => item._id === action.bot._id);
        if (index > -1) {
          return state.map(item => {
            if (item._id === action.bot._id) return action.bot;
            return item;
          });
        } else {
          return [...state, action.bot];
        }
  
      case BOT_UPDATED:
        return state.map(item => {
          if (item._id === action.bot._id) return action.bot;
          return item;
        });
  
      case BOT_DELETED:
        return state.filter(item => item._id !== action.botId);
  
      case SET_BOTS:
        return action.bots;
  
      default:
        return state;
    }
  }
  
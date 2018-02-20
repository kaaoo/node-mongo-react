export const SET_BOTS = 'SET_BOTS';
export const ADD_BOT = 'ADD_BOT';
export const BOT_FETCHED = 'BOT_FETCHET';
export const BOT_UPDATED = 'BOT_UPDATED';
export const BOT_DELETED = 'BOT_DELETED';

function handleResponse(res) {
  if (res.ok) {
    return res.json();
  } else {
    let error = new Error(res.statusText);
    error.response = res;
    throw error;
  }
}

export function setBots(bots) {
  return {
    type: SET_BOTS,
    bots
  };
}

export function addBot(bot) {
  return {
    type: ADD_BOT,
    bot
  };
}

export function botUpdated(bot) {
  return {
    type: BOT_UPDATED,
    bot
  };
}

export function botDeleted(botId) {
  return {
    type: BOT_DELETED,
    botId
  };
}

export function botFetched(bot) {
  return {
    type: BOT_FETCHED,
    bot
  };
}

export function fetchBots() {
  return dispatch => {
    fetch('/bots')
      .then(res => res.json())
      .then(data => dispatch(setBots(data.list_bots)));
  };
}

export function fetchBot(id) {
  return dispatch => {
    fetch(`/bots/${id}`)
      .then(res => res.json())
      .then(data => dispatch(botFetched(data.bot)));
  };
}

export function saveBot(data) {
  return dispatch => {
    return fetch('/bot/create', {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json'
      }
    })
      .then(handleResponse)
      .then(data => dispatch(addBot(data.bot)));
  };
}

export function updateBot(data) {
  return dispatch => {
    return fetch(`/bot/${data._id}/update`, {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json'
      }
    })
      .then(handleResponse)
      .then(data => dispatch(botUpdated(data.bot)));
  };
}

export function deleteBot(id) {
  return dispatch => {
    return fetch(`/bot/${id}/delete`, {
      method: 'delete',
      headers: {
        'Content-type': 'application/json'
      }
    })
      .then(handleResponse)
      .then(data => dispatch(botDeleted(id)));
  };
}
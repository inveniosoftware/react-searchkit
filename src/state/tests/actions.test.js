import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { setMessage } from '@app/state//actions';
import * as types from '@app/state/types';
import expect from 'expect';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('test example actions', () => {
  let store;
  beforeEach(() => {
    store = mockStore({
      message: 'initial_message',
    });
    store.clearActions();
  });

  it('fires a set message action', () => {
    const message = 'this is my message';
    const expectedActions = [
      {
        type: types.SET_MESSAGE,
        payload: message,
      },
    ];

    store.dispatch(setMessage(message));
    let actions = store.getActions();
    expect(actions[0]).toEqual(expectedActions[0]);
  });
});

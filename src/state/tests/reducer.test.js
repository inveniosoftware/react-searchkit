import reducer from '@app/state/reducer';
import expect from 'expect';

describe('example test reducer', () => {
  it('returns the initial state', () => {
    let initialState = {
      message: 'message',
    };
    expect(reducer(initialState, {})).toEqual(initialState);
  });
});

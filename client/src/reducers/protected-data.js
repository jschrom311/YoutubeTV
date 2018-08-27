import {
    FETCH_PROTECTED_DATA_SUCCESS,
    FETCH_PROTECTED_DATA_ERROR,
    DATA_FROM_API
} from '../actions/protected-data';

const initialState = {
    data: '',
    error: null,
    clips: [],
    players: [],
    channel: 0,
};

/*export default function reducer(state = initialState, action) {
    if (action.type === FETCH_PROTECTED_DATA_SUCCESS) {
        return Object.assign({}, state, {
            data: action.data,
            error: null
        });
    } else if (action.type === FETCH_PROTECTED_DATA_ERROR) {
        return Object.assign({}, state, {
            error: action.error
        });
    }
    return state;
}*/

export default function reducer(state = initialState, action) {
    switch (action.type) {
      case FETCH_PROTECTED_DATA_SUCCESS:
      return {
        ...state,
        data: action.data,
        error: null
      }

      case FETCH_PROTECTED_DATA_ERROR:
      return {
        ...state,
        error: action.error
      }

      case DATA_FROM_API:
      return {
        ...state,
        clips: action.data.items,
        error: null,
        channel: 0,
      }
    
      default:
      return state
    }
}

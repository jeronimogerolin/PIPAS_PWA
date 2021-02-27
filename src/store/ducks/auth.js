// import AsyncStorage from '@react-native-community/async-storage';

// ======== Action Types ===========
export const Types = {
  SET: 'authentication/ADD',
  CLEAR: 'authentication/CLEANNING',
  REDEFINED_PASSWORD: 'authentication/REDEFINED_PASSWORD',
};

// ======== Reducers ===========
const initialState = {
  token: '',
  user: {},
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case Types.SET:
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
      };

    case Types.CLEAR:
      return { ...initialState };

    default:
      return state;
  }
}

// ======== Actions Creators ===========
export function AddAuthData(payload) {
  return {
    type: Types.SET,
    payload,
  };
}

export function ClearAuthData() {
  return {
    type: Types.CLEAR,
    payload: null,
  };
}

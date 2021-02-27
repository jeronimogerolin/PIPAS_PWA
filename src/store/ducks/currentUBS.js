
// ======== Action Types ===========
export const Types = {
  SET: 'currentUBS/ADD',
  CLEAR: 'currentUBS/CLEANNING',
};

// ======== Reducers ===========
const initialState = {
  ubs: {}
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case Types.SET:
      return { ubs: action.payload };

    case Types.CLEAR:
      return initialState;

    default:
      return state;
  }
}

// ======== Actions Creators ===========
export function setCurrentUBS(payload) {
  return {
    type: Types.SET,
    payload,
  };
}

export function clearCurrentUBS() {
  return {
    type: Types.CLEAR,
    payload: null,
  };
}

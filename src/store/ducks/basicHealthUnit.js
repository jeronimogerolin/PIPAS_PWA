// ======== Action Types ===========
export const Types = {
  SET: 'ubs/ADD',
  CLEAR: 'ubs/CLEANNING',
};

// ======== Reducers ===========
const initialState = [];

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case Types.SET:
      return action.payload;
    case Types.CLEAR:
      return initialState;

    default:
      return state;
  }
}

// ======== Actions Creators ===========
export function AddUbsData(payload) {
  return {
    type: Types.SET,
    payload,
  };
}

export function ClearUbsData() {
  return {
    type: Types.CLEAR,
    payload: null,
  };
}

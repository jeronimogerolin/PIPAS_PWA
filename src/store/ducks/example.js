// ======== Action Types ===========
export const Types = {
  SET_EXAMPLE: 'example/SET',
};

// ======== Reducers ===========
const initialState = {
  example: {},
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case Types.SET_EXAMPLE:
      return { ...state, example: action.payload };

    default:
      return state;
  }
}

// ======== Actions Creators ===========
export function setExample(data) {
  return {
    type: Types.SET_EXAMPLE,
    payload: data,
  };
}

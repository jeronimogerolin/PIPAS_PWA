// import AsyncStorage from '@react-native-community/async-storage';

// ======== Action Types ===========
export const Types = {
  SET: 'block/ADD',
  CLEAR: 'block/CLEANNING',
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
export function AddBlockData(payload) {
  const formattedBlocks = payload.map((block) => {
    if (block.parameterAge) {
      block.parameterAge = block.parameterAge
        .split(',')
        .map((month) => month && Number(month));
    } else {
      block.parameterAge = null;
    }
    return block;
  });

  return {
    type: Types.SET,
    payload: formattedBlocks,
  };
}

export function ClearBlockData() {
  return {
    type: Types.CLEAR,
    payload: null,
  };
}

/* eslint-disable no-confusing-arrow */
// ======== Action Types ===========
export const Types = {
  SET_SYNC: 'questionnaries/SET_SYNC',
  ADD: 'questionnaries/ADD',
  TOGGLE_SYNC: 'questionnaries/TOGGLE_SYNC',
  CLEAR_SYNCED: 'questionnaries/CLEAR_SYNCED',
  CLEAR_ALL: 'questionnaries/CLEAR_ALL',
};

// ======== Reducers ===========
const initialState = [];

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case Types.SET_SYNC:
      return action.payload;

    case Types.ADD:
      return [...state, action.payload];

    case Types.TOGGLE_SYNC:
      return state.map((questionnarie) =>
        questionnarie.identifier === action.payload.identifier
          ? action.payload
          : questionnarie
      );

    case Types.CLEAR_SYNCED:
      return [...state.filter((item) => !item.synced)];

    case Types.CLEAR_ALL:
      return initialState;

    default:
      return state;
  }
}

// ======== Actions Creators ===========
export function saveAllSyncedQuestionnaries(payload) {
  const questionnaries = payload.map((questionnaire) =>
    Object.assign(questionnaire, { synced: true })
  );

  return {
    type: Types.SET_SYNC,
    payload: questionnaries,
  };
}

export function setQuestionnaire(payload) {
  return {
    type: Types.ADD,
    payload: Object.assign(payload, { synced: false }),
  };
}

export function toggleToSynced(questionnarie) {
  return {
    type: Types.TOGGLE_SYNC,
    payload: Object.assign(questionnarie, { synced: true }),
  };
}

export function clearSyncedQuestionnaries() {
  return {
    type: Types.CLEAR_SYNCED,
    payload: null,
  };
}

export function clearAllQuestionnaries() {
  return {
    type: Types.CLEAR_ALL,
    payload: null,
  };
}

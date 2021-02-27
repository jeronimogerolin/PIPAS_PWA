/* eslint-disable no-case-declarations */
import { findIndex } from 'lodash';

// ======== Action Types ===========
export const Types = {
  SET: 'interview/ADD',
  CLEAR: 'interview/CLEANNING',
  SET_RESPONSE: 'interview/SET_RESPONSE',
  REMOVE_RESPONSE: 'interview/REMOVE_RESPONSE',
};

// ======== Reducers ===========
const initialState = {
  childName: '',
  idUser: null,
  idInstitution: null,
  idUbs: null,
  interviewDate: '',
  childBirthDate: '',
  blockPipas: null,
  responses: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case Types.SET:
      return {
        ...state,
        ...action.payload,
      };

    case Types.SET_RESPONSE:
      let updatedResponses = state.responses;
      let responseIndex;

      if (action.payload.isMultiple) {
        responseIndex = findIndex(state.responses, {
          idQuestion: action.payload.idQuestion,
          idAnswer: action.payload.idAnswer,
        });
      } else {
        responseIndex = findIndex(state.responses, {
          idQuestion: action.payload.idQuestion,
        });
      }

      if (responseIndex >= 0) {
        if (action.payload.isMultiple) {
          updatedResponses.splice(responseIndex, 1);
        } else {
          updatedResponses[responseIndex] = action.payload;
        }
      } else {
        updatedResponses = [...updatedResponses, action.payload];
      }

      return {
        ...state,
        responses: updatedResponses,
      };

    case Types.REMOVE_RESPONSE:
      const resIndex = findIndex(state.responses, {
        idQuestion: action.payload,
      });

      if (resIndex >= 0) {
        state.responses.splice(resIndex, 1);
      }

      return state;

    case Types.CLEAR:
      return initialState;

    default:
      return state;
  }
}

// ======== Actions Creators ===========
export function setInterviewData(payload) {
  return {
    type: Types.SET,
    payload,
  };
}

export function setResponseData(payload) {
  return {
    type: Types.SET_RESPONSE,
    payload,
  };
}

export function removeResponseData(id) {
  return {
    type: Types.REMOVE_RESPONSE,
    payload: id,
  };
}

export function clearInterviewData() {
  return {
    type: Types.CLEAR,
    payload: null,
  };
}

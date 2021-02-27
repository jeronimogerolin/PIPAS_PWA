import { AddUbsData } from '../store/ducks/basicHealthUnit';
import { AddBlockData } from '../store/ducks/block';
import { saveAllSyncedQuestionnaries } from '../store/ducks/questionnaries';
import {
  blockApi,
  basicHealthUnitApi,
  questionnariesApi,
} from '../services/api';

const downloadUBS = (dispatch) =>
  new Promise((resolve) => {
    basicHealthUnitApi
      .findAll()
      .then((response) => {
        dispatch(AddUbsData(response.data.data));
        resolve(true);
      })
      .catch(() => {
        dispatch(AddUbsData([]));
        resolve(false);
      });
  });

const downloadBlockOfQuestions = (dispatch) =>
  new Promise((resolve) => {
    blockApi
      .findAll()
      .then((response) => {
        dispatch(AddBlockData(response.data.data));
        resolve(true);
      })
      .catch(() => {
        dispatch(AddBlockData([]));
        resolve(false);
      });
  });

const downloadQuestionnaries = (dispatch, user) =>
  new Promise((resolve) => {
    questionnariesApi
      .findAllByUser(user.id)
      .then((response) => {
        dispatch(saveAllSyncedQuestionnaries(response.data.data));
        resolve(true);
      })
      .catch(() => {
        dispatch(saveAllSyncedQuestionnaries([]));
        resolve(false);
      });
  });

const downloadInformations = async (dispatch, user) => {
  await downloadUBS(dispatch);
  // await downloadQuestionnaries(dispatch, user);
  await downloadBlockOfQuestions(dispatch);
};

export default downloadInformations;

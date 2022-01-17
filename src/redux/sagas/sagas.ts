import { all, call, fork, takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';
import { getDataSuccess } from '../actions/researchActions';

export type DataTypes = {
  id: number;
  date: string;
  storeId: number;
  storeName: string;
  score: number;
};

export default function* rootSaga() {
  yield all([fork(getData)]);
}

const fetchData = async () => {
  const data = await axios.get(
    'https://storage.googleapis.com/dito-questions/survey-responses.json'
  );
  return data;
};

function* getData() {
  yield takeEvery('GET_DATA', callGetData);
}

function* callGetData() {
  try {
    const { data }: { data: Array<DataTypes> } = yield call(fetchData);
    yield put(getDataSuccess(data));
  } catch (e: unknown) {
    const { message } = e as Error;
    return message;
  }
}

import { DataTypes } from "../sagas/sagas";

export const getData = () => ({
  type: 'GET_DATA',
});

export const getDataSuccess = (data: Array<DataTypes>) => ({
  type: 'GET_DATA_SUCCESS',
  payload: data,
});

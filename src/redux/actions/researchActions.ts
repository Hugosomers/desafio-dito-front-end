export const getData = () => ({
  type: 'GET_DATA',
});

export const getDataSuccess = (data: any) => ({
  type: 'GET_DATA_SUCCESS',
  payload: data,
});

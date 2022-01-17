import { DataTypes } from '../sagas/sagas';

export type Actions = {
  type: string;
  payload: Array<DataTypes>;
};

const INITIAL_STATE = {
  data: [],
};

const researchReducer = (state = INITIAL_STATE, action: Actions) => {
  switch (action.type) {
    case 'GET_DATA_SUCCESS':
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};

export default researchReducer;

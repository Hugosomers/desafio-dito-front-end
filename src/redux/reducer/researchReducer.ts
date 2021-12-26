export type Actions = {
  type: string;
};

const INITIAL_STATE = {
  data: {},
};

const researchReducer = (state = INITIAL_STATE, action: any) => {
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

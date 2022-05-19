const initialState = {
  User: null,
};

const LoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        User: action.payload,
      };

    default:
      return state;
  }
};

export default LoginReducer;



const INITIAL_STATE = {
  currentUser: null,
  admin:null
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "setUser":
      return {
        ...state,
        currentUser: action.payload
      };
      case "setAdmin":
      return {
        ...state,
        admin: action.payload
      };
    default:
      return state;
  }
};

export default userReducer;

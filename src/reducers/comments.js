import { GET_COMMENTS, RESET_COMMENTS, ADD_COMMENT } from "../constants/actions";

const initState = {
  comments: [],
};

export default function reducer(state = initState, action) {
  const { comments, params: { page } = {}, total } = action.payload || {};
  switch (action.type) {
    case GET_COMMENTS:
      return {
        ...state,
        comments: { ...new Set([...state.comments, ...comments]) },
        page,
        total,
      };
      case RESET_COMMENTS:
      return initState;
      case ADD_COMMENT:
      return {
        ...state,
        comments: [action.payload, ...state.comments],
      };
    default:
      return state;
  }
}

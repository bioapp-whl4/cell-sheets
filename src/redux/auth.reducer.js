console.log("this is my reducer");
const initialState = {
  user_id: null,
  username: "",
  firstname: "",
  lastname: "",
  email: "",
  sample: []
};
//AUTH
const UPDATE_USER_ID = "UPDATE_USER_ID";
const UPDATE_FIRSTNAME = "UPDATE_FIRSTNAME";
const UPDATE_USER_DETAILS = "UPDATE_USER_DETAILS";
const GET_USER = "GET_USER_DETAILS";
const ADD_SAMPLE = "ADD_SAMPLE";
//const UPDATE_SAMPLE = "UPDATE_SAMPLE";

export function updateUserId(id) {
  return {
    type: UPDATE_USER_ID,
    payload: id
  };
}
export function updateFirstname(firstname) {
  return {
    type: UPDATE_FIRSTNAME,
    payload: firstname
  };
}
export function updateUserDetails(obj) {
  return {
    type: UPDATE_USER_DETAILS,
    payload: obj
  };
}
export default function reducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_USER_ID:
      return { ...state, user_id: payload };
    case UPDATE_FIRSTNAME:
      return { ...state, firstname: payload };
    case UPDATE_USER_DETAILS:
      const { first_name, last_name, email } = payload;
      return { ...state, first_name, last_name, email };
    case GET_USER + "_FULFILLED":
      const { user_id } = payload;
      return { ...state, user_id };
    //CART
    case ADD_SAMPLE + "_FULFILLED":
      return Object.assign({}, state, {
        cart: payload.cart,
        total: payload.total
      });
    default:
      return state;
  }
}
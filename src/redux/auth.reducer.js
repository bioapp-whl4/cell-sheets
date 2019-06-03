console.log("this is my reducer");
const initialState = {
  user_id: null,
  username: "",
  firstname: "",
  lastname: "",
  email: "",
  sample: [],
  // freezer info
  freezer: [],
  freezercane: [],
  freezerbox: [],
  box: []
};
//AUTH
const UPDATE_USER_ID = "UPDATE_USER_ID";
const UPDATE_FIRSTNAME = "UPDATE_FIRSTNAME";
const UPDATE_USER_DETAILS = "UPDATE_USER_DETAILS";
const GET_USER = "GET_USER_DETAILS";
const ADD_SAMPLE = "ADD_SAMPLE";
//const UPDATE_SAMPLE = "UPDATE_SAMPLE";
//freezer info
const UPDATE_FREEZER = 'UPDATE_FREEZER'
const UPDATE_FREEZERCANE = 'UPDATE_FREEZERCANE'
const UPDATE_FREEZERBOX = 'UPDATE_FREEZERBOX'
const UPDATE_BOX = 'UPDATE_BOX'
// freezer info export functions
export function updateFreezer(freezer) {
  return {
    type: UPDATE_FREEZER,
    payload: freezer
  }
}
export function updateFreezerCane(freezercane) {
  return {
    type: UPDATE_FREEZERCANE,
    payload: freezercane
  }
}
export function updateFreezerBox(freezerbox) {
  return {
    type: UPDATE_FREEZERBOX,
    payload: freezerbox
  }
}
export function updateBox (box) {
  return {
    type: UPDATE_BOX,
    payload: box
  }
}
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
    //Freezer locations
    case UPDATE_FREEZER:
    return {...state,freezer: payload}
    case UPDATE_FREEZERCANE:
    return {...state,freezercane: payload}
    case UPDATE_FREEZERBOX:
    return {...state,freezerbox: payload}
    case UPDATE_BOX:
    return {...state,box: payload}
    default:
      return state;
  }
}

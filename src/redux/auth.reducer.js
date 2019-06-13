const initialState = {
  user_id: null,
  username: "",
  firstname: "",
  lastname: "",
  email: "",
  sample: [],
  samples: [],
  // Add New Sample freezer adding location
  freezers: [],
  freezercanes: [],
  freezerboxes: [],
  boxes: [],
  everything: null,
  filterTerm: "",
  filter_results: []
};
//AUTH
const UPDATE_USER_ID = "UPDATE_USER_ID";
const UPDATE_FIRSTNAME = "UPDATE_FIRSTNAME";
const UPDATE_USER_DETAILS = "UPDATE_USER_DETAILS";
const GET_USER = "GET_USER_DETAILS";
const ADD_SAMPLE = "ADD_SAMPLE";
const UPDATE_SAMPLES = "UPDATE_SAMPLES";
const UPDATE_FILTERTERM = "UPDATE_FILTERTERM";
//const UPDATE_SAMPLE = "UPDATE_SAMPLE";
//freezer info
const FILTER_RESULTS = "FILTER_RESULTS";
const UPDATE_EVERYTHING = "UPDATE_EVERYTHING";
const UPDATE_FREEZERS = "UPDATE_FREEZERS";
const UPDATE_FREEZERCANES = "UPDATE_FREEZERCANES";
const UPDATE_FREEZERBOXES = "UPDATE_FREEZERBOXES";
const UPDATE_BOXES = "UPDATE_BOXES";
// freezer info export functions
export function updateFreezers(freezers) {
  return {
    type: UPDATE_FREEZERS,
    payload: freezers
  };
}
export function updateFreezerCanes(freezercanes) {
  return {
    type: UPDATE_FREEZERCANES,
    payload: freezercanes
  };
}
export function updateFreezerBoxes(freezerboxes) {
  return {
    type: UPDATE_FREEZERBOXES,
    payload: freezerboxes
  };
}
export function updateBoxes(boxes) {
  return {
    type: UPDATE_BOXES,
    payload: boxes
  };
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
export function updateEverything(array) {
  return {
    type: UPDATE_EVERYTHING,
    payload: array
  };
}
export function updateSamples(array) {
  return {
    type: UPDATE_SAMPLES,
    payload: array
  };
}
export function updateFilterTerm(value) {
  return {
    type: UPDATE_FILTERTERM,
    payload: value
  };
}
export function store_filter_results(array) {
  return {
    type: FILTER_RESULTS,
    payload: array
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
    case UPDATE_FREEZERS:
      return { ...state, freezers: payload };
    case UPDATE_FREEZERCANES:
      return { ...state, freezercanes: payload };
    case UPDATE_FREEZERBOXES:
      return { ...state, freezerboxes: payload };
    case UPDATE_BOXES:
      return { ...state, boxes: payload };
    case UPDATE_EVERYTHING:
      return { ...state, everything: payload };
    case UPDATE_SAMPLES:
      return { ...state, samples: payload };
    case UPDATE_FILTERTERM:
      return { ...state, filterTerm: payload };
    case FILTER_RESULTS:
      return { ...state, filter_results: payload };
    default:
      return state;
  }
}

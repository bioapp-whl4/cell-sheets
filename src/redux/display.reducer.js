const initialState = {
  //updating id
  freezer_id: null,
  cane_id: null,
  box_id: null,
  //displays
  freezer: true,
  cane: false,
  boxes: false,
  box: false,
  advancedSearch: false,
  keywordSearch: false,
  //Adding Specimen
  addFreezerId: null,
  addCaneId: null,
  addBoxId: null,
  //PickList
  picklist: []
};

//Adding Specimen
const ADDFREEZERID = "ADDFREEZERID";
const ADDCANEID = "ADDCANEID";
const ADDBOXID = "ADDBOXID";
const UPDATE_DISPLAY_FREEZER = "UPDATE_DISPLAY_FREEZER";
const UPDATE_DISPLAY_CANE = "UPDATE_DISPLAY_CANE";
const UPDATE_DISPLAY_BOXES = "UPDATE_DISPLAY_BOXES";
const UPDATE_DISPLAY_BOX = "UPDATE_DISPLAY_BOX";
const UPDATE_FREEZER_ID = "UPDATE_FREEZER_ID";
const UPDATE_CANE_ID = "UPDATE_CANE_ID";
const UPDATE_BOX_ID = "UPDATE_BOX_ID";
const ADVANCED_SEARCH = "ADVANCED_SEARCH";
const KEYWORD_SEARCH = "KEYWORD_SEARCH";
const PICKLIST = "PICKLIST";

export function addFreezerId(id) {
  return {
    type: ADDFREEZERID,
    payload: id
  };
}
export function addCaneId(id) {
  return {
    type: ADDCANEID,
    payload: id
  };
}
export function addBoxId(id) {
  return {
    type: ADDBOXID,
    payload: id
  };
}
export function updateDisplayFreezer(boolean) {
  return {
    type: UPDATE_DISPLAY_FREEZER,
    payload: boolean
  };
}
export function updateDisplayCane(boolean) {
  return {
    type: UPDATE_DISPLAY_CANE,
    payload: boolean
  };
}
export function updateDisplayBoxes(boolean) {
  return {
    type: UPDATE_DISPLAY_BOXES,
    payload: boolean
  };
}
export function updateDisplayBox(boolean) {
  return {
    type: UPDATE_DISPLAY_BOX,
    payload: boolean
  };
}
export function updateFreezerId(id) {
  return {
    type: UPDATE_FREEZER_ID,
    payload: id
  };
}
export function updateCaneId(id) {
  return {
    type: UPDATE_CANE_ID,
    payload: id
  };
}
export function updateBoxId(id) {
  return {
    type: UPDATE_BOX_ID,
    payload: id
  };
}
export function updateAdvanceSearch(boolean) {
  return {
    type: ADVANCED_SEARCH,
    payload: boolean
  };
}
export function updateKeywordSearch(boolean) {
  return {
    type: KEYWORD_SEARCH,
    payload: boolean
  };
}
export function submit_picklist(array) {
  return {
    type: PICKLIST,
    payload: array
  };
}

export default function display(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ADDFREEZERID:
      return { ...state, addFreezerId: payload };
    case ADDCANEID:
      return { ...state, addCaneId: payload };
    case ADDBOXID:
      return { ...state, addBoxId: payload };
    case UPDATE_FREEZER_ID:
      return { ...state, freezer_id: payload };
    case UPDATE_CANE_ID:
      return { ...state, cane_id: payload };
    case UPDATE_BOX_ID:
      return { ...state, box_id: payload };
    case UPDATE_DISPLAY_FREEZER:
      return { ...state, freezer: payload };
    case UPDATE_DISPLAY_CANE:
      return { ...state, cane: payload };
    case UPDATE_DISPLAY_BOXES:
      return { ...state, boxes: payload };
    case UPDATE_DISPLAY_BOX:
      return { ...state, box: payload };
    case ADVANCED_SEARCH:
      return { ...state, advancedSearch: payload };
    case KEYWORD_SEARCH:
      return { ...state, keywordSearch: payload };
    case PICKLIST:
      return { ...state, picklist: payload };
    default:
      return state;
  }
}

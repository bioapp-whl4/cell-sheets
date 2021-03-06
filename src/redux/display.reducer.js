const initialState = {
  //updating id
  freezer_id: null,
  cane_id: null,
  box_id: null,
  sample_id: null,
  //displays
  freezer: true,
  cane: false,
  boxes: false,
  box: false,
  advancedSearch: false,
  keywordSearch: false,
  sample: false,
  displayPicklist: false,
  //Adding Specimen
  freezerId: null,
  caneId: null,
  boxId: null,
  box_position: [],
  //PickList
  picklist: [],
  adv_search_display_state: false,
  addNew: false
};

//Adding Specimen
const ADDFREEZERID = "ADDFREEZERID";
const ADDCANEID = "ADDCANEID";
const ADDBOXID = "ADDBOXID";
//DISPLAYS
const UPDATE_DISPLAY_FREEZER = "UPDATE_DISPLAY_FREEZER";
const UPDATE_DISPLAY_CANE = "UPDATE_DISPLAY_CANE";
const UPDATE_DISPLAY_BOXES = "UPDATE_DISPLAY_BOXES";
const UPDATE_DISPLAY_BOX = "UPDATE_DISPLAY_BOX";
const UPDATE_DISPLAY_SAMPLE = "UPDATE_DISPLAY_SAMPLE";
const UPDATE_DISPLAY_PICKLIST = "UPDATE_DISPLAY_PICKLIST"
const UPDATE_ADDNEW = 'UPDATE_ADDNEW'
//
const UPDATE_FREEZER_ID = "UPDATE_FREEZER_ID";
const UPDATE_CANE_ID = "UPDATE_CANE_ID";
const UPDATE_BOX_ID = "UPDATE_BOX_ID";
const UPDATE_SAMPLE_ID = "UPDATE_SAMPLE_ID";
const ADVANCED_SEARCH = "ADVANCED_SEARCH";
const ADV_SEARCH_DISPLAY = `ADV_SEARCH_DISPLAY`
const KEYWORD_SEARCH = "KEYWORD_SEARCH";
const PICKLIST = "PICKLIST";
// add box location
const UPDATE_BOX_POSITION = 'UPDATE_BOX_POSITION'


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
export function updateDisplayPicklist(boolean) {
  return {
    type: UPDATE_DISPLAY_PICKLIST,
    payload: boolean
  };
} 
export function updateDisplayFreezer(boolean) {
  return {
    type: UPDATE_DISPLAY_FREEZER,
    payload: boolean
  };
}
export function updateDisplaySample(boolean) {
  return {
    type: UPDATE_DISPLAY_SAMPLE,
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

export function updateSampleId(id) {
  return {
    type: UPDATE_SAMPLE_ID,
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
export function updateBoxPosition(arr) {
  return {
    type: UPDATE_BOX_POSITION,
    payload: arr
  }
}
export function updateDisplayAddNew (boolean) {
  return {
      type: UPDATE_ADDNEW,
      payload: boolean
  }
}
export function adv_search_display(bool){
  return {
    type: ADV_SEARCH_DISPLAY,
    payload: bool
  }
}

export default function display(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case UPDATE_ADDNEW:
      return {...state, addNew: payload};
    case ADDFREEZERID:
      return { ...state, freezerId: payload };
    case ADDCANEID:
      return { ...state, caneId: payload };
    case ADDBOXID:
      return { ...state, boxId: payload };
    case UPDATE_BOX_POSITION:
    return {...state,box_position: payload};
    case UPDATE_FREEZER_ID:
      return { ...state, freezer_id: payload };
    case UPDATE_CANE_ID:
      return { ...state, cane_id: payload };
    case UPDATE_BOX_ID:
      return { ...state, box_id: payload };
    case UPDATE_SAMPLE_ID:
      return { ...state, sample_id: payload };
    case UPDATE_DISPLAY_FREEZER:
      return { ...state, freezer: payload };
    case UPDATE_DISPLAY_CANE:
      return { ...state, cane: payload };
    case UPDATE_DISPLAY_BOXES:
      return { ...state, boxes: payload };
    case UPDATE_DISPLAY_BOX:
      return { ...state, box: payload };
    case UPDATE_DISPLAY_SAMPLE:
      return { ...state, sample: payload };
    case UPDATE_DISPLAY_PICKLIST:
      return {...state,displayPicklist: payload}
    case ADVANCED_SEARCH:
      return { ...state, advancedSearch: payload };
    case KEYWORD_SEARCH:
      return { ...state, keywordSearch: payload };
    case PICKLIST:
      return { ...state, picklist: payload };
    case ADV_SEARCH_DISPLAY:
      return {...state, adv_search_display_state: payload}
    default:
      return state;
  }
}

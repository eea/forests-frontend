import { CHANGE_MAP_DATA } from '../constants/ActionTypes';

const initialState = [];

const addMapDataToState = (state = initialState, action) => {
  let existingIdIndex;

  //check for existing mapData on the same page element and edits it
  const hasMapData = state.filter((element, index) => {
    if (element.id === action.mapData.id) {
      existingIdIndex = index;
      return element;
    }
  });

  if (hasMapData.length !== 0) {
    const beforeId = [...state].slice(0, existingIdIndex);
    const afterId = [...state].slice(existingIdIndex + 1, state.length);
    const newState = [...beforeId, action.mapData, ...afterId];

    return newState;
  } else return [...state, action.mapData];
};

export default function navSiteMap(state = initialState, action = {}) {
  switch (action.type) {
    case `${CHANGE_MAP_DATA}`:
      return addMapDataToState(state, action);
    default:
      return state;
  }
}

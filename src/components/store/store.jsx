import { configureStore } from '@reduxjs/toolkit';

const initialState = {
    menuStatus: false,
  };
  
  function myReducer(state = initialState, action) {
    if (action.type === "CHANGE_MENU_STATUS") {
      return {...state, menuStatus: !state.menuStatus};
    }
    return state;
  }
  

const store = configureStore(
    {reducer:myReducer})
export default store;
import { combineReducers  } from '@reduxjs/toolkit';
import themeConfigSlice from './themeConfigSlice';

const rootReducer = combineReducers({
    themeConfig: themeConfigSlice
});

export default rootReducer;

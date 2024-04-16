import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

// Define the initial state
const initialState = {
  botName: '',
  fileNames: [],
};

// Define the action types
const SET_BOT_NAME = 'SET_BOT_NAME';
const SET_FILE_NAMES = 'SET_FILE_NAMES';

// Define the reducer
function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_BOT_NAME:
      return { ...state, botName: action.payload };
    case SET_FILE_NAMES:
      return { ...state, fileNames: action.payload };
    default:
      return state;
  }
}

// Define the action creators
export const setBotName = (botName) => {
  return {
    type: SET_BOT_NAME,
    payload: botName,
  };
};

export const setFileNames = (fileNames) => {
  return {
    type: SET_FILE_NAMES,
    payload: fileNames,
  };
};

// Create a persist config
const persistConfig = {
  key: 'root',
  storage,
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, reducer);

// Create the store
export const store = createStore(persistedReducer);

// Create a persistor
export const persistor = persistStore(store);
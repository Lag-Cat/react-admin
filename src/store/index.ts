import { createStore, combineReducers } from "redux";

import indexPage from "./reducers/indexPage";
import system from "./reducers/system";

const reducers = combineReducers({
  indexPage,
  system,
});

const store = createStore(reducers);

export default store;

import { createStore, combineReducers } from "redux";

import router from "./reducers/router";
import system from "./reducers/system";

const reducers = combineReducers({
  router,
  system,
});

const store = createStore(reducers);

export default store;

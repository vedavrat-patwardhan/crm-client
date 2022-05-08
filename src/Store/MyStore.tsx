import { createStore, applyMiddleware, compose } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import thunk from "redux-thunk";
import rootReducer from "./Reducers/reducers";
import storageSession from "redux-persist/lib/storage/session";
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}
const persistConfig = {
  key: "redux-store",
  storage: storageSession,
  whitelist: ["auth", "token"],
};
const pReducer = persistReducer(persistConfig, rootReducer);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = composeEnhancers(applyMiddleware(thunk));
const store = createStore(pReducer, middleware);
const persistor = persistStore(store);

export { store, persistor };

import "./index.css";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import ProtectedRoutes from "./Pages/ProtectedRoutes";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./Store/MyStore";

render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <BrowserRouter>
        <ProtectedRoutes />
      </BrowserRouter>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);

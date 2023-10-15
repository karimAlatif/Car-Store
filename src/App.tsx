import { Routes, Route, Navigate } from "react-router-dom";
import ApplicationLayout from "layouts/application";
import Page404 from "layouts/errors/404";
import store from './store/store';
import { Provider } from 'react-redux';
import './i18n';

const App = () => {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="application/*" element={<ApplicationLayout />} />
        <Route path="/" element={<Navigate to="/application" replace />} />
        <Route path="/*" element={<Page404 />} />
      </Routes>
    </Provider>

  );
};

export default App;

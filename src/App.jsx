import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from "./views/layouts/dashboardLayout";
import HomeView from "./views/homeView";
import Error404View from "./views/error404View";
import 'bulma/css/bulma.css';
import './assets/css/theme.css'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DashboardLayout />}>
            <Route index element={<HomeView />} />
            <Route path="*" element={<Error404View />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

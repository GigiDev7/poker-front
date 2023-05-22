import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Tables from "./pages/Tables";
import { useCookies } from "react-cookie";
import { useEffect } from "react";
import { useAppDispatch } from "./store/hooks";
import { authAction } from "./store/auth";
import Table from "./pages/Table";
//import Cookies from "js-cookie";

function App() {
  const [cookies] = useCookies();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (cookies.user) {
      dispatch(authAction.setUser(cookies.user));
    }
  }, []);

  return (
    <div className="h-full ">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tables" element={<Tables />} />
        <Route path="/tables/:tableId" element={<Table />} />
      </Routes>
    </div>
  );
}

export default App;

import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { useCookies } from "react-cookie";
import { useEffect } from "react";
import { useAppDispatch } from "./store/hooks";
import { authAction } from "./store/auth";
import Table from "./pages/Table";

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
        <Route path="/tables/:tableId" element={<Table />} />
      </Routes>
    </div>
  );
}

export default App;

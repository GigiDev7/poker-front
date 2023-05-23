import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
//import { useCookies } from "react-cookie";
import { useEffect } from "react";
import { useAppDispatch } from "./store/hooks";
import { authAction } from "./store/auth";
import Table from "./pages/Table";

function App() {
  //const [cookies] = useCookies();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      dispatch(authAction.setUser(JSON.parse(user)));
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

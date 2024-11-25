// rafce => import react, create arrow function return div then export func
import React, { useEffect } from "react";
import Home from "./pages/Home";
import AllTasks from "./pages/AllTasks";
import ImportantTasks from "./pages/ImportantTasks";
import CompletedTasks from "./pages/CompletedTasks";
import IncompletedTasks from "./pages/IncompletedTasks";
import Signup from "./pages/Signup";
import {Routes,Route,useNavigate} from "react-router-dom";
import Login from "./pages/Login";
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux'
import { authActions } from './store/auth';
const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  useEffect(() => {
    if(localStorage.getItem("token") && localStorage.getItem("id")){
      dispatch(authActions.login());
    }
    else if (isLoggedIn===false && window.location.pathname === "/") {

      navigate("/login");
    }
  });
  return (
    <div className="bg-gray-900 text-white h-screen p-2 relative">
      <Routes>
        <Route exact path="/" element={<Home />}>
          <Route index element={<AllTasks />} />
          <Route path="/importantTasks" element={<ImportantTasks />} />
          <Route path="/completedTasks" element={<CompletedTasks />} />
          <Route path="/incompletedTasks" element={<IncompletedTasks />} />
        </Route>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;

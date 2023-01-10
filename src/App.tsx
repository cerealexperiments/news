import React, {useContext} from 'react';
import {Routes, Route, Navigate} from "react-router-dom";
import Auth from "./pages/Auth";
import Root from "./pages/Root";
import Register from "./pages/Register";
import AuthContext from "./context/AuthContext";

type ProtectedRouteProps = {
  isLoggedIn: boolean,
  outlet: JSX.Element,
}

const ProtectedRoute = ({isLoggedIn, outlet}: ProtectedRouteProps) => {
  if (!isLoggedIn) {
    return <Navigate to="/auth" replace/>;
  }
  return outlet;
}

const App = () => {
  const {isLoggedIn} = useContext(AuthContext);
  return (
    <Routes>
      <Route path="/auth" element={<Auth/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="*" element={<ProtectedRoute isLoggedIn={isLoggedIn} outlet={<Root/>}/>}/>
    </Routes>
  );
};

export default App;

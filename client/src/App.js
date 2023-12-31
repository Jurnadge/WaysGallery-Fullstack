import { Routes, Route } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

// import component here
import LandingPage from "./pages/LandingPage";
import { AppContext } from "./context/AppContext";
import { API, setAuthToken } from "./config/api";
import PrivateRoute from "./privateroute/PrivateRoute";
import HomePage from "./pages/Home";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import Uploads from "./pages/Uploads";
import DetailPost from "./pages/DetailPost";
import HireForm from "./pages/Hire";
import Order from "./pages/Order";
import DetailUser from "./pages/DetailUser";

function App() {
  const [state, dispatch] = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
      checkUser();
    } else {
      setIsLoading(false);
    }
  }, []);

  const checkUser = async () => {
    try {
      const response = await API.get("/check-auth");

      if (response.status === 404) {
        return dispatch({
          type: "AUTH_ERROR",
        });
      }

      let payload = response.data.data;
      payload.token = localStorage.token;

      dispatch({
        type: "USER_SUCCESS",
        payload,
      });
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      dispatch({
        type: "AUTH_ERROR",
      });
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading ? (
        <>
          <h1 className="w-full h-full text-9xl">Lagi Loading</h1>
        </>
      ) : (
        <Routes>
          <Route path="/landing" element={<LandingPage />} />

          <Route exact path="/" element={<PrivateRoute />}>
            <Route exact path="/" element={<HomePage />} />
            <Route exact path="/profile" element={<Profile />} />
            <Route exact path="/edit-profile" element={<EditProfile />} />
            <Route exact path="/uploads" element={<Uploads />} />
            <Route exact path="/detail/:id" element={<DetailPost />} />
            <Route exact path="/hire/:id" element={<HireForm />} />
            <Route exact path="/order" element={<Order />} />
            <Route exact path="/detail-user/:id" element={<DetailUser />} />
          </Route>
        </Routes>
      )}
    </>
  );
}

export default App;

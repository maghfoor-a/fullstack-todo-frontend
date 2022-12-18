import { User } from "firebase/auth";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import AuthRoute from "./components/AuthRoute";
import LoginPage from "./components/LoginPage";
import MainContent from "./components/MainContent";

function App(): JSX.Element {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/"
        element={
          <AuthRoute
            Page={<MainContent LoggedInUser={loggedInUser} />}
            setLoggedInUser={setLoggedInUser}
          ></AuthRoute>
        }
      />
    </Routes>
  );
}

export default App;

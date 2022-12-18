import { User } from "firebase/auth";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import AppHeader from "./components/AppHeader";
import AuthRoute from "./components/AuthRoute";
import LoginPage from "./components/LoginPage";
import MainContent from "./components/MainContent";

function App(): JSX.Element {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  return (
    <>
      <AppHeader />
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
    </>
  );
}

export default App;

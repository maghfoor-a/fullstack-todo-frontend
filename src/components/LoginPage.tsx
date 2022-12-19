import { auth, googleAuthProvider } from "../config/firebaseConfig";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../components/Styling/LoginPage.css";

export default function LoginPage(): JSX.Element {
  const navigate = useNavigate();
  const [authing, setAuthing] = useState<boolean>(false);

  const signInWithGoogle = async () => {
    setAuthing(true);
    try {
      await signInWithPopup(auth, googleAuthProvider);
      navigate("/");
    } catch (err) {
      console.error(err);
      setAuthing(false);
    }
  };
  return (
    <div className="LoginBody">
      <h1>Login to get started!</h1>
      <button
        className="Button"
        onClick={() => signInWithGoogle()}
        disabled={authing}
      >
        LOGIN WITH
        <span className="G1"> G</span>
        <span className="O1">O</span>
        <span className="O2">O</span>
        <span className="G1">G</span>
        <span className="L">L</span>
        <span className="O1">E</span>
      </button>
    </div>
  );
}

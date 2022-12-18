import { onAuthStateChanged, User } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../config/firebaseConfig";

interface Props {
  Page: JSX.Element;
  setLoggedInUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export default function AuthRoute(props: Props): JSX.Element {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const AuthCheck = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoading(false);
        props.setLoggedInUser(user);
      } else {
        console.log("unAuthorised");
        navigate("/login");
      }
    });
    return () => AuthCheck();
  }, [navigate, props]);

  if (loading) return <p>loading...</p>;
  return <>{props.Page}</>;
}

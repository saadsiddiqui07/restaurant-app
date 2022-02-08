import { useEffect } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useStateValue } from "../context-api/StateProvider";
import { useRouter } from "next/router";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../Firebase/firebase";

export default function Home() {
  const [{ user }, dispatch] = useStateValue();
  const router = useRouter();

  // handle user logout
  const handleSignOut = (e) => {
    e.preventDefault();
    // to let a user signOut
    signOut(auth)
      .then(() => {
        dispatch({
          type: "SET_USER",
          user: null,
        });
        router.push("/login");
        console.log("User signed out successfully");
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        router.push("/login");
      }
    });
    // clean up action
    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  return (
    <div className={styles.home}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="h-screen flex flex-col">
        <h1>you are logged in</h1>
        <button onClick={handleSignOut}>Logout</button>
      </div>
    </div>
  );
}

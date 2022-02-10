import { useEffect } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useStateValue } from "../context-api/StateProvider";
import { useRouter } from "next/router";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../Firebase/firebase";
import Header from "../components/Header/Header";
import Categories from "../components/Categories/Categories";

export default function Home() {
  const [{}, dispatch] = useStateValue();
  const router = useRouter();

  // handle user logout
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
  }, [router, dispatch]);

  return (
    <div className={styles.home}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col">
        <Header />
        <div className="flex flex-col">
          <Categories />
        </div>
      </main>
    </div>
  );
}

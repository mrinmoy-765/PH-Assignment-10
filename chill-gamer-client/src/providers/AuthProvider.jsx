import { createContext, useEffect, useState } from "react";
import app from "../firebase/firebase.config";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

export const AuthContext = createContext();

const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [firebaseUser, setFirebaseUser] = useState(null);
  const [mongoUser, setMongoUser] = useState(null);
  const [userReview, setUserReview] = useState(null);
  const [watchList, setWatchList] = useState(null);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setFirebaseUser(user);
      if (user?.email) {
        fetch(`http://localhost:5000/users?email=${user.email}`)
          .then((res) => res.json())
          .then((data) => {
            setMongoUser(data);

            // Fetch reviews created by the user
            fetch(`http://localhost:5000/reviewsByEmail?email=${user.email}`)
              .then((res) => res.json())
              .then((reviewData) => {
                setUserReview(reviewData); // This will now hold user's reviews
              });

            setLoading(false);

            // Fetch watchList created by the user
            fetch(`http://localhost:5000/watchListByEmail?email=${user.email}`)
              .then((res) => res.json())
              .then((watchListData) => {
                setWatchList(watchListData);
              });

            setLoading(false);
          })
          .catch((err) => {
            console.error("MongoDB user fetch error:", err);
            setLoading(false);
          });
      } else {
        setMongoUser(null);
        setUserReview(null);
        setWatchList(null);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const authValue = {
    firebaseUser,
    setFirebaseUser,
    mongoUser,
    userReview,
    watchList,
    createUser,
    signInUser,
    logOut,
    loading,
  };
  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;

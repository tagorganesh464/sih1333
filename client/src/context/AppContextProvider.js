import { createContext, useContext, useEffect, useState } from "react";
import { db, serverTimestamp } from "../lib/firebase";
import { collection, onSnapshot } from 'firebase/firestore';

const AppContext = createContext();

export const useAppContext = () => {
  return useContext(AppContext);
};

export const AppContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [appState, setAppState] = useState("empty");
  const [showUploadVideo, setShowUploadVideo] = useState(false);

  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const videosCollection = collection(db, 'Videos');

    const unsubscribe = onSnapshot(videosCollection, (snapshot) => {
      setVideos(snapshot.docs.map((doc) => doc.data()));
    });

    return () => {
      // Cleanup function to unsubscribe when the component unmounts
      unsubscribe();
    };
  }, []);

  console.log(videos);

  const value = {
    videos,
    appState,
    currentUser,
    showUploadVideo,
    setShowUploadVideo,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

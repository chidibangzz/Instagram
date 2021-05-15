import { useState, useEffect } from 'react';
import { getUserByUserId } from '../services/firebase';

// makes call to get user but if it doesn't have user just send sign up page to empty object

export default function useUser(userId) {
  const [activeUser, setActiveUser] = useState({});

  useEffect(() => {
    async function getUserObjByUserId(userId) {
      // we need a function that we can call firebase service that gets the user based on id
      const [user] = await getUserByUserId(userId);
      setActiveUser(user || {});
    }
    if (userId) {
      getUserObjByUserId(userId);
    }
  }, [userId]);
  return { user: activeUser, setActiveUser };
}

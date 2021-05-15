/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { getPhotos } from '../services/firebase';

export default function usePhotos(user) {
  const [photos, setPhotos] = useState(null);

  useEffect(() => {
    async function getTimeLinePhotos() {
      // example: [2,1,5] <- being Ralpheal
      // does the user actuallly follow people
      if (user?.following?.length > 0) {
        const followedUserPhotos = await getPhotos(user.userId, user.following);
        // re-arranges array to be newest photos first by date created.
        followedUserPhotos.sort((a, b) => b.dateCreated - a.dateCreated);
        setPhotos(followedUserPhotos);
      }
    }

    getTimeLinePhotos();
  }, [user?.userId]);

  return { photos };
}

/* eslint-disable no-nested-ternary */
import { useContext } from 'react';
import Skeleton from 'react-loading-skeleton';
import LoggedInUserContext from '../context/logged-in-user';
import usePhotos from '../hooks/use-photos';
import Post from './post';

export default function Timeline() {
  // we need to get logged in users photos
  const { user } = useContext(LoggedInUserContext);
  const { photos } = usePhotos(user);
  // on loading photos need to use react Skeleton
  // if we have photos, render them(create a post component)
  // if the user photo has no photos, tell them to create some photos
  return (
    <div className="container col-span-2">
      {!photos ? (
        <Skeleton count={4} width={640} height={600} className="mb-5" />
      ) : (
        photos.map((content) => <Post key={content.docId} content={content} />)
      )}
    </div>
  );
}

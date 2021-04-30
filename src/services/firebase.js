/* eslint-disable prettier/prettier */
import { firebase, FieldValue } from '../lib/firebase';

export async function doesUsernameExist(username) {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('username', '==', username)
    .get();

  return result.docs.map((user) => user.data().length > 0);
}
// get user from the firestore where userId === userId(passed from the auth)

export async function getUserByUserId(userId) {
  const result = await firebase.firestore().collection('users').where('userId', '==', userId).get();

  const user = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id
  }));

  return user;
}

export async function getSuggestedProfiles(userId, following) {
  const result = await firebase.firestore().collection('users').limit(10).get();

  return result.docs
    .map((user) => ({ ...user.data(), docId: user.id }))
    .filter((profile) => profile.userId !== userId && !following.includes(profile.userId));
}

// updateLoggedInUserFollowing,updateFollowedUserFollowers

export async function updateLoggedInUserFollowing(
  loggedInUserDocId, // curently logged in user document id (karl's profile)
  profileId, // the user that karl requests to follow
  isFollowingProfile) // true/false (am i currently following this person?)
  { 
  return firebase
  .firestore()
  .collection('users')
  .doc(loggedInUserDocId)
  .update({
    following: isFollowingProfile
    ? FieldValue.arrayReomve(profileId)
    : FieldValue.arrayUnion(profileId)
  })
}



export async function updateFollowedUserFollowers(
  profileDocId, // curently logged in user document id (karl's profile)
  loggedInUserDocId, // the user that karl requests to follow
  isFollowingProfile) // true/false (am i currently following this person?)
  { 
  return firebase
  .firestore()
  .collection('users')
  .doc(profileDocId)
  .update({
    followers: isFollowingProfile
    ? FieldValue.arrayReomve(loggedInUserDocId)
    : FieldValue.arrayUnion(loggedInUserDocId)
  })
}
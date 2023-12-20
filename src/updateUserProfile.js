import { doc, updateDoc } from 'firebase/firestore';
import { firestore } from './firebase';

export const updateUserProfile = async (userId, newProfileData) => {
    const userProfileRef = doc(firestore, 'userProfiles', userId);
    await updateDoc(userProfileRef, newProfileData);
  };
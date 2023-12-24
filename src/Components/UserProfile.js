import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { auth, firestore } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import RecipesHome from './RecipesHome';

function UserProfile() {
    const [userProfile, setUserProfile] = useState(null);
    const navigate = useNavigate();
    const { userId } = useParams();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                // Check if the URL userId matches the logged-in user's UID
                if (user.uid !== userId) {
                    console.error("Access denied. User IDs do not match.");
                    navigate("/"); // Redirect to home or error page as appropriate
                    return; // Exit early as the IDs don't match
                }

                // Proceed to fetch user profile data
                const userProfileRef = doc(firestore, 'userProfiles', user.uid);
                const docSnap = await getDoc(userProfileRef);

                if (docSnap.exists()) {
                    // Set user profile data if document exists
                    setUserProfile(docSnap.data());
                } else {
                    // User profile doesn't exist, so create a new one
                    const newUserProfile = {
                        email: user.email, // email from the authentication user object
                        // No password here, as it's not stored directly in the profile
                    };

                    await setDoc(userProfileRef, newUserProfile);
                    setUserProfile(newUserProfile);
                }

                // Navigate to /home if UIDs match and the profile is set
                navigate('/home');
            } else {
                // No user is signed in, redirect to the login page
                navigate('/');
            }
        })

        return unsubscribe; // Detach listener on unmount
    }, [navigate, userId]);

    if (!userProfile) {
        // Optionally handle the loading or absence of profile data here
        return null; // Or display a loading indicator or error message
    }

    // Render the RecipesHome component or user profile details
    return (
        <RecipesHome />
    )
}

export default UserProfile;

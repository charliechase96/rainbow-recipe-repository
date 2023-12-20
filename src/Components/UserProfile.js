import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { auth, firestore } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
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
                    navigate("/home");
                } else {
                    // Redirect to signup if user profile doesn't exist
                    console.error("User profile does not exist.");
                    navigate('/signup');
                }
            } else {
                // No user is signed in
                navigate('/'); // or wherever you handle logging in
            }
        });

        return unsubscribe; // Detach listener on unmount
    }, [navigate, userId]); // Depend on navigate and userId

    // Redirect to signup if userProfile is null (as a fallback, might be redundant with the useEffect logic)
    if (!userProfile) {
        navigate('/signup');
        return null; // Early return to stop rendering the rest of the component
    }

    // Render the RecipesHome component or user profile details
    return (
        <RecipesHome />
    )
}

export default UserProfile;

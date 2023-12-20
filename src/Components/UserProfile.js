import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { auth, firestore } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import RecipesHome from './RecipesHome';

function UserProfile() {
    const [userProfile, setUserProfile] = useState(null);

    const navigate = useNavigate();
    const { userId } = useParams()

    useEffect(() => {

        const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (user) {
            const userProfileRef = doc(firestore, 'userProfiles', user.uid);
            const docSnap = await getDoc(userProfileRef);

            if (!docSnap.exists()) {
                navigate('/signup');
            // User profile doesn't exist, create a new one
            }

            if (!user || user.uid !== userId) {
                // Redirect to a generic error page or login page
                // Or show an appropriate error message
                console.error("Access denied. User IDs do not match.");
                navigate("/");
            }

            // Fetch the user profile
            onSnapshot(userProfileRef, (doc) => {
            setUserProfile(doc.data());
            navigate(`/user-profile/${user.uid}`);
            });
        } else {
            // User is signed out
            setUserProfile(null);
            navigate('/');
        }
        });

        return unsubscribe; // Detach listener on unmount
    }, [navigate, userId]);

    if (!userProfile) {
        navigate('/signup')
    }



    return (
            <RecipesHome />
    )
}

export default UserProfile;
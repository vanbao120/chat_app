import { collection, query, where } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../config/firebase";
import { AppUser, Conversation } from "../types";
import { getRecipientsEmail } from "../utils/helper";
import { useCollection } from 'react-firebase-hooks/firestore'

export const useRecipient = (users: Conversation['user']) => {
    const [loggedUser] = useAuthState(auth)

    const recipientEmail = getRecipientsEmail(users, loggedUser)

    const queryRecipient = query(collection(db, 'users'), where('email', '==', recipientEmail))
    const [snapShot] = useCollection(queryRecipient)

    const recipient = snapShot?.docs[0]?.data() as AppUser | undefined

    return { recipientEmail, recipient }
}
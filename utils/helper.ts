import { User } from "firebase/auth";
import { collection, DocumentData, orderBy, query, QueryDocumentSnapshot, Timestamp, where } from "firebase/firestore";
import { db } from "../config/firebase";
import { Conversation, IMessage } from "../types";

export const getRecipientsEmail = (user: Conversation['user'], loggedUser: User | null | undefined) => {
    return user.find(email => email !== loggedUser?.email)
}

export const getMessage = (id: string) => query(collection(db, 'messages'), where('conversation_id', '==', id), orderBy('send_at', 'asc'))

export const transFormMessage = (message: QueryDocumentSnapshot<DocumentData>) =>
({
    id: message.id,
    ...message.data(),
    send_at: message.data().send_at ? convertTime((message.data().send_at as Timestamp)) : ''
} as IMessage)

export const convertTime = (time: Timestamp) => new Date(time.toDate().getTime()).toLocaleString()
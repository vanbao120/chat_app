import { Timestamp } from "firebase/firestore";

export interface Conversation {
    user: string[];
}

export interface AppUser {
    email: string;
    lastSeen: Timestamp
    photoUrl: string;
}

export interface IMessage {
    id: string
    conversation_id: string
    text: string
    send_at: string
    user: string
}
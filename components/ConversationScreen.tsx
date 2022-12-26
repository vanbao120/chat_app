import { AttachFile, InsertEmoticon, MicOutlined, SendSharp } from '@mui/icons-material'
import MoreVert from '@mui/icons-material/MoreVert'
import { IconButton } from '@mui/material'
import { addDoc, collection, doc, serverTimestamp, setDoc } from 'firebase/firestore'
import { useRouter } from 'next/router'
import React, { KeyboardEventHandler, useRef, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollection } from 'react-firebase-hooks/firestore'
import styled from 'styled-components'
import { auth, db } from '../config/firebase'
import { useRecipient } from '../hooks/useRecipient'
import { StyledH3, StyledHeaderIcon, StyledHeaderInfo, StyledInput, StyledInputContainer, StyledMessageContainer, StyledRecipientHeader } from '../styles/Styled'
import { Conversation, IMessage } from '../types'
import { convertTime, getMessage, transFormMessage } from '../utils/helper'
import Message from './Message'
import RecipientAvatar from './RecipientAvatar'

type Props = {
    conversation: Conversation
    messages: IMessage[]
}

const AutoScroll = styled.div`
    margin-bottom: 30px;
`

const ConversationScreen = ({ conversation, messages }: Props) => {
    const user = conversation.user
    const [input, setInput] = useState<string>('')
    const [loggedUser] = useAuthState(auth)

    const route = useRouter()
    const conversationId = route.query.id

    const endOfMessage = useRef<HTMLDivElement>(null)

    const scrollToBottom = () => {
        endOfMessage.current?.scrollIntoView({ behavior: 'smooth' })
    }

    const queryMessage = getMessage(conversationId as string)

    const [messageSnapshot, loading] = useCollection(queryMessage)

    const sendMessage: KeyboardEventHandler<HTMLInputElement> = event => {
        if (event.key === 'Enter') {
            event.preventDefault()
            if (!input) return
            addMessageToDbAndUpdateLastSeen()
        }
    }

    const addMessageToDbAndUpdateLastSeen = async () => {
        await setDoc(doc(db, 'users', loggedUser?.email as string), {
            lastSeen: serverTimestamp()
        }, { merge: true })

        await addDoc(collection(db, 'messages'), {
            conversation_id: conversationId,
            send_at: serverTimestamp(),
            text: input,
            user: loggedUser?.email
        })

        setInput('')
        scrollToBottom()
    }

    const showMessage = () => {
        if (loading) {
            return messages.map((mess) => (
                <Message key={mess.id} message={mess} />
            ))
        }
        if (messageSnapshot) {
            return messageSnapshot.docs.map((mess) => (
                <Message key={mess.id} message={transFormMessage(mess)} />
            ))
        }

        return null
    }

    const sendMessageOnClick = (e: any) => {
        e.preventDefault()
        addMessageToDbAndUpdateLastSeen()
    }

    const { recipient, recipientEmail } = useRecipient(user)
    return (
        <>
            <StyledRecipientHeader>
                <RecipientAvatar recipient={recipient} recipientEmail={recipientEmail} />
                <StyledHeaderInfo>
                    <StyledH3>
                        {recipientEmail}
                    </StyledH3>
                    {recipient && <span>Last active: {convertTime(recipient.lastSeen)}</span>}
                </StyledHeaderInfo>
                <StyledHeaderIcon>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </StyledHeaderIcon>
            </StyledRecipientHeader>
            <StyledMessageContainer>
                {showMessage()}
                <AutoScroll ref={endOfMessage} />
            </StyledMessageContainer>
            <StyledInputContainer>
                <InsertEmoticon />
                <StyledInput value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={sendMessage} />
                <IconButton onClick={sendMessageOnClick} disabled={!input}>
                    <SendSharp />
                </IconButton>
                <IconButton>
                    <MicOutlined />
                </IconButton>
            </StyledInputContainer>
        </>
    )
}

export default ConversationScreen
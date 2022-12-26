import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../config/firebase'
import { StyledSenderMessage, StyledReceiverMessage, StyledTimeStamp } from '../styles/Styled'
import { IMessage } from '../types'

type Props = {
    message: IMessage
}

const Message = ({ message }: Props) => {
    const [loggedUser] = useAuthState(auth)

    const MessageType = loggedUser?.email === message.user ? StyledSenderMessage : StyledReceiverMessage

    return (
        <MessageType>
            {message.text}
            <StyledTimeStamp>{message.send_at}</StyledTimeStamp>
        </MessageType>
    )
}

export default Message
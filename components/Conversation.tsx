import { useRouter } from 'next/router'
import React from 'react'
import styled from 'styled-components'
import { useRecipient } from '../hooks/useRecipient'
import RecipientAvatar from './RecipientAvatar'

type Props = {
    conversation: string[]
    id: string
}

const StyledContainer = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 7px;
    word-break: break-all;

    :hover {
        background-color: #e9eaeb;
    }
`

const ConversationComponent = ({ conversation, id }: Props) => {
    const { recipient, recipientEmail } = useRecipient(conversation)

    const route = useRouter()

    const onSelectConversation = () => {
        route.push(`/conversation/${id}`)
    }

    return (
        <StyledContainer onClick={onSelectConversation}>
            <RecipientAvatar recipient={recipient} recipientEmail={recipientEmail} />
            <span>
                {recipientEmail}
            </span>
        </StyledContainer>
    )
}

export default ConversationComponent
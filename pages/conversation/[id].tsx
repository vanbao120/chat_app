import Head from 'next/head'
import React from 'react'
import styled from 'styled-components'
import Sidebar from '../../components/Sidebar'
import { doc, getDoc, getDocs } from 'firebase/firestore'
import { GetServerSideProps } from 'next'
import { auth, db } from '../../config/firebase'
import { Conversation, IMessage } from '../../types'
import { getMessage, getRecipientsEmail, transFormMessage } from '../../utils/helper'
import { useAuthState } from 'react-firebase-hooks/auth'
import { StyledConversation } from '../../styles/Styled'
import ConversationScreen from '../../components/ConversationScreen'

type Props = {
    conversation: Conversation
    messages: IMessage[]
}

const StyledContainer = styled.div`
    display: flex;
`

const Conversation = ({ conversation, messages }: Props) => {
    const [loggedUser] = useAuthState(auth)

    return (
        <StyledContainer>
            <Head>
                <title>Conversation with {getRecipientsEmail(conversation.user, loggedUser)}</title>
            </Head>
            <Sidebar />
            <StyledConversation>
                <ConversationScreen conversation={conversation} messages={messages} />
            </StyledConversation>
        </StyledContainer>
    )
}

export default Conversation

export const getServerSideProps: GetServerSideProps<Props, { id: string }> = async context => {
    const conversationId = context.params?.id

    const conversationRef = doc(db, 'conversation', conversationId as string)
    const snapshot = await getDoc(conversationRef)

    const queryMessage = getMessage(conversationId || '')

    const messageSnapshot = await getDocs(queryMessage)

    const messages = messageSnapshot.docs.map(mess => transFormMessage(mess))

    return {
        props: {
            messages,
            conversation: snapshot.data() as Conversation
        }
    }
}
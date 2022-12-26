import React, { useState } from 'react'
import Tooltip from '@mui/material/Tooltip'
import { StyledContainer, StyledHeader, StyledInputSearch, StyledSearch, StyledSidebarButton, StyledUserAvatar } from '../styles/Styled'
import { Box, IconButton } from '@mui/material'
import ChatIcon from '@mui/icons-material/Chat'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import LogoutIcon from '@mui/icons-material/Logout'
import SearchIcon from '@mui/icons-material/Search'
import { signOut } from 'firebase/auth'
import { auth, db } from '../config/firebase'
import DialogCreate from './DialogCreate'
import { useAuthState } from 'react-firebase-hooks/auth'
import * as emailValidators from 'email-validator'
import { addDoc, collection, query, where } from 'firebase/firestore'
import { useCollection } from 'react-firebase-hooks/firestore'
import { Conversation } from '../types'
import ConversationComponent from './Conversation'

const Sidebar = () => {
    const [open, setOpen] = useState<boolean>(false)
    const [loggedUser, _loading, _error] = useAuthState(auth)
    const [email, setEmail] = useState<string>('')

    const handleClose = () => {
        setOpen(false)
        setEmail('')
    }

    const getConversations = query(collection(db, 'conversation'), where('user', 'array-contains', loggedUser?.email))
    const [snapShot] = useCollection(getConversations)

    const isExisting = () =>
        snapShot?.docs.find(conversation => (conversation.data() as Conversation).user.includes(email))

    const handleCreateConversation = async () => {
        if (email === loggedUser?.email) return

        if (emailValidators.validate(email) && !isExisting()) {
            await addDoc(collection(db, 'conversation'), {
                user: [loggedUser?.email, email]
            })
        }
        setOpen(false)
        setEmail('')
    }

    const logout = async () => {
        try {
            await signOut(auth)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <StyledContainer>
            <StyledHeader>
                <Tooltip title={loggedUser?.email} placement='right'>
                    <StyledUserAvatar src={loggedUser?.photoURL || ''} />
                </Tooltip>
                <Box>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                    <IconButton onClick={logout}>
                        <LogoutIcon />
                    </IconButton>
                </Box>
            </StyledHeader>
            <StyledSearch>
                <SearchIcon />
                <StyledInputSearch placeholder='Search in conversations' />
            </StyledSearch>
            <StyledSidebarButton onClick={() => setOpen(true)}>
                START A NEW CONVERSATIONS
            </StyledSidebarButton>
            {snapShot?.docs.map(con => (
                <ConversationComponent key={con.id} id={con.id} conversation={(con.data() as Conversation).user} />
            ))}
            <DialogCreate open={open} onClose={handleClose} onEmailChange={setEmail} email={email} onCreate={handleCreateConversation} />
        </StyledContainer>
    )
}

export default Sidebar
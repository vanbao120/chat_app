import { Button } from '@mui/material'
import Head from 'next/head'
import Image from 'next/image'
import React from 'react'
import styled from 'styled-components'
import { StyledImageWrapper, StyledLoginContainer } from '../styles/Styled'
import logo from '../assets/whatsapplogo.png'
import { useSignInWithGoogle } from 'react-firebase-hooks/auth'
import { auth } from '../config/firebase'
type Props = {}

const StyledContainer = styled.div`
    height: 100vh;
    display: grid;
    place-items: center;
    background-color: whitesmoke;
`

const Login = (props: Props) => {
    const [signInWithGoogle, _user, _loading, _error] = useSignInWithGoogle(auth)
    const signIn = () => {
        signInWithGoogle()
    }
    return <StyledContainer>
        <Head>
            <title>Login</title>
        </Head>
        <StyledLoginContainer>
            <StyledImageWrapper>
                <Image src={logo} alt='' height={200} width={200} />
            </StyledImageWrapper>
            <Button variant='outlined' onClick={signIn}>Sign in with Google</Button>
        </StyledLoginContainer>
    </StyledContainer>
}

export default Login
import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { StyledImageWrapper } from './Styled';
import Image from 'next/image';
import logo from '../assets/whatsapplogo.png'
import styled from 'styled-components';

const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
`

export default function LoadingContext() {
    return (
        <StyledContainer>
            <StyledImageWrapper>
                <Image src={logo} alt='' height={200} width={200} />
            </StyledImageWrapper>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <CircularProgress />
            </Box>
        </StyledContainer>
    )
}
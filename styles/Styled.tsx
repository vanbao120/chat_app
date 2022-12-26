import { Avatar, Box, Button } from "@mui/material";
import styled from "styled-components";

export const StyledContainer = styled(Box)`
    height: 100vh;
    min-width: 300px;
    max-width: 350px;
    overflow-y: scroll;
    ::-webkit-scrollbar {
        display: none;
    }
    border-right: 1px solid whitesmoke;
`

export const StyledHeader = styled(Box)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 11.5px;
    height: 80px;
    border-bottom: 1px solid whitesmoke;
    position: sticky;
    top: 0;
    background-color: white;
    z-index: 1;
`

export const StyledSearch = styled(Box)`
    display: flex;
    align-items: center;
    padding: 15px;
    border-radius: 2px;
`

export const StyledSidebarButton = styled(Button)`
    width: 100%;
    border-top: 1px solid whitesmoke;
    border-bottom: 1px solid whitesmoke;
`

export const StyledUserAvatar = styled(Avatar)`
    cursor: pointer;
    :hover {
        opacity: 0.8;
    }
`

export const StyledInputSearch = styled.input`
    outline: none;
    border: none;
    flex: 1;
`

export const StyledLoginContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 100px;
    background-color: white;
    border-radius: 5px;
    box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
`

export const StyledImageWrapper = styled.div`
    margin-bottom: 50px;
`

export const StyledHeaderInfo = styled.div`
    flex-grow: 1;
    > h3 {
        margin-top: 0;
        margin-bottom: 3px;
    }

    > span {
        font-size: 14px;
        color: gray;
    }
`

export const StyledH3 = styled.h3`
    word-break: break-all;
`

export const StyledConversation = styled.div`
    flex-grow: 1;
    overflow: scroll;
    height: 100vh;
    ::-webkit-scrollbar {
        display: none;
    }
`

export const StyledRecipientHeader = styled.div`
    position: sticky;
    background-color: white;
    z-index: 100;
    top: 0;
    display: flex;
    align-items: center;
    padding: 11px;
    height: 80px;
    border: 1px solid whitesmoke;
`

export const StyledHeaderIcon = styled.div`
    display: flex;
`

export const StyledMessageContainer = styled.div`
    padding: 30px;
    background-color: #e5ded8;
    min-height: 90vh;
`

export const StyledMessage = styled.div`
    width: fit-content;
    word-break: break-all;
    max-width: 90%;
    min-width: 30%;
    padding: 15px 15px 30px;
    border-radius: 8px;
    margin: 10px;
    position: relative;
`

export const StyledSenderMessage = styled(StyledMessage)`
    margin-left: auto;
    background-color: rgb(48, 190, 50);
`

export const StyledReceiverMessage = styled(StyledMessage)`
    background-color: whitesmoke;
`

export const StyledTimeStamp = styled.span`
    color: gray;
    padding: 10px;
    font-size: x-small;
    position: absolute;
    bottom: 0;
    right: 0;
    text-align: right;
`
export const StyledInputContainer = styled.form`
    display: flex;
    align-items: center;
    padding: 10px;
    position: sticky;
    bottom: 0;
    background-color: white;
    z-index: 100;
`

export const StyledInput = styled.input`
    flex-grow: 1;
    outline: none;
    border: none;
    background-color: whitesmoke;
    border-radius: 10px;
    padding: 15px;
    margin-left: 15px;
    margin-right: 15px;
`
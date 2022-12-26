import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

type Props = {
    open: boolean;
    onClose: () => void;
    onEmailChange: (value: string) => void;
    email: string;
    onCreate: () => void;
}

export default function DialogCreate(props: Props) {
    const { open, onClose, onEmailChange, email, onCreate } = props;

    return (
        <div>
            <Dialog open={open} onClose={onClose}>
                <DialogTitle>New Conversation</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please enter a Google email address for the user you wish to chat with.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Email Address"
                        value={email}
                        type="email"
                        fullWidth
                        variant="standard"
                        onChange={(e) => onEmailChange(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button disabled={!email} onClick={onCreate}>Create</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
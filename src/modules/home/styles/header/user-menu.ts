import { Button, styled } from "@mui/material";

export const UserMenu = styled(Button)(() => ({
    borderRadius: 25,
    border: '1px solid #DDDDDD',
    padding: '5px 5px 5px 12px',
    color: '#222222',
    backgroundColor: 'white',
    '&:hover': {
        backgroundColor: 'white',
        boxShadow: '0 2px 4px rgba(0,0,0,0.18)',
    },
}));
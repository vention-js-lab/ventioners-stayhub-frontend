import { Button, styled } from "@mui/material";

export const SearchButton = styled(Button)(() => ({
    minWidth: '40px',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: '#FF385C',
    color: 'white',
    flexShrink: 0, // Prevents the button from shrinking
    '&:hover': {
        backgroundColor: '#D70466',
    },
}));
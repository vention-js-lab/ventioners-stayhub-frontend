import { IconButton, styled } from "@mui/material";

export const CounterButton = styled(IconButton)(() => ({
    border: '1px solid #DDDDDD',
    borderRadius: '50%',
    width: 32,
    height: 32,
    '&.Mui-disabled': {
        border: '1px solid #EBEBEB',
        backgroundColor: 'transparent',
    },
}));
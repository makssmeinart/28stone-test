import { useEffect } from "react";
import styled from "styled-components";

export const Snackbar = ({ open, autoHideDuration, onClose, error }: SnackbarPropsType) => {

    useEffect(() => {
        open && setTimeout(() => {
            onCloseCallback()
        }, autoHideDuration)
    }, [open])

    const onCloseCallback = () => {
        return onClose()
    }

    return (
        <>
            {
                open &&
                <SnackbarBody className={`${"show"} ${"close"}`}>
                    <p>{error}</p>
                    <CloseSnackbar onClick={onCloseCallback}>+</CloseSnackbar>
                </SnackbarBody>
            }
        </>
    )
}

// Types

const SnackbarBody = styled.div`
    display: flex;
    gap: 1rem;
    overflow: hidden;
    align-items: center;
    justify-content: space-between;
    min-width: 250px; /* Set a default minimum width */
    margin-left: -125px; /* Divide value of min-width by 2 */
    background-color: #ce2828; /* Black background color */
    color: #fff; /* White text color */
    font-weight: 500;
    text-align: center; /* Centered text */
    border-radius: 5px; /* Rounded borders */
    padding: 3px 20px; /* Padding */
    position: fixed; /* Sit on top of the screen */
    z-index: 100; /* Add a z-index if needed */
    left: 150px; /* Center the snackbar */
    bottom: 30px; /* 30px from the bottom */
    box-shadow: rgba(0, 0, 0, 0.09) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;

    &.close:hover {
        background-color: #be0f0f;
    }
    &.show {
        animation: fadein 1s, fadeout 1s 2s;
    }

    @-webkit-keyframes fadein {
    from {bottom: 0; opacity: 0;}
    to {bottom: 30px; opacity: 1;}
}

    @keyframes fadein {
    from {bottom: 0; opacity: 0;}
    to {bottom: 30px; opacity: 1;}
    }   

    @-webkit-keyframes fadeout {
    from {bottom: 30px; opacity: 1;}
    to {bottom: 0; opacity: 0;}
    }

    @keyframes fadeout {
    from {bottom: 30px; opacity: 1;}
    to {bottom: 0; opacity: 0;}
    }
`

const CloseSnackbar = styled.button`
    border-radius: 50%;
    border: none;
    height: 35px;
    width: 35px;
    cursor: pointer;
    background: transparent;
    color: white;
    font-weight: 400;
    font-size: 30px;
    transform: rotate(45deg);
    margin-top: 3px;
`

type SnackbarPropsType = {
    open: boolean
    autoHideDuration?: number
    onClose: () => void
    error: string
    type?: string
}
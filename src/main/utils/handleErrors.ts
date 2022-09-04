import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit"
import { AxiosError } from "axios"
import { updateErrorMessage, updateStatus } from "../bll/reducers/appReducer"

export const handleErrors = ({ e, dispatch }: HandleErorrsPropsType) => {
    const error = e as AxiosError
    const errorMessage = error.message
    dispatch(updateStatus("failed"))
    dispatch(updateErrorMessage(errorMessage))
    throw (errorMessage)
}

export type HandleErorrsPropsType = {
    // This is one problematic type...
    e: AxiosError | any,
    dispatch: ThunkDispatch<unknown, unknown, AnyAction>
}
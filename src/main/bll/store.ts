import { configureStore } from '@reduxjs/toolkit'
import { appReducer, currencyReducer } from './reducers'

export const store = configureStore({
  reducer: { 
    appReducer,
    currencyReducer,
   },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

// export const useAppDispatch: () => AppDispatch = useDispatch
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

// There are utilities in browser to monitior redux state but this is good quick access to store if we need it 
//@ts-ignore
window.store = store
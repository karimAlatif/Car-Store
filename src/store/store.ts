import { configureStore, Action  } from "@reduxjs/toolkit";
import dashboardSlice from '../views/application/dashboard/actions/dashboardSlice';
import { ThunkAction } from 'redux-thunk'

import rootReducer, { RootState } from './rootReducer'

const store = configureStore({
    reducer: rootReducer
})

export type AppDispatch = typeof store.dispatch

export type AppThunk = ThunkAction<void, RootState, null, Action<string>>

export default store



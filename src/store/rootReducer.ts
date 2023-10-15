import { combineReducers } from '@reduxjs/toolkit'

import generalSlice from './generalSlice';
import dashboardSlice from '../views/application/dashboard/actions/dashboardSlice';
import marketPlaceSlice from '../views/application/marketplace/actions/marketPlaceSlice';

const rootReducer = combineReducers({
    generalSlice:generalSlice,
    dashboard: dashboardSlice,
    marketPlace: marketPlaceSlice,
})

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer
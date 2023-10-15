import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { DasboardData } from "../definitions/types";

const initialState : DasboardData = {
    analytics: {
        energy: 0,
        range: 0,
        breakFluid: 0,
        tireWear: 0,
    },
    badges: 0,
    points: 0,
    recommendedCars:[],
}

export const dashboardSlice = createSlice({
    name: 'dasboard',
    initialState,
    reducers: {
        setDasboardData: (state, action: PayloadAction<DasboardData>) => {
            return action.payload;
        },
    }
});

export const { setDasboardData } = dashboardSlice.actions;

export default dashboardSlice.reducer;
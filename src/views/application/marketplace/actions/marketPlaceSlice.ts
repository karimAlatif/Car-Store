import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Car } from "../definitions/types";

const initialState : {cars:Car[]} = {
    cars:[]
};


export const marketPlaceSlice = createSlice({
    name: 'dasboard',
    initialState,
    reducers: {
        setCars: (state, action: PayloadAction<Car[]>) => {
            return {
                ...state,
                cars: [...action.payload]
            };
        },
    }
});

export const { setCars } = marketPlaceSlice.actions;

export default marketPlaceSlice.reducer;
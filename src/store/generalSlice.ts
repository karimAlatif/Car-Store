import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface GeneralTypes {
    isError: boolean;
    isDarkMode: boolean;

}
const initialState : GeneralTypes = {
    isError: false,
    isDarkMode: false,
}

export const dashboardSlice = createSlice({
    name: 'general',
    initialState,
    reducers: {
        setIsError: (state, action: PayloadAction<boolean>) => {
            return {
                ...state,
                isError: action.payload
            };
        },
        setIsDarkMode: (state, action: PayloadAction<boolean>) => {
            return {
                ...state,
                isDarkMode: action.payload
            };
        },
    }
});

export const { setIsError, setIsDarkMode } = dashboardSlice.actions;

export default dashboardSlice.reducer;
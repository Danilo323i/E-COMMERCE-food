import { createSlice } from '@reduxjs/toolkit';

// Crea un slice chiamato "counter" con uno stato iniziale e delle azioni
const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0,
  },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
  },
});

// Esporta le azioni e il reducer
export const { increment, decrement } = counterSlice.actions;
export default counterSlice.reducer;

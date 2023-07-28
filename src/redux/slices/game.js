import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  player: 1,
  end: false,
  reset: false,
  fields: [3, 4, 5, 6, 7, 8, 9, 10, 11],
}

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setPlayer: (state, action) => {
        state.player = action.payload
    },
    setEnd: (state, action) => {
        state.end = action.payload
    },
    setFields: (state, action) => {
        state.fields = state.fields.map((field, index) => {
            if (index === action.payload){
                field = state.player;
            }
            return field
        })
        console.log(state.fields);
    },
    setReset: (state) => {
        state.reset = true;
        state.fields = [3, 4, 5, 6, 7, 8, 9, 10, 11];
    },
    setStart: (state) => {
      state.end = false;
      state.reset = false;  
    }
  },
})

export const { setPlayer, setEnd, setFields, setReset, setStart } = gameSlice.actions

export default gameSlice.reducer
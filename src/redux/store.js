import { configureStore } from '@reduxjs/toolkit'
import game from './slices/game'

export const store = configureStore({
  reducer: {
    game
  },
})
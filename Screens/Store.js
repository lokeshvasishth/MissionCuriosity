import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './Reducer/rootReducer'

export const myStore = configureStore({
    reducer:rootReducer
})
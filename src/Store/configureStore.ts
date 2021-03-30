import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit'
import {createLogger} from 'redux-logger';
import {DEV} from './constants';
import {rootReducer} from "./Reducers";

const logger = createLogger({
    collapsed: true,
})

const store = configureStore({
    reducer: rootReducer,
    middleware: [...getDefaultMiddleware(), logger]
})

if (DEV && module.hot) {
    module.hot.accept('./Reducers', () => {
        const nextRootReducer = require('./Reducers')
        store.replaceReducer(nextRootReducer)
    })
}

export type AppDispatch = typeof store.dispatch
export default store;
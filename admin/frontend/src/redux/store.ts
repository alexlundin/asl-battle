import {configureStore} from "@reduxjs/toolkit";
import {argumentApi, battleApi, commentApi} from "./api/battle";
import {setupListeners} from "@reduxjs/toolkit/query";

export const store = configureStore({
    reducer: {
        [battleApi.reducerPath]: battleApi.reducer,
        [argumentApi.reducerPath]: argumentApi.reducer,
        [commentApi.reducerPath]: commentApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(battleApi.middleware).concat(argumentApi.middleware).concat(commentApi.middleware),

})

setupListeners(store.dispatch)

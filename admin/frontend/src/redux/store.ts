import {configureStore} from "@reduxjs/toolkit";
import {argumentApi, battleApi} from "./api/battle";
import {setupListeners} from "@reduxjs/toolkit/query";

export const store = configureStore({
    reducer: {
        [battleApi.reducerPath]: battleApi.reducer,
        [argumentApi.reducerPath]: argumentApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(battleApi.middleware).concat(argumentApi.middleware),

})

setupListeners(store.dispatch)

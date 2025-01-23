import { createStore, applyMiddleware, combineReducers } from "redux";
import { productsReducer } from "./reducers/productsReducer.ts";
import createSagaMiddleware from 'redux-saga';
import rootSaga from "./sagas/rootSaga";


const rootReducer = combineReducers({
    products: productsReducer,
});

const sagaMiddleware  = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

export default store;
export type RootState = ReturnType<typeof rootReducer>;

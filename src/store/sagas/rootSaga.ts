import { all, fork } from "redux-saga/effects";
import { watchFetchProducts } from "./productSaga";

export default function* rootSaga() {
    yield all([fork(watchFetchProducts)]);
}

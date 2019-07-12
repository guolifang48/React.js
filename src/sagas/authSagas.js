
import axios from 'axios';
import { call, takeEvery, fork, select, put, take, all } from 'redux-saga/effects';
import { createRequestInstance, watchRequests, requestsReducer } from 'redux-saga-requests';
import { createDriver } from 'redux-saga-requests-axios';

import {
	incrementRequestCounter,
	incrementResponseCounter,
	incrementErrorCounter
} from '../actions/authActions';

const fetchBooks = () => ({
	type: 'FETCH_BOOKS',
	request: {
		url: '/books',
		// you can put here other Axios config attributes, like method, data, headers etc.
	},
	});

const booksReducer = requestsReducer({ actionType: 'FETCH_BOOKS' })

function* requestCounterSaga(request) {
	yield put(incrementRequestCounter());
	return request;
}

function* responseCounterSaga(request) {
	yield put(incrementRequestCounter());
	return request;
}

function* errorCounterSaga(error, action) {
	yield put(incrementErrorCounter());
	if (
		error.response &&
		error.response.status === 404 &&
		action.type === 'FETCH_PHOTO'
	) {
		return yield requestsReducer(booksReducer);
	}
	return { error };
}

export default function* rootSaga() {
	yield createRequestInstance({ 
		onRequest: requestCounterSaga,
		onSuccess: responseCounterSaga,
		onError: errorCounterSaga,
		driver: createDriver(axios) 
	});
	yield watchRequests();
}
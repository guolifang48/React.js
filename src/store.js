import { applyMiddleware, createStore, compose } from 'redux'
import { persistStore, persistCombineReducers } from 'redux-persist'
import storage from 'redux-persist/es/storage'
import createSagaMiddleware from 'redux-saga'
import auth from './reducers/auth'
import chat from './reducers/chat'

const config = {
	key: 'root',
	storage,
}

const reducer = persistCombineReducers(config, {
	auth,
	chat
})

const sagaMiddleware = createSagaMiddleware()

const composeCreateStore = () =>
	compose(applyMiddleware(sagaMiddleware), window.devToolsExtension ? window.devToolsExtension() : fn => fn)(
		createStore,
	)
const configureStore = port => {
	const finalCreateStore = composeCreateStore(port)
	const store = {
		...finalCreateStore(reducer),
		runSaga: sagaMiddleware.run,
	}
	const persistor = persistStore(store)
	return { persistor, store }
}
export default configureStore

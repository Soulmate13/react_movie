import { createStore, applyMiddleware, compose } from 'redux'
import { createLogger as reduxLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from './Reducers'
import { DEV } from './constants';


export default function configureStore(initialState) {
    let enhancer;
    const middleware = [];
    middleware.push(thunk);

    if (DEV) {
        middleware.push(reduxLogger({
            collapsed: true,
        }));

        // https://github.com/zalmoxisus/redux-devtools-extension#redux-devtools-extension
        let devToolsExtension = f => f;
        if (window.devToolsExtension) {
            devToolsExtension = window.devToolsExtension();
        }
        enhancer = compose(applyMiddleware(...middleware), devToolsExtension);
    } else {
        enhancer = applyMiddleware(...middleware);
    }

    const store = createStore(
        rootReducer,
        initialState,
        enhancer
    )
    if (DEV && module.hot) {
        module.hot.accept('./Reducers', () => {
            const nextRootReducer = require('./Reducers')
            store.replaceReducer(nextRootReducer)
        })
    }
    return store;
}
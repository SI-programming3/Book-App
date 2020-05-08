import { createStore, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import rootReducer from "./reducers";

interface WINDOW extends Window {
  __REDUX_DEVTOOLS_EXTENSION__?: typeof compose;
}
declare const window: WINDOW;

const loggerMiddleware = createLogger();

export default function configureStore() {
  const devtools =
    process.env.NODE_ENV !== "production" && window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : (f: any) => f;

  return createStore(
    rootReducer,
    compose(applyMiddleware(thunkMiddleware, loggerMiddleware), devtools)
  );
}

export type RootState = ReturnType<typeof rootReducer>;

/*
ミドルウェアなしではReduxのstoreは同期的なデータフローしかサポートしていないが、
  applyMiddleware()を使うことでcreateStore()を拡張できる
redux-loggerはActionがDispatchされる前後のstateと
  DispatchされたActionをconsole上に出力する。
意図したActionが発動しているか、その前後で期待したstateの変更が
  しっかり行われているかどうか確認するためにはとても有用。
 createStoreの第２引数にstateの初期値を与える場合、applyMiddlewareは第３引数に。
applyMiddlewareはミドルウェアを適用するのに必要な関数。
applyMiddlewareを使用すると、dispatchが実行された際に、
  dispatchではなく指定した Middleware が呼び出されるようになる。
middleware内にmiddlewareといったマトリョーシカのよう。最後にdispatchするらしい。

*/

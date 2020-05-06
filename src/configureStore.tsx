import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import rootReducer from "./reducers";

const loggerMiddleware = createLogger();

export default function configureStore() {
  return createStore(
    rootReducer,
    applyMiddleware(thunkMiddleware, loggerMiddleware)
  );
}
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

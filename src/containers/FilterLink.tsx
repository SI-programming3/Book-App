import { connect } from "react-redux";
import { setVisibilityFilter } from "../actions";
import Link from "../components/Link";
import { RootState } from "../reducers";

const mapStateToProps = (
  state: RootState,
  ownProps: { children: string; filter: string }
) => ({
  active: ownProps.filter === state.visibilityFilter,
});

const mapDispatchToProps = (
  dispatch: Function,
  ownProps: { children: string; filter: string }
) => ({
  onClick: () => dispatch(setVisibilityFilter(ownProps.filter)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Link);

/*
ownPropsは現在のpropsのこと。所謂this.stateとかthis.props的な？
ownProps.filterはFooterから渡されたfilterで、
  中身はVisibilityFiltersのプロパティ。SHOW_ALL、SHOW_COMPLETED、SHOW_ACTIVE。
mapStateToPropsは、現在のfilterとstate.visibilityFilterが同じかどうかをactiveに代入し、
  子コンポーネントに渡そうとしている。
mapDispatchToPropsは、() => dispatch(setVisibilityFilter(ownProps.filter))
  という関数をonClickという名前で子コンポーネントに渡そうとしている。
それらを子コンポーネントのLinkに渡している。

state.visibilityFilterは、初期状態の時にvisibilityFilter内でSHOW_ALLが代入されている。
  なので、ページが出力された時にはAllのボタンのdisabled属性が
    active: trueとなっているためAllが押せない。
*/

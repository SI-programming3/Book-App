import React, { Component } from "react";

export default class Picker extends Component {
  render() {
    const { value, onChange, options } = this.props;

    return (
      <span>
        <h1>{value}</h1>
        <select onChange={(e) => onChange(e.target.value)} value={value}>
          {options.map((option) => (
            <option value={option} key={option}>
              {option}
            </option>
          ))}
        </select>
      </span>
    );
  }
}

/*
h1のところはreactjsかfrontendを表示する。
selectのところはreactjsかfrontendを選択できる。ここの変更でh1やリストの表示が変わる。
optionsのなかに選択する項目があるので、それを用いて一つずつ選択肢に出力している
*/

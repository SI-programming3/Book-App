import React from "react";

type PickerProps = {
  value: string;
  options: string[];
  onChange: (selected: string) => void;
};

const Picker: React.FC<PickerProps> = ({ value, onChange, options }) => {
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
};

export default Picker;

/*
h1のところはreactjsかfrontendを表示する。
selectのところはreactjsかfrontendを選択できる。ここの変更でh1やリストの表示が変わる。
optionsのなかに選択する項目があるので、それを用いて一つずつ選択肢に出力している

React.FC<PickerProps>は、typeで定義したものをジェネリック型として渡すことで、
  AsyncAppから渡された引数をPicker内で使えるようにしている。
*/

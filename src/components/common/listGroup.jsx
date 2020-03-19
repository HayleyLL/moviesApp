import React from "react";

const Genres = ({
  items,
  valueProperty,
  textProperty,
  selectedItem,
  onItemSelect
}) => {
  return (
    <ul className="list-group">
      {items.map(item => (
        <li
          onClick={() => onItemSelect(item)}
          key={item[valueProperty]} //传入item的相应属性，而不使用item._id这样很具体的属性名，使函数更加灵活，任何list都可用
          className={
            item === selectedItem ? "list-group-item active" : "list-group-item"
          }
        >
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
};

Genres.defaultProps = {
  //注意大小写
  //为组件设置默认属性；避免在movies组件中这个组件的属性过多，太庞大
  textProperty: "name",
  valueProperty: "_id"
};
export default Genres;

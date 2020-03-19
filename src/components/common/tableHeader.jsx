import React, { Component } from "react";

class TableHeader extends Component {
  //columns:array
  //sortColumn:obj
  //onSort:func

  raiseSort = path => {
    const sortColumn = { ...this.props.sortColumn };
    if (path === undefined) return null; //如果点击最后两列，不要排序，也不要出现sortIcon
    if (sortColumn.path === path)
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    else {
      sortColumn.path = path;
      sortColumn.order = "asc"; //将这些代码从onSort()中移过来，因为它们应该属于这个组件，再复用此组件时这些代码已经有了，只需要修改state了
    }
    this.props.onSort(sortColumn);
  };

  renderSortIcon = column => {
    const { sortColumn } = this.props;

    if (column.path !== sortColumn.path) return null;
    if (sortColumn.order === "asc") return <i className="fa fa-sort-asc" />;
    return <i className="fa fa-sort-desc" />;
  };

  render() {
    return (
      <thead>
        <tr>
          {this.props.columns.map(column => (
            <th
              className="clickable"
              key={column.path || column.key}
              onClick={() => this.raiseSort(column.path)}
            >
              {column.label}
              {this.renderSortIcon(column)}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;

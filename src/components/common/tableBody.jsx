import React, { Component } from "react";
import _ from "lodash";

class TableBody extends Component {
  //将这些代码单独抽成函数
  renderCell = (item, column) => {
    if (column.content) return column.content(item);
    return _.get(item, column.path);
  };

  createKey = (item, column) => {
    return item._id + (column.path || column.key);
  };

  render() {
    const { data, columns } = this.props;
    return (
      //_id也可以设置一个defaultProps，使其更灵活
      <tbody>
        {data.map(item => (
          <tr key={item._id}>
            {columns.map(
              column => (
                <td key={this.createKey(item, column)}>
                  {this.renderCell(item, column)}
                </td>
              ) //如果用item[item.path]，=>item['genre.name']不起作用
            )}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;

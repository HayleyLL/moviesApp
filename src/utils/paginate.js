import _ from "lodash";

export function paginate(items, pageNumber, pageSize) {
  const startIndex = (pageNumber - 1) * pageSize;
  return _.chain(items)
    .slice(startIndex)
    .take(pageSize)
    .value(); //value() to unwrap a lodash object
}

import axios from "axios";

import {
  invalidParams,
  invalidStrings,
  invalidNums,
} from "@/validation/validation";
import apis from "@/data/apis";

const get = async (year, query, limit) => {
  // Check for invalid params
  invalidParams(year, query, limit);
  invalidStrings({ year, query });
  invalidNums({ limit });
  query = query.trim();

  let api = apis.find((api) => api.key === year);
  let { endpoint, column_name_map, query_columns } = api;

  let all_columns_string = column_name_map.map((d) => d[1]);

  let queryString = query_columns
    .map(
      (col, i) =>
        `UPPER(${col}) LIKE '%25${query.toUpperCase()}%25' ${
          i + 1 === query_columns.length ? "" : "OR "
        }`
    )
    .join("");

  let result = await axios.get(
    `${endpoint}?$query=SELECT ${all_columns_string} WHERE ${queryString} LIMIT 8`
  );

  return result.data;
};

export { get };

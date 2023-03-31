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
  let { endpoint, map, queryColumns } = api;

  let all = map.map((d) => d[1]);

  let queryString = queryColumns
    .map(
      (col, i) =>
        `UPPER(${col}) LIKE '%25${query.toUpperCase()}%25' ${
          i + 1 === queryColumns.length ? "" : "OR "
        }`
    )
    .join("");

  let result = await axios.get(
    `${endpoint}?$query=SELECT ${all} WHERE ${queryString} LIMIT 8`
  );

  return { res: result.data, cols: queryColumns };
};

export { get };

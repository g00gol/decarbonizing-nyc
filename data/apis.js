let apis = [
  {
    key: "ll84_2022_cal_2021",
    endpoint: "https://data.cityofnewyork.us/resource/7x5e-2fxh.json",
    column_name_map: [
      ["property_name", "property_name"],
      ["property_id", "property_id"],
      ["address_1", "address_1"],
      ["nyc_bbl", "nyc_borough_block_and_lot"],
      ["nyc_bin", "nyc_building_identification"],
      ["1st_property_use_type", "largest_property_use_type"],
      ["1st_property_use_sf", "largest_property_use_type_1"],
      ["2nd_property_use_type", "_2nd_largest_property_use"],
      ["2nd_property_use_sf", "_2nd_largest_property_use_1"],
      ["3rd_property_use_type", "_3rd_largest_property_use"],
      ["3rd_property_use_sf", "_3rd_largest_property_use_1"],
      ["fuel_oil_2_consumption_kbtu", "fuel_oil_2_use_kbtu"],
      ["fuel_oil_4_consumption_kbtu", "fuel_oil_4_use_kbtu"],
      ["district_steam_consumption_kbtu", "district_steam_use_kbtu"],
      ["natural_gas_consumption_kbtu", "natural_gas_use_kbtu"],
      ["electricity_consumption_kbtu", "electricity_use_grid_purchase"],
      ["electricity_onsite_generated_kbtu", "electricity_use_generated"],
      ["latitude", "latitude"],
      ["longitude", "longitude"],
    ],
    query_columns: [
      "property_name",
      "nyc_borough_block_and_lot",
      "address_1",
      "nyc_building_identification",
    ],
  },
  {
    key: "ll84_2021_cal_2020",
    endpoint: "https://data.cityofnewyork.us/resource/usc3-8zwd.json",
    query_columns: [
      "property_name",
      "nyc_borough_block_and_lot_bbl",
      "address_1",
      "nyc_building_identification_number_bin",
    ],
  },
];

export default apis;

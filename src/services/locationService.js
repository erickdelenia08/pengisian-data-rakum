import data from "../data/province_districts.json";

export const getProvinces = () => {
  return data.map((prov) => ({
    id: prov.province_id,
    name: prov.province_name,
  }));
};

export const getDistricts = (provinceId) => {
  const prov = data.find((p) => p.province_id === provinceId);
  return prov ? prov.districts : [];
};

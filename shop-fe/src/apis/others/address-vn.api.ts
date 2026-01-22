const URL = process.env.NEXT_PUBLIC_API_ADDRESS_VN_URL

export const getProvinces = async () => {
  const response = await fetch(`${URL}/provinces/getAll?limit=-1`)
  return response.json()
}

export const getDistricts = async (provinceCode: number) => {
  const response = await fetch(`${URL}/districts/getByProvince?provinceCode=${provinceCode}&limit=-1`)
  return response.json()
}

export const getWards = async (districtCode: number) => {
  const response = await fetch(`${URL}/wards/getByDistrict?districtCode=${districtCode}&limit=-1`)
  return response.json()
}
export async function getLocationNameByCode(code: string): Promise<string | null> {
  if (!code) return null;

  try {
    const res = await fetch(
      `https://vn-public-apis.fpo.vn/wards/getAll?limit=-1&q=${code}&cols=code`,
      { cache: "no-store" } // nếu SSR, tránh cache sai
    );

    const json = await res.json();

    return json?.data?.data?.[0]?.path_with_type ?? null;
  } catch (error) {
    console.error("getWardNameByCode error:", error);
    return null;
  }
}

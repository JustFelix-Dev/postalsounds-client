import axios from 'axios';
const API = process.env.NEXT_PUBLIC_STRAPI_API;

export async function getHotspots() {
  const res = await axios.get(`${API}/api/hotspots?populate=images,audio`);
  return res.data; // adjust depending on Strapi response shape
}

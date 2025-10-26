// Example: using fetch
const BASE_URL = "http://localhost:5000";

export const getData = async () => {
  const response = await fetch(`${BASE_URL}/api/data`);
  const data = await response.json();
  return data;
};

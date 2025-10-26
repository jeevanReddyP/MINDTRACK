const BASE_URL = "http://localhost:5000/api/auth"; // backend route

export const getAllUsers = async () => {
  try {
    const response = await fetch(`${BASE_URL}/users`); // example route
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching users:", error);
  }
};

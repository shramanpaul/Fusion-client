import axios from "axios";

const host = "http://127.0.0.1:8000";

export const lodgeComplaint = async (role, complaintData, token) => {
  const url = role.includes("supervisor")
    ? `${host}/complaint/supervisor/lodge/`
    : role.includes("caretaker") || role.includes("convener")
      ? `${host}/complaint/caretaker/lodge/`
      : `${host}/complaint/user/`;

  try {
    const response = await axios.post(url, complaintData, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    return { success: true, data: response.data };
  } catch (error) {
    const errorResponse = error.response?.data || error.message;
    return { success: false, error: errorResponse };
  }
};

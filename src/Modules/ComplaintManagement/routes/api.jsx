import axios from "axios";

const host = "http://127.0.0.1:8000";

// Function to lodge a complaint
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

// Function to fetch complaint details
export const getComplaintDetails = async (complaintId, token) => {
  const url = `${host}/complaint/caretaker/detail2/${complaintId}/`;

  try {
    const response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    });
    return { success: true, data: response.data };
  } catch (error) {
    const errorResponse = error.response?.data || error.message;
    return { success: false, error: errorResponse };
  }
};

// Function to fetch complaints by role
export const getComplaintsByRole = async (role, token) => {
  const url = role.includes("supervisor")
    ? `${host}/complaint/supervisor/`
    : role.includes("caretaker") || role.includes("convener")
      ? `${host}/complaint/caretaker/`
      : `${host}/complaint/user/`;

  try {
    const response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    });
    return { success: true, data: response.data };
  } catch (error) {
    const errorResponse = error.response?.data || error.message;
    return { success: false, error: errorResponse };
  }
};

// Function to fetch complaints for feedback
export const getUserComplaints = async (token) => {
  const url = `${host}/complaint/user/`;

  try {
    const response = await axios.get(url, {
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

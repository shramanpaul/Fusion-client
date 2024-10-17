import React, { useState, useEffect } from "react";
import PropTypes from "prop-types"; // Import PropTypes
import { MantineProvider, Table, Text, Box, Button } from "@mantine/core";
import axios from "axios";
import { host } from "../../routes/globalRoutes";

function BookingTable({ activeBooking, onCancel }) {
  return (
    <Box p="md" style={{ margin: 10 }}>
      <Box
        mb="md"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text size="xl" style={{ paddingBottom: 15, fontWeight: "bold" }}>
          Active Bookings
        </Text>
      </Box>
      <Table
        style={{
          borderRadius: "8px", // Border radius for table
          overflow: "hidden", // Overflow hidden to round table corners
          border: "1px solid #E0E0E0", // Optional border for visibility
        }}
      >
        <thead>
          <tr>
            <th style={{ backgroundColor: "#E6F3FF", padding: "12px" }}>
              Intender
            </th>
            <th style={{ backgroundColor: "#E6F3FF", padding: "12px" }}>
              Booking From
            </th>
            <th style={{ backgroundColor: "#E6F3FF", padding: "12px" }}>
              Booking To
            </th>
            <th style={{ backgroundColor: "#E6F3FF", padding: "12px" }}>
              Category
            </th>
            <th style={{ backgroundColor: "#E6F3FF", padding: "12px" }}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {activeBooking.map((booking) => (
            <tr key={booking.id}>
              <td
                style={{
                  padding: "12px",
                  borderBottom: "1px solid #E0E0E0",
                  textAlign: "center",
                }}
              >
                <Text weight={500}>{booking.intender}</Text>
                <Text size="sm" color="dimmed">
                  {booking.email}
                </Text>
              </td>
              <td
                style={{
                  padding: "12px",
                  borderBottom: "1px solid #E0E0E0",
                  textAlign: "center",
                }}
              >
                {booking.bookingFrom}
              </td>
              <td
                style={{
                  padding: "12px",
                  borderBottom: "1px solid #E0E0E0",
                  textAlign: "center",
                }}
              >
                {booking.bookingTo}
              </td>
              <td
                style={{
                  padding: "12px",
                  borderBottom: "1px solid #E0E0E0",
                  textAlign: "center",
                }}
              >
                {booking.category}
              </td>
              <td
                style={{
                  padding: "12px",
                  borderBottom: "1px solid #E0E0E0",
                  textAlign: "center",
                }}
              >
                <Button
                  color="red"
                  onClick={() => onCancel(booking.id)} // Trigger onCancel with booking ID
                  variant="outline"
                >
                  Cancel
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Box>
  );
}
// Define prop types for BookingTable
BookingTable.propTypes = {
  activeBooking: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      intender: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      bookingFrom: PropTypes.string.isRequired,
      bookingTo: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
    }),
  ).isRequired,
  onCancel: PropTypes.func.isRequired,
};

function ActiveBookingsPage() {
  const [activeBooking, setBookings] = useState([]);

  useEffect(() => {
    const fetchactiveBookings = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        return console.error("No authentication token found!");
      }

      try {
        const { data } = await axios.get(
          `${host}/visitorhostel/get-active-bookings/`,
          {
            headers: { Authorization: `Token ${token}` },
          },
        );
        setBookings(data.active_bookings);
      } catch (error) {
        console.error("Error fetching booking requests:", error);
      }
    };

    fetchactiveBookings(); // Call the async function
  }, []);

  // Handle cancel booking
  const handleCancel = (bookingId) => {
    const updatedBookings = activeBooking.filter(
      (booking) => booking.id !== bookingId,
    );
    setBookings(updatedBookings);
    console.log("Cancelled booking with ID:", bookingId);
  };

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Box
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          backgroundColor: "white",
          borderRadius: "12px", // Add border radius to outer Box
          padding: "16px", // Optional padding
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", // Optional shadow
        }}
      >
        <BookingTable activeBooking={activeBooking} onCancel={handleCancel} />
      </Box>
    </MantineProvider>
  );
}

export default ActiveBookingsPage;

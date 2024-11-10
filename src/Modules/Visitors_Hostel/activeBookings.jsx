import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  MantineProvider,
  Table,
  Text,
  Box,
  Button,
  TextInput,
  Select,
} from "@mantine/core";
import axios from "axios";
import { host } from "../../routes/globalRoutes";

function BookingTable({ activeBooking, onCancel }) {
  const [searchTerm, setSearchTerm] = useState(""); // State to store the search term
  const [sortField, setSortField] = useState("bookingFrom"); // State to store the selected sorting field

  // Sort bookings by the selected field in ascending order
  const sortedBookings = activeBooking
    .sort((a, b) => {
      const valueA = a[sortField].toLowerCase();
      const valueB = b[sortField].toLowerCase();
      return valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
    })
    .filter((booking) => {
      return (
        booking.intender.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.bookingFrom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.bookingTo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });

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
        <TextInput
          placeholder="Search by Intender, Booking From, Booking To "
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.currentTarget.value)}
          style={{ width: "300px", marginRight: "10px" }}
        />
        <Select
          placeholder="Sort by"
          data={[
            { value: "intender", label: "Intender" },
            { value: "bookingFrom", label: "Booking From" },
            { value: "bookingTo", label: "Booking To" },
          ]}
          value={sortField}
          onChange={(value) => setSortField(value)}
          style={{ width: "150px" }}
        />
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
          {sortedBookings.map((booking) => (
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

  const fetchActiveBookings = async () => {
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
      console.error("Error fetching active bookings:", error);
    }
  };

  useEffect(() => {
    fetchActiveBookings();
  }, []);

  const handleCancel = async (bookingId) => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      return console.error("No authentication token found!");
    }

    try {
      const data = {
        "booking-id": bookingId,
        remark: "User canceled the booking.",
        charges: 0,
      };

      await axios.post(`${host}/visitorhostel/cancel-booking/`, data, {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      console.log("Successfully canceled booking with ID:", bookingId);
      fetchActiveBookings();
    } catch (error) {
      console.error("Error canceling the booking:", error);
    }
  };

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Box
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          backgroundColor: "white",
          borderRadius: "12px",
          padding: "16px",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        <BookingTable activeBooking={activeBooking} onCancel={handleCancel} />
      </Box>
    </MantineProvider>
  );
}

export default ActiveBookingsPage;

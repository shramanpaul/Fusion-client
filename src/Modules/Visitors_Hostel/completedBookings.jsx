import React, { useState } from "react";
import { MantineProvider, Table, Text, Box } from "@mantine/core";

// Initial completed bookings array
const completedBookings = [
  {
    id: 1,
    intender: "SINDHU VUKKURTHY",
    email: "22BCS233@iiitdmj.ac.in",
    bookingFrom: "Sept 3, 2024",
    checkIn: "Sept 4, 2024 10:30PM",
    checkOut: "Sept 7, 2024 11:00AM",
    category: "A",
  },
  {
    id: 2,
    intender: "Prof. Atul Gupta",
    email: "atul@iiitdmj.ac.in",
    bookingFrom: "Sept 4, 2024",
    checkIn: "Sept 5, 2024 11:20AM",
    checkOut: "Sept 8, 2024 11:00AM",
    category: "A",
  },
  {
    id: 3,
    intender: "S.V. RISHITHA",
    email: "22BCS216@iiitdmj.ac.in",
    bookingFrom: "Sept 15, 2024",
    checkIn: "Sept 16, 2024 05:30AM",
    checkOut: "Sept 20, 2024 11:00AM",
    category: "B",
  },
  {
    id: 4,
    intender: "KESHAV SONI",
    email: "22BCS135@iiitdmj.ac.in",
    bookingFrom: "Sept 16, 2024",
    checkIn: "Sept 18, 2024 09:30PM",
    checkOut: "Sept 21, 2024 11:00AM",
    category: "B",
  },
  {
    id: 5,
    intender: "Prof. Atul Gupta",
    email: "atul@iiitdmj.ac.in",
    bookingFrom: "Sept 20, 2024",
    checkIn: "Sept 21, 2024 08:10AM",
    checkOut: "Sept 28, 2024 11:00AM",
    category: "A",
  },
];

function BookingTable() {
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
          Completed Bookings
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
              Booking Date
            </th>
            <th style={{ backgroundColor: "#E6F3FF", padding: "12px" }}>
              Check In
            </th>
            <th style={{ backgroundColor: "#E6F3FF", padding: "12px" }}>
              Check Out
            </th>
            <th style={{ backgroundColor: "#E6F3FF", padding: "12px" }}>
              Category
            </th>
          </tr>
        </thead>
        <tbody>
          {completedBookings.map((booking) => (
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
                {booking.checkIn}
              </td>
              <td
                style={{
                  padding: "12px",
                  borderBottom: "1px solid #E0E0E0",
                  textAlign: "center",
                }}
              >
                {booking.checkOut}
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
            </tr>
          ))}
        </tbody>
      </Table>
    </Box>
  );
}

function CompletedBookingsPage() {
  const [bookings] = useState(completedBookings);

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
        <BookingTable bookings={bookings} />
      </Box>
    </MantineProvider>
  );
}

export default CompletedBookingsPage;

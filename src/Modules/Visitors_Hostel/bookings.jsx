import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  MantineProvider,
  Table,
  Button,
  Badge,
  Text,
  Box,
} from "@mantine/core";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { host } from "../../routes/globalRoutes";
import CombinedBookingForm from "./bookingForm";
import ForwardBookingForm from "./forwardBooking";
import ConfirmBookingIn from "./confirmBooking_Incharge";

function BookingsRequestTable({ bookings }) {
  const [modalOpened, setModalOpened] = useState(false); // State to control modal
  const [forwardModalOpened, setForwardModalOpened] = useState(null); // State to control forward modal for each booking

  const handleForwardButtonClick = (bookingId) => {
    setForwardModalOpened(bookingId); // Open modal for the specific booking
  };

  const handleForwardCloseModal = () => {
    setForwardModalOpened(null); // Close modal
  };

  const handleButtonClick = () => {
    setModalOpened(true); // Open modal when "Place Request" is clicked
  };

  const handleCloseModal = () => {
    setModalOpened(false); // Close modal
  };

  const role = useSelector((state) => state.user.role);

  // Filter bookings based on role and status
  const filteredBookings = bookings.filter((booking) => {
    console.log("BOOKING STATUS: ", bookings.status);
    if (role === "VhIncharge") {
      return booking.status === "Forward";
    }
    return booking.status !== "Forward";
  });

  return (
    <Box p="md" style={{ margin: 10 }}>
      {bookings.status}
      <Box
        mb="md"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text size="xl" style={{ paddingBottom: 15, fontWeight: "bold" }}>
          Booking Requests
        </Text>

        <Button variant="outline" color="red" onClick={handleButtonClick}>
          Place Request
        </Button>
      </Box>
      {modalOpened && (
        <CombinedBookingForm
          modalOpened={modalOpened}
          onClose={handleCloseModal}
        />
      )}
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
            {role === "VhIncharge" && (
              <th style={{ backgroundColor: "#E6F3FF", padding: "12px" }}>
                Modified Category
              </th>
            )}
            <th style={{ backgroundColor: "#E6F3FF", padding: "12px" }}>
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredBookings.map((booking) => (
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
                {console.log("BOOKING: ", booking)}
              </td>
              {role === "VhIncharge" ? (
                <td
                  style={{
                    padding: "12px",
                    borderBottom: "1px solid #E0E0E0",
                    textAlign: "center",
                  }}
                >
                  {booking.modifiedCategory}
                </td>
              ) : null}
              <td
                style={{
                  padding: "12px",
                  borderBottom: "1px solid #E0E0E0",
                  textAlign: "center",
                }}
              >
                {role === "VhCaretaker" ? (
                  <>
                    <Button
                      variant="outline"
                      color="green"
                      onClick={() => handleForwardButtonClick(booking.id)}
                    >
                      Forward
                    </Button>
                    {forwardModalOpened === booking.id && (
                      <ForwardBookingForm
                        forwardmodalOpened={forwardModalOpened === booking.id}
                        onClose={handleForwardCloseModal}
                        bookingId={booking.id}
                      />
                    )}
                  </>
                ) : role === "VhIncharge" && booking.status === "Forward" ? (
                  <>
                    <Button
                      variant="outline"
                      color="green"
                      onClick={() => handleForwardButtonClick(booking.id)}
                    >
                      Confirm
                    </Button>
                    {forwardModalOpened === booking.id && (
                      <ConfirmBookingIn
                        forwardmodalOpened={forwardModalOpened === booking.id}
                        onClose={handleForwardCloseModal}
                        bookingId={booking.id}
                        bookingf={booking}
                      />
                    )}
                  </>
                ) : (
                  <Badge
                    color={booking.status === "Pending" ? "gray" : "pink"}
                    variant="light"
                    style={{
                      backgroundColor:
                        booking.status === "Pending" ? "#E0E0E0" : "#dffbe0",
                      color:
                        booking.status === "Pending" ? "#757575" : "#84b28c",
                      padding: "4px 8px",
                      borderRadius: "4px",
                    }}
                  >
                    {booking.status}
                  </Badge>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Box>
  );
}
// Define prop types for BookingsRequestTable
BookingsRequestTable.propTypes = {
  bookings: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      intender: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      bookingFrom: PropTypes.string.isRequired,
      bookingTo: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

function Bookings() {
  const [bookings, setBookings] = useState([]);
  // test
  useEffect(() => {
    const fetchBookings = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        return console.error("No authentication token found!");
      }

      try {
        const { data } = await axios.get(
          `${host}/visitorhostel/get-booking-requests/`,
          {
            headers: { Authorization: `Token ${token}` },
          },
        );
        // Handle the fetched data here, e.g.:
        console.log("Token :", token);
        console.log("Fetched booking requests data:", data); // Log
        setBookings(data.pending_bookings);
        // setBookings(data);
        // setLoading(false);
      } catch (error) {
        console.error("Error fetching booking requests:", error);
        // setLoading(false);
      }
    };

    fetchBookings(); // Call the async function
  }, []); // Empty dependency array ensures it runs only once

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
        <BookingsRequestTable bookings={bookings} />
      </Box>
    </MantineProvider>
  );
}

export default Bookings;

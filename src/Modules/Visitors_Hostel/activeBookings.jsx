// import React from "react";
// import { MantineProvider, Table, Badge, Text, Box } from "@mantine/core";

// const activeBookings = [
//   {
//     id: 1,
//     intender: "SINDHU VUKKURTHY",
//     email: "22BCS233@iiitdmj.ac.in",
//     bookingFrom: "Sept 3, 2024",
//     bookingTo: "Sept 4, 2024",
//     category: "A",
//     status: "Active",
//   },
//   {
//     id: 2,
//     intender: "Prof. Atul Gupta",
//     email: "atul@iiitdmj.ac.in",
//     bookingFrom: "Sept 4, 2024",
//     bookingTo: "Sept 5, 2024",
//     category: "A",
//     status: "Active",
//   },
//   {
//     id: 3,
//     intender: "S.V. RISHITHA",
//     email: "22BCS216@iiitdmj.ac.in",
//     bookingFrom: "Sept 15, 2024",
//     bookingTo: "Sept 16, 2024",
//     category: "B",
//     status: "Cancelled",
//   },
//   {
//     id: 4,
//     intender: "KESHAV SONI",
//     email: "22BCS135@iiitdmj.ac.in",
//     bookingFrom: "Sept 16, 2024",
//     bookingTo: "Sept 18, 2024",
//     category: "B",
//     status: "Active",
//   },
// ];

// function BookingTable() {
//   return (
//     <Box p="md" style={{ margin: 10 }}>
//       <Box
//         mb="md"
//         style={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//         }}
//       >
//         <Text size="xl" style={{ paddingBottom: 15, fontWeight: "bold" }}>
//           Active Booking
//         </Text>
//       </Box>
//       <Table
//         style={{
//           borderRadius: "8px", // Border radius for table
//           overflow: "hidden", // Overflow hidden to round table corners
//           border: "1px solid #E0E0E0", // Optional border for visibility
//         }}
//       >
//         <thead>
//           <tr>
//             <th style={{ backgroundColor: "#E6F3FF", padding: "12px" }}>
//               Intender
//             </th>
//             <th style={{ backgroundColor: "#E6F3FF", padding: "12px" }}>
//               Booking From
//             </th>
//             <th style={{ backgroundColor: "#E6F3FF", padding: "12px" }}>
//               Booking To
//             </th>
//             <th style={{ backgroundColor: "#E6F3FF", padding: "12px" }}>
//               Category
//             </th>
//             <th style={{ backgroundColor: "#E6F3FF", padding: "12px" }}>
//               Status
//             </th>
//           </tr>
//         </thead>
//         <tbody>
//           {activeBookings.map((booking) => (
//             <tr key={booking.id}>
//               <td
//                 style={{
//                   padding: "12px",
//                   borderBottom: "1px solid #E0E0E0",
//                   textAlign: "center",
//                 }}
//               >
//                 <Text weight={500}>{booking.intender}</Text>
//                 <Text size="sm" color="dimmed">
//                   {booking.email}
//                 </Text>
//               </td>
//               <td
//                 style={{
//                   padding: "12px",
//                   borderBottom: "1px solid #E0E0E0",
//                   textAlign: "center",
//                 }}
//               >
//                 {booking.bookingFrom}
//               </td>
//               <td
//                 style={{
//                   padding: "12px",
//                   borderBottom: "1px solid #E0E0E0",
//                   textAlign: "center",
//                 }}
//               >
//                 {booking.bookingTo}
//               </td>
//               <td
//                 style={{
//                   padding: "12px",
//                   borderBottom: "1px solid #E0E0E0",
//                   textAlign: "center",
//                 }}
//               >
//                 {booking.category}
//               </td>
//               <td
//                 style={{
//                   padding: "12px",
//                   borderBottom: "1px solid #E0E0E0",
//                   textAlign: "center",
//                 }}
//               >
//                 <Badge
//                   color={
//                     booking.status === "Active"
//                       ? "green"
//                       : booking.status === "Pending"
//                         ? "gray"
//                         : "pink"
//                   }
//                   variant="light"
//                   style={{
//                     backgroundColor:
//                       booking.status === "Active"
//                         ? "#E0FFE0"
//                         : booking.status === "Pending"
//                           ? "#E0E0E0"
//                           : "#FFE0E0",
//                     color:
//                       booking.status === "Active"
//                         ? "#2E7D32"
//                         : booking.status === "Pending"
//                           ? "#757575"
//                           : "#FF6B6B",
//                     padding: "4px 8px",
//                     borderRadius: "4px",
//                   }}
//                 >
//                   {booking.status}
//                 </Badge>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>
//     </Box>
//   );
// }

// function ActiveBookingsPage() {
//   return (
//     <MantineProvider withGlobalStyles withNormalizeCSS>
//       <Box
//         style={{
//           maxWidth: "1200px",
//           margin: "0 auto",
//           backgroundColor: "white",
//           borderRadius: "12px", // Add border radius to outer Box
//           padding: "16px", // Optional padding
//           boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", // Optional shadow
//         }}
//       >
//         <BookingTable bookings={activeBookings} title="Active Bookings" />
//       </Box>
//     </MantineProvider>
//   );
// }

// export default ActiveBookingsPage;

import React, { useState } from "react";
import { MantineProvider, Table, Text, Box, Button } from "@mantine/core";

// Initial active bookings array
const bookings = [
  {
    id: 1,
    intender: "SINDHU VUKKURTHY",
    email: "22BCS233@iiitdmj.ac.in",
    bookingFrom: "Sept 3, 2024",
    bookingTo: "Sept 4, 2024",
    category: "A",
  },
  {
    id: 2,
    intender: "Prof. Atul Gupta",
    email: "atul@iiitdmj.ac.in",
    bookingFrom: "Sept 4, 2024",
    bookingTo: "Sept 5, 2024",
    category: "A",
  },
  {
    id: 4,
    intender: "KESHAV SONI",
    email: "22BCS135@iiitdmj.ac.in",
    bookingFrom: "Sept 16, 2024",
    bookingTo: "Sept 18, 2024",
    category: "B",
  },
];

// function onCancel(bookin_id){
//   bookin_id = 1;
// };

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
          {bookings.map((booking) => (
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
                  onClick={() => {
                    console.log("clicked");
                  }}
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

function ActiveBookingsPage() {
  const [activeBooking, setBookings] = useState(bookings);

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
        <BookingTable bookings={bookings} onCancel={handleCancel} />
      </Box>
    </MantineProvider>
  );
}

export default ActiveBookingsPage;

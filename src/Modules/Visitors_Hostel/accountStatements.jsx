import React from "react";
import { MantineProvider, Table, Text, Box } from "@mantine/core";

const bookings = [
  { id: 1, head: "Booking for 21BCS046", amount: "₹820", billId: "1" },
  { id: 2, head: "Booking for 21BCS233", amount: "₹0", billId: "2" },
  { id: 3, head: "Booking for 21BCS216", amount: "₹0", billId: "3" },
  { id: 4, head: "Booking for 21BSM022", amount: "₹1500", billId: "4" },
  { id: 5, head: "Booking for 21BEC011", amount: "₹500", billId: "5" },
  { id: 6, head: "Booking for 21BME20", amount: "₹0", billId: "1" },
];

function FinancialTable() {
  return (
    <Box p="md" style={{ margin: 10 }}>
      <Text
        size="xl"
        style={{ paddingBottom: 15, fontWeight: "bold", textAlign: "center" }}
      >
        Current Balance: ₹2500
      </Text>
      <Table
        style={{
          borderRadius: "8px",
          overflow: "hidden",
          border: "1px solid #E0E0E0",
          backgroundColor: "white",
        }}
      >
        <thead>
          <tr>
            <th
              style={{
                backgroundColor: "#bde0fe",
                padding: "12px",
                textAlign: "center",
              }}
            >
              Heads
            </th>
            <th
              style={{
                backgroundColor: "#bde0fe",
                padding: "12px",
                textAlign: "center",
              }}
            >
              Amount
            </th>
            <th
              style={{
                backgroundColor: "#bde0fe",
                padding: "12px",
                textAlign: "center",
              }}
            >
              Bill Id
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
                {booking.head}
              </td>
              <td
                style={{
                  padding: "12px",
                  borderBottom: "1px solid #E0E0E0",
                  textAlign: "center",
                }}
              >
                {booking.amount}
              </td>
              <td
                style={{
                  padding: "12px",
                  borderBottom: "1px solid #E0E0E0",
                  textAlign: "center",
                }}
              >
                {booking.billId}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Box>
  );
}

function AccountStatemnts() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Box
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          backgroundColor: "white",
          borderRadius: "12px",
          padding: "16px",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        <FinancialTable />
      </Box>
    </MantineProvider>
  );
}

export default AccountStatemnts;

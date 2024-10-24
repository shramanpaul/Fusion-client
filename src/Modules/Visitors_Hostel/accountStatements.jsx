import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Table, MantineProvider, Tabs, Text } from "@mantine/core";

// Tabs data
const TabsModules = [
  { label: "All Transactions", id: "all-transactions" },
  { label: "Expenditure", id: "expenditure" },
  { label: "Income", id: "income" },
];

function FinancialManagement() {
  const [activeTab, setActiveTab] = useState("expenditure"); // Set default tab
  const [expenditureData, setExpenditureData] = useState([]);
  const [incomeData, setIncomeData] = useState([]);
  const [allTransactionsData, setAllTransactionsData] = useState([]); // State for all transactions
  const [loadingExpenditure, setLoadingExpenditure] = useState(true);
  const [loadingIncome, setLoadingIncome] = useState(true);
  const [loadingAllTransactions, setLoadingAllTransactions] = useState(true); // Loading state for all transactions
  const [error, setError] = useState(null);
  const [totalBalance, setTotalBalance] = useState(0);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  // Fetch expenditure data from API
  useEffect(() => {
    const fetchExpenditureData = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setError("No authentication token found. Please log in.");
        setLoadingExpenditure(false);
        return;
      }

      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/visitorhostel/inventory",
          {
            headers: {
              Authorization: `Token ${token}`,
              "Content-Type": "application/json",
            },
          },
        );

        setExpenditureData(response.data);
        setLoadingExpenditure(false);
      } catch (err) {
        setError("Failed to fetch expenditure data.");
        setLoadingExpenditure(false);
      }
    };

    fetchExpenditureData();
  }, []);

  // Fetch income data from API
  useEffect(() => {
    const fetchIncomeData = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setError("No authentication token found. Please log in.");
        setLoadingIncome(false);
        return;
      }

      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/visitorhostel/accounts-income/",
          {
            headers: {
              Authorization: `Token ${token}`,
              "Content-Type": "application/json",
            },
          },
        );

        setIncomeData(response.data);
        setLoadingIncome(false);
      } catch (err) {
        setError("Failed to fetch income data.");
        setLoadingIncome(false);
      }
    };

    fetchIncomeData();
  }, []);

  // Combine expenditure and income data for All Transactions tab
  useEffect(() => {
    const combineData = () => {
      const combinedData = [
        ...expenditureData.map((item) => ({
          heads: `Spent on ${item.item_name}`,
          bill: item.id, // Assuming quantity is the amount
          amount: item.quantity, // Adjust if necessary
        })),
        ...incomeData.map((item) => ({
          heads: `Booking from ${item.intender_name}`,
          bill: item.bill_id, // Assuming total_bill is the amount
          amount: item.total_bill, // Adjust if necessary
        })),
      ];
      setAllTransactionsData(combinedData);
      console.log("UserUser User: ", combinedData);
      const total = combinedData.reduce((sum, item) => {
        if (item.heads.includes("Spent")) {
          return sum - item.amount;
        }
        return sum + item.amount;
      }, 0);

      console.log("Total: ", total);
      setTotalBalance(total);
      setLoadingAllTransactions(false);
    };

    if (!loadingExpenditure && !loadingIncome) {
      combineData();
    }
  }, [expenditureData, incomeData, loadingExpenditure, loadingIncome]);

  // Render "All Transactions" table
  const renderAllTransactionsTable = (data) => {
    return (
      <Table
        style={{
          borderRadius: "8px",
          overflow: "hidden",
          border: "1px solid #E0E0E0",
          marginTop: "20px",
        }}
      >
        <thead>
          <tr>
            <th style={{ backgroundColor: "#E6F3FF", padding: "12px" }}>
              Heads
            </th>
            <th style={{ backgroundColor: "#E6F3FF", padding: "12px" }}>
              Bill ID
            </th>
            <th style={{ backgroundColor: "#E6F3FF", padding: "12px" }}>
              Amount
            </th>
          </tr>
        </thead>
        <tbody>
          {data
            .filter((item) => item.bill !== null)
            .map((item, index) => (
              <tr key={index}>
                <td
                  style={{
                    padding: "12px",
                    textAlign: "center",
                    borderBottom: "1px solid #E0E0E0",
                  }}
                >
                  {item.heads}
                </td>
                <td
                  style={{
                    padding: "12px",
                    textAlign: "center",
                    borderBottom: "1px solid #E0E0E0",
                  }}
                >
                  {item.bill}
                </td>
                <td
                  style={{
                    padding: "12px",
                    textAlign: "center",
                    borderBottom: "1px solid #E0E0E0",
                  }}
                >
                  {item.heads.includes("Spent")
                    ? `-${item.amount}`
                    : item.amount}
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    );
  };

  // // income
  const renderIncomeTable = (data) => {
    return (
      <Table
        style={{
          borderRadius: "8px",
          overflow: "hidden",
          border: "1px solid #E0E0E0",
          marginTop: "20px",
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
              Total Bill
            </th>
            <th style={{ backgroundColor: "#E6F3FF", padding: "12px" }}>
              Bill ID
            </th>
            <th style={{ backgroundColor: "#E6F3FF", padding: "12px" }}>
              Bill Date
            </th>
          </tr>
        </thead>
        <tbody>
          {data
            .filter((item) => item.bill_id !== null) // Filter out items with null bill_id
            .map((item) => (
              <tr key={item.bill_id}>
                <td
                  style={{
                    padding: "12px",
                    borderBottom: "1px solid #E0E0E0",
                    textAlign: "center",
                  }}
                >
                  <Text weight={500}>{item.intender_name}</Text>
                </td>
                <td
                  style={{
                    padding: "12px",
                    borderBottom: "1px solid #E0E0E0",
                    textAlign: "center",
                  }}
                >
                  {item.booking_from}
                </td>
                <td
                  style={{
                    padding: "12px",
                    borderBottom: "1px solid #E0E0E0",
                    textAlign: "center",
                  }}
                >
                  {item.booking_to}
                </td>
                <td
                  style={{
                    padding: "12px",
                    borderBottom: "1px solid #E0E0E0",
                    textAlign: "center",
                  }}
                >
                  {item.total_bill}
                </td>
                <td
                  style={{
                    padding: "12px",
                    borderBottom: "1px solid #E0E0E0",
                    textAlign: "center",
                  }}
                >
                  {item.bill_id}
                </td>
                <td
                  style={{
                    padding: "12px",
                    borderBottom: "1px solid #E0E0E0",
                    textAlign: "center",
                  }}
                >
                  {item.bill_date}
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    );
  };

  // Render "Expenditure" table
  const renderExpenditureTable = (data) => {
    return (
      <Table
        style={{
          borderRadius: "8px",
          overflow: "hidden",
          border: "1px solid #E0E0E0",
          marginTop: "20px",
        }}
      >
        <thead>
          <tr>
            <th style={{ backgroundColor: "#E6F3FF", padding: "12px" }}>
              Item Name
            </th>
            <th style={{ backgroundColor: "#E6F3FF", padding: "12px" }}>
              Bill ID
            </th>
            <th style={{ backgroundColor: "#E6F3FF", padding: "12px" }}>
              Amount
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td
                style={{
                  padding: "12px",
                  borderBottom: "1px solid #E0E0E0",
                  textAlign: "center",
                }}
              >
                <Text weight={500}>{item.item_name}</Text>
              </td>
              <td
                style={{
                  padding: "12px",
                  borderBottom: "1px solid #E0E0E0",
                  textAlign: "center",
                }}
              >
                {item.id} {/* Assuming 'id' is used as Bill ID */}
              </td>
              <td
                style={{
                  padding: "12px",
                  borderBottom: "1px solid #E0E0E0",
                  textAlign: "center",
                }}
              >
                {item.quantity} {/* Assuming 'quantity' is the amount */}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
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
        <Tabs value={activeTab}>
          <Tabs.List>
            {TabsModules.map((tab) => (
              <Tabs.Tab
                key={tab.id}
                value={tab.id}
                onClick={() => handleTabChange(tab.id)}
              >
                {tab.label}
              </Tabs.Tab>
            ))}
          </Tabs.List>

          <Tabs.Panel value="all-transactions">
            <Text
              style={{
                textAlign: "right", // Aligns the text to the right
                marginRight: "10px", // Adds some space from the right edge
                fontWeight: "bold", // Makes the text bold
                fontSize: "18px", // Adjust the font size as needed
                color: "#333", // Customize the color if necessary
                paddingTop: "10px",
              }}
            >
              Current Balance: ₹{totalBalance}
            </Text>
            {loadingAllTransactions ? (
              <Text>Loading all transactions data...</Text>
            ) : error ? (
              <Text color="red">{error}</Text>
            ) : (
              renderAllTransactionsTable(allTransactionsData)
            )}
          </Tabs.Panel>

          <Tabs.Panel value="expenditure">
            {loadingExpenditure ? (
              <Text>Loading expenditure data...</Text>
            ) : error ? (
              <Text color="red">{error}</Text>
            ) : (
              renderExpenditureTable(expenditureData)
            )}
          </Tabs.Panel>

          <Tabs.Panel value="income">
            {loadingIncome ? (
              <Text>Loading income data...</Text>
            ) : error ? (
              <Text color="red">{error}</Text>
            ) : (
              renderIncomeTable(incomeData)
            )}
          </Tabs.Panel>
        </Tabs>
      </Box>
    </MantineProvider>
  );
}

export default FinancialManagement;

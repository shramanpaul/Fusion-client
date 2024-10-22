import React, { useState, useEffect } from "react";
import {
  Box,
  Table,
  MantineProvider,
  Tabs,
  Text,
  Button,
  Loader,
} from "@mantine/core";
import AddItems from "./addItems";

const TabsModules = [
  { label: "Consumable Inventory", id: "consumable-inventory" },
  { label: "Non-Consumable Inventory", id: "non-consumable-inventory" },
];

function InventoryManagement() {
  const [activeTab, setActiveTab] = useState("consumable-inventory");
  const [showAddItemsForm, setShowAddItemsForm] = useState(false);
  const [inventoryData, setInventoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  const handleAddItemsClick = () => {
    setShowAddItemsForm(true);
  };

  useEffect(() => {
    const fetchInventoryData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await fetch(
          "http://127.0.0.1:8000/visitorhostel/api/inventory_list/",
          {
            headers: {
              Authorization: `Token ${token}`,
              "Content-Type": "application/json",
            },
          },
        );

        if (!response.ok) {
          throw new Error("Failed to fetch inventory data");
        }

        const data = await response.json();
        setInventoryData(data);
        setLoading(false);
      } catch (errr) {
        setError(errr.message);
        setLoading(false);
      }
    };

    fetchInventoryData();
  }, []);

  // Render table based on the active tab
  const renderTable = (data) => {
    if (loading) {
      return <Loader style={{ marginTop: "20px" }} />;
    }

    if (error) {
      return (
        <Text color="red" style={{ marginTop: "20px" }}>
          {error}
        </Text>
      );
    }

    if (data.length === 0) {
      return <Text style={{ marginTop: "20px" }}>No items found.</Text>;
    }

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
              Item
            </th>
            <th style={{ backgroundColor: "#E6F3FF", padding: "12px" }}>
              Available Quantity
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
                {item.quantity}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  };

  const consumableData = inventoryData.filter(
    (item) => item.consumable === true,
  );
  const nonConsumableData = inventoryData.filter(
    (item) => item.consumable === false,
  );

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Box>
        <Tabs value={activeTab}>
          <Tabs.List>
            {TabsModules.map((tab) => (
              <Tabs.Tab
                key={tab.id}
                value={tab.id}
                onClick={(e) => handleTabChange(e.target.value)}
              >
                {tab.label}
              </Tabs.Tab>
            ))}
          </Tabs.List>
          <Tabs.Panel value="consumable-inventory">
            <Button
              variant="outline"
              style={{
                float: "right",
                marginTop: "15px",
                marginBottom: "15px",
              }}
              onClick={handleAddItemsClick}
            >
              Add Items
            </Button>
            {renderTable(consumableData)}
          </Tabs.Panel>

          <Tabs.Panel value="non-consumable-inventory">
            <Button
              variant="outline"
              style={{
                float: "right",
                marginTop: "15px",
                marginBottom: "15px",
              }}
              onClick={handleAddItemsClick}
            >
              Add Items
            </Button>
            {renderTable(nonConsumableData)}
          </Tabs.Panel>
        </Tabs>
        {showAddItemsForm && <AddItems />}
      </Box>
    </MantineProvider>
  );
}

export default InventoryManagement;

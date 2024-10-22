import React, { useState } from "react";
import { Box, Table, MantineProvider, Tabs, Text, Button } from "@mantine/core";

// Sample data
const inventoryData = [
  { id: 1, item: "Soap", availableQuantity: 4, consumable: true },
  { id: 2, item: "Paste", availableQuantity: 89, consumable: true },
  { id: 3, item: "Towel", availableQuantity: 8, consumable: false },
];

// Tabs data
const TabsModules = [
  { label: "Consumable Inventory", id: "consumable-inventory" },
  { label: "Non-Consumable Inventory", id: "non-consumable-inventory" },
];

function InventoryManagement() {
  const [activeTab, setActiveTab] = useState("consumable-inventory");

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  // Render table based on the active tab
  const renderTable = (data) => {
    return (
      <Table
        style={{
          borderRadius: "8px", // Border radius for table
          overflow: "hidden", // Overflow hidden to round table corners
          border: "1px solid #E0E0E0", // Optional border for visibility
          marginTop: "20px", // Added margin for better spacing
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
                <Text weight={500}>{item.item}</Text>
              </td>
              <td
                style={{
                  padding: "12px",
                  borderBottom: "1px solid #E0E0E0",
                  textAlign: "center",
                }}
              >
                {item.availableQuantity}
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
            >
              Add Items
            </Button>
            {renderTable(nonConsumableData)}
          </Tabs.Panel>
        </Tabs>
      </Box>
    </MantineProvider>
  );
}

export default InventoryManagement;

import React, { useState } from "react";
import {
  Select,
  Card,
  Title,
  TextInput,
  Button,
  Switch,
  Group,
} from "@mantine/core";

function AddItems() {
  const [billId, setBillId] = useState(""); // Bill ID (item_name)
  const [itemName, setItemName] = useState(""); // New state for Item Name
  const [quantity, setQuantity] = useState("");
  const [cost, setCost] = useState("");
  const [consumable, setConsumable] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("authToken");

    // Prepare the data to send
    const data = {
      item_name: itemName, // Use the entered item name
      bill_number: billId, // Assuming billId is linked to bill_number
      quantity: parseInt(quantity, 10), // Ensure quantity is an integer
      cost: parseInt(cost, 10), // Ensure cost is an integer
      consumable, // Boolean
    };

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/visitorhostel/api/inventory_add/",
        {
          method: "POST",
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        },
      );

      // Handle the response
      if (response.ok) {
        const responseData = await response.json();
        console.log("Item added successfully:", responseData);
        // Reset form or show success message
      } else {
        const errorData = await response.json(); // Get error details from the response
        console.error("Failed to add item:", errorData);
        // You can show errorData to the user to explain what went wrong
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto" padding="lg">
      <Title order={2}>Add Items</Title>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <TextInput
            id="itemName" // Unique ID for accessibility
            label="Item Name*"
            placeholder="Enter item name"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            required
          />
        </div>

        <div>
          <Select
            label="Bill Id*"
            id="billId" // Unique ID for accessibility
            value={billId}
            onChange={setBillId}
            placeholder="Select Bill Id"
            data={[
              { value: "1", label: "Option 1" }, // Use the ID as the value
              { value: "2", label: "Option 2" },
              { value: "3", label: "Option 3" },
            ]}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <TextInput
              id="quantity"
              label="Quantity"
              placeholder="Enter quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
            />
          </div>
          <div>
            <TextInput
              id="cost"
              label="Cost"
              placeholder="Enter cost"
              value={cost}
              onChange={(e) => setCost(e.target.value)}
              required
            />
          </div>
        </div>

        <Group align="center" spacing="xs">
          <span>Consumable</span>
          <Switch
            id="consumable"
            checked={consumable}
            onChange={(e) => setConsumable(e.currentTarget.checked)}
          />
        </Group>

        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </Card>
  );
}

export default AddItems;

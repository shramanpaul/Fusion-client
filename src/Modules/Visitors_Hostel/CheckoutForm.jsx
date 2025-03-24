import React, { useState } from "react";
import {
  Modal,
  Group,
  Button,
  Grid,
  Card,
  Text,
  Container,
  Divider,
} from "@mantine/core";
import axios from "axios";
import PropTypes from "prop-types";
import { host } from "../../routes/globalRoutes";

function CheckoutForm({ modalOpened, onClose, bookingId, bookingDetails }) {
  const [selectedItems, setSelectedItems] = useState([]);

  // Sample inventory items (replace with your API call)
  const inventoryItems = [
    { id: 1, name: "Water Bottle", price: 20 },
    { id: 2, name: "Snacks", price: 30 },
    { id: 3, name: "Towel", price: 50 },
  ];

  const handleAddItem = (item) => {
    setSelectedItems([...selectedItems, item]);
  };

  const handleRemoveItem = (itemId) => {
    setSelectedItems(selectedItems.filter((item) => item.id !== itemId));
  };

  const calculateTotal = () => {
    return selectedItems.reduce((sum, item) => sum + item.price, 0);
  };

  const handleCompleteCheckout = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      return console.error("No authentication token found!");
    }

    try {
      const data = {
        booking_id: bookingId,
        inventory_items: selectedItems.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
        })),
      };

      await axios.post(`${host}/visitorhostel/complete-checkout/`, data, {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log("Successfully completed checkout for booking ID:", bookingId);
      onClose(); // Close the modal after checkout
    } catch (error) {
      console.error("Error completing checkout:", error);
    }
  };

  return (
    <Modal
      opened={modalOpened}
      onClose={onClose}
      title="Checkout Details"
      size="xl"
      overlayOpacity={0.55}
      overlayBlur={3}
    >
      <Container>
        <Grid>
          {/* Booking Information */}
          <Grid.Col span={12}>
            <Card shadow="sm" p="md">
              <Text weight={700}>Booking ID: {bookingId}</Text>
              <Text>Room: {bookingDetails?.rooms?.join(", ")}</Text>
            </Card>
          </Grid.Col>

          {/* Available Items */}
          <Grid.Col span={8}>
            <Text weight={700} mb="md">
              Available Items
            </Text>
            <Grid>
              {inventoryItems.map((item) => (
                <Grid.Col span={6} key={item.id}>
                  <Card shadow="sm" p="sm">
                    <Group position="apart">
                      <div>
                        <Text weight={500}>{item.name}</Text>
                        <Text size="sm" color="dimmed">
                          ₹{item.price}
                        </Text>
                      </div>
                      <Button onClick={() => handleAddItem(item)} size="sm">
                        Add
                      </Button>
                    </Group>
                  </Card>
                </Grid.Col>
              ))}
            </Grid>
          </Grid.Col>

          {/* Selected Items */}
          <Grid.Col span={4}>
            <Card shadow="sm" p="md">
              <Text weight={700} mb="md">
                Selected Items
              </Text>
              {selectedItems.map((item) => (
                <Card key={item.id} mb="sm">
                  <Group position="apart">
                    <Text>{item.name}</Text>
                    <Button
                      color="red"
                      variant="subtle"
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      Remove
                    </Button>
                  </Group>
                  <Text size="sm">₹{item.price}</Text>
                </Card>
              ))}
              <Divider my="sm" />
              <Group position="apart">
                <Text weight={700}>Total Amount</Text>
                <Text weight={700}>₹{calculateTotal()}</Text>
              </Group>
              <Button
                fullWidth
                mt="md"
                disabled={selectedItems.length === 0}
                onClick={handleCompleteCheckout}
              >
                Complete Checkout
              </Button>
            </Card>
          </Grid.Col>
        </Grid>
      </Container>
    </Modal>
  );
}
CheckoutForm.propTypes = {
  modalOpened: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  bookingId: PropTypes.string.isRequired,
  bookingDetails: PropTypes.shape({
    rooms: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default CheckoutForm;

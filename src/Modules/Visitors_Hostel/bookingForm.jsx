import React, { useState } from "react";
import {
  MantineProvider,
  TextInput,
  Select,
  NumberInput,
  Button,
  Textarea,
  Group,
  Grid,
  Modal,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";

function BookingForm() {
  const [formData, setFormData] = useState({
    arrivalDate: "",
    arrivalHour: "",
    arrivalMinutes: "",
    arrivalAMPM: "",
    departureDate: "",
    departureHour: "",
    departureMinutes: "",
    departureAMPM: "",
    numberOfPeople: 1,
    numberOfRooms: 1,
    category: "",
    purpose: "",
    remarks: "",
    billsBy: "",
  });

  const navigate = useNavigate();
  const [modalOpened, setModalOpened] = useState(true);
  const handleClose = () => {
    setModalOpened(false); // Close the modal first
    setTimeout(() => {
      navigate("/visitors_hostel"); // Redirect after closing the modal
    }, 300); // Delay to allow the modal closing animation (adjust if needed)
  };
  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted", formData);
  };

  return (
    <MantineProvider theme={{ fontFamily: "Arial, sans-serif" }}>
      <Modal
        opened={modalOpened}
        onClose={handleClose}
        title="Place a Request"
        size="lg"
      >
        <form onSubmit={handleSubmit}>
          <Grid>
            <Grid.Col span={12}>
              <Select
                label="Intender ID "
                placeholder="Select"
                data={["22BCS229", "22BCS230", "22BCS231"]}
                value={formData.billsBy}
                onChange={(value) => handleInputChange("billsBy", value)}
                required
              />
            </Grid.Col>
            <Grid.Col span={12}>
              <TextInput
                label="Arrival Date"
                placeholder="From"
                type="date"
                value={formData.arrivalDate}
                onChange={(event) =>
                  handleInputChange("arrivalDate", event.currentTarget.value)
                }
                required
              />
            </Grid.Col>
            <Grid.Col span={4}>
              <Select
                label="Arrival Time: Hours"
                placeholder="Select"
                data={Array.from({ length: 12 }, (_, i) => (i + 1).toString())}
                value={formData.arrivalHour}
                onChange={(value) => handleInputChange("arrivalHour", value)}
                required
              />
            </Grid.Col>
            <Grid.Col span={4}>
              <Select
                label="Minutes *"
                placeholder="Select"
                data={Array.from({ length: 60 }, (_, i) => i.toString())}
                value={formData.arrivalMinutes}
                onChange={(value) => handleInputChange("arrivalMinutes", value)}
                required
              />
            </Grid.Col>
            <Grid.Col span={4}>
              <Select
                label="AM/PM*"
                placeholder="Select"
                data={["AM", "PM"]}
                value={formData.arrivalAMPM}
                onChange={(value) => handleInputChange("arrivalAMPM", value)}
                required
              />
            </Grid.Col>
            <Grid.Col span={12}>
              <TextInput
                label="Departure Date*"
                placeholder="To"
                type="date"
                value={formData.departureDate}
                onChange={(event) =>
                  handleInputChange("departureDate", event.currentTarget.value)
                }
                required
              />
            </Grid.Col>
            <Grid.Col span={4}>
              <Select
                label="Departure Time*: Hours"
                placeholder="Select"
                data={Array.from({ length: 12 }, (_, i) => (i + 1).toString())}
                value={formData.departureHour}
                onChange={(value) => handleInputChange("departureHour", value)}
                required
              />
            </Grid.Col>
            <Grid.Col span={4}>
              <Select
                label="Minutes "
                placeholder="Select"
                data={Array.from({ length: 60 }, (_, i) => i.toString())}
                value={formData.departureMinutes}
                onChange={(value) =>
                  handleInputChange("departureMinutes", value)
                }
                required
              />
            </Grid.Col>
            <Grid.Col span={4}>
              <Select
                label="AM/PM"
                placeholder="Select"
                data={["AM", "PM"]}
                value={formData.departureAMPM}
                onChange={(value) => handleInputChange("departureAMPM", value)}
                required
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <NumberInput
                label="Number of People "
                value={formData.numberOfPeople}
                onChange={(value) => handleInputChange("numberOfPeople", value)}
                min={1}
                required
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <NumberInput
                label="Number of Rooms "
                value={formData.numberOfRooms}
                onChange={(value) => handleInputChange("numberOfRooms", value)}
                min={1}
                required
              />
            </Grid.Col>
            <Grid.Col span={12}>
              <Select
                label="Category "
                placeholder="Select"
                data={["A", "B", "C", "D"]}
                value={formData.category}
                onChange={(value) => handleInputChange("category", value)}
                required
              />
            </Grid.Col>
            <Grid.Col span={12}>
              <TextInput
                label="Purpose of Visit "
                value={formData.purpose}
                onChange={(event) =>
                  handleInputChange("purpose", event.currentTarget.value)
                }
                required
              />
            </Grid.Col>
            <Grid.Col span={12}>
              <Textarea
                label="Remarks"
                value={formData.remarks}
                onChange={(event) =>
                  handleInputChange("remarks", event.currentTarget.value)
                }
              />
            </Grid.Col>
            <Grid.Col span={12}>
              <Select
                label="Bills to be Settled by "
                placeholder="Select"
                data={[
                  "Visitor",
                  "Intender",
                  "Institute / No Charges",
                  "Project No.",
                ]}
                value={formData.billsBy}
                onChange={(value) => handleInputChange("billsBy", value)}
                required
              />
            </Grid.Col>
            <Grid.Col span={12}>
              <Group position="center">
                <Button type="submit">Next</Button>
              </Group>
            </Grid.Col>
          </Grid>
        </form>
      </Modal>
    </MantineProvider>
  );
}
BookingForm.propTypes = {};

export default BookingForm;

import React, { useState } from "react";
import PropTypes from "prop-types";
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
import axios from "axios";
import { useSelector } from "react-redux";
import { host } from "../../routes/globalRoutes";

function CombinedBookingForm({ modalOpened, onClose }) {
  const [formData, setFormData] = useState({
    intender: "",
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
    // Visitor details
    visitor_name: "",
    visitor_email: "",
    visitor_phone: "",
    visitor_organization: "",
    visitor_address: "",
    nationality: "",
  });

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== "") {
      const cookies = document.cookie.split(";");
      for (let i = 0; i < cookies.length; i += 1) {
        const cookie = cookies[i].trim();
        // Does this cookie string begin with the name we want?
        if (cookie.substring(0, name.length + 1) === `${name}=`) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }

  const csrfToken = getCookie("csrftoken");
  console.log("CSRF TOKEN:  ", csrfToken);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("authToken");
    console.log(" Token : ", token);

    const requestData = {
      intender: formData.intender, // Replace with dynamic value if needed
      category: formData.category,
      booking_from: formData.arrivalDate,
      booking_to: formData.departureDate,
      "number-of-people": formData.numberOfPeople.toString(), // Ensure it's sent as a string
      "purpose-of-visit": formData.purpose,
      "number-of-rooms": formData.numberOfRooms.toString(), // Ensure it's sent as a string
      booking_from_time: `${formData.arrivalHour}:${formData.arrivalMinutes} ${formData.arrivalAMPM}`,
      booking_to_time: `${formData.departureHour}:${formData.departureMinutes} ${formData.departureAMPM}`,
      remarks_during_booking_request: formData.remarks,
      bill_settlement: formData.billsBy,
      visitor_name: formData.visitor_name,
      visitor_phone: formData.visitor_phone, // Correct field name
      visitor_email: formData.visitor_email,
      visitor_address: formData.visitor_address,
      nationality: formData.nationality,
      visitor_organization: formData.visitor_organization,
      csrfmiddlewaretoken: csrfToken,
    };

    try {
      const response = await axios.post(
        `${host}/visitorhostel/request-booking/`,
        requestData,
        {
          headers: {
            Authorization: `Token ${token}`,
            "X-CSRFToken": csrfToken,
            "Content-Type": "application/json",
          },
        },
      );
      console.log("Form submitted", response.data);
      onClose(); // Close the modal on successful submission
      window.location.reload(); // Reload the page
      // Optionally navigate to a success page
      // navigate("/success-page");
    } catch (error) {
      console.error("Error submitting form", error);
    }
  };
  const username = useSelector((state) => state);
  console.log("IntenderID: ", username);
  const role = useSelector((state) => state.user.role);
  return (
    <MantineProvider theme={{ fontFamily: "Arial, sans-serif" }}>
      <Modal
        opened={modalOpened}
        onClose={onClose}
        title="Place a Booking Request"
        size="xl"
      >
        <form onSubmit={handleSubmit}>
          <Grid>
            {/* {username} */}
            {/* Conditionally render Intender ID field */}
            {role !== "student" && (
              <Grid.Col span={12}>
                <TextInput
                  label="intender"
                  placeholder="Intender ID"
                  value={formData.intender}
                  onChange={(event) =>
                    handleInputChange("intender", event.currentTarget.value)
                  }
                  required
                />
              </Grid.Col>
            )}

            {/* Arrival Details */}
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
            <Grid.Col span={6}>
              <NumberInput
                label="Arrival Hour"
                value={formData.arrivalHour}
                onChange={(value) => handleInputChange("arrivalHour", value)}
                min={1}
                max={12}
                required
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <NumberInput
                label="Arrival Minutes"
                value={formData.arrivalMinutes}
                onChange={(value) => handleInputChange("arrivalMinutes", value)}
                min={0}
                max={59}
                required
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <Select
                label="AM/PM"
                value={formData.arrivalAMPM}
                onChange={(value) => handleInputChange("arrivalAMPM", value)}
                data={["AM", "PM"]}
                required
              />
            </Grid.Col>

            {/* Departure Details */}
            <Grid.Col span={12}>
              <TextInput
                label="Departure Date"
                placeholder="To"
                type="date"
                value={formData.departureDate}
                onChange={(event) =>
                  handleInputChange("departureDate", event.currentTarget.value)
                }
                required
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <NumberInput
                label="Departure Hour"
                value={formData.departureHour}
                onChange={(value) => handleInputChange("departureHour", value)}
                min={1}
                max={12}
                required
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <NumberInput
                label="Departure Minutes"
                value={formData.departureMinutes}
                onChange={(value) =>
                  handleInputChange("departureMinutes", value)
                }
                min={0}
                max={59}
                required
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <Select
                label="AM/PM"
                value={formData.departureAMPM}
                onChange={(value) => handleInputChange("departureAMPM", value)}
                data={["AM", "PM"]}
                required
              />
            </Grid.Col>

            {/* Number of People and Rooms */}
            <Grid.Col span={6}>
              <NumberInput
                label="Number of People"
                value={formData.numberOfPeople}
                onChange={(value) => handleInputChange("numberOfPeople", value)}
                min={1}
                required
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <NumberInput
                label="Number of Rooms"
                value={formData.numberOfRooms}
                onChange={(value) => handleInputChange("numberOfRooms", value)}
                min={1}
                required
              />
            </Grid.Col>

            {/* Category, Purpose, Remarks, Bills By */}
            <Grid.Col span={6}>
              <Select
                label="Category"
                value={formData.category}
                onChange={(value) => handleInputChange("category", value)}
                data={["A", "B", "C", "D"]}
                required
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                label="Purpose"
                value={formData.purpose}
                onChange={(event) =>
                  handleInputChange("purpose", event.currentTarget.value)
                }
                required
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <Textarea
                label="Remarks"
                value={formData.remarks}
                onChange={(event) =>
                  handleInputChange("remarks", event.currentTarget.value)
                }
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <Select
                label="Bills To Be Paid By"
                value={formData.billsBy}
                onChange={(value) => handleInputChange("billsBy", value)}
                data={[
                  "Visitor",
                  "Intender",
                  "Institute / No Charges",
                  "Project No.",
                ]}
                required
              />
            </Grid.Col>

            {/* Visitor Details Form */}
            <Grid.Col span={6}>
              <TextInput
                label="Name"
                value={formData.visitor_name}
                onChange={(event) =>
                  handleInputChange("visitor_name", event.currentTarget.value)
                }
                required
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                label="Email"
                value={formData.visitor_email}
                onChange={(event) =>
                  handleInputChange("visitor_email", event.currentTarget.value)
                }
                required
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                label="Phone No."
                value={formData.visitor_phone}
                onChange={(event) =>
                  handleInputChange("visitor_phone", event.currentTarget.value)
                }
                required
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                label="Organisation"
                value={formData.visitor_organization}
                onChange={(event) =>
                  handleInputChange(
                    "visitor_organization",
                    event.currentTarget.value,
                  )
                }
                required
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                label="Address"
                value={formData.visitor_address}
                onChange={(event) =>
                  handleInputChange(
                    "visitor_address",
                    event.currentTarget.value,
                  )
                }
                required
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <Select
                label="Nationality"
                value={formData.nationality}
                onChange={(value) => handleInputChange("nationality", value)}
                data={["Indian", "Other"]}
                required
              />
            </Grid.Col>
          </Grid>
          <Group position="right" mt="md">
            <Button type="submit">Submit Booking Request</Button>
          </Group>
        </form>
      </Modal>
    </MantineProvider>
  );
}

CombinedBookingForm.propTypes = {
  modalOpened: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default CombinedBookingForm;

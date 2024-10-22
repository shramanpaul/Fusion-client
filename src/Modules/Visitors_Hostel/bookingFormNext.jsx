import React, { useState } from "react";
import {
  MantineProvider,
  TextInput,
  Select,
  Button,
  Group,
  Grid,
  Modal,
} from "@mantine/core";

function VisitorsDetails() {
  const [formData, setFormData] = useState({
    nameOfPeople: "",
    email: "",
    phoneNo: "",
    org: "",
    address: "",
    nationality: "",
  });

  const [modalOpened, setModalOpened] = useState(true);

  const handleClose = () => {
    setModalOpened(false); // Close the modal first
    setTimeout(() => {
      //   navigate("/visitors_hostel"); // Redirect after closing the modal
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
        title="Visitor Details"
        size="xl"
      >
        <form onSubmit={handleSubmit}>
          <Grid>
            <Grid.Col span={6}>
              <TextInput
                label="Name"
                value={formData.nameOfPeople}
                onChange={(event) =>
                  handleInputChange("nameOfPeople", event.currentTarget.value)
                }
                required
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                label="Email"
                value={formData.email}
                onChange={(event) =>
                  handleInputChange("email", event.currentTarget.value)
                }
                required
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                label="Phone No."
                value={formData.phoneNo}
                onChange={(event) =>
                  handleInputChange("phoneNo", event.currentTarget.value)
                }
                required
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                label="Organisation"
                value={formData.org}
                onChange={(event) =>
                  handleInputChange("org", event.currentTarget.value)
                }
                required
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                label="Address"
                value={formData.address}
                onChange={(event) =>
                  handleInputChange("address", event.currentTarget.value)
                }
                required
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <Select
                label="Nationality"
                placeholder="Select"
                data={[
                  "America",
                  "Bangladesh",
                  "Bhutan",
                  "Nepal",
                  "India",
                  "Jamaica",
                  "Maldives",
                ]}
                value={formData.nationality}
                onChange={(value) => handleInputChange("nationality", value)}
                required
              />
            </Grid.Col>
            <Grid.Col span={12}>
              <Group position="center" style={{ marginTop: "auto" }}>
                <Button type="submit">Submit</Button>
              </Group>
            </Grid.Col>
          </Grid>
        </form>
      </Modal>
    </MantineProvider>
  );
}

export default VisitorsDetails;

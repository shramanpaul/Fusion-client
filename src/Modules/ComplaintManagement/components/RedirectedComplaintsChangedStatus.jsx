import { Textarea, Text, Button, Flex, Grid, Select } from "@mantine/core";
import { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

function RedirectedComplaintsChangeStatus({ complaint, onBack }) {
  const [status, setStatus] = useState("");
  const [comments, setComments] = useState("");

  if (!complaint) return null;

  const handleStatusChange = (value) => {
    setStatus(value);
  };

  const handleCommentsChange = (event) => {
    setComments(event.currentTarget.value);
  };

  const handleSubmit = () => {
    if (!status) {
      alert("Please select an option before submitting.");
      return;
    }

    const newStatus = status === "yes" ? "Yes" : "No";
    const comment = comments;

    const requestData = {
      yesorno: newStatus,
      comment,
    };

    axios
      .post(
        `http://127.0.0.1:8000/complaint/supervisor/pending/${complaint.id}/`,
        requestData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem("authToken")}`,
          },
        },
      )
      .then(() => {
        alert("Thank you for resolving the complaint");
        onBack(); // Call back to refresh the complaints list
      })
      .catch((error) => {
        console.error("Error updating complaint status:", error);
        alert("There was an error updating the complaint status.");
      });
  };

  const formatDateTime = (datetimeStr) => {
    const date = new Date(datetimeStr);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${day}-${month}-${year}, ${hours}:${minutes}`; // Format: DD-MM-YYYY HH:MM
  };

  return (
    <Grid.Col>
      <Text size="lg" weight="bold">
        Change Status
      </Text>

      <Text size="sm" mt="1rem">
        <strong>Complainer id:</strong> {complaint.complainer}
      </Text>
      <Text size="sm">
        <strong>Date:</strong> {formatDateTime(complaint.complaint_date)}
      </Text>
      <Text size="sm">
        <strong>Location:</strong> Location: {complaint.location} (
        {complaint.specific_location})
      </Text>
      <Text size="sm">
        <strong>Issue:</strong> {complaint.details}
      </Text>

      <Text mt="1rem">Has the issue been resolved?</Text>
      <Text>
        If you say no, the status of the complaint will automatically be set to
        "Declined".
      </Text>

      <Select
        label="Please select an option"
        placeholder="Choose an option"
        data={[
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
        ]}
        value={status}
        onChange={handleStatusChange}
        mt="1rem"
      />

      <Text mt="1rem">Any Comments</Text>
      <Textarea
        placeholder="Please leave your comments here"
        value={comments}
        onChange={handleCommentsChange}
        autosize
        minRows={2}
        maxRows={4}
      />

      <Flex justify="flex-end" gap="sm" mt="md">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button variant="outline" onClick={handleSubmit}>
          Submit
        </Button>
      </Flex>
    </Grid.Col>
  );
}

RedirectedComplaintsChangeStatus.propTypes = {
  complaint: PropTypes.shape({
    id: PropTypes.number.isRequired,
    complaint_type: PropTypes.string.isRequired,
    complaint_date: PropTypes.string.isRequired,
    complaint_finish: PropTypes.string,
    location: PropTypes.string.isRequired,
    specific_location: PropTypes.string.isRequired,
    details: PropTypes.string.isRequired,
    status: PropTypes.number.isRequired,
    feedback: PropTypes.string,
    comment: PropTypes.string,
    complainer: PropTypes.string,
  }),
  onBack: PropTypes.func.isRequired,
};

export default RedirectedComplaintsChangeStatus;

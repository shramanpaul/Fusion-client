import React from "react";
import PropTypes from "prop-types";
import { Text, Button, Flex, Grid } from "@mantine/core";

function UnresComp_Details({ complaint, onBack }) {
  if (!complaint) return null;

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
    <Grid.Col style={{ height: "100%" }}>
      {" "}
      <Flex
        direction="column"
        justify="space-between"
        style={{ height: "100%" }}
      >
        <Flex direction="column" style={{ flexGrow: 1 }}>
          <Text size="lg" weight="bold">
            {" "}
            Complaint Details
          </Text>
          <Text size="sm" mt="1rem">
            {" "}
          </Text>
          <Text size="sm">
            <strong>Complainer id:</strong> {complaint.complainer}
          </Text>
          <Text size="sm">
            <strong>Complaint ID:</strong> 007
          </Text>
          <Text size="sm">
            <strong>Date:</strong> {formatDateTime(complaint.complaint_date)}
          </Text>
          <Text size="sm">
            <strong>Location:</strong> {complaint.location} (
            {complaint.specific_location})
          </Text>
          <Text size="sm">
            <strong>Issue:</strong> {complaint.details}
          </Text>
        </Flex>

        <Flex justify="flex-end" mt="xl">
          {" "}
          <Button variant="outline" size="md" onClick={onBack}>
            BACK
          </Button>
        </Flex>
      </Flex>
    </Grid.Col>
  );
}

// Prop type validation for the component
UnresComp_Details.propTypes = {
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

export default UnresComp_Details;

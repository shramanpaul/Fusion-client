import React from "react";
import { Button, Flex, Paper, Text, CheckIcon } from "@mantine/core";
import PropTypes from "prop-types";

function FeedbackItem({
  ComplaintId,
  ComplaintType,
  ComplaintDate,
  ComplaintLocation,
  ComplaintDescription,
  setSelectedComplaint,
}) {
  const handleFeedbackButtonClick = () => {
    setSelectedComplaint(ComplaintId);
  };

  return (
    <Paper
      radius="md"
      px="lg"
      pt="sm"
      pb="xl"
      style={{ width: "100%", border: "1.5px solid #000000", margin: "10px 0" }}
      withBorder
      maw="1240px"
      backgroundColor="white"
    >
      <Flex direction="column" gap="sm" style={{ width: "100%" }}>
        <Flex direction="row" justify="space-between" style={{ width: "100%" }}>
          <Flex
            direction="row"
            gap="xs"
            align="center"
            style={{ width: "100%" }}
          >
            <Text size="22px" style={{ fontWeight: "bold" }}>
              Complaint Id: {ComplaintId}
            </Text>
            <Text
              size="14px"
              style={{
                borderRadius: "50px",
                padding: "10px 20px",
                backgroundColor: "#15ABFF",
              }}
            >
              {ComplaintType}
            </Text>
          </Flex>
          <CheckIcon
            size="40px"
            style={{
              color: "white",
              backgroundColor: "2BB673",
              padding: "10px",
              borderRadius: "50px",
            }}
          />
        </Flex>

        <Flex
          direction="row"
          justify="space-between"
          align="center"
          style={{ width: "100%" }}
        >
          <Flex direction="column" gap="xs">
            <Text size="18px">Date: {ComplaintDate}</Text>
            <Text size="18px">Location: {ComplaintLocation}</Text>
          </Flex>
          <Button
            size="md"
            color="#14ABFF"
            radius="lg"
            onClick={handleFeedbackButtonClick}
          >
            Give Feedback
          </Button>
        </Flex>

        <div
          style={{
            border: "1px solid #000000",
            width: "100%",
            margin: "10px 0",
          }}
        />

        <Text size="18px">Description: {ComplaintDescription}</Text>
      </Flex>
    </Paper>
  );
}

export default FeedbackItem;

FeedbackItem.propTypes = {
  ComplaintId: PropTypes.string.isRequired,
  ComplaintType: PropTypes.string.isRequired,
  ComplaintDate: PropTypes.string.isRequired,
  ComplaintLocation: PropTypes.string.isRequired,
  ComplaintDescription: PropTypes.string.isRequired,
  setSelectedComplaint: PropTypes.func.isRequired,
};

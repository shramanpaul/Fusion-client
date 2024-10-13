import React from "react";
import { Button, Flex, Paper, Text, CheckIcon, Divider } from "@mantine/core";
import PropTypes from "prop-types";

function FeedbackItem({ complaint, setSelectedComplaint }) {
  const handleFeedbackButtonClick = () => {
    setSelectedComplaint(complaint);
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
              Complaint Id: {complaint.Id}
            </Text>
            <Text
              size="14px"
              style={{
                borderRadius: "50px",
                padding: "10px 20px",
                backgroundColor: "#15ABFF",
              }}
            >
              {complaint.Type}
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
            <Text size="18px">Date: {complaint.Date}</Text>
            <Text size="18px">
              Location: {complaint.SpecificLocation}, {complaint.Location}
            </Text>
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

        <Divider my="md" size="sm" />

        <Text size="18px">Description: {complaint.Description}</Text>
      </Flex>
    </Paper>
  );
}

export default FeedbackItem;

FeedbackItem.propTypes = {
  complaint: PropTypes.shape({
    Id: PropTypes.string.isRequired,
    Type: PropTypes.string.isRequired,
    Date: PropTypes.string.isRequired,
    Finish: PropTypes.string.isRequired,
    Location: PropTypes.string.isRequired,
    SpecificLocation: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Comment: PropTypes.string.isRequired,
  }),
  setSelectedComplaint: PropTypes.func.isRequired,
};

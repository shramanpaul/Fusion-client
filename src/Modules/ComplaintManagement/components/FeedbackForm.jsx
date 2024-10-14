import React, { useState } from "react";
import {
  Button,
  Flex,
  Grid,
  Loader,
  Paper,
  Text,
  Textarea,
  Select,
  Center,
  CheckIcon,
} from "@mantine/core";
import PropTypes from "prop-types";

function FeedbackForm({ complaint, setSelectedComplaint }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(null);

  const handleBackButtonClick = () => {
    setSelectedComplaint(null);
  };

  const handleSubmitButtonClick = () => {
    if (!feedback || !rating) {
      alert("Please provide feedback and a rating.");
      return;
    }

    setIsLoading(true);
    setIsSuccess(false);

    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);

      setTimeout(() => {
        setSelectedComplaint(null);
      }, 1000);
    }, 1000);
  };

  return (
    <Grid mt="xl" style={{ paddingLeft: "49px" }}>
      <Paper
        radius="md"
        px="lg"
        pt="sm"
        pb="xl"
        style={{
          borderLeft: "0.6rem solid #15ABFF",
          width: "70vw",
          minHeight: "45vh",
          maxHeight: "70vh",
        }}
        withBorder
        maw="1240px"
        backgroundColor="white"
      >
        <Flex
          direction="column"
          gap="lg"
          style={{ textAlign: "left", width: "100%", fontFamily: "Manrope" }}
        >
          <Flex direction="column">
            <Text size="22px" style={{ fontWeight: "bold" }}>
              Submit Feedback
            </Text>
            <Text size="22px" style={{ fontWeight: "bold" }}>
              Complaint id: {complaint.Id}
            </Text>
          </Flex>

          <Grid columns="2" style={{ width: "100%" }}>
            <Grid.Col span={1}>
              <Flex direction="column" gap="xs">
                <Text size="18px" style={{ fontWeight: "bold" }}>
                  Register Date:
                </Text>
                <Text weight="300" size="18px">
                  {complaint.Date}
                </Text>
              </Flex>
            </Grid.Col>
            <Flex direction="column" gap="xs">
              <Text size="18px" style={{ fontWeight: "bold" }}>
                Finished Date:
              </Text>
              <Text weight="300" size="18px">
                {complaint.Finish}
              </Text>
            </Flex>
          </Grid>

          <Grid columns="2" style={{ width: "100%" }}>
            <Grid.Col span={1}>
              <Flex direction="column" gap="xs">
                <Text size="18px" style={{ fontWeight: "bold" }}>
                  Location:
                </Text>
                <Text weight="300" size="18px">
                  {complaint.Location}
                </Text>
              </Flex>
            </Grid.Col>
            <Flex direction="column" gap="xs">
              <Text size="18px" style={{ fontWeight: "bold" }}>
                Specific Location:
              </Text>
              <Text weight="300" size="18px">
                {complaint.SpecificLocation}
              </Text>
            </Flex>
          </Grid>

          <Flex direction="column" gap="xs">
            <Text size="18px" style={{ fontWeight: "bold" }}>
              Caretaker comment on your complaint:
            </Text>
            <Text weight="300" size="18px">
              {complaint.Comment}
            </Text>
          </Flex>

          <Flex direction="column" gap="xs">
            <Text size="18px" style={{ fontWeight: "bold" }}>
              Please fill feedback*
            </Text>
            <Textarea
              placeholder="Please fill feedback"
              required
              variant="filled"
              style={{ width: "100%" }}
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              backgroundColor="gray"
              cols={50}
              rows={3}
            />
          </Flex>

          <Flex direction="row" gap="xs">
            <Text size="18px" style={{ fontWeight: "bold" }}>
              Give some rating:
            </Text>
            <Select
              placeholder="Rating"
              size="xs"
              required
              value={rating}
              onChange={setRating}
              data={[
                { value: "1", label: "1" },
                { value: "2", label: "2" },
                { value: "3", label: "3" },
                { value: "4", label: "4" },
                { value: "5", label: "5" },
              ]}
            />
          </Flex>
          <Text size="18px">
            Feedback will be registered with your User ID: 22BCS001
          </Text>
          <Flex direction="row-reverse" gap="xs">
            <Button
              size="sm"
              variant="filled"
              color="black"
              style={{
                width: "100px",
                backgroundColor: isSuccess ? "#2BB673" : undefined,
                color: isSuccess ? "black" : "white",
              }}
              onClick={handleSubmitButtonClick}
              disabled={isLoading || isSuccess}
            >
              {isLoading ? (
                <Center>
                  <Loader color="black" size="xs" />
                </Center>
              ) : isSuccess ? (
                <Center>
                  <CheckIcon size="16px" color="black" />
                </Center>
              ) : (
                "Submit"
              )}
            </Button>
            <Button
              size="sm"
              variant="filled"
              color="black"
              onClick={handleBackButtonClick}
              disabled={isLoading || isSuccess}
            >
              Back
            </Button>
          </Flex>
        </Flex>
      </Paper>
    </Grid>
  );
}

export default FeedbackForm;

FeedbackForm.propTypes = {
  complaint: PropTypes.shape({
    Id: PropTypes.string.isRequired,
    Type: PropTypes.string.isRequired,
    Date: PropTypes.string.isRequired,
    Finish: PropTypes.string.isRequired,
    Location: PropTypes.string.isRequired,
    SpecificLocation: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Comment: PropTypes.string.isRequired,
  }).isRequired,
  setSelectedComplaint: PropTypes.func.isRequired,
};

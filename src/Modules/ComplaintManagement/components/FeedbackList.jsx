import React from "react";
import { Flex, Grid, Paper } from "@mantine/core";
import PropTypes from "prop-types";

import FeedbackItem from "./FeedbackItem";

function FeedbackList({ complaints, setSelectedComplaint }) {
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
        <div
          style={{
            height: "100%",
            width: "100%",
            overflowY: "auto",
            fontFamily: "Manrope",
          }}
        >
          <Flex direction="column" gap="md" style={{ width: "100%" }}>
            {complaints.map((complaint) => (
              <FeedbackItem
                complaint={complaint}
                setSelectedComplaint={setSelectedComplaint}
              />
            ))}
          </Flex>
        </div>
      </Paper>
    </Grid>
  );
}

export default FeedbackList;

FeedbackList.propTypes = {
  complaints: PropTypes.arrayOf(
    PropTypes.shape({
      Id: PropTypes.string.isRequired,
      Type: PropTypes.string.isRequired,
      Date: PropTypes.string.isRequired,
      Finish: PropTypes.string.isRequired,
      Location: PropTypes.string.isRequired,
      SpecificLocation: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
      Comment: PropTypes.string.isRequired,
    }),
  ).isRequired,
  setSelectedComplaint: PropTypes.func.isRequired,
};

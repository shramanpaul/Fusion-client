import React from "react";
import { Flex, Grid, Paper } from "@mantine/core";
import PropTypes from "prop-types";

import FeedbackItem from "./FeedbackItem";

function FeedbackList({ setSelectedComplaint }) {
  return (
    <Grid mt="xl">
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
            overflow: "auto",
            fontFamily: "Manrope",
          }}
        >
          <Flex direction="column" gap="md" style={{ width: "100%" }}>
            <FeedbackItem
              ComplaintId="500"
              ComplaintType="Internet"
              ComplaintDate="Sept. 3, 2024, 10:30 a.m."
              ComplaintLocation="G111 Panini Block B"
              ComplaintDescription="LAN port not working"
              setSelectedComplaint={setSelectedComplaint}
            />
            <FeedbackItem
              ComplaintId="501"
              ComplaintType="Electrical"
              ComplaintDate="Sept. 3, 2024, 10:30 a.m."
              ComplaintLocation="G111 Panini Block B"
              ComplaintDescription="Fan not working"
              setSelectedComplaint={setSelectedComplaint}
            />
            <FeedbackItem
              ComplaintId="502"
              ComplaintType="Carpenter"
              ComplaintDate="Sept. 3, 2024, 10:30 a.m."
              ComplaintLocation="G111 Panini Block B"
              ComplaintDescription="Door not closing properly"
              setSelectedComplaint={setSelectedComplaint}
            />
            <FeedbackItem
              ComplaintId="503"
              ComplaintType="Plumber"
              ComplaintDate="Sept. 3, 2024, 10:30 a.m."
              ComplaintLocation="G111 Panini Block B"
              ComplaintDescription="Tap not working"
              setSelectedComplaint={setSelectedComplaint}
            />
            <FeedbackItem
              ComplaintId="504"
              ComplaintType="Garbage"
              ComplaintDate="Sept. 3, 2024, 10:30 a.m."
              ComplaintLocation="G111 Panini Block B"
              ComplaintDescription="Garbage not collected"
              setSelectedComplaint={setSelectedComplaint}
            />
          </Flex>
        </div>
      </Paper>
    </Grid>
  );
}

export default FeedbackList;

FeedbackList.propTypes = {
  setSelectedComplaint: PropTypes.func.isRequired,
};

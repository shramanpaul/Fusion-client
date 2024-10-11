import React from "react";
import { MantineProvider, Grid, Button, Box } from "@mantine/core";

function RoomsDetails() {
  const roomData = {
    G: ["G01", "G02", "G03", "G04", "G05", "G06", "G07", "G08", "G09", "G10"],
    F: [
      "F01",
      "F02",
      "F03",
      "F04",
      "F05",
      "F06",
      "F07",
      "F08",
      "F09",
      "F10",
      "F11",
      "F12",
    ],
    S: ["S01", "S02", "S03", "S04", "S05", "S06"],
    T: ["T01", "T02", "T03", "T04", "T05", "T06", "T07", "T08"],
  };

  return (
    <MantineProvider theme={{ fontFamily: "Arial, sans-serif" }}>
      <Box>
        {Object.keys(roomData).map((section) => (
          <Grid
            key={section}
            style={{ marginBottom: "10px", marginTop: "10px" }}
          >
            {roomData[section].map((room) => (
              <Grid.Col span="auto" key={room} style={{ textAlign: "center" }}>
                <Button variant="filled" color="red" style={{ width: "64px" }}>
                  {room}
                </Button>
              </Grid.Col>
            ))}
          </Grid>
        ))}
      </Box>
    </MantineProvider>
  );
}

export default RoomsDetails;

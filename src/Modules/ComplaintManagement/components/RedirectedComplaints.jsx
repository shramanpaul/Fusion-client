import React, { useState, useEffect } from "react";
import {
  Text,
  Button,
  Flex,
  Grid,
  Divider,
  Badge,
  Paper,
  Card,
  Loader,
  Center,
} from "@mantine/core";
import ComplaintDetails from "./ComplaintDetails.jsx";
import RedirectedComplaintsChangeStatus from "./RedirectedComplaintsChangedStatus.jsx";

function RedirectedComplaints() {
  const [activeComponent, setActiveComponent] = useState("list");
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [complaints, setComplaints] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const host = "http://127.0.0.1:8000";

  const fetchComplaints = () => {
    setIsLoading(true);
    setIsError(false);
    fetch(`${host}/complaint/supervisor/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("authToken")}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setComplaints(data);
      })
      .catch((error) => {
        console.error("Error fetching complaints:", error);
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const handleButtonClick = (component, complaint) => {
    setActiveComponent(component);
    setSelectedComplaint(complaint);
  };

  const handleBack = () => {
    fetchComplaints();
    setSelectedComplaint(null);
    setActiveComponent("list");
  };

  const formatDateTime = (datetimeStr) => {
    const date = new Date(datetimeStr);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${day}-${month}-${year}, ${hours}:${minutes}`;
  };

  return (
    <Grid mt="xl" style={{ paddingInline: "49px", width: "100%" }}>
      <Paper
        radius="md"
        px="lg"
        pt="sm"
        pb="xl"
        style={{
          borderLeft: "0.6rem solid #15ABFF",
          backgroundColor: "white",
          display: "flex",
          flexDirection: "column",
          width:
            activeComponent === "details" || activeComponent === "changeStatus"
              ? "70vw"
              : "100%",
          maxHeight: "65vh",
          overflow: "hidden",
        }}
        withBorder
      >
        <Flex
          direction="column"
          style={{
            flexGrow: 1,
            minHeight: "45vh",
            width: "100%",
            overflowY: "auto",
            overflowX: "hidden",
          }}
        >
          {isLoading ? (
            <Center style={{ flexGrow: 1 }}>
              <Loader size="xl" variant="bars" />
            </Center>
          ) : isError ? (
            <Center style={{ flexGrow: 1 }}>
              <Text size="14px" color="red">
                Failed to fetch complaints. Please try again.
              </Text>
            </Center>
          ) : complaints.length === 0 ? (
            <Center style={{ flexGrow: 1 }}>
              <Text size="14px">No redirected complaints available.</Text>
            </Center>
          ) : activeComponent === "details" ? (
            <ComplaintDetails
              complaintId={selectedComplaint.id}
              onBack={handleBack}
            />
          ) : activeComponent === "changeStatus" ? (
            <RedirectedComplaintsChangeStatus
              complaint={selectedComplaint}
              onBack={handleBack}
            />
          ) : (
            complaints.map((complaint) => (
              <Flex
                direction="column"
                key={complaint.id}
                style={{ width: "100%", marginBottom: "16px" }}
              >
                <Card shadow="sm" p="lg" radius="md" withBorder>
                  <Flex align="center" mb="sm" style={{ width: "100%" }}>
                    <Text size="14px" style={{ fontWeight: "bold" }}>
                      Complaint Id: {complaint.id}
                    </Text>
                    <Badge
                      color="blue"
                      radius="xl"
                      variant="filled"
                      mx="md"
                      size="lg"
                      style={{
                        cursor: "default",
                        fontWeight: "normal",
                        textAlign: "left",
                      }}
                    >
                      {complaint.complaint_type}
                    </Badge>
                  </Flex>
                  <Flex direction="column" gap="xs">
                    <Text size="14px">
                      <strong>Complainer Id:</strong> {complaint.complainer}
                    </Text>
                    <Text size="14px">
                      <strong>Date:</strong>{" "}
                      {formatDateTime(complaint.complaint_date)}
                    </Text>
                    <Text size="14px">
                      <strong>Location:</strong> {complaint.location} (
                      {complaint.specific_location})
                    </Text>
                  </Flex>
                  <Divider my="md" size="sm" />
                  <Text size="14px">
                    <strong>Description: </strong>
                    {complaint.details}
                  </Text>
                  <Flex justify="flex-start" gap="sm" mt="md">
                    <Button
                      variant="outline"
                      size="xs"
                      onClick={() => handleButtonClick("details", complaint)}
                    >
                      Details
                    </Button>
                    <Button
                      variant="outline"
                      size="xs"
                      onClick={() =>
                        handleButtonClick("changeStatus", complaint)
                      }
                    >
                      Change Status
                    </Button>
                  </Flex>
                </Card>
              </Flex>
            ))
          )}
        </Flex>
      </Paper>
    </Grid>
  );
}

export default RedirectedComplaints;

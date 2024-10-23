import React, { useState, useEffect } from "react";
import {
  Paper,
  Group,
  Badge,
  Title,
  Text,
  Button,
  Grid,
  Center,
  Loader,
  Flex,
  Divider,
} from "@mantine/core";
import { useSelector } from "react-redux";
import ComplaintDetails from "./ComplaintDetails"; // Import the ComplaintDetails component
import detailIcon from "../../../assets/detail.png";
import declinedIcon from "../../../assets/declined.png";
import resolvedIcon from "../../../assets/resolved.png";

function ComplaintHistory() {
  const [activeTab, setActiveTab] = useState("pending");
  const [complaints, setComplaints] = useState({
    pending: [],
    resolved: [],
    declined: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [selectedComplaintId, setSelectedComplaintId] = useState(null); // State for selected complaint ID
  const [showDetails, setShowDetails] = useState(false); // State for showing details

  const role = useSelector((state) => state.user.role);
  const host = "http://127.0.0.1:8000";
  const url = role.includes("supervisor")
    ? `${host}/complaint/supervisor/`
    : role.includes("caretaker") || role.includes("convener")
      ? `${host}/complaint/caretaker/`
      : `${host}/complaint/user/`;

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("authToken")}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          const pending = data.filter((c) => c.status === 0);
          const resolved = data.filter((c) => c.status === 2);
          const declined = data.filter((c) => c.status === 3);

          setComplaints({ pending, resolved, declined });
        } else {
          setComplaints({ pending: [], resolved: [], declined: [] });
        }
      })
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [url]);

  const getComplaints = () => complaints[activeTab];

  return (
    <Grid mt="xl" style={{ paddingLeft: "49px" }}>
      <Paper
        radius="md"
        px="lg"
        pt="sm"
        pb="xl"
        style={{
          borderLeft: "0.6rem solid #15ABFF",
          width: "60vw",
          backgroundColor: "white",
          minHeight: "45vh",
          maxHeight: "70vh",
          overflow: "hidden", // Prevent overflow of Paper
        }}
        withBorder
        maw="1240px"
      >
        {showDetails ? (
          <ComplaintDetails
            complaintId={selectedComplaintId} // Pass the selected complaint ID
            onBack={() => setShowDetails(false)} // Function to go back
          />
        ) : (
          <>
            <Title order={3} mb="md">
              Complaint History
            </Title>

            {/* Tab Menu */}
            <Group spacing="sm" mb="md">
              {["pending", "resolved", "declined"].map((tab) => (
                <Button
                  key={tab}
                  variant={activeTab === tab ? "filled" : "outline"}
                  onClick={() => setActiveTab(tab)}
                  style={{
                    width: "150px",
                    backgroundColor: activeTab === tab ? "#15ABFF" : "white",
                    color: activeTab === tab ? "white" : "black",
                  }}
                >
                  {`${tab.charAt(0).toUpperCase() + tab.slice(1)} Complaints`}
                </Button>
              ))}
            </Group>

            {/* Complaint List */}
            <div
              className="inner-card-content"
              style={{
                maxHeight: "60vh", // Limit the maximum height of the complaint list
                overflowY: "auto", // Enable vertical scrolling
              }}
            >
              {isLoading ? (
                <Center style={{ minHeight: "45vh" }}>
                  <Loader size="xl" variant="bars" />
                </Center>
              ) : isError ? (
                <Center style={{ minHeight: "45vh" }}>
                  <Text color="red">
                    Failed to fetch complaints. Please try again.
                  </Text>
                </Center>
              ) : getComplaints().length === 0 ? (
                <Center style={{ minHeight: "45vh" }}>
                  <Text>No {activeTab} complaints available.</Text>
                </Center>
              ) : (
                getComplaints().map((complaint, index) => (
                  <Paper
                    key={index}
                    radius="md"
                    px="lg"
                    pt="sm"
                    pb="xl"
                    style={{
                      width: "100%",
                      border: "1.5px solid #000000",
                      margin: "10px 0",
                    }}
                    withBorder
                  >
                    <Flex direction="column" style={{ width: "100%" }}>
                      {/* Header Section */}
                      <Flex direction="row" justify="space-between">
                        <Flex direction="row" gap="xs" align="center">
                          <Text size="19px" style={{ fontWeight: "Bold" }}>
                            Complaint Id: {complaint.id}
                          </Text>
                          <Badge
                            size="lg"
                            color={activeTab === "resolved" ? "green" : "blue"}
                          >
                            {complaint.complaint_type}
                          </Badge>
                        </Flex>

                        {activeTab === "resolved" ? (
                          <img
                            src={resolvedIcon}
                            alt="Resolved"
                            style={{
                              width: "35px",
                              borderRadius: "50%",
                              backgroundColor: "#2BB673",
                              padding: "10px",
                            }}
                          />
                        ) : activeTab === "declined" ? (
                          <img
                            src={declinedIcon}
                            alt="Declined"
                            style={{
                              width: "35px",
                              borderRadius: "50%",
                              backgroundColor: "#FF6B6B",
                              padding: "10px",
                            }}
                          />
                        ) : (
                          <img
                            src={detailIcon}
                            alt="Pending"
                            style={{
                              width: "35px",
                              borderRadius: "50%",
                              backgroundColor: "#FF6B6B",
                              padding: "10px",
                            }}
                          />
                        )}
                      </Flex>

                      {/* Complaint Info */}
                      <Flex
                        direction="row"
                        justify="space-between"
                        align="center"
                      >
                        <Flex direction="column" gap="xs">
                          <Text size="15px">
                            <b>Date:</b>{" "}
                            {new Date(
                              complaint.complaint_date,
                            ).toLocaleDateString()}
                          </Text>
                          <Text size="15px">
                            <b>Location:</b> {complaint.location}
                          </Text>
                          <Text size="15px">
                            <b>Description:</b> {complaint.details}
                          </Text>
                        </Flex>
                      </Flex>

                      <Divider my="md" size="sm" />

                      <Flex direction="row-reverse">
                        <Button
                          variant="outline"
                          size="xs"
                          onClick={() => {
                            setSelectedComplaintId(complaint.id);
                            setShowDetails(true);
                          }}
                        >
                          Details
                        </Button>
                      </Flex>
                    </Flex>
                  </Paper>
                ))
              )}
            </div>
          </>
        )}
      </Paper>
    </Grid>
  );
}

export default ComplaintHistory;

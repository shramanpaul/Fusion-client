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
} from "@mantine/core";
import { useSelector } from "react-redux"; // Import useSelector to get role from Redux
import "../styles/ComplaintHistory.css";
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

  const role = useSelector((state) => state.user.role); // Get the user role from Redux
  const host = "http://127.0.0.1:8000"; // Replace with your backend host if necessary

  // Determine the API URL based on the user's role
  const url = role.includes("supervisor")
    ? `${host}/complaint/supervisor/`
    : role.includes("caretaker") || role.includes("convener")
      ? `${host}/complaint/caretaker/`
      : `${host}/complaint/user/`;

  useEffect(() => {
    // Fetch complaints from the API
    setIsLoading(true);
    setIsError(false); // Reset error state before fetching
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("authToken")}`, // Ensure the correct token is passed
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        // Check if the data returned is an array, then filter by status
        if (Array.isArray(data)) {
          const pending = data.filter((c) => c.status === 0);
          const resolved = data.filter((c) => c.status === 2);
          const declined = data.filter((c) => c.status === 3);

          setComplaints({ pending, resolved, declined });
        } else {
          console.error("Unexpected response format:", data);
          // If the response is not an array, set empty complaints
          setComplaints({ pending: [], resolved: [], declined: [] });
        }
      })
      .catch((error) => {
        console.error("Error fetching complaints:", error);
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [url]); // Re-fetch complaints when the `url` changes

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
        }}
        withBorder
        maw="1240px"
      >
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
        <div className="inner-card-content">
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
                  borderLeft: "0.4rem solid #15ABFF",
                  marginBottom: "1rem",
                }}
                withBorder
              >
                <div className="complaint-header">
                  <Title order={5}>{complaint.complaint_type}</Title>
                  <Badge color="blue" size="lg">
                    {complaint.complaint_type}
                  </Badge>

                  {activeTab === "pending" && (
                    <Button
                      variant="outline"
                      size="xs"
                      onClick={() => console.log("Navigate to details page")}
                      leftIcon={<img src={detailIcon} alt="Details" />}
                    >
                      Details
                    </Button>
                  )}
                  {activeTab === "resolved" && (
                    <img
                      src={resolvedIcon}
                      alt="Resolved"
                      className="status-icon"
                    />
                  )}
                  {activeTab === "declined" && (
                    <img
                      src={declinedIcon}
                      alt="Declined"
                      className="status-icon"
                    />
                  )}
                </div>

                <Text>
                  <b>Date:</b>{" "}
                  {new Date(complaint.complaint_date).toLocaleDateString()}
                </Text>
                <Text>
                  <b>Location:</b> {complaint.location}
                </Text>
                <Text>
                  <b>Details:</b> {complaint.details}
                </Text>

                <hr />

                <Text>
                  <b>Remarks:</b> {complaint.remarks}
                </Text>
              </Paper>
            ))
          )}
        </div>
      </Paper>
    </Grid>
  );
}

export default ComplaintHistory;

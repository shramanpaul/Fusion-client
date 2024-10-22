import React, { useState, useEffect } from "react";
import {
  Text,
  Button,
  Flex,
  Grid,
  Divider,
  Badge,
  Paper,
  Loader,
  Center,
} from "@mantine/core";
import { useSelector } from "react-redux"; // Import useSelector to get role from Redux
import ComplaintDetails from "./ComplaintDetails.jsx";
import UnresCompChangeStatus from "./UnresComp_ChangeStatus.jsx";
import UnresCompRedirect from "./UnresComp_Redirect.jsx";

function UnresolvedComplaints() {
  const [activeComponent, setActiveComponent] = useState("list");
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [complaints, setComplaints] = useState([]);
  const [redirectedComplaints, setRedirectedComplaints] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const role = useSelector((state) => state.user.role); // Get user role from Redux store
  const host = "http://127.0.0.1:8000";

  // Determine the API URL based on user role
  const url = role.includes("supervisor")
    ? `${host}/complaint/supervisor/`
    : role.includes("caretaker") || role.includes("convener")
      ? `${host}/complaint/caretaker/`
      : `${host}/complaint/user/`;

  // Fetch unresolved complaints from the API based on role
  useEffect(() => {
    const fetchComplaints = async () => {
      setIsLoading(true);
      setIsError(false);
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem("authToken")}`,
          },
        });
        const data = await response.json();

        // Filter complaints that are unresolved (status !== 2 for unresolved complaints)
        const unresolvedComplaints = data.filter(
          (complaint) => complaint.status !== 2,
        );
        setComplaints(unresolvedComplaints);
      } catch (error) {
        console.error("Error fetching complaints:", error);
        setIsError(true);
      }
      setIsLoading(false);
    };

    fetchComplaints();
  }, [url]);

  const handleButtonClick = (component, complaint) => {
    setSelectedComplaint(complaint);
    setActiveComponent(component);
  };

  const handleBack = () => {
    setSelectedComplaint(null);
    setActiveComponent("list");
  };

  const markComplaintAsRedirected = (complaintId) => {
    setRedirectedComplaints((prev) => [...prev, complaintId]);
  };

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
    <Grid mt="xl" style={{ paddingLeft: "49px" }}>
      <Paper
        radius="md"
        px="lg"
        pt="sm"
        pb="xl"
        style={{
          borderLeft: "0.6rem solid #15ABFF",
          width: "60vw",
          minHeight: "45vh",
          maxHeight: "70vh",
          backgroundColor: "white",
          display: "flex",
          flexDirection: "column",
          overflow: "auto",
        }}
        withBorder
        maw="1240px"
        backgroundColor="white"
      >
        <Flex direction="column">
          {isLoading ? (
            <Center style={{ flexGrow: 1 }}>
              <Loader size="xl" variant="bars" />
            </Center>
          ) : isError ? (
            <Center style={{ flexGrow: 1 }}>
              <Text color="red">
                Failed to fetch complaints. Please try again.
              </Text>
            </Center>
          ) : complaints.length === 0 ? (
            <Center style={{ flexGrow: 1 }}>
              <Text>No unresolved complaints available.</Text>
            </Center>
          ) : activeComponent === "details" ? (
            <ComplaintDetails
              complaintId={selectedComplaint.id}
              onBack={handleBack}
            />
          ) : activeComponent === "changeStatus" ? (
            <UnresCompChangeStatus
              complaint={selectedComplaint}
              onBack={handleBack}
            />
          ) : activeComponent === "redirect" ? (
            <UnresCompRedirect
              complaint={selectedComplaint}
              onBack={handleBack}
              onForward={() => markComplaintAsRedirected(selectedComplaint.id)}
            />
          ) : (
            complaints.map((complaint) => (
              <Paper
                key={complaint.id}
                radius="md"
                px="lg"
                pt="sm"
                pb="xl"
                style={{
                  border: "1.5px solid #000000",
                  margin: "10px 0",
                }}
                withBorder
              >
                <Flex direction="column" style={{ width: "100%" }}>
                  <Flex direction="row" justify="space-between" align="center">
                    <Flex direction="row" gap="xs" align="center">
                      <Text size="19px" style={{ fontWeight: "bold" }}>
                        Complaint Id: {complaint.id}
                      </Text>
                      <Text
                        size="14px"
                        style={{
                          borderRadius: "50px",
                          padding: "10px 20px",
                          backgroundColor: "#14ABFF",
                          color: "white",
                        }}
                      >
                        {complaint.complaint_type}
                      </Text>
                    </Flex>
                    <Badge
                      color={complaint.status === 1 ? "green" : "red"}
                      variant="filled"
                      size="lg"
                    >
                      {complaint.status === 1 ? "Redirected" : "Unresolved"}
                    </Badge>
                  </Flex>

                  <Flex direction="column" gap="xs" mt="md">
                    <Text size="15px">
                      Date: {formatDateTime(complaint.complaint_date)}
                    </Text>
                    <Text size="15px">
                      Location: {complaint.specific_location},{" "}
                      {complaint.location}
                    </Text>
                  </Flex>
                  <Divider my="md" size="sm" />
                  <Text size="15px">Description: {complaint.details}</Text>
                  <Flex gap="sm" mt="md">
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

                    {redirectedComplaints.includes(complaint.id) ||
                    complaint.status === 1 ? (
                      <Button variant="outline" size="xs" disabled>
                        Redirected
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        size="xs"
                        onClick={() => handleButtonClick("redirect", complaint)}
                      >
                        Redirect
                      </Button>
                    )}
                  </Flex>
                </Flex>
              </Paper>
            ))
          )}
        </Flex>
      </Paper>
    </Grid>
  );
}

export default UnresolvedComplaints;

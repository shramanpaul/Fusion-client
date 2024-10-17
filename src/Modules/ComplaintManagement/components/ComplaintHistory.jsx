import React, { useState } from "react";
import {
  Paper,
  Group,
  Badge,
  Button,
  Flex,
  Divider,
  Text,
} from "@mantine/core";
import "../styles/ComplaintHistory.css"; // Import the updated CSS file
import detailIcon from "../../../assets/detail.png";
import declinedIcon from "../../../assets/declined.png";
import resolvedIcon from "../../../assets/resolved.png";

function ComplaintHistory() {
  const [activeTab, setActiveTab] = useState("pending");

  const complaintsData = {
    pending: [
      {
        date: "2024-10-01",
        type: "Faulty Lan Port",
        location: "Room no: C-111",
        details:
          "Not able to connect to the Internet because of a faulty LAN port.",
      },
      {
        date: "2024-10-02",
        type: "Power Issue",
        location: "Room no: D-102",
        details: "Power outage reported in the room.",
      },
      {
        date: "2024-10-03",
        type: "Water Leakage",
        location: "Room no: E-210",
        details: "Water leakage observed in bathroom.",
      },
      {
        date: "2024-10-04",
        type: "AC Malfunction",
        location: "Room no: A-101",
        details: "Air conditioner is not cooling properly.",
      },
      {
        date: "2024-10-05",
        type: "Internet Down",
        location: "Room no: B-305",
        details: "Unable to connect to the Internet for the past 3 days.",
      },
    ],
    resolved: [
      {
        date: "2024-09-20",
        type: "Noise Complaint",
        location: "Room no: B-202",
        details: "Resolved noise issue from the adjacent room.",
      },
    ],
    declined: [
      {
        date: "2024-08-10",
        type: "Internet Issue",
        location: "Room no: E-310",
        details: "Complaint declined due to insufficient information.",
      },
    ],
  };

  const getComplaints = () => complaintsData[activeTab];

  return (
    <div className="full-width-container">
      <div className="main-card-container" id="main-card">
        {/* Tab Menu */}
        <Group className="tab-menu" spacing="sm">
          <button
            className={`tab-item ${activeTab === "pending" ? "active-tab" : ""}`}
            onClick={() => setActiveTab("pending")}
          >
            Pending Complaints
          </button>
          <button
            className={`tab-item ${activeTab === "resolved" ? "active-tab" : ""}`}
            onClick={() => setActiveTab("resolved")}
          >
            Resolved Complaints
          </button>
          <button
            className={`tab-item ${activeTab === "declined" ? "active-tab" : ""}`}
            onClick={() => setActiveTab("declined")}
          >
            Declined Complaints
          </button>
        </Group>

        {/* Complaint List */}
        <div className="inner-card-content">
          {getComplaints().map((complaint, index) => (
            <Paper
              key={index}
              radius="md"
              px="lg"
              pt="sm"
              pb="xl"
              style={{
                width: "100%", // Ensure full width
                marginBottom: "20px", // Add some space between cards
              }}
              withBorder
            >
              <Flex align="center" justify="space-between" mb="sm">
                <Text size="sm" style={{ fontWeight: "bold" }}>
                  {complaint.type}
                </Text>
                <Badge
                  color="blue"
                  radius="xl"
                  variant="filled"
                  size="lg"
                  style={{
                    fontWeight: "normal",
                    textAlign: "left",
                  }}
                >
                  {complaint.type}
                </Badge>

                {/* Status Icon based on Tab */}
                {activeTab === "pending" && (
                  <Button
                    variant="outline"
                    size="xs"
                    onClick={() => console.log("Navigate to details page")}
                    aria-label="Details"
                    style={{ background: "none", border: "none" }} // Remove button styles
                  >
                    <img
                      src={detailIcon}
                      alt="Details"
                      style={{ width: "20px", height: "20px" }}
                    />
                  </Button>
                )}

                {activeTab === "resolved" && (
                  <img
                    src={resolvedIcon}
                    alt="Resolved"
                    style={{ width: "20px", height: "20px" }}
                  />
                )}
                {activeTab === "declined" && (
                  <img
                    src={declinedIcon}
                    alt="Declined"
                    style={{ width: "20px", height: "20px" }}
                  />
                )}
              </Flex>

              <Text size="sm">Date: {complaint.date}</Text>
              <Text size="sm">Location: {complaint.location}</Text>

              <Divider my="md" size="sm" />

              <Text size="sm">{complaint.details}</Text>
            </Paper>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ComplaintHistory;

import React from "react";
import { Paper, Text, Badge } from "@mantine/core";
import "../styles/GenerateReport.css";
import detailIcon from "../../../assets/detail.png";
import declinedIcon from "../../../assets/declined.png";
import resolvedIcon from "../../../assets/resolved.png";

function GenerateReport() {
  const complaintsData = [
    {
      date: "2024-10-01",
      type: "Faulty Lan Port",
      location: "Room no: C-111",
      details:
        "Not able to connect to the Internet because of a faulty LAN port.",
      status: "Pending",
    },
    {
      date: "2024-10-02",
      type: "Power Issue",
      location: "Room no: D-102",
      details: "Power outage reported in the room.",
      status: "Pending",
    },
    {
      date: "2024-10-03",
      type: "Water Leakage",
      location: "Room no: E-210",
      details: "Water leakage observed in bathroom.",
      status: "Resolved",
    },
    {
      date: "2024-10-04",
      type: "AC Malfunction",
      location: "Room no: A-101",
      details: "Air conditioner is not cooling properly.",
      status: "Declined",
    },
    {
      date: "2024-10-05",
      type: "Internet Down",
      location: "Room no: B-305",
      details: "Unable to connect to the Internet for the past 3 days.",
      status: "Resolved",
    },
  ];

  return (
    <div className="full-width-container">
      {/* Main Complaint List Card */}
      <div className="main-card-container" id="main-card">
        <div className="inner-card-content">
          {complaintsData.map((complaint, index) => (
            <Paper
              key={index}
              radius="md"
              px="lg"
              pt="sm"
              pb="xl"
              className="complaint-subcard"
              withBorder
            >
              <div className="complaint-header-container">
                <div className="complaint-header">
                  <span>{complaint.type}</span>
                </div>
                <Badge
                  id="complaint-type-badge"
                  style={{ marginRight: "20px" }}
                >
                  {complaint.type}
                </Badge>
                <div className="details-status-container">
                  <div className="details-section">
                    <Text className="details-label" />
                    <div className="details-section">
                      <Text className="details-label" />
                      <button
                        className="status-icon-button"
                        onClick={() => console.log("Navigate to details page")}
                        aria-label="Details"
                        style={{
                          background: "none",
                          border: "none",
                          padding: 0,
                        }} // Optional: style reset for button
                      >
                        <img
                          src={detailIcon}
                          alt="Details"
                          className="status-icon"
                        />
                      </button>
                    </div>
                  </div>
                  <div className="status-section">
                    <Text className="status-label" />
                    <img
                      src={
                        complaint.status === "Resolved"
                          ? resolvedIcon
                          : complaint.status === "Declined"
                            ? declinedIcon
                            : detailIcon
                      }
                      alt={complaint.status}
                      className="status-icon"
                    />
                  </div>
                </div>
              </div>
              {/* Complaint Details */}
              <div className="complaint-detail">
                <b>Date:</b>
                <div id="content-generate">{complaint.date}</div>
              </div>
              <div className="complaint-detail">
                <b>Location:</b>
                <div id="content-generate">{complaint.location}</div>
              </div>
              <div className="complaint-detail">
                <b>Complaint:</b>
                <div id="content-generate">
                  {complaint.details.split(".")[0]}
                </div>
              </div>
              <div id="hr">
                <hr />
              </div>
              <hr /> {/* Horizontal line after complaint */}
              <hr /> {/* Horizontal line before complaint description */}
              <div className="details">{complaint.details}</div>
            </Paper>
          ))}
        </div>
      </div>

      {/* Right-side Filter Card */}
      <div className="filter-card-container">
        <h2>Filters</h2>
        <span htmlFor="location" className="filter-label">
          Location
        </span>
        <select id="location">
          <option value="">Select Location</option>
          <option value="C-111">Room C-111</option>
          <option value="D-102">Room D-102</option>
        </select>

        <span htmlFor="complaint-type" className="filter-label">
          Complaint Type
        </span>
        <select id="complaint-type">
          <option value="">Select Complaint Type</option>
          <option value="Faulty Lan Port">Faulty Lan Port</option>
          <option value="Power Issue">Power Issue</option>
        </select>

        <span htmlFor="status" className="filter-label">
          Status
        </span>
        <select id="status">
          <option value="">Select Complaint Status</option>
          <option value="Pending">Pending</option>
          <option value="Resolved">Resolved</option>
        </select>

        {/* Date Range Section with "From Date" and "To Date" labels */}
        <span htmlFor="from-date" className="filter-label">
          From Date
        </span>
        <input type="date" id="from-date" placeholder="From Date" />

        <span htmlFor="to-date" className="filter-label">
          To Date
        </span>
        <input type="date" id="to-date" placeholder="To Date" />

        {/* Sort Dropdown */}
        <span htmlFor="sort" className="filter-label" id="sortheading">
          Sort
        </span>
        <select id="sort" className="sort-dropdown">
          <option value="">Sort by</option>
          <option value="date">Date</option>
          <option value="status">Status</option>
        </select>
      </div>
    </div>
  );
}

export default GenerateReport;

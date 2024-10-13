import React, { useState } from "react";
import FeedbackForm from "./FeedbackForm";
import FeedbackList from "./FeedbackList";

function Feedback() {
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  const complaints = [
    {
      Id: "500",
      Type: "Internet",
      Date: "Sept. 3, 2024, 10:30 a.m.",
      Finish: "Sept. 4, 2024, 10:30 a.m.",
      Location: "G111 Panini Block B",
      SpecificLocation: "Room 101",
      Description: "LAN port not working",
      Comment: "Fixed",
    },
    {
      Id: "501",
      Type: "Electrical",
      Date: "Sept. 3, 2024, 10:30 a.m.",
      Finish: "Sept. 4, 2024, 10:30 a.m.",
      Location: "G111 Panini Block B",
      SpecificLocation: "Room 102",
      Description: "Fan not working",
      Comment: "Fixed",
    },
    {
      Id: "502",
      Type: "Carpenter",
      Date: "Sept. 3, 2024, 10:30 a.m.",
      Finish: "Sept. 4, 2024, 10:30 a.m.",
      Location: "G111 Panini Block B",
      SpecificLocation: "Room 103",
      Description: "Door not closing properly",
      Comment: "Fixed",
    },
    {
      Id: "503",
      Type: "Plumber",
      Date: "Sept. 3, 2024, 10:30 a.m.",
      Finish: "Sept. 4, 2024, 10:30 a.m.",
      Location: "G111 Panini Block B",
      SpecificLocation: "Room 104",
      Description: "Tap not working",
      Comment: "Fixed",
    },
    {
      Id: "504",
      Type: "Garbage",
      Date: "Sept. 3, 2024, 10:30 a.m.",
      Finish: "Sept. 4, 2024, 10:30 a.m.",
      Location: "G111 Panini Block B",
      SpecificLocation: "Room 105",
      Description: "Garbage not collected",
      Comment: "Fixed",
    },
  ];

  const renderFormTabContent = () => {
    if (selectedComplaint == null) {
      return (
        <FeedbackList
          complaints={complaints}
          setSelectedComplaint={setSelectedComplaint}
        />
      );
    }

    return (
      <FeedbackForm
        complaint={selectedComplaint}
        setSelectedComplaint={setSelectedComplaint}
      />
    );
  };

  return <div>{renderFormTabContent()}</div>;
}

export default Feedback;

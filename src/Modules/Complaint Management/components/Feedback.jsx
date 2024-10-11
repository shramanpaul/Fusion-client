import React, { useState } from "react";
import FeedbackForm from "./FeedbackForm";
import FeedbackList from "./FeedbackList";

function Feedback() {
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  const renderFormTabContent = () => {
    if (selectedComplaint == null) {
      return <FeedbackList setSelectedComplaint={setSelectedComplaint} />;
    }

    return <FeedbackForm setSelectedComplaint={setSelectedComplaint} />;
  };

  return <div>{renderFormTabContent()}</div>;
}

export default Feedback;

import { Button, Text, Grid, Flex } from "@mantine/core";
import { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

function UnresComp_Redirect({ complaint, onBack, onForward }) {
  const [isForwarded, setIsForwarded] = useState(false);
  const [noFiles, setNoFiles] = useState(false); // Track if files are missing

  const host = "http://127.0.0.1:8000";
  const token = localStorage.getItem("authToken");

  if (!complaint) return null;

  // Function to handle forwarding the complaint
  const handleForward = async () => {
    try {
      const response = await axios.post(
        `${host}/complaint/caretaker/${complaint.id}/`,
        {},
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        },
      );

      if (response.status === 200) {
        alert("Complaint forwarded successfully.");
        setIsForwarded(true);
      } else if (response.status === 206) {
        alert("Complaint forwarded, but no files are attached.");
        setIsForwarded(true);
        setNoFiles(true); // Set the no files state
      }

      if (onForward) onForward();
      onBack();
    } catch (error) {
      console.error("Error forwarding the complaint:", error);
      alert("There was an issue forwarding the complaint.");
    }
  };

  return (
    <Grid.Col span={12} md={6}>
      <Text size="lg" weight="bold">
        Redirect
      </Text>
      <Text size="md" weight={500} mb="1rem">
        <strong>
          If you want to redirect this complaint, you can pass this complaint to
          a specific Incharge.
        </strong>
      </Text>

      <Text size="sm" weight={500}>
        <strong>Complainer:</strong> {complaint.complainer}
      </Text>
      <Text size="sm">
        <strong>Complaint ID:</strong> {complaint.id}
      </Text>
      <Text size="sm">
        <strong>Complaint Type:</strong> {complaint.complaint_type}
      </Text>
      <Text size="sm">
        <strong>Location:</strong>{" "}
        {`${complaint.location}, ${complaint.specific_location}`}
      </Text>

      <Flex justify="space-between" mt="md" my="xl" gap="sm">
        <Button variant="outline" size="md" onClick={onBack}>
          BACK
        </Button>
        {isForwarded ? (
          noFiles ? (
            <Text size="md" weight={500}>
              Redirected (No files attached)
            </Text> // Show if forwarded but no files
          ) : (
            <Text size="md" weight={500}>
              Redirected
            </Text>
          )
        ) : (
          <Button variant="filled" size="md" onClick={handleForward}>
            FORWARD
          </Button>
        )}
      </Flex>
    </Grid.Col>
  );
}

UnresComp_Redirect.propTypes = {
  complaint: PropTypes.shape({
    id: PropTypes.number.isRequired,
    complaint_date: PropTypes.string.isRequired,
    complaint_finish: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    specific_location: PropTypes.string.isRequired,
    comment: PropTypes.string,
    complainer: PropTypes.string,
    complaint_type: PropTypes.string,
  }),
  onBack: PropTypes.func.isRequired,
  onForward: PropTypes.func.isRequired,
};

export default UnresComp_Redirect;

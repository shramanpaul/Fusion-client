import {
  Button,
  Container,
  Flex,
  Grid,
  Loader,
  Tabs,
  Text,
} from "@mantine/core";
import { CaretCircleLeft, CaretCircleRight } from "@phosphor-icons/react";
import { useRef, useState } from "react";
import CustomBreadcrumbs from "../../components/Breadcrumbs.jsx";
import ComplaintForm from "./components/ComplaintForm.jsx";
import ComplaintHistory from "./components/ComplaintHistory.jsx"; // Import the new component
import GenerateReport from "./components/Generate_Report.jsx"; // Import the new component
import classes from "./ComplaintModule.module.css";

function ComplaintModuleLayout() {
  const [activeTab, setActiveTab] = useState("0");
  const tabsListRef = useRef(null);

  const tabItems = [
    { title: "Lodge a Complaint" },
    { title: "Complaint History" },
    { title: "Feedback" },
    { title: "Resolved Complaints" },
    { title: "Unresolved Complaints" },
    { title: "Generate Report" },
  ];

  const handleTabChange = (direction) => {
    const newIndex =
      direction === "next"
        ? Math.min(+activeTab + 1, tabItems.length - 1)
        : Math.max(+activeTab - 1, 0);
    setActiveTab(String(newIndex));
    tabsListRef.current.scrollBy({
      left: direction === "next" ? 50 : -50,
      behavior: "smooth",
    });
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "0":
        return <ComplaintForm />;
      case "1":
        return <ComplaintHistory />; // Show Complaint History
      case "2":
        return <p>Feedback Content</p>;
      case "3":
        return <p>Resolved Complaints Content</p>;
      case "4":
        return <p>Unresolved Complaints Content</p>;
      case "5":
        return <GenerateReport />;
      default:
        return <Loader />;
    }
  };

  return (
    <>
      <CustomBreadcrumbs />
      <Flex justify="space-between" align="center" mt="lg">
        <Flex justify="flex-start" align="center" gap="1rem" mt="1.5rem">
          <Button
            onClick={() => handleTabChange("prev")}
            variant="default"
            p={0}
            style={{ border: "none" }}
          >
            <CaretCircleLeft
              className={classes.fusionCaretCircleIcon}
              weight="light"
            />
          </Button>

          <div className={classes.fusionTabsContainer} ref={tabsListRef}>
            <Tabs value={activeTab} onChange={setActiveTab}>
              <Tabs.List style={{ display: "flex", flexWrap: "nowrap" }}>
                {tabItems.map((item, index) => (
                  <Tabs.Tab
                    value={`${index}`}
                    key={index}
                    className={
                      activeTab === `${index}`
                        ? classes.fusionActiveRecentTab
                        : ""
                    }
                  >
                    <Flex gap="4px">
                      <Text>{item.title}</Text>
                    </Flex>
                  </Tabs.Tab>
                ))}
              </Tabs.List>
            </Tabs>
          </div>

          <Button
            onClick={() => handleTabChange("next")}
            variant="default"
            p={0}
            style={{ border: "none" }}
          >
            <CaretCircleRight
              className={classes.fusionCaretCircleIcon}
              weight="light"
            />
          </Button>
        </Flex>
      </Flex>
      <Grid mt="xl">
        <Container py="xl">{renderTabContent()}</Container>
      </Grid>
    </>
  );
}

export default ComplaintModuleLayout;

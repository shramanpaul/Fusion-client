<<<<<<< HEAD:src/Modules/ComplaintManagement/index.jsx
import { Button, Flex, Loader, Tabs, Text } from "@mantine/core";
=======
import {
  Button,
  Container,
  Flex,
  Grid,
  Loader,
  Tabs,
  Text,
  Paper,
} from "@mantine/core";
>>>>>>> 0cfbf6af93f68d8b341c6abdddc7cf8c537a083d:src/Modules/Complaint Management/index.jsx
import { CaretCircleLeft, CaretCircleRight } from "@phosphor-icons/react";
import { useRef, useState } from "react";
import CustomBreadcrumbs from "../../components/Breadcrumbs.jsx";
import classes from "./ComplaintModule.module.css";
// Import all the components here
import Feedback from "./components/Feedback.jsx";
import FormPage from "./components/FormPage.jsx";
import ComplaintHistory from "./components/ComplaintHistory.jsx";
import GenerateReport from "./components/Generate_Report.jsx";
import ResolvedComplaints from "./components/ResolvedComplaints.jsx";
import UnresolvedComplaints from "./components/UnresolvedComplaints.jsx";
<<<<<<< HEAD
import RedirectedComplaints from "./components/RedirectedComplaints.jsx";
=======
>>>>>>> 82226465e3cfe2765725d3d5a5d90b4586eb7a96

<<<<<<< HEAD:src/Modules/ComplaintManagement/index.jsx
const link = document.createElement("link");
link.href =
  "https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700&display=swap";
link.rel = "stylesheet";
document.head.appendChild(link);
=======
import ComplaintForm from "./components/ComplaintForm.jsx";
import UnresolvedComplaints from "./components/UnresolvedComplaints.jsx";
>>>>>>> 0cfbf6af93f68d8b341c6abdddc7cf8c537a083d:src/Modules/Complaint Management/index.jsx

function ComplaintModuleLayout() {
  const [activeTab, setActiveTab] = useState("0");
  const tabsListRef = useRef(null);

  const tabItems = [
    { title: "Lodge a Complaint" },
    { title: "Complaint History" },
    { title: "Feedback" },
    { title: "Resolved Complaints" },
    { title: "Unresolved Complaints" },
    { title: "Redirected Complaints" },
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
        return <FormPage />;
      case "1":
<<<<<<< HEAD:src/Modules/ComplaintManagement/index.jsx
        return <ComplaintHistory />;
=======
        return <p>Complaint History</p>;
>>>>>>> 0cfbf6af93f68d8b341c6abdddc7cf8c537a083d:src/Modules/Complaint Management/index.jsx
      case "2":
        return <Feedback />;
      case "3":
        return <ResolvedComplaints />;
      case "4":
<<<<<<< HEAD
=======
<<<<<<< HEAD:src/Modules/ComplaintManagement/index.jsx
=======
        // return <p>Unresolved Complaints</p>
>>>>>>> 0cfbf6af93f68d8b341c6abdddc7cf8c537a083d:src/Modules/Complaint Management/index.jsx
>>>>>>> 82226465e3cfe2765725d3d5a5d90b4586eb7a96
        return <UnresolvedComplaints />;
      case "5":
        return <RedirectedComplaints />;
      case "6":
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

      {/* end */}

      {/* Main content */}
      <Flex direction="row" justify="start" align="start">
<<<<<<< HEAD:src/Modules/ComplaintManagement/index.jsx
        <div>{renderTabContent()}</div>
=======
        <div style={{marginLeft: "41px", marginTop: "10px"}}>{renderTabContent()}</div>
>>>>>>> 0cfbf6af93f68d8b341c6abdddc7cf8c537a083d:src/Modules/Complaint Management/index.jsx
      </Flex>
    </>
  );
}

export default ComplaintModuleLayout;

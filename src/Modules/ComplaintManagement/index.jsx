import { Button, Flex, Loader, Tabs, Text } from "@mantine/core";
import { CaretCircleLeft, CaretCircleRight } from "@phosphor-icons/react";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import CustomBreadcrumbs from "../../components/Breadcrumbs.jsx";
import classes from "./ComplaintModule.module.css";

// Import all the components here
import Feedback from "./components/Feedback.jsx";
import FormPage from "./components/FormPage.jsx";
import ComplaintHistory from "./components/ComplaintHistory.jsx";
import GenerateReport from "./components/Generate_Report.jsx";
import ResolvedComplaints from "./components/ResolvedComplaints.jsx";
import UnresolvedComplaints from "./components/UnresolvedComplaints.jsx";
import RedirectedComplaints from "./components/RedirectedComplaints.jsx";

const link = document.createElement("link");
link.href =
  "https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700&display=swap";
link.rel = "stylesheet";
document.head.appendChild(link);

function ComplaintModuleLayout() {
  const [activeTab, setActiveTab] = useState("0");
  const tabsListRef = useRef(null);
  const role = useSelector((state) => state.user.role);

  // Define tabs based on user role
  let tabItems = [];

  if (role.includes("warden")) {
    tabItems = [{ title: "Generate Report" }];
  } else if (role.includes("supervisor")) {
    tabItems = [
      { title: "Redirected Complaints" },
      { title: "Generate Report" },
    ];
  } else if (role.includes("caretaker") || role.includes("convener")) {
    tabItems = [
      // { title: "Lodge a Complaint" },
      // { title: "Complaint History" },
      // { title: "Feedback" },
      { title: "Resolved Complaints" },
      { title: "Unresolved Complaints" },
      { title: "Generate Report" },
    ];
  } else {
    tabItems = [
      { title: "Lodge a Complaint" },
      { title: "Complaint History" },
      { title: "Feedback" },
    ];
  }

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
    if (role.includes("warden")) {
      return <GenerateReport />;
    }

    if (role.includes("supervisor")) {
      switch (activeTab) {
        case "0":
          return <RedirectedComplaints />;
        case "1":
          return <GenerateReport />;
        default:
          return <Loader />;
      }
    }

    if (role.includes("caretaker") || role.includes("convener")) {
      switch (activeTab) {
        // case "0":
        //   return <FormPage />;
        // case "1":
        //   return <ComplaintHistory />;
        // case "2":
        //   return <Feedback />;
        case "0":
          return <ResolvedComplaints />;
        case "1":
          return <UnresolvedComplaints />;
        case "2":
          return <GenerateReport />;
        default:
          return <Loader />;
      }
    }

    // Default case for all other roles
    switch (activeTab) {
      case "0":
        return <FormPage />;
      case "1":
        return <ComplaintHistory />;
      case "2":
        return <Feedback />;
      default:
        return <Loader />;
    }
  };

  return (
    <div style={{ fontFamily: "Manrope" }}>
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

      {/* Main content */}
      <Flex direction="row" justify="start" align="start">
        <div>{renderTabContent()}</div>
      </Flex>
    </div>
  );
}

export default ComplaintModuleLayout;

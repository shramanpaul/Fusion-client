import { Button, Group, MantineProvider, Tabs } from "@mantine/core";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const TabsModules = [
  {
    label: "Bookings",
    id: "bookings",
    url: "/visitors_hostel/",
  },
  {
    label: "Cancelled Requests",
    id: "cancel-request",
    url: "/visitors_hostel/cancel_request",
  },
  {
    label: "Active Bookings",
    id: "active-bookings",
    url: "/visitors_hostel/active_bookings",
  },
  {
    label: "Completed Bookings",
    id: "completed-bookings",
    url: "/visitors_hostel/completed_bookings",
  },
];

function ManageBookings() {
  const [activeTab, setActiveTab] = React.useState("bookings");
  const navigate = useNavigate();
  const activeTabIndex = TabsModules.findIndex((tab) => tab.id === activeTab);

  const handleTabChange = (tabId) => {
    const tab = TabsModules.find((t) => t.id === tabId);
    if (tab) {
      setActiveTab(tabId);
      navigate(tab.url);
    }
  };

  const handleNextTab = () => {
    if (activeTabIndex < TabsModules.length - 1) {
      const nextTab = TabsModules[activeTabIndex + 1];
      handleTabChange(nextTab.id);
    }
  };

  const handlePreviousTab = () => {
    if (activeTabIndex > 0) {
      const prevTab = TabsModules[activeTabIndex - 1];
      handleTabChange(prevTab.id);
    }
  };

  return (
    <MantineProvider>
      <div>
        <div className="tabs-container" style={{ marginBottom: 30 }}>
          <Group position="apart" noWrap>
            <Button
              variant="subtle"
              compact
              onClick={handlePreviousTab}
              disabled={activeTabIndex === 0}
            >
              <IconChevronLeft size={18} />
            </Button>
            <Tabs value={activeTab} onTabChange={handleTabChange}>
              <Tabs.List>
                {TabsModules.map((tab) => (
                  <Tabs.Tab
                    key={tab.id}
                    value={tab.id}
                    onClick={() => handleTabChange(tab.id)} // This handles the click on tabs
                    sx={() => ({
                      fontWeight: activeTab === tab.id ? "bold" : "normal",
                    })}
                  >
                    {tab.label}
                  </Tabs.Tab>
                ))}
              </Tabs.List>
            </Tabs>
            <Button
              variant="subtle"
              compact
              onClick={handleNextTab}
              disabled={activeTabIndex === TabsModules.length - 1}
            >
              <IconChevronRight size={18} />
            </Button>
          </Group>
        </div>
      </div>
      <style>{`
        .tabs-container {
          background-color: #f0f0f0;
          border-radius: 4px;
          padding: 10px;
          font-family: Arial, sans-serif;
        }
      `}</style>
    </MantineProvider>
  );
}

export default ManageBookings;

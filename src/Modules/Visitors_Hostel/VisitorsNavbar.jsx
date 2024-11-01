import React from "react";
import { Tabs, Group, MantineProvider } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const TabsModules = [
  {
    label: "Manage Bookings",
    id: "manage-bookings",
    url: "/visitors_hostel",
  },
  // {
  //   label: "Booking Form",
  //   id: "booking-form",
  //   url: "/visitors_hostel/booking-form",
  // },
  {
    label: "Room Availability",
    id: "room-availability",
    url: "/visitors_hostel/room-availability",
  },
  {
    label: "Mess Record",
    id: "mess-record",
    url: "/visitors_hostel/mess-record",
  },
  { label: "Inventory", id: "inventory", url: "/visitors_hostel/inventory" },
  {
    label: "Account Statement",
    id: "account-statement",
    url: "/visitors_hostel/account-statement",
  },
  {
    label: "Rules and Regulations",
    id: "rules",
    url: "/visitors_hostel/rules",
  },
];

export default function BookingManagement() {
  const [activeTab, setActiveTab] = React.useState("manage-bookings");
  const navigate = useNavigate();

  const handleTabChange = (tabId) => {
    const tab = TabsModules.find((t) => t.id === tabId);
    if (tab) {
      setActiveTab(tabId);
      navigate(tab.url);
    }
  };

  const role = useSelector((state) => state.user.role);

  const filteredTabs = TabsModules.filter((tab) => {
    if (role === "VhCaretaker" || role === "VhIncharge") {
      return true;
    }
    return ["manage-bookings", "booking-form", "rules"].includes(tab.id);
  });

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <div className="booking-management">
        <Group position="apart" noWrap>
          <Tabs onChange={handleTabChange} defaultValue="manage-bookings">
            <Tabs.List>
              {filteredTabs.map((tab) => (
                <Tabs.Tab
                  key={tab.id}
                  value={tab.id}
                  sx={() => ({
                    fontWeight: activeTab === tab.id ? "bold" : "normal",
                  })}
                >
                  {tab.label}
                </Tabs.Tab>
              ))}
            </Tabs.List>
          </Tabs>
        </Group>
      </div>
      <style>{`
        .booking-management {
        //   max-width: 800px;
          margin: 0 auto;
          padding: 20px;
          font-family: Arial, sans-serif;
        }
        .top-nav ul {
          list-style-type: none;
          padding: 0;
          margin: 0 0 20px 0;
          display: flex;
          gap: 10px;
        }
        .top-nav li {
          color: #666;
          font-size: 14px;
        }
        .top-nav li.active {
          font-weight: bold;
        }
        .top-nav li:not(:last-child)::after {
          content: "|";
          margin-left: 10px;
          color: #ccc;
        }
        .tabs-container {
          background-color: #f0f0f0;
          border-radius: 4px;
          padding: 10px;
        }
          
      `}</style>
    </MantineProvider>
  );
}

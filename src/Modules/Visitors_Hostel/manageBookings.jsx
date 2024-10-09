import { Button, Group, MantineProvider, Tabs } from "@mantine/core";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import React from "react";

function ManageBookings() {
  return (
    <MantineProvider>
      <div>
        {" "}
        <div className="tabs-container">
          <Group position="apart" noWrap>
            <Button variant="subtle" compact>
              <IconChevronLeft size={18} />
            </Button>
            <Tabs defaultValue="bookings">
              <Tabs.List>
                <Tabs.Tab value="bookings">Bookings</Tabs.Tab>
                <Tabs.Tab value="cancellation">Cancellation Request</Tabs.Tab>
                <Tabs.Tab value="active">Active Bookings</Tabs.Tab>
                <Tabs.Tab value="completed">Completed Bookings</Tabs.Tab>
              </Tabs.List>
            </Tabs>
            <Button variant="subtle" compact>
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

import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import { Notifications } from "@mantine/notifications";
import { Layout } from "./components/layout";
import Dashboard from "./Modules/Dashboard/dashboardNotifications";
import Profile from "./Modules/Profile/profile";
import LoginPage from "./pages/login";
import ForgotPassword from "./pages/forgotPassword";
import AcademicPage from "./Modules/Academic/index";
import ValidateAuth from "./helper/validateauth";
import ManageBookings from "./Modules/Visitors_Hostel/manageBookings";
import VisitorsContent from "./Modules/Visitors_Hostel/visitorsContent";
import CancellationRequest from "./Modules/Visitors_Hostel/cancellationRequest";
import BookingForm from "./Modules/Visitors_Hostel/bookingForm";
import Bookings from "./Modules/Visitors_Hostel/bookings";
import ActiveBookingsPage from "./Modules/Visitors_Hostel/activeBookings";
import CompletedBookingsPage from "./Modules/Visitors_Hostel/completedBookings";
import VHGuidelinesPage from "./Modules/Visitors_Hostel/vhGuidelines";
import InventoryManagement from "./Modules/Visitors_Hostel/inventory";

export default function App() {
  const location = useLocation();
  return (
    <MantineProvider>
      <Notifications
        position="top-right"
        zIndex={1000}
        autoClose={2000}
        limit={1}
      />
      {location.pathname !== "/accounts/login" &&
        location.pathname !== "/reset-password" && <ValidateAuth />}
      <Routes>
        <Route path="/" element={<Navigate to="/accounts/login" replace />} />
        <Route
          path="/dashboard"
          element={
            <Layout>
              <Dashboard />
            </Layout>
          }
        />
        <Route
          path="/academics"
          element={
            <Layout>
              <AcademicPage />
            </Layout>
          }
        />
        <Route
          path="/profile"
          element={
            <Layout>
              <Profile />
            </Layout>
          }
        />
        <Route
          path="/visitors_hostel"
          element={
            <Layout>
              <VisitorsContent />
              <ManageBookings />
              <Bookings />
            </Layout>
          }
        />
        <Route
          path="/visitors_hostel/cancel_request"
          element={
            <Layout>
              <VisitorsContent />
              <ManageBookings />
              <CancellationRequest />
            </Layout>
          }
        />
        <Route
          path="/visitors_hostel/active_bookings"
          element={
            <Layout>
              <VisitorsContent />
              <ManageBookings />
              <ActiveBookingsPage />
            </Layout>
          }
        />
        <Route
          path="/visitors_hostel/completed_bookings"
          element={
            <Layout>
              <VisitorsContent />
              <ManageBookings />
              <CompletedBookingsPage />
            </Layout>
          }
        />
        {/* <Route
          path="/visitors_hostel/manage_bookings"
          element={
            <Layout>
              <ManageBookings />
            </Layout>
          }
        /> */}
        <Route
          path="/visitors_hostel/booking-form"
          element={
            <Layout>
              <VisitorsContent />
              <BookingForm />
            </Layout>
          }
        />
        <Route
          path="/visitors_hostel/room-availability"
          element={
            <Layout>
              <VisitorsContent />
            </Layout>
          }
        />
        <Route
          path="/visitors_hostel/mess-record"
          element={
            <Layout>
              <VisitorsContent />
            </Layout>
          }
        />
        <Route
          path="/visitors_hostel/inventory"
          element={
            <Layout>
              <VisitorsContent />
              <InventoryManagement />
            </Layout>
          }
        />
        <Route
          path="/visitors_hostel/account-statement"
          element={
            <Layout>
              <VisitorsContent />
            </Layout>
          }
        />
        <Route
          path="/visitors_hostel/rules"
          element={
            <Layout>
              <VisitorsContent />
              <VHGuidelinesPage />
            </Layout>
          }
        />
        <Route path="/accounts/login" element={<LoginPage />} />
        <Route path="/reset-password" element={<ForgotPassword />} />
      </Routes>
    </MantineProvider>
  );
}
// import React from "react";
// import { Box, Text, List, ThemeIcon, Divider } from "@mantine/core";
// import { IconCircleDot } from "@tabler/icons-react";

// function VHGuidelinesPage() {
//   return (
//     <Box
//       style={{
//         maxWidth: "1000px", // Increased width for wider display
//         margin: "20px auto",
//         backgroundColor: "white",
//         borderRadius: "8px",
//         padding: "20px",
//         boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
//       }}
//     >
//       {/* Main Heading */}
//       <Text
//         style={{
//           fontSize: "26px", // Slightly bigger heading
//           fontWeight: "bold",
//           textAlign: "center",
//           color: "#33475b", // Deep grayish blue, matching previous design choices
//           paddingBottom: "10px",
//         }}
//       >
//         Visitors' Hostel Users Norms and Guidelines
//       </Text>

//       {/* Section 1: Booking Procedure */}
//       <Box
//         style={{
//           backgroundColor: "#F8F8F8", // Lighter background for the box
//           padding: "20px",
//           borderRadius: "5px",
//           marginBottom: "20px",
//         }}
//       >
//         <Text
//           style={{
//             fontSize: "18px",
//             fontWeight: "bold",
//             color: "#37474F", // Darker gray for heading, fits with previous themes
//             marginBottom: "10px",
//           }}
//         >
//           (I) Booking Procedure and Confirmations:
//         </Text>

//         <List
//           spacing="md"
//           icon={
//             <ThemeIcon color="gray" size={16} radius="xl">
//               <IconCircleDot size={10} />
//             </ThemeIcon>
//           }
//         >
//           <List.Item>
//             For booking of normal facilities, duly filled in forms/e-forms, may
//             directly be submitted to Incharge VH through email/in hard copy.
//           </List.Item>
//           <List.Item>
//             The bookings are purely provisional and subject to availability.
//           </List.Item>
//           <List.Item>
//             Priority will be given to Institute guests, visitors coming for
//             academic activities.
//           </List.Item>
//           <List.Item>
//             Personal bookings (10% of total rooms) will be made on the basis of
//             availability. Such bookings will be provisional and will be
//             confirmed only 3 days before the actual arrival of the guest.
//           </List.Item>
//           <List.Item>
//             Students may be allotted accommodation in VH for their PARENTS/
//             SPOUSE, if the same is not available in Hostel guestrooms. Students
//             should get their requisition forms forwarded by respective warden.
//           </List.Item>
//           <List.Item>
//             Telephonic bookings/ cancellations of any of the VH facilities will
//             not be entertained, unless there is some emergency.
//           </List.Item>
//           <List.Item>
//             Confirmation / non-Acceptance of bookings will be informed through
//             e-mail or can be checked with VH office within 24 hours of
//             submission of the requisition form.
//           </List.Item>
//           <List.Item>
//             The room will be allotted on the condition that, if necessary, the
//             allottee would not have any objection in sharing accommodation with
//             other guests.
//           </List.Item>
//           <List.Item>
//             Guests of category C will be allowed to stay up to 5 (Five) days
//             only.
//           </List.Item>
//         </List>
//       </Box>

//       {/* Divider between sections */}
//       <Divider
//         style={{
//           marginBottom: "20px",
//           marginTop: "20px",
//           borderColor: "#37474F", // Match the divider color to the section title
//           borderWidth: "2px",
//         }}
//       />

//       {/* Section 2: Guest Specific Information */}
//       <Box
//         style={{
//           backgroundColor: "#F8F8F8", // Same light background for consistency
//           padding: "20px",
//           borderRadius: "5px",
//         }}
//       >
//         <Text
//           style={{
//             fontSize: "18px",
//             fontWeight: "bold",
//             color: "#37474F", // Dark grayish blue for consistency
//             marginBottom: "10px",
//           }}
//         >
//           (II) Guest Specific Information:
//         </Text>

//         <List
//           spacing="md"
//           icon={
//             <ThemeIcon color="gray" size={16} radius="xl">
//               <IconCircleDot size={10} />
//             </ThemeIcon>
//           }
//         >
//           <List.Item>Check-in Check-out facility: 24 Hours.</List.Item>
//           <List.Item>
//             Approval for the extended stay has to be obtained beforehand.
//           </List.Item>
//           <List.Item>
//             Meals can be booked at the VH Dining Hall: (Lunch by 09:00 Hrs and
//             Dinner by 14:00 Hrs)
//           </List.Item>
//         </List>
//       </Box>
//     </Box>
//   );
// }

// export default VHGuidelinesPage;

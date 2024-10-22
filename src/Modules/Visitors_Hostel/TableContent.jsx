import React from "react";
import { Button, Table } from "@mantine/core";
import styles from "./Styles.module.css";

function TableComponent() {
  const data = [
    {
      intender: "John Doe",
      bookingForm: "Form A",
      bookingTo: "2024-10-15",
      category: "Category 1",
      status: "Confirmed",
    },
    {
      intender: "Jane Smith",
      bookingForm: "Form B",
      bookingTo: "2024-10-16",
      category: "Category 2",
      status: "Pending",
    },
    {
      intender: "Alice Johnson",
      bookingForm: "Form C",
      bookingTo: "2024-10-17",
      category: "Category 3",
      status: "Cancelled",
    },
    {
      intender: "Bob Brown",
      bookingForm: "Form D",
      bookingTo: "2024-10-18",
      category: "Category 4",
      status: "Confirmed",
    },
    {
      intender: "Charlie Black",
      bookingForm: "Form E",
      bookingTo: "2024-10-19",
      category: "Category 5",
      status: "Pending",
    },
    {
      intender: "Diana White",
      bookingForm: "Form F",
      bookingTo: "2024-10-20",
      category: "Category 6",
      status: "Confirmed",
    },
  ];

  return (
    <div className={styles.container}>
      <Button className={styles.button}>Place Request</Button>
      <Table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.heading}>Intender</th>
            <th className={styles.heading}>Booking Form</th>
            <th className={styles.heading}>Booking To</th>
            <th className={styles.heading}>Category</th>
            <th className={styles.headingStatus}>Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.intender}</td>
              <td>{item.bookingForm}</td>
              <td>{item.bookingTo}</td>
              <td>{item.category}</td>
              <td className={styles.status}>{item.status}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default TableComponent;

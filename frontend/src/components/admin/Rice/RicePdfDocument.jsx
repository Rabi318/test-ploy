import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    padding: 30,
  },
  section: {
    marginBottom: 10,
  },
  header: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
    textDecoration: "underline",
  },
  subHeader: {
    fontSize: 14,
    marginBottom: 5,
  },
  table: {
    display: "table",
    width: "auto",
    margin: "auto",
  },
  tableRow: {
    flexDirection: "row",
  },
  tableCell: {
    border: "1px solid black",
    padding: 5,
    width: "50%",
    textAlign: "center",
  },
  tableHeader: {
    backgroundColor: "#f2f2f2",
    fontWeight: "bold",
  },
  companyDetails: {
    marginBottom: 15,
    padding: 10,
    border: "1px solid black",
    backgroundColor: "#DEE5D4",
    textAlign: "left",
    width: "48%",
  },
  customerDetails: {
    marginBottom: 15,
    padding: 10,
    border: "1px solid black",
    backgroundColor: "#F5EFFF",
    textAlign: "left",
    width: "48%",
  },
  sideBySide: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  horizontalLine: {
    borderTopWidth: 1,
    borderColor: "black",
    marginVertical: 10,
  },
  pricingSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  priceLabel: {
    width: "70%",
    textAlign: "right",
  },
  priceValue: {
    width: "30%",
    textAlign: "left",
    marginLeft: 5,
  },
});

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

// Create Document Component
const RicePdfDocument = ({ rice }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.header}>Rice Details</Text>

      {/* Side-by-side: Customer and Company Details */}
      <View style={styles.sideBySide}>
        {/* Customer Details */}
        <View style={styles.customerDetails}>
          <Text style={styles.subHeader}>
            Name: {rice.userId.firstName} {rice.userId.lastName}
          </Text>
          <Text style={styles.subHeader}>Mobile: {rice.userId.mobile}</Text>
          <Text style={styles.subHeader}>Village: {rice.userId.village}</Text>
          <Text style={styles.subHeader}>Rice Type: {rice.riceType.name}</Text>
          <Text style={styles.subHeader}>Created By: {rice.adminId.name}</Text>
          <Text style={styles.subHeader}>
            Created At: {formatDate(rice.createdAt)}
          </Text>
        </View>

        {/* Company Details */}
        <View style={styles.companyDetails}>
          <Text style={styles.subHeader}>Company: Aditya Enterprises</Text>
          <Text style={styles.subHeader}>Address: At/Po - Sankhachilla</Text>
          <Text style={styles.subHeader}>Dist: Jajpur</Text>
          <Text style={styles.subHeader}>Phone: 9348617318</Text>
          <Text style={styles.subHeader}>Email: infoaditya@gmail.com</Text>
          <Text style={styles.subHeader}>GST No: ERIAHDK3453N</Text>
        </View>
      </View>

      {/* Weights Table */}
      <View style={styles.section}>
        <View style={styles.table}>
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={styles.tableCell}>Sl No.</Text>
            <Text style={styles.tableCell}>Weight (kg)</Text>
          </View>

          {rice.weights.map((weightItem, index) => (
            <View key={weightItem._id} style={styles.tableRow}>
              <Text style={styles.tableCell}>{index + 1}</Text>
              <Text style={styles.tableCell}>{weightItem.weight}</Text>
            </View>
          ))}

          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>Total</Text>
            <Text style={styles.tableCell}>{rice.total} kg</Text>
          </View>
        </View>
      </View>

      {/* Pricing Section */}

      <View style={styles.pricingSection}>
        <Text style={styles.priceLabel}>Quintal Price:</Text>
        <Text style={styles.priceValue}>{rice.quintalPrice} INR</Text>
      </View>
      <View style={styles.pricingSection}>
        <Text style={styles.priceLabel}>Sack Price:</Text>
        <Text style={styles.priceValue}>{rice.sacksPrice} INR</Text>
      </View>
      <View style={styles.pricingSection}>
        <Text style={styles.priceLabel}>Subtotal Price:</Text>
        <Text style={styles.priceValue}>{rice.subFinalPrice} INR</Text>
      </View>

      {/* Horizontal Line */}
      <View style={styles.horizontalLine}></View>

      <View style={styles.pricingSection}>
        <Text style={styles.priceLabel}>Total Price:</Text>
        <Text style={styles.priceValue}>{rice.finalPrice} INR</Text>
      </View>
    </Page>
  </Document>
);

export default RicePdfDocument;

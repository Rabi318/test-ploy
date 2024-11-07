import React, { useEffect, useState } from "react"; // Add useState here
import Sidebar from "../../components/admin/Payment/Sidebar";
import Details from "../../components/admin/Payment/Details";
import axios from "axios";
import ReportDetails from "../../components/admin/Payment/ReportDetails";
import InvoiceDetails from "../../components/admin/Payment/InvoiceDetails";
import { FaChevronLeft } from "react-icons/fa";

const Payment = () => {
  const [isDetailViewActive, setIsDetailViewActive] = useState(false);
  const [isComingSoon, setIsComingSoon] = useState(false);
  const [selectedTab, setSelectedTab] = useState("Customers");
  const [selectedItem, setSelectedItem] = useState(null);
  const [customers, setCustomers] = useState([]);
  const [staffs, setStaffs] = useState([]);
  const [mill, setMill] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isReportActive, setIsReportActive] = useState(false);
  const [isInvoiceActive, setIsInvoiceActive] = useState(false);
  const [refreshCounter, setRefreshCounter] = useState(0);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("aditya-token");
      if (!token) {
        console.error("Token not found. Please login.");
        return;
      }
      // Set the headers with Authorization token
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const customersResponse = await axios.get(
        `${import.meta.env.VITE_API_URL}/user/transactions`,
        config
      );
      // console.log("Customers Response:", customersResponse.data);
      const fetchedCustomers = customersResponse.data.data || [];
      const fetchedStaffs = [];
      const fetchedMill = [];
      setCustomers(fetchedCustomers);

      setStaffs(fetchedStaffs);
      setMill(fetchedMill);
      setLoading(false);
    } catch (error) {
      console.log("Error fetching data:", error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [selectedTab]);

  useEffect(() => {
    // This will run whenever customers change
    if (customers.length > 0) {
      setSelectedItem(customers[0]); // Or another logic to set the selected item
    }
  }, [customers]);
  const handleTransactionComplete = async (isCompleted) => {
    if (isCompleted) {
      await fetchData();
    }
  };
  const data =
    selectedTab === "Customers"
      ? customers
      : selectedTab === "Staffs"
      ? staffs
      : mill;

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setIsDetailViewActive(true);
  };
  const handleCloseDetailView = () => {
    setSelectedItem(null);
    setIsDetailViewActive(false);
  };
  const handleCloseReport = () => {
    setIsReportActive(false);
  };
  const handleCloseInvoice = () => {
    setIsInvoiceActive(false);
  };
  return (
    <>
      {isComingSoon && <UnderConstruction />}
      {!isComingSoon && (
        <div className="flex flex-col md:flex-row h-[80vh] lg:h-[85vh]  overflow-hidden">
          {/* Sidebar section */}
          <div
            className={`${
              isDetailViewActive ? "hidden" : "block md:w-[35%] lg:w-[30%]"
            } md:block md:w-[35%] h-full lg:w-[30%] overflow-auto`}
          >
            <Sidebar
              items={data}
              selectedTab={selectedTab}
              setSelectedTab={setSelectedTab}
              onSelectItem={handleItemClick}
            />
          </div>
          {/* SupplierDetails or ReportDetails section */}
          <div
            className={`w-full ${
              isDetailViewActive
                ? "block"
                : "hidden md:block md:w-[65%] lg:w-[70%]"
            } md:w-[65%] lg:w-[70%] h-[100vh] overflow-auto relative`}
          >
            {!isReportActive && !isInvoiceActive ? (
              <Details
                item={selectedItem}
                selectedTab={selectedTab}
                onReportClick={() => setIsReportActive(true)}
                onInvoiceClick={() => setIsInvoiceActive(true)}
                fetchData={fetchData}
                onBackClick={handleCloseDetailView}
                onTransactionComplete={handleTransactionComplete}
              />
            ) : isReportActive ? (
              <ReportDetails item={selectedItem} onClose={handleCloseReport} />
            ) : (
              <InvoiceDetails
                item={selectedItem}
                onClose={handleCloseInvoice}
              />
            )}
            {/* Back button for smaller screens */}
            {isDetailViewActive && (
              <button
                className="md:hidden absolute top-12 left-8"
                onClick={handleCloseDetailView}
              >
                <FaChevronLeft />
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Payment;

import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { CiWheat } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Notifications = () => {
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState([]);
  const handleNotificationClick = (notification) => {
    setSelectedNotification(notification);
  };

  const handleDismissClick = (event) => {
    // Prevents the click event from propagating to parent elements
    event.stopPropagation();
    // Add any dismiss logic here if needed
  };

  const handleFetchNotifications = async () => {
    const token = localStorage.getItem("aditya-token");
    const config = {
      method: "get",
      url: `${import.meta.env.VITE_API_URL}/notification`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      setLoading(true);
      const response = await axios(config);
      setNotification(response.data?.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (error.response && error.response.status === 401) {
        toast.error("Unauthorized access. Please login again.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        });
      } else if (error.response && error.response.status === 403) {
        toast.error("You don't have permission to access this page.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        });
      } else {
        toast.error("Something went wrong. Please try again.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        });
      }
    }
  };
  useEffect(() => {
    handleFetchNotifications();
  }, []);
  const formatTime = (isoString) => {
    const now = currentTime; // Use the current time state
    const notificationDate = new Date(isoString);
    const differenceInMs = now - notificationDate;
    const differenceInMinutes = Math.floor(differenceInMs / (1000 * 60));
    const differenceInHours = Math.floor(differenceInMs / (1000 * 60 * 60));
    const differenceInDays = Math.floor(differenceInMs / (1000 * 60 * 60 * 24));

    if (differenceInMinutes < 60) {
      return `${differenceInMinutes}m ago`;
    } else if (differenceInHours < 24) {
      return `${differenceInHours}h ago`;
    } else if (differenceInDays === 1) {
      return "Yesterday";
    } else {
      return notificationDate.toLocaleDateString("en-GB"); // Format: DD-MM-YYYY
    }
  };
  // const notifications = [
  //   {
  //     id: 1,
  //     icon: "https://via.placeholder.com/30",
  //     title: "Dribbble",
  //     message: "Design UX liked your post",
  //     time: "2024-11-20T08:13:21.290Z",
  //     type: "user",
  //     isRead: false,
  //   },
  //   {
  //     id: 2,
  //     icon: "https://via.placeholder.com/30",
  //     title: "Obi-Wan",
  //     message: "Started following you",
  //     time: "2024-11-20T08:13:49.738Z",
  //     type: "rice",
  //     isRead: false,
  //   },
  //   {
  //     id: 3,
  //     icon: "https://via.placeholder.com/30",
  //     title: "Red Sox",
  //     message: "Boston Wins 10-7 on a ",
  //     time: "2024-11-20T08:14:08.378Z",
  //     type: "user",
  //     isRead: true,
  //   },
  //   {
  //     id: 4,
  //     title: "user add",
  //     message: "asjkluiweasdoijio",
  //     type: "rice",
  //     time: "2024-11-20T08:14:26.917Z",
  //     isRead: true,
  //   },
  // ];
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update current time every 60 seconds

    return () => clearInterval(interval); // Clean up interval on component unmount
  }, []);
  return (
    <div className="p-4  lg-max-w-md  m-2   bg-white rounded-lg shadow-md dark:bg-gray-800 ">
      {notification.map((notification) => (
        <div
          key={notification._id}
          className={`flex items-center justify-between border-b border-gray-200 dark:border-gray-700 py-3 space-y-3 sm:space-y-0 sm:flex-row sm:py-4 rounded-md cursor-pointer ${
            notification.isRead
              ? "bg-white dark:bg-gray-800 "
              : " bg-gray-200 dark:bg-gray-700 "
          }`}
          onClick={() => handleNotificationClick(notification)}
        >
          <div className="flex items-center w-full sm:w-auto">
            <div
              className={`rounded-full w-9 h-9 flex items-center justify-center mr-3 ${
                notification.type === "user" ? "bg-blue-400" : "bg-red-400"
              }`}
            >
              {notification.type === "user" ? (
                <FaUser className="text-white" />
              ) : (
                <CiWheat className="text-white" />
              )}
            </div>
            <div className="flex-1">
              <p className="text-gray-800 dark:text-gray-100 font-medium text-sm sm:text-base">
                {notification.heading}
              </p>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 truncate">
                {notification.message}
              </p>
            </div>
          </div>
          <div className="flex items-center text-gray-400 text-xs sm:text-sm">
            {formatTime(notification.createdAt)}
          </div>
          <button
            className="ml-2 text-gray-400 hover:text-red-700 dark:hover:text-red-700"
            aria-label="Dismiss notification"
            onClick={handleDismissClick}
          >
            <RxCross2 className="text-red-500" />
          </button>
        </div>
      ))}
      {/* Pop-up panel */}
      {selectedNotification && (
        <div
          className="fixed top-0 right-0 h-screen w-[50vw] bg-white dark:bg-gray-800 shadow-lg transition-transform transform lg:translate-x-0 lg:w-[20vw] rounded-lg lg:h-full lg:shadow-lg"
          style={{
            transform: selectedNotification
              ? "translateX(0)"
              : "translateX(100%)",
            transition: "transform 0.3s ease-in-out",
          }}
        >
          <div className="p-4">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              onClick={() => setSelectedNotification(null)}
              aria-label="Close pop-up"
            >
              <RxCross2 className="text-gray-500" />
            </button>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
              {selectedNotification.heading}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {selectedNotification.message}
            </p>
            <p className="text-gray-500 text-sm mt-2">
              {formatTime(selectedNotification.createdAt)}
            </p>
            {selectedNotification.type === "user" && (
              <div className="mt-4">
                <p className="dark:text-gray-200">
                  <span className="font-semibold text-gray-500">Name:</span>{" "}
                  <span className="text-blue-500">
                    {selectedNotification.userId.firstName}{" "}
                    {selectedNotification.userId.lastName}
                  </span>
                </p>
                <p className="dark:text-gray-200">
                  <span className="font-semibold text-gray-500">Mobile:</span>{" "}
                  <span className="text-blue-500">
                    {selectedNotification.userId.mobile}
                  </span>
                </p>
                <p className="dark:text-gray-200">
                  <span className="font-semibold text-gray-500">Village:</span>{" "}
                  <span className="text-blue-500">
                    {selectedNotification.userId.village}
                  </span>
                </p>
              </div>
            )}
            {selectedNotification.type === "rice" && (
              <div className="mt-4">
                <p className="dark:text-gray-200">
                  <span className="font-semibold text-gray-500">
                    User Name:
                  </span>{" "}
                  <span className="text-blue-500">
                    {selectedNotification.riceId.userId.firstName}{" "}
                    {selectedNotification.riceId.userId.lastName}
                  </span>
                </p>
                <p className="dark:text-gray-200">
                  <span className="font-semibold text-gray-500">Mobile:</span>{" "}
                  <span className="text-blue-500">
                    {selectedNotification.riceId.userId.mobile}
                  </span>
                </p>
                <p className="dark:text-gray-200">
                  <span className="font-semibold text-gray-500">Village:</span>{" "}
                  <span className="text-blue-500">
                    {selectedNotification.riceId.userId.village}
                  </span>
                </p>
                <div className="mt-4">
                  <p className="dark:text-gray-200">
                    <span className="font-semibold text-gray-500">
                      Rice Type:
                    </span>{" "}
                    <span className="text-blue-500">
                      {selectedNotification.riceId.riceType.name}
                    </span>
                  </p>
                  <p className="dark:text-gray-200">
                    <span className="font-semibold text-gray-500">Total:</span>{" "}
                    <span className="text-blue-500">
                      {selectedNotification.riceId.total}
                    </span>
                  </p>
                  <p className="dark:text-gray-200">
                    <span className="font-semibold text-gray-500">
                      Plastic sacks:
                    </span>{" "}
                    <span className="text-blue-500">
                      {selectedNotification.riceId.plasticSacks ? "Yes" : "No"}
                    </span>
                  </p>
                </div>
                <div className="mt-4">
                  <p className="dark:text-gray-200">
                    <span className="font-semibold text-gray-500">
                      Added By:
                    </span>{" "}
                    <span className="text-green-500">
                      {selectedNotification.riceId.adminId.name}
                    </span>
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Notifications;

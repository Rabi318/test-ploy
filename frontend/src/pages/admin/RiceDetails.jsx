import React from "react";
import { useLocation, useParams } from "react-router-dom";

const RiceDetails = () => {
  const { state } = useLocation(); // Access the state passed via navigate
  const { userId } = useParams();
  const userDetails = state?.userDetails;

  if (!userDetails) {
    return <div>No user data available.</div>;
  }
  return (
    <div>
      <h1>
        {userDetails.userId.firstName} {userDetails.userId.lastName}
      </h1>
      <p>Village: {userDetails.userId.village}</p>
      <p>Mobile: {userDetails.userId.mobile}</p>
      <p>Admin: {userDetails.adminId.name}</p>
    </div>
  );
};

export default RiceDetails;

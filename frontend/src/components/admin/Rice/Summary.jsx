import React from "react";

const Summary = ({ packets }) => {
  const totalPackets = packets.length;
  const totalWeight = packets.reduce(
    (sum, packet) => sum + Number(packet.weight || 0),
    0
  );

  return (
    <div className="summary bg-gray-100 p-4 rounded-lg mt-2">
      <h2 className="text-lg font-semibold">Summary</h2>
      <p>Total Packets: {totalPackets}</p>
      <p>Total Weight: {totalWeight} kg</p>
    </div>
  );
};

export default Summary;

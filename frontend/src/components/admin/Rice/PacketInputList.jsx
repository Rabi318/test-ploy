import React, { useState } from "react";
import PacketItem from "./PacketItem";

const PacketInputList = ({ onSummaryUpdate, riceType, plasticSacks }) => {
  const [packets, setPackets] = useState([{ id: 1, weight: "" }]);
  const [error, setError] = useState("");

  const handleAddPacket = () => {
    const emptyWeights = packets.some((packet) => !packet.weight);
    if (!riceType) {
      setError("Please select rice type before adding a packet."); // Set the error message
      setTimeout(() => setError(""), 3000);
      return;
    }

    if (!plasticSacks) {
      setError("Please select plastic sacks before adding a packet."); // Set the error message
      setTimeout(() => setError(""), 3000);
      return;
    }

    if (emptyWeights) {
      setError("Please add weight to all packets before adding a new one."); // Set the error message
      setTimeout(() => setError(""), 3000);
      return;
    }
    setPackets([...packets, { id: packets.length + 1, weight: "" }]);
    setError("");
  };

  const handleWeightChange = (id, weight) => {
    const updatedPackets = packets.map((packet) =>
      packet.id === id ? { ...packet, weight } : packet
    );
    setPackets(updatedPackets);
    onSummaryUpdate(updatedPackets); // Call the summary update with the new packets
  };

  const handleDeletePacket = (id) => {
    if (packets.length <= 1) {
      setError("You must have at least one packet."); // Set an error message
      setTimeout(() => setError(""), 3000);
      return;
    }
    const updatedPackets = packets.filter((packet) => packet.id !== id);
    setPackets(updatedPackets);
    onSummaryUpdate(updatedPackets); // Update summary after deletion
    setError("");
  };

  return (
    <div>
      {packets.map((packet) => (
        <PacketItem
          key={packet.id}
          packet={packet}
          onWeightChange={handleWeightChange}
          onDeletePacket={handleDeletePacket}
        />
      ))}
      {error && <p className="text-red-500">{error}</p>}
      <button
        type="button"
        onClick={handleAddPacket}
        className="mt-2 bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded"
      >
        Add Packet
      </button>
    </div>
  );
};

export default PacketInputList;

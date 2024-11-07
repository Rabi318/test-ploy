import React from "react";

const PacketItem = ({ packet, onWeightChange, onDeletePacket }) => {
  return (
    <div className="packet-item flex items-center mb-2">
      <span className="mr-2">Packet {packet.id}:</span>
      <input
        type="number"
        placeholder="Enter weight"
        value={packet.weight}
        onChange={(e) => onWeightChange(packet.id, e.target.value)}
        className="p-2 border border-gray-300 rounded-lg mr-2 w-24"
      />
      <button
        onClick={() => onDeletePacket(packet.id)}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
      >
        Delete
      </button>
    </div>
  );
};

export default PacketItem;

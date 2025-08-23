import React, { useEffect, useState } from "react";

const StatusView: React.FC = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const updateStatus = () => {
      const online = navigator.onLine;
      setIsOnline(online);

      if (window.electronAPI) {
        window.electronAPI.sendOnlineStatus(online);
      }
    };

    window.addEventListener("online", updateStatus);
    window.addEventListener("offline", updateStatus);

    updateStatus();

    return () => {
      window.removeEventListener("online", updateStatus);
      window.removeEventListener("offline", updateStatus);
    };
  }, []);

  return (
    <div>
      <h1 className="h-2 w-7">{isOnline ? "🟢 You are Online" : "🔴 You are Offline"}</h1>
    </div>
  );
};

export default StatusView;

import { useEffect } from "react";

const Notification = ({ notification, onDelete }) => {
  useEffect(() => {
    if (notification) {
      setTimeout(onDelete, 5000);
    }
  }, [notification]);

  if (!notification) return null;

  return (
    <div className="notification">
      <p>{notification.text}</p>
    </div>
  );
};

export default Notification;

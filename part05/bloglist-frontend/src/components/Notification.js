import { useEffect } from "react";
import PropTypes from "prop-types";

const Notification = ({ notification, onDelete }) => {
  useEffect(() => {
    if (notification) {
      setTimeout(onDelete, 5000);
    }
  }, [notification]);

  if (!notification) return null;

  return (
    <div className="notification">
      <p className="notification-text">{notification.text}</p>
    </div>
  );
};

Notification.propTypes = {
  notification: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Notification;

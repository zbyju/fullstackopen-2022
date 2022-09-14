const Notification = ({ notification }) => {
  console.log(notification);
  if (!notification) return null;

  return (
    <div className={"notification " + notification.type}>
      <p>{notification.text}</p>
    </div>
  );
};

export default Notification;

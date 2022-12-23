import { connect } from "react-redux";

const Notification = ({ notification }) => {
  if (notification === null) return null;
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
  };
  return <div style={style}>{notification}</div>;
};

const mapStateToProps = (state) => {
  return {
    notification: state.notification,
  };
};

const ConnectedNotification = connect(mapStateToProps)(Notification);
export default ConnectedNotification;

import { connect } from "react-redux";

const Notification = (props) => {
  console.log("notification: ", props.notification);

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
  };
  return <div style={style}>{props.notification}</div>;
};

const getNotifications = (state) => {
  return {
    notification: state.notification,
  };
};

const connectedNotification = connect(getNotifications)(Notification);

export default connectedNotification;

import TimeTrackerTable from "../components/lists/timeTrackerTable/TimeTrackerTable";
import withAuthorization from "../components/sessions/withAuthorization";

import { connect } from "react-redux";
import { compose } from "recompose";
import { setTime } from "../actions/timeActions";
import { setLoading } from "../actions/utilities";

const mapStateToProps = state => {
  return {
    authUser: state.sessionState.authUser,
    timeStore: state.timeTrackerState.userTime
  };
};

const authCondition = authUser => !!authUser;

const mapDispatchToProps = dispatch => {
  return {
    onSetTime: time => dispatch(setTime(time)),
    setLoader: time => dispatch(setLoading(time)),
    toggleLoading: status => {
      dispatch(setLoading(status));
    }
  };
};

export default compose(
  withAuthorization(authCondition),
  connect(mapStateToProps, mapDispatchToProps)
)(TimeTrackerTable);

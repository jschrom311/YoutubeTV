import React from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import {fetchProtectedData} from '../actions/protected-data';
import {Route, withRouter} from 'react-router-dom';
import { Switch} from 'react-router-dom';
import { setAuthToken } from '../actions/auth';
import Home from '../containers/HomePage'
import Room from '../containers/RoomPage'
import NotFound from '../components/NotFound'

export class Dashboard extends React.Component {
    componentDidMount() {
        if (!this.props.loggedIn) {
            return;
        }
        this.props.dispatch(fetchProtectedData());
    }

    render() {
        // Only visible to logged in users
        if (!this.props.loggedIn) {
            return <Redirect to="/" />;
        }
        /*if(this.props.loading){
            return (
              <div>Loading</div>
            )
          }*/
        return (
            <div className="dashboard">
                <br />
                <div className="dashboard-username">
                    Email: {this.props.email}
                </div>
                <div className="dashboard-protected-data">
                    Protected data: {this.props.protectedData}
                </div>
                <br />
                <Link to="/add">Add Entry</Link>
                <Home />
            </div>
        );
    }
}

const mapStateToProps = state => {
    const {currentUser} = state.auth;
    console.log(currentUser);
    return {
        loggedIn: currentUser !== null,
        email: currentUser ? state.auth.currentUser.email : '',
        protectedData: state.protectedData.data,
        loading: state.protectedData.loading,
    };
};

export default connect(mapStateToProps)(Dashboard);

import React, { Component } from "react";
import { withRouter } from 'react-router'
import { Spin } from 'antd';
import './Callback.css';
import { currentUser, setCurrentUser } from "../../components/auth/auth-provider";
import history from '../../history';
import API from "../../components/api/spotify-api";


class Callback extends Component {

    state = {
        loading: false,
    }

    async componentDidMount() {

        try {
               
            const code = this.props.location.search.replace('?code=', '');
            const api = new API();
            debugger;
            await api.spotify.connect(code);
            debugger;
            const user = currentUser();
            user.hasSpotify = true;
            setCurrentUser(user);
        } catch (error) {
            alert('An error ocurred while connect with Spotify. Please, try again');
        }
        history.push(`/dashboard`);
        history.go();
    }

    render() {

        return (
            <div className="contentSpin">
                 <Spin className="callbackSpin" size="large" />
                 <p>Loading, wait...</p>
            </div >
        );
    }
}

export default withRouter(Callback);
import {
  Component
} from 'react';
import {
  API_PATH
} from '../../firebase/firebase';
import {
  currentToken
} from '../auth/auth-provider';


export default class API extends Component {

  state = {
    token: '',
  }

  spotify = undefined;

  constructor(props) {
    super(props);
    this.state.token = currentToken();
    this.spotify = new Spotify();
  }
}


class Spotify extends Component {

  state = {
    token: '',
  }

  constructor(props) {
    super(props);
    this.state.token = currentToken();
  }

  /**
   * Authorize the app on spotify.
   * @param  {[string]} code [Put]
   */
  connect(code) {
    return new Promise((resolve, reject) => {
      const url = API_PATH + `spotify/connect`;
      fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${this.state.token}`,
            'code': code,
          },
        }).then((response) => response.json())
        .then((responseData) => {
          if (responseData.code === 200) {
            resolve(responseData);
          } else {
            reject(responseData);
          }
        })
        .catch(err => {
          debugger;
          console.log(err);
          reject({});
        });
    });
  }

  /**
   * Get all the user's public playlists
   */
  getPlayList() {
    return new Promise((resolve, reject) => {
      const url = API_PATH + `spotify/playlists`;
      fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${this.state.token}`,
          },
        }).then((response) => response.json())
        .then((responseData) => {
          if (responseData.code === 200) {
            resolve(responseData);
          } else {
            reject(responseData);
          }
        })
        .catch(err => {
          debugger;
          console.log(err);
          reject({});
        });
    });
  }

  /**
   * returns all tracks from the playlist .
   * @param  {[string]} id [Playlist id]
   */
  getTracks(id) {
    return new Promise((resolve, reject) => {
      const url = API_PATH + `spotify/tracks`;
      fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${this.state.token}`,
            'id': id,
          },
        }).then((response) => response.json())
        .then((responseData) => {
          if (responseData.code === 200) {
            resolve(responseData);
          } else {
            reject(responseData);
          }
        })
        .catch(err => {
          debugger;
          console.log(err);
          reject({});
        });
    });
  }
}
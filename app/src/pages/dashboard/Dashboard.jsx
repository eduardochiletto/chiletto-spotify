import React, { Component } from "react";
import { withRouter } from 'react-router'
import { Menu, Icon, Button, Spin, Card, Modal, List, Typography } from 'antd';
import './Dashboard.css';
import { logout } from "../../components/auth/auth-provider";
import history from '../../history';
import { currentUser } from "../../components/auth/auth-provider";
import API from "../../components/api/spotify-api";

const { SubMenu } = Menu;
const { Meta } = Card;
const { Title } = Typography;

class Dashboard extends Component {

    state = {
        loading: true,
        loadingPage: true,
        showModal: false,
        showTracks: false,
        user: {
            name: '',
            email: '',
            hasSpotify: undefined,
        },
        playLists: [],
        tracks: [],
        playListName: ''
    }

    constructor(props) {
        super(props);
        this.logoutClick = this.logoutClick.bind(this);
        this.spotifyConnect = this.spotifyConnect.bind(this);
        this.handleModalOk = this.handleModalOk.bind(this);
        this.handleModalCancel = this.handleModalCancel.bind(this);
        this.playListClick = this.playListClick.bind(this);
    }

    async componentDidMount() {
        this.setState({ loading: true });
        const user = currentUser();
        const playLists = [];
        try {
            if (user.hasSpotify) {
                const api = new API();
                const res = await api.spotify.getPlayList();
                for (let index = 0; index < res.playLists.length; index++) {
                    const playList = res.playLists[index];
                    const item = {
                        id: playList.id,
                        title: `${playList.name}`,
                        description: `${playList.tracks.total} tracks`,
                        mosaic: playList.images[2].url, // Heigth: 60
                    }
                    playLists.push(item);

                }


            }

        } catch (error) {

        }


        this.setState({ user, playLists, loading: false, loadingPage: false });
    }

    spotifyConnect() {
        this.setState({ showModal: true });
    }

    handleModalOk() {
        this.setState({ showModal: false });

        history.push(`/spotify/connect`);
        history.go();
    }

    handleModalCancel() {
        this.setState({ showModal: false, showTracks: false });
    }

    async playListClick(record) {
        try {
            this.setState({ loading: true });
            const api = new API();
            const res = await api.spotify.getTracks(record.id);
            const tracks = [];

            for (let index = 0; index < res.tracks.length; index++) {
                const track = res.tracks[index].track;
                const item = {
                    id: track.id,
                    title: `${track.name}`,
                    description: track.artists[0].name,
                    mosaic: track.album.images[2].url, // Heigth: 60
                }

                tracks.push(item);

            }
            this.setState({ showTracks: true, playListName: record.title, tracks, loading: false });

        } catch (error) {

        }
    }

    logoutClick() {
        this.setState({ loading: true });
        setTimeout(() => {
            logout();
            history.push(`/login`);
            history.go();
        }, 500);
    }

    render() {
        const userName = this.state.user.name ? this.state.user.name : this.state.user.email;
        const text = this.state.loadingPage ? 'Loading your data, wait... ' : `Welcome, ${userName}`;
        return (
            <div>

                <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">
                    <Menu.Item key="home">
                        <Icon type="home" />
                        {text}
                    </Menu.Item>
                    <SubMenu style={{float: 'right'}}
                        title={
                            <span className="submenu-title-wrapper">
                                <Icon type="setting" />
                            </span>
                        }
                    >
                        <Menu.Item key="setting:1" onClick={this.logoutClick}>Logout</Menu.Item>
                    </SubMenu>
                </Menu>

                {this.state.loading ?
                    <div className="contentSpin">
                        <Spin className="dashboardSpin" size="large" />
                        <p>Loading, wait...</p>
                    </div >
                    : ''}


                <div className="alCenter">
                    {this.state.user.hasSpotify === false ?
                        <Card
                            style={{ width: 240 }}
                            cover={<img alt="example" src="https://image.flaticon.com/icons/png/512/2111/2111624.png" />}
                        >
                            <Meta title="Spotify" description="Hey, Connect your account on Spotify" />

                            <Button
                                className="spotifyButton"
                                disabled={this.state.loading}
                                onClick={this.spotifyConnect}>
                                Connect
                            </Button>

                        </Card>
                        : ''}

                    {this.state.user.hasSpotify === true && !this.state.loading ?

                        <div className="playListItems">
                            <Title className="title">Playlists</Title>

                            <List
                                itemLayout="horizontal"
                                dataSource={this.state.playLists}
                                renderItem={item => (
                                    <List.Item>
                                        <List.Item.Meta
                                            className="playlist"
                                            avatar={<img className="mosaic" src={item.mosaic} />}
                                            title={item.title}
                                            description={item.description}
                                            onClick={() => this.playListClick(item)}
                                        />
                                    </List.Item>
                                )}
                            />
                        </div>

                        : ''}
                </div>

                <Modal
                    title="Warning"
                    visible={this.state.showModal}
                    onOk={this.handleModalOk}
                    onCancel={this.handleModalCancel}
                    closable={true}
                >
                    <p>You will be redirected to Spotify's website.</p>
                </Modal>


                <Modal
                    title={`Tracks from ${this.state.playListName}`}
                    visible={this.state.showTracks}
                    onOk={this.handleModalCancel}
                    onCancel={this.handleModalCancel}
                    cancelButtonProps={{ style: { display: 'none' } }}
                    closable={true}
                    close
                >

                    <List
                        itemLayout="horizontal"
                        dataSource={this.state.tracks}
                        renderItem={item => (
                            <List.Item>
                                <List.Item.Meta
                                    avatar={<img className="mosaic" src={item.mosaic} />}
                                    title={item.title}
                                    description={item.description}
                                />
                            </List.Item>
                        )}
                    />


                </Modal>


            </div >
        );
    }
}

export default withRouter(Dashboard);
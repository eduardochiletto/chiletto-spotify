import React from 'react';
import "antd/dist/antd.css";
import { Form, Input, Button, Icon, Spin, message } from 'antd';
import './Login.css';
import { auth, redirectJustIfUserIsAuthenticated, redefinePassword, createUser } from './LoginF'
import history from '../../history';

const KEY = 'messagekey';

class Login extends React.Component {

    state = {
        passType: 'password',
        passClass: 'zmdi zmdi-eye',
        loading: false,
        user: {
            email: '',
            password: '',
        }
    }

    constructor(props) {
        super(props);
        this.auth = auth.bind(this);
        this.redirectJustIfUserIsAuthenticated = redirectJustIfUserIsAuthenticated.bind(this);
        this.createAccount = this.createAccount.bind(this);
        this.resetPasswordClick = this.resetPasswordClick.bind(this);
        this.inputEmailChange = this.inputEmailChange.bind(this);
        this.inputPasswordChange = this.inputPasswordChange.bind(this);
        this.redirectJustIfUserIsAuthenticated();
    };

    async createAccount() {
        if (!this.state.user.email.trim() || !this.state.user.password.trim()) {
            message.error({ key: KEY, content: 'Please, input your email and password' });
            return;
        }

        let resp = false;
        this.setState({ loading: true });

        try {
            resp = await createUser(this.state.user.email.trim(), this.state.user.password.trim());
            message.info({ key: KEY, content: resp.message });
        } catch (error) {
            debugger;
            resp = false;
            message.error({ key: KEY, content: error && error.message ? error.message : 'Error. Try again' });
        }
        this.setState({ loading: false });
    }

    inputEmailChange(obj) {
        const user = this.state.user;
        user.email = obj.target.value;
        this.setState({ user });
    }

    inputPasswordChange(obj) {
        const user = this.state.user;
        user.password = obj.target.value;
        this.setState({ user });
    }

    resetPasswordClick() {
        redefinePassword();
    }

    handleSubmit = e => {
        e.preventDefault();

        this.props.form.validateFieldsAndScroll(async (err, values) => {
            if (err) {
                return;
            }
            let isOk = false;
            this.setState({ loading: true });

            try {
                isOk = await auth(values.username, values.password);
            } catch (error) {
                isOk = false;
                let msg = 'Error. Try again';
                if (error) {
                    msg = error.message ? error.message : error.error;
                }
                message.error({ key: KEY, content: msg });
            }

            if (isOk) {
                history.push(`/dashboard`);
                history.go();
            } else {
                this.setState({ loading: false });
            }

        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="bodyLogin">
                <div className="centerLoginAdmin">
                    <h1 className="titleLoginH1Admin">Chiletto</h1>
                    <h6 className="titleLoginH6Admin">See your public playlists on Spotify</h6>
                    {!this.state.loading ?

                        <Form

                            onSubmit={this.handleSubmit}
                            className="login-form-admin"
                        >
                            <Form.Item>
                                {getFieldDecorator('username', {
                                    initialValue: this.state.user.email,
                                    rules: [{ required: true, message: 'Type your email' }],
                                })(
                                    <Input className="inputLogin"
                                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder="Email"
                                        onChange={this.inputEmailChange}
                                    />,
                                )}
                            </Form.Item>
                            <Form.Item>
                                {getFieldDecorator('password', {
                                    rules: [{ required: true, message: 'Type your password' }],
                                    initialValue: this.state.user.password,
                                })(
                                    <Input.Password
                                        className="inputLogin"
                                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        type="password"
                                        placeholder="Senha"
                                        onChange={this.inputPasswordChange}
                                    />,
                                )}
                            </Form.Item>
                            <Form.Item>

                                <Button
                                    type="primary"
                                    disabled={this.state.loading}
                                    htmlType="submit"
                                    className="btnLogin login-form-button-admin">
                                    Login
                                </Button>

                                <p className="or">or</p>

                                <Button
                                    disabled={this.state.loading}
                                    className="btnLogin login-form-button-admin new-user"
                                    onClick={this.createAccount}>
                                    Create new account
                                </Button>

                            </Form.Item>

                            <Form.Item>
                                <a className="forgotPasswordLogin" href="# " onClick={this.resetPasswordClick}>Forgot password</a>
                            </Form.Item>
                        </Form>
                        : <Spin className="loginSpin" size="large" />}
                </div>
            </div>
        );
    }


}

export default Form.create()(Login);

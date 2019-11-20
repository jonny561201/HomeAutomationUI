import React from 'react';
import Header from '../components/header/Header';
import './Settings.css'
import { Switch, Divider, TextField } from '@material-ui/core';


export default class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.toggleEditMode = this.toggleEditMode.bind(this);
        this.state = {
            city: null,
            isEditMode: false,
            unit: null,
        }
    }

    componentDidMount = async () => {
        const userId = this.props.apiRequests.userId;
        const actual = await this.props.apiRequests.getUserPreferences(userId);
        this.setState({ city: actual.city, unit: actual.unit });
    }

    toggleEditMode = () => {
        this.setState({ isEditMode: !this.state.isEditMode })
    }

    render() {
        return (
            <div>
                <div className="settings-header">
                    <Header />
                </div>
                <div className="settings-body">
                    {this.state.isEditMode ?
                        <div className="settings-wrapper">
                            <div className="settings-group">
                                <h2>Temperature</h2>
                                <Divider />
                                <div className="settings-row">
                                    <Switch className="switch" color="primary" />
                                    <p className="settings-text">Fahrenheit</p>
                                </div>
                                <div className="settings-row">
                                    <TextField variant="outlined" label="City" />
                                </div>
                            </div>
                            <Divider />
                            <button>Save</button>
                        </div>
                        : <div className="settings-wrapper">
                            <div className="settings-group settings-text">
                                <h2>Temperature</h2>
                            </div>
                            <Divider />
                            <div className="settings-row">
                                <p className="settings-text unit">Unit:</p>
                                <p className="settings-text unit">{this.state.unit}</p>
                            </div>
                            <div className="settings-row">
                                <p className="settings-text city">City:</p>
                                <p className="settings-text city">{this.state.city}</p>
                            </div>
                            <button onClick={this.toggleEditMode}>Edit</button>
                        </div>
                    }
                </div>
            </div>
        )
    };
}
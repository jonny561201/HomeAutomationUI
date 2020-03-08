import React from 'react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import LightingIcon from '../../resources/panelIcons/LightingIcon.jpg';
import { getLightGroups } from '../../utilities/RestApi';
import './LightingPanel.css'
import { ExpansionPanelDetails, ExpansionPanel, Typography, ExpansionPanelSummary, Divider } from '@material-ui/core';
import LightSwitch from '../controls/LightSwitch';


export default class LightingPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            groups: null,
        };
    }
    componentDidMount = async () => {
        this.setState({ groups: await getLightGroups() });
    };

    renderGroups = () => {
        if (this.state.groups) {
            return this.state.groups.map(group => <LightSwitch data={group} />)
        } else {
            return <LightSwitch data={{ on: true, groupId: '1', groupName: "Test", brightness: 233, lights: [{ lightId: "1", lightName: "table lamp", on: false }] }} />
        }
    };


    render() {
        return (
            <div>
                <ExpansionPanel className="lighting-panel">
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <div className="summary">
                            <div>
                                <img alt="lighting" className="logo-image" src={LightingIcon} />
                            </div>
                            <Typography className="panel-text">Lighting</Typography>
                        </div>
                    </ExpansionPanelSummary>
                    <Divider />
                    <ExpansionPanelDetails className="center">
                        <div>
                            {this.renderGroups()}
                        </div>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </div>
        );
    }
}
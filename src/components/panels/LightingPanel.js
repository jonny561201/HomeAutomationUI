import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../../state/Store';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import LightingIcon from '../../resources/panelIcons/LightingIcon.jpg';
import { getLightGroups } from '../../utilities/RestApi';
import './LightingPanel.css'
import { ExpansionPanelDetails, ExpansionPanel, Typography, ExpansionPanelSummary, Divider } from '@material-ui/core';
import LightSwitch from '../controls/LightSwitch';


export default function LightingPanel() {
    const [groups, setGroups] = useState(null);
    const [, dispatch] = useContext(Context);

    useEffect(() => {
        const getData = async () => {
            const groups = await getLightGroups();
            setGroups(groups);
            //May not need the lights stored in memory
            dispatch({type: 'SET_ALL_USER_LIGHTS', payload: groups.map(x => x.lights).flat(1)});
            dispatch({type: 'SET_USER_LIGHT_GROUPS', payload: groups.map(({ lights, ...item }) => item)});
        };
        getData();
    }, []);

    const renderGroups = () => {
        if (groups && groups.length) {
            return groups.map(group => <LightSwitch key={`switch-${group.groupId}`} data={group} />)
        }
        return <p className="lighting-text">No Light Groups were found</p>
    };

    return (
        <div>
            <ExpansionPanel data-testid={"lighting-panel"} className="lighting-panel">
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
                        {renderGroups()}
                    </div>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </div>
    );
}
import React, { useContext, useState } from 'react';
import { Context } from '../../state/Store';
import CreateLightActivity from '../segments/CreateLightActivity';
import CreateHvacActivity from '../segments/CreateHvacActivity';
import { Delete } from '@material-ui/icons';
import { ExpansionPanelDetails, ExpansionPanel, FormControl, MenuItem, Select, InputLabel, Divider } from '@material-ui/core';


export default function LightAlarmEditPanel(props) {
    const [state,] = useContext(Context);
    const [type, setType] = useState('');
    const [opened, setOpened] = useState(true);

    const updateSelectedType = (item) => {
        setType(state.taskTypes.find(x => x === item.target.value));
    }

    const selectedComponents = () => {
        if (type === 'hvac') {
            return <CreateHvacActivity type={type} cancel={props.cancelNewTask} save={props.saveNewTask} />
        } else if (type !== '') {
            return <CreateLightActivity type={type} cancel={props.cancelNewTask} save={props.saveNewTask} />
        } else {
            return (
                <div className="tasks-button-group text">
                    <div className="task-button-container" onClick={() => props.cancelNewTask()}>
                        <Delete className="task-button task-delete" />
                        <p className="task-delete">Cancel</p>
                    </div>
                </div>
            )
        }
    }

    return (
        <>
            <ExpansionPanel className="task-panel" defaultExpanded={opened} expanded={opened} onChange={() => { setOpened(!opened) }}>
                <ExpansionPanelDetails className="center">
                    <div className="settings-row">
                        <FormControl className="light-alarm-component task-room-picker-row" variant="outlined">
                            <InputLabel id="light-group-dropdown">Task Type</InputLabel>
                            <Select value={type} onChange={updateSelectedType} label="Task Type" >
                                {state.taskTypes.map(x => (
                                    <MenuItem key={x} value={x}>
                                        {x}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                    {selectedComponents()}
                    <Divider />
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </>
    )
}
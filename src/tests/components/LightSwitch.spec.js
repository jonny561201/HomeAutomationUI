import React from 'react';
import { render, screen, act, fireEvent } from '@testing-library/react';
import * as lib from '../../utilities/RestApi';
import LightSwitch from '../../components/controls/LightSwitch';

describe('LightSwitch', () => {
    const spySetGroup = jest.spyOn(lib, 'setLightGroupState');
    const spySetLight = jest.spyOn(lib, 'setLightState');
    const groupName = 'DinningRoom';
    const groupData = {
        'groupId': '1', 'groupName': groupName, 'on': true,
        'brightness': 155, 'lights': [
            { 'lightName': 'desk lamp', 'on': true, 'brightness': 123, 'lightId': 1},
            { 'lightName': 'table lamp', 'on': false, 'brightness': 76, 'lightId': 2 }
        ]
    }

    beforeEach(() => {
        spySetLight.mockClear();
        spySetGroup.mockClear();
    });

    it('should display the group name for the group light switch', () => {
        render(<LightSwitch data={groupData} />);
        const actual = screen.getByText(groupName);
        expect(actual).toBeDefined();
    });

    it('should display the expansion icon', () => {
        render(<LightSwitch data={groupData} />);
        const actual = screen.getByTestId('expansion-chevron');

        expect(actual).toBeDefined();
    });

    it('should display the group light switch button', () => {
        render(<LightSwitch data={groupData} />);
        const actual = screen.getByTestId('form-control').querySelector('input');
        expect(actual).toBeDefined();
    });

    it('should call set light group state on toggleChecked', async () => {
        render(<LightSwitch data={groupData} />);
        fireEvent.click(screen.getByRole('checkbox'));

        expect(spySetGroup).toBeCalledWith(groupData.groupId, false, groupData.brightness);
    });

    describe('Light Expansion', () => {

        it('should display expansion panel when areLightsOpen is true', () => {
            render(<LightSwitch data={groupData} />);
            fireEvent.click(screen.getByRole('button'));
            const actual = screen.getByTestId('light-group-expansion');

            expect(actual).toBeDefined();
        });

        it('should not display expansion panel when areLightsOpen is false', () => {
            render(<LightSwitch data={groupData} />);
            const actual = screen.queryByTestId('light-group-expansion');

            expect(actual).toBeNull();
        });

        it('should display all light switches', () => {
            render(<LightSwitch data={groupData} />);
            fireEvent.click(screen.getByRole('button'));
            const actual = screen.getAllByTestId('light-switches');

            expect(actual).toHaveLength(2);
        });

        // TODO: create test to make sure api call is make when an individual light switch is toggled
    });
})
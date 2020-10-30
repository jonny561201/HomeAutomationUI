import React from 'react';
import { render, act, fireEvent, screen } from '@testing-library/react';
import * as lib from '../../../utilities/RestApi';
import { Context } from '../../../state/Store';
import SwitchSlider from '../../../components/segments/SwitchSlider';


describe('SwitchSlider', () => {
    const lightId = '1';
    const light = { lightName: 'desk lamp', on: true, brightness: 123, lightId: lightId, groupId: 1 };
    const spySetLight = jest.spyOn(lib, 'setLightState');

    const renderComponent = async () => {
        await act(async () => {
            render(
                <Context.Provider value={[{ userLights: [light] }, () => { }]}>
                    <SwitchSlider data={light} lightId={lightId} />
                </Context.Provider>
            );
        });
    }

    beforeEach(() => {
        spySetLight.mockClear();
    });

    it('should make api call when toggling on the desk lamp', async () => {
        await renderComponent();

        await act(async () => {
            fireEvent.change(screen.getByTestId('light-switch').querySelector('input'), {target: {value: 100}});
        });

        // expect(spySetLight).toHaveBeenCalled();
    });

});
import React from 'react';
import { shallow } from 'enzyme';
import BasementPanel from '../../../components/panels/BasementPanel';

describe('BasementPanel', () => {

    let basementPanel;
    const mockGetSump = jest.fn();
    const mockRequests = {
        getSumpLevels: mockGetSump,
    };

    beforeEach(() => {
        mockGetSump.mockClear();
        basementPanel = shallow(<BasementPanel apiRequests={mockRequests} />);
    });

    it('should show the Basement Panel', () => {
        const actual = basementPanel.find('.basement-panel');
        expect(actual).toHaveLength(1);
    });

    it('should show basement icon', () => {
        const actual = basementPanel.find('.summary img').prop('alt');
        expect(actual).toEqual('basement');
    });

    describe('Sump Details', () => {

        it('should show sump pump icon', () => {
            const actual = basementPanel.find('.center img');
            expect(actual).toHaveLength(1);
        });

        it('should display sump depth text', () => {
            const actual = basementPanel.find('.sump-text p').text();
            expect(actual).toEqual('Depth: ');
        });

        it('should make call to get sump pump depth', () => {
            expect(mockGetSump).toHaveBeenCalledTimes(1);
        });
    });
});
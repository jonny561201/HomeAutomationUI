
import React from 'react';
import { shallow } from 'enzyme';
import UserPass from '../../components/UserPass';

describe('UserPass', () => {
    let userPass;

    beforeEach(() => {
        userPass = shallow(<UserPass />);
    });

    it('renders', () => {
        expect(userPass).toBeTruthy();
    });

    it('should contain username input', () => {
        const userInput = userPass.find('input[name="Username"]');
        expect(userInput).toHaveLength(1);
    });

    it('should contain password input', () => {
        const passInput = userPass.find('input[name="Password"]');
        expect(passInput).toHaveLength(1);
    });

    it('should contain a login button', () => {
        const buttonText = userPass.find('button').text();
        expect(buttonText).toEqual('Login');
    });
});
import React from 'react';
import { Link } from 'react-router-dom';
import './AccountSettings.css';
import { getStore } from '../../TestState';


export default class AccountSettings extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount = () => {
        document.addEventListener("mousedown", this.handleClickOutside);
    }

    setWrapperRef = (node) => {
        this.wrapperRef = node;
    }

    handleClickOutside = (event) => {
        if (this.wrapperRef && !this.props.parentRef.contains(event.target) && !this.wrapperRef.contains(event.target)) {
            this.props.toggle();
        }
    }

    render() {
        return (
            <div className="account-menu" ref={this.setWrapperRef}>
                <ul>{getStore().getActivePage() === 'Home Automation'
                    ? <Link to='/settings'>
                        <li><div className="account-button">Settings</div></li>
                    </Link>
                    : <Link to='/home'>
                        <li><div className="account-button">Home</div></li>
                    </Link>
                }
                    <Link to='/'>
                        <li><div className="account-button" onClick={() => getStore().updateAuth(false)}>Sign Out</div></li>
                    </Link>
                </ul>
            </div>
        );
    }
}
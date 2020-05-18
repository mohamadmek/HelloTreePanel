import React, { Component } from 'react';
import classNames from 'classnames';

export class AppProfile extends Component {

    constructor() {
        super();
        this.state = {
            expanded: false
        };
        this.onClick = this.onClick.bind(this);
    }

    onClick(event) {
        this.setState({expanded: !this.state.expanded});
        event.preventDefault();
    }
     logout = () => {
        localStorage.clear();
        window.location = '/';
        }
    render() {
       
        return  (
            <div className="layout-profile">
                <div>
                    <img src="assets/layout/images/treetrans.png" alt="" style={{height: '200px', width: '200px', margin: 0}} />
                </div>
                <button className="p-link layout-profile-link" onClick={this.onClick}>
                    <span className="username">Mohammad Meksasi</span>
                    <i className="pi pi-fw pi-cog"/>
                </button>
                <ul className={classNames({'layout-profile-expanded': this.state.expanded})}>
                    <li><button className="p-link" onClick={this.logout} ><i className="pi pi-fw pi-power-off"/><span>Logout</span></button></li>
                </ul>
            </div>
        );
    }
}
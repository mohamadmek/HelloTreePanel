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
     logout = async () => {
        const response = await fetch(`http://localhost:8000/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        const result = await response.json();
        console.log(result);
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
                    <span className="username">{localStorage.getItem('userName')}</span>
                    <i className="pi pi-fw pi-cog"/>
                </button>
                <ul className={classNames({'layout-profile-expanded': this.state.expanded})}>
                    <li><button className="p-link" onClick={this.logout} ><i className="pi pi-fw pi-power-off"/><span>Logout</span></button></li>
                </ul>
            </div>
        );
    }
}
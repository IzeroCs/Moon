import React, { Component } from "react";

export default class Navigation extends Component {
    render(): React.ReactNode {
        return <nav className="navigation">
            <div className="navigation-action-list">
            <button className="navigation-action-item icomoon ic-message-outline" aria-label="Notification"></button>
            <button className="navigation-action-item icomoon ic-user-outline" aria-label="Person"></button>
            <button className="navigation-action-item icomoon ic-search-outline" aria-label="Search"></button>
            </div>
        </nav>
    }
}

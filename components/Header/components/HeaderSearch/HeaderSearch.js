import React, { Component } from "react";
import { Button } from "reactstrap";
import { AutenticateRender } from "../../../../controllers";

class HeaderSearch extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const authenticatedState = this.props.userAuth.authenticatedState();
        return (
            <AutenticateRender
                authenticatedState={authenticatedState}
                children={
                    <li className="app-search">
                        <input
                            className="app-searchInput"
                            type="search"
                            placeholder="Search"
                        />
                        <Button
                            className="app-searchButton"
                            aria-label="Search Button"
                        >
                            <i className="fa fa-search" />
                        </Button>
                    </li>
                }
            />
        );
    }
}

export {HeaderSearch};

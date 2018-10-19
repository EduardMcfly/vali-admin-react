import { Component } from "react";
class AutenticateRender extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { authenticatedState, children, ...rest } = this.props;
        if (authenticatedState) {
            return children;
        }
        return null;
    }
}

export default AutenticateRender;

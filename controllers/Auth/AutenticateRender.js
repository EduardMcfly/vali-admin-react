const AutenticateRender = ({ authenticatedState, children, ...rest }) => {
    if (authenticatedState) {
        return children;
    }
    return null;
};

export default AutenticateRender;

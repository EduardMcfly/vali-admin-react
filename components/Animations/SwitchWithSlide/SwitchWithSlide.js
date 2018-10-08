import React from "react";
import { Switch, Route } from "react-router-dom";
import Slider from "./Slider";

class SlideOut extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            childPosition: Slider.CENTER,
            curChild: props.children,
            curUniqId: props.uniqId,
            prevChild: null,
            prevUniqId: null,
            animationCallback: null
        };
        this.swapChildren = this.swapChildren.bind(this);
        this.location = this.props.uniqKey;
        this.locationLast = this.props.uniqKey;
        this.count = 0;
    }

    componentDidUpdate(prevProps, prevState) {
        this.count++;
        if (this.count % 6 == 0) {
            this.count = 0;
            this.locationLast = this.location;
        }
        this.location = this.props.uniqKey;

        const prevUniqId = prevProps.uniqKey || prevProps.children.type;
        const uniqId = this.props.uniqKey || this.props.children.type;
        if (prevUniqId !== uniqId) {
            this.setState({
                childPosition:
                    this.location != this.locationLast
                        ? Slider.TO_LEFT
                        : Slider.TO_RIGHT,
                curChild: this.props.children,
                curUniqId: uniqId,
                prevChild: prevProps.children,
                prevUniqId,
                animationCallback: this.swapChildren
            });
        }
    }

    swapChildren() {
        this.setState({
            childPosition:
                this.location != this.locationLast
                    ? Slider.FROM_RIGHT
                    : Slider.FROM_LEFT,
            prevChild: null,
            prevUniqId: null,
            animationCallback: null
        });
    }

    render() {
        return (
            <Slider
                position={this.state.childPosition}
                animationCallback={this.state.animationCallback}
            >
                {this.state.prevChild || this.state.curChild}
            </Slider>
        );
    }
}

const animateSwitch = (CustomSwitch, AnimatorComponent) => ({
    updateStep,
    children
}) => (
    <Route
        render={({ location,history }) => (
            <AnimatorComponent
                uniqKey={location.pathname}
                updateStep={updateStep}
            >
                <CustomSwitch location={location}>{children}</CustomSwitch>
            </AnimatorComponent>
        )}
    />
);

const SwitchWithSlide = animateSwitch(Switch, SlideOut);

export default SwitchWithSlide;

import React from 'react';

import x_sign from '../images/x_sign.png';
import o_sign from '../images/o_sign.png';


class Form extends React.Component {
    constructor() {
        super();
        this.handleChange = this.handleChange.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
        this.state = {
            nameOne: "",
            nameTwo: "",

        };
    }
    handleChange(event) {
        let target = event.target;
        let { name } = target;

        this.setState({
            [name]: target.value
        });
    }
    submitHandler(event) {
        event.preventDefault();


        this.props.handlerFromParent(this.state.nameOne, this.state.nameTwo, this.state.hidden);
        this.setState({
            nameOne: "",
            nameTwo: "",
            hidden: true
        });

    }

    render() {
        return (
            <div>

                <form onSubmit={this.submitHandler} hidden={this.state.hidden}>
                    <div className="center">
                        <div className="form-row">
                            <div className="form-group col-md-6 niceFont">
                                <label>
                                    Name
                <span>&nbsp;</span><img className="icon" src={x_sign} alt="x"></img>
                                </label>
                                <input className="form-control"
                                    name="nameOne"
                                    type="text"
                                    value={this.state.nameOne}
                                    onChange={this.handleChange}
                                />
                            </div>
                            <div className="form-group col-md-6 niceFont">
                                <label>
                                    Name
                <span>&nbsp;</span><img className="icon" src={o_sign} alt="o"></img>
                                </label>
                                <input className="form-control"
                                    name="nameTwo"
                                    type="text"
                                    value={this.state.nameTwo}
                                    onChange={this.handleChange}
                                />
                            </div>
                        </div>
                        <input type="submit" value="Start game" className="btn btn-dark niceFont" />
                    </div>
                </form>
            </div>

        );
    }
}

export default Form;
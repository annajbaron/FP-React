import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import { bindActionCreators } from 'redux';
import {Pitch} from '../requests/pitches';


class PitchPage extends Component {
  constructor(props) {
    super();
    this.state = {
      brand_1: "",
      brand_2: ""
    }
  }

  handleChange(event) {
    const newState = Object.assign({}, this.state, {
      [event.target.name]: event.target.value,
    });
    this.setState(newState);
  }

  componentDidMount() {
    Pitch
      .all()
      .then((res) => {
        this.props.getPitches(res);
      })
  }

  createPitch() {
    const {brand_1, brand_2} = this.state;
    Pitch
      .create({brand_1, brand_2})
      .then((res) => {
        this.props.addPitch(res);
      })
      const newState = Object.assign({}, this.state, {
        brand_1: "", brand_2: ""
      })
      this.setState(newState);
    }

  renderList() {
    return this.props.pitches.map((pitch) => {
      return (
        <div
          key={pitch.id}
          className="pitch-sneak-peak"
          >
            {pitch.brand_1} X {pitch.brand_2}
            <br />
            <hr />
        </div>
      );
    });
  }

  render() {
    const {pitches} = this.props;
    return(
      <div className="page">
        <h1 className="page-header">PITCH a COLLAB</h1>
        <div className="pitch-list">
          <hr />
          {this.renderList()}
        </div>
        <form>
          <div className="form-group row">
            <div className="col-sm-12">
              <input
                type="text"
                className="form-control collab-input"
                name="brand_1"
                placeholder="BRAND 1"
                onInput={this.handleChange.bind(this)}
                value={this.state.brand_1}
              />
            </div>
          </div>
          <div className="form-group row">
            <div className="col-sm-12">
              <input
                type="text"
                className="form-control collab-input"
                name="brand_2"
                onInput={this.handleChange.bind(this)}
                value={this.state.brand_2}
                placeholder="BRAND 2"
              />
            </div>
          </div>
          <div className="form-group row">
            <div className="col-sm-12">
              <button
                type="button"
                className="center-block btn-sign"
                onClick={()=>this.createPitch()}
              >
                SUBMIT
              </button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    pitches: state.pitches
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getPitches: pitches => dispatch(actions.getPitches(pitches)),
    addPitch: pitch => dispatch(actions.addPitch(pitch))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PitchPage);
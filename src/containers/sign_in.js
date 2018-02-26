import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions/index';
import { bindActionCreators } from 'redux';
import jwtDecode from 'jwt-decode';
import {Token} from '../requests/tokens';
import {Follow} from '../requests/follows';
import {Like} from '../requests/likes';
import {Vote} from '../requests/votes';

class SignIn extends Component {
  constructor(props) {
    super();
    this.state = {
      email: "",
      password: ""
    }
  }

  handleChange(event) {
    const newState = Object.assign({}, this.state, {
      [event.target.name]: event.target.value,
    });
    this.setState(newState);
  }

  createToken() {
    const {email, password} = this.state;
    Token
      .create({email, password})
      .then(data => {
        if (!data.error) {
          let {jwt} = data;
          localStorage.setItem('jwt', jwt);
          jwt = localStorage.getItem('jwt');
          const payload = jwtDecode(jwt);
          this.props.attachUser(payload);
          const newState = Object.assign({}, this.state, {
            email: "", password: "",
          });
          this.setState(newState, this.loadProfile());
        }
      });
  }

  loadProfile() {
    console.log('load profile triggered');
    Follow
      .all()
      .then(this.props.setFollowedBrands, this.loadLikes());
  }

  loadLikes() {
    console.log('load votes triggered');
    Like
      .all()
      .then(this.props.setLikedCollections, this.loadVotes());
  }

  loadVotes() {
    console.log('load votes triggered');
    Vote
      .all()
      .then(this.props.setVotedPitches);
  }

  render() {
    return(
      <div className="sign-in">
        <h1 className="page-header">SIGN IN</h1>
        <form>
          <div className="form-group row">
            <div className="col-sm-12">
              <input
                type="text"
                className="form-control input_email collab-input"
                name="email"
                placeholder="E-MAIL"
                onInput={this.handleChange.bind(this)}
                value={this.state.email}
              />
            </div>
          </div>
          <div className="form-group row">
            <div className="col-sm-12">
              <input
                type="password"
                className="form-control input_password collab-input"
                name="password"
                onInput={this.handleChange.bind(this)}
                value={this.state.password}
                placeholder="PASSWORD"
              />
            </div>
          </div>
          <div className="form-group row">
            <div className="col-sm-12">
              <button
                type="button"
                className="center-block btn-sign"
                onClick={()=>this.createToken()}
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
    user: state.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    attachUser: user => dispatch(actions.attachUser(user)),
    setFollowedBrands: following => dispatch(actions.setFollowedBrands(following)),
    setLikedCollections: liked => dispatch(actions.setLikedCollections(liked)),
    setVotedPitches: voted => dispatch(actions.setVotedPitches(voted))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);

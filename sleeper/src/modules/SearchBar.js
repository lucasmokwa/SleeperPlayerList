import React from "react";

class SearchBar extends React.Component {
  state = { term: "" };
  onFormSubmit = (event) => {
    event.preventDefault();

    this.props.onSubmit(this.state.term);
  };

  userNotFound = () => {
    if (this.props.noUser) {
      return (
        <div className='ui' style={{ backgroundColor: "" }}>
          User not found!
        </div>
      );
    } else {
      return null;
    }
  };

  renderHelper() {
    return (
      <div>
        <div className='ui action input'>
          <form id='userForm' onSubmit={this.onFormSubmit} className='ui form'>
            <input
              placeholder='Enter your username'
              type='text'
              value={this.state.term}
              onChange={(e) => this.setState({ term: e.target.value })}
            />
          </form>
          <button
            className='ui green button right'
            form='userForm'
            style={{ marginLeft: "3px" }}>
            Search user
          </button>
        </div>
        <div
          className='ui text'
          style={{ paddingLeft: "3px", paddingTop: "3px", fontWeight: "bold" }}>
          {this.userNotFound()}
        </div>
      </div>
    );
  }

  render() {
    return this.renderHelper();
  }
}

export default SearchBar;

import React from "react";

import Button from "components/CustomButtons/Button.jsx";

class LogOutButton extends React.Component {
  handleClick() {
    localStorage.clear();
    window.location.reload();
  }
  render() {
    return (
      <Button onClick={this.handleClick} color="transparent">
        Log Out
      </Button>
    );
  }
}

export default LogOutButton;

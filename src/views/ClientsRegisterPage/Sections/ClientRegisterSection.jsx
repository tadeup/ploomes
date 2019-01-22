import React from "react";
import axios from "axios";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";

import productStyle from "assets/jss/material-kit-react/views/landingPageSections/productStyle.jsx";

class ClientRegisterSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Name: "",
      loading: false
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handlePost(newName) {
    this.setState({ loading: true }, () => {
      axios
        .post(
          `https://api2-dev.ploomes.com/Contacts`,
          {
            Name: newName
          },
          {
            headers: {
              "User-Key": localStorage.getItem("User-Key")
            }
          }
        )
        .then(() => {
          window.location.reload();
        });
    });
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.section}>
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={0} sm={0} md={2} />
            <GridItem xs={12} sm={12} md={8}>
              <Card>
                <CardHeader color="primary">
                  <h4 className={classes.cardTitleWhite}>Registrar Cliente</h4>
                </CardHeader>
                {this.state.loading ? (
                  <div>
                    <i className="fa fa-spinner fa-spin" /> Carregando...
                  </div>
                ) : (
                  <CardBody>
                    <form className={classes.form}>
                      <CustomInput
                        labelText="Nome do cliente"
                        id="Name"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: "text",
                          name: "Name",
                          value: this.state.Name,
                          onChange: this.handleChange
                        }}
                      />
                      <Button
                        default
                        color="primary"
                        size="lg"
                        onClick={e => this.handlePost(this.state.Name, e)}
                      >
                        Registrar
                      </Button>
                    </form>
                  </CardBody>
                )}
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    );
  }
}

export default withStyles(productStyle)(ClientRegisterSection);

import React from "react";
import axios from "axios";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons
import Check from "@material-ui/icons/Check";
import Delete from "@material-ui/icons/Delete";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Table from "components/Table/Table.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";

import productStyle from "assets/jss/material-kit-react/views/landingPageSections/productStyle.jsx";

class ClientsListSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customers: [],
      loading: false
    };

    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    axios
      .get(`https://api2-dev.ploomes.com/Contacts`, {
        headers: {
          "User-Key": localStorage.getItem("User-Key")
        }
      })
      .then(res => {
        const customers = res.data.value;
        this.setState({ customers });
      })
      .catch(e => console.log(e));
  }

  handleChange(key, event) {
    const target = event.target;
    const newValue = target.type === "checkbox" ? target.checked : target.value;

    this.setState(state => {
      let customers = state.customers;
      customers[key].Name = newValue;
      return { customers };
    });
  }

  handleSave(newName, id) {
    this.setState({ loading: true }, () => {
      axios
        .patch(
          `https://api2-dev.ploomes.com/Contacts(${id})`,
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

  handleDelete(id) {
    this.setState({ loading: true }, () => {
      axios
        .delete(`https://api2-dev.ploomes.com/Contacts(${id})`, {
          headers: {
            "User-Key": localStorage.getItem("User-Key")
          }
        })
        .then(() => {
          window.location.reload();
        });
    });
  }

  render() {
    const { classes } = this.props;

    const data = this.state.customers.map((client, key) => {
      return [
        client.Id,
        <CustomInput
          id="regular"
          key={key}
          inputProps={{
            placeholder: client.Name,
            name: client.Id,
            value: this.state.customers[key].Name,
            onChange: e => this.handleChange(key, e)
          }}
          formControlProps={{
            fullWidth: true
          }}
        />,
        <Button
          justIcon
          round
          color="primary"
          key={key}
          onClick={e => {
            this.handleSave(this.state.customers[key].Name, client.Id, e);
          }}
        >
          <Check className={classes.icons} />
        </Button>,
        <Button
          justIcon
          round
          color="primary"
          key={key}
          onClick={e => {
            this.handleDelete(client.Id, e);
          }}
        >
          <Delete className={classes.icons} />
        </Button>
      ];
    });

    return (
      <div className={classes.section}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
              <Card>
                <CardHeader color="primary">
                  <h4 className={classes.cardTitleWhite}>Clientes</h4>
                  <p className={classes.cardCategoryWhite}>
                    Editar e apagar clientes existentes
                  </p>
                </CardHeader>
                {this.state.loading ? (
                  <div>
                    <i className="fa fa-spinner fa-spin" /> Carregando...
                  </div>
                ) : (
                  <CardBody>
                    <Table
                      tableHeaderColor="primary"
                      tableHead={["id", "Nome", "Salvar", "Deletar"]}
                      tableData={data}
                    />
                    <Button href="/clients-register-page">Add New User</Button>
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

export default withStyles(productStyle)(ClientsListSection);

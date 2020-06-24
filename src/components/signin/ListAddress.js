import React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  text: {
    color: "#750000",
    fontWeight: "bold",
    fontSize: "15px",
    padding: "15px",
    display: "inline-block",
    width: "95%",
  },
  textList: {
    color: "#750000",
    fontSize: "12px",
    display: "block",
  },
  button: {
    color: "white",
    background: "#750000",
  },
  card: {
    border: "1px solid #750000",
    marginLeft: "15px",
    marginTop: "15px",
    width: "95%",
    borderRadius: "4px",
  },
}));

const ListAddress = (props) => {
  const classes = useStyles();
  const { addresses, removeAddressFromList } = props;

  return (
    <>
      <Typography className={classes.text}>Endereços</Typography>
      {addresses &&
        addresses.map((e, index) => (
          <Card key={index} className={classes.card}>
            <CardActions>
              <Button
                variant="contained"
                className={classes.button}
                onClick={() => removeAddressFromList(index)}
                fullWidth
              >
                <DeleteForeverIcon />
              </Button>
            </CardActions>
            <CardContent>
              <Typography className={classes.textList}>{`Endereço ${
                index + 1
              }`}</Typography>
              <p>{`${e.street}, ${e.number} - ${e.compl} - ${e.neighborhood} - ${e.zipCode}`}</p>
              <p>{`${e.city.name}/${e.state.name}`}</p>
            </CardContent>
          </Card>
        ))}
    </>
  );
};

export default ListAddress;

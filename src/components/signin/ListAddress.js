import React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const ListAddress = (props) => {
  const { addresses, removeAddressFromList } = props;

  return (
    <>
      <Typography color="primary" gutterBottom>
        Endereços
      </Typography>
      {addresses &&
        addresses.map((e, index) => (
          <Card key={index}>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Endereço
              </Typography>
              <Typography variant="body2" component="p">
                <strong>Rua:</strong> {e.street}
              </Typography>
              <Typography variant="body2" component="p">
                <strong>Número</strong> {e.numbber}
              </Typography>
              <Typography variant="body2" component="p">
                <strong>Complemento:</strong> {e.compl}
              </Typography>
              <Typography variant="body2" component="p">
                <strong>Bairro: </strong>
                {e.neighborhood}
              </Typography>
              <Typography variant="body2" component="p">
                <strong>CEP: </strong>
                {e.zipCode}
              </Typography>
              <Typography variant="body2" component="p">
                <strong>Estado: </strong>
                {e.state.name}
              </Typography>
              <Typography variant="body2" component="p">
                <strong>Cidade: </strong>
                {e.city.name}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                color="secondary"
                onClick={() => removeAddressFromList(index)}
              >
                Remover
              </Button>
            </CardActions>
          </Card>
        ))}
    </>
  );
};

export default ListAddress;

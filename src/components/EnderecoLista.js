import React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const EnderecoLista = (props) => {
  const { enderecos, limparEndereco } = props;

  return (
    <>
      <Typography color="primary" gutterBottom>
        Endereços
      </Typography>
      {enderecos &&
        enderecos.map((e, index) => (
          <Card key={index}>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Endereço
              </Typography>
              <Typography variant="body2" component="p">
                {e.rua}
              </Typography>
              <Typography variant="body2" component="p">
                {e.numero}
              </Typography>
              <Typography variant="body2" component="p">
                {e.complemento}
              </Typography>
              <Typography variant="body2" component="p">
                {e.bairro}
              </Typography>
              <Typography variant="body2" component="p">
                {e.cep}
              </Typography>
              <Typography variant="body2" component="p">
                {e.estado[0].name}
              </Typography>
              <Typography variant="body2" component="p">
                {e.cidade[0].name}
              </Typography>
            </CardContent>
            <CardActions>
              <Button color="secondary" onClick={() => limparEndereco(index)}>
                Remover
              </Button>
            </CardActions>
          </Card>
        ))}
    </>
  );
};

export default EnderecoLista;

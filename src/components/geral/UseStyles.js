import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  boxEsquerda: {
    float: "left",
    width: "60%",
    marginTop: "5px",
  },
  boxDireita: {
    float: "left",
    width: "40%",
    textAlignLast: "right",
  },
  linkHome: {
    color: "white",
    fontSize: 25,
  },
  botaoHeader: {
    display: "inline-block",
    margin: "5px",
    padding: 0,
    color: "white",
    fontWeight: "bold",
  },
  boxHeader: {
    float: "left",
    backgroundColor: "#750000",
    color: "primary.contrastText",
    width: "95%",
    padding: "15px",
    borderRadius: "4px",
    display: "block",
  },
}));

export default useStyles;

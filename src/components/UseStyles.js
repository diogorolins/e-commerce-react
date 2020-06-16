import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  boxEsquerda: {
    float: "left",
    width: "70%",
    marginTop: "5px",
  },
  boxDireita: {
    float: "left",
    width: "25%",
    textAlignLast: "right",
  },
  linkHome: {
    color: "white",
    fontSize: 22,
  },
  botaoHeader: {
    margin: 0,
    padding: 0,
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

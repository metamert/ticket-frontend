import React, { useEffect } from "react";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Title from "./Title";

// Generate Order Data
function createData(id, name, departureFrom, arrivalIn, tax, price) {
  return { id, name, departureFrom, arrivalIn, tax, price };
}

const createRow = (data) => {
  const Row = [];

  data?.map((ticket) => {
    const {id, name, departureFrom, arrivalIn, tax, price}=ticket
    Row.push(createData(id, name, departureFrom, arrivalIn, tax, price));
  });

  return Row;
};

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Orders({ data }) {
  const classes = useStyles();
  const rows = createRow(data);
  console.log(rows);
  return (
    <React.Fragment>
      <Title>Ödemeler</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>id</TableCell>
            <TableCell>isim</TableCell>
            <TableCell>nereden</TableCell>
            <TableCell>nereye</TableCell>
            <TableCell>vergi</TableCell>
            <TableCell align="right">ücret</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.departureFrom}</TableCell>
              <TableCell>{row.arrivalIn}</TableCell>
              <TableCell>{row.tax}</TableCell>
              <TableCell align="right">{row.price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          See more orders
        </Link>
      </div>
    </React.Fragment>
  );
}

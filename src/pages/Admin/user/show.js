import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";

import BackspaceIcon from "@material-ui/icons/Backspace";
import { CircularProgress } from "@material-ui/core";
import { connect, useSelector } from "react-redux";
import Modal from "../../../components/Modal/Modal";

import { tableDatas } from "../utils/utils";

import EditUserform from "./edit";
import axios from "axios";
import { toast } from "react-toastify";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: "80vh",
  },
});

function StickyHeadTable({ admin, history }) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [selected, set_selected] = React.useState(0);
  const [selected2, set_selected2] = React.useState(0);
  const [open2, setopen2] = React.useState(0);
  const [open3, setopen3] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const [rows, setRows] = React.useState([]);
  const [loading, setloading] = React.useState(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  //1
  function createData(
    id,
    email,
    name,
    lastName,
    password,
    phoneNumber,
    tin,
    createdAt,

    del
  ) {
    return {
      id,
      email,
      name,
      lastName,
      password,
      phoneNumber,
      tin,
      createdAt,

      del,
    };
  }

  //2
  const columns = tableDatas["user"];

  React.useEffect(() => {
    Update();
  }, []);

  function getFormattedDate(date) {
    var year = date.getFullYear();

    var month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : "0" + month;

    var day = date.getDate().toString();
    day = day.length > 1 ? day : "0" + day;
    let formatted = month + "/" + day + "/" + year;
    console.log(formatted);
    return formatted;
  }

  const deleteItem = async (id) => {
    try {
      console.log(id);
      let response = await axios.delete(`http://localhost:3000/users/`, {
        method: "DELETE",
        headers: { jwt_token: admin.jwt_token },
        params: { id: id },
      });
      console.log(response);
      if (response.status) Update();
      else toast.error("bu kullanıcıyı silemezsiniz");
    } catch (error) {
      toast.error("bu kullanıcıyı silemezsiniz");
    }
  };

  const edit = async (data) => {
    try {
      const myHeaders = new Headers();

      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("jwt_token", admin.token);

      await fetch(`http://localhost:5000/admin/update-user/${data.user_id}`, {
        method: "PUT",
        headers: myHeaders,
        body: JSON.stringify(data),
      });

      await Update();

      // window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };

  const update = async (user) => {
    set_selected(user);
    setopen2(true);
  };

  const Update = async () => {
    let arr = [];
    setloading(true);
    try {
      const res = await fetch(`http://localhost:3000/users/`, {
        method: "GET",
        headers: { jwt_token: admin.jwt_token },
      });

      const parseRes = await res.json();
      console.log("parseRes", parseRes);
      parseRes.users.map((item) => {
        const {
          id,
          email,
          name,
          lastName,
          password,
          phoneNumber,
          tin,
          createdAt,
        } = item;
        console.log(createdAt);
        arr.push(
          createData(
            id,
            email,
            name,
            lastName,
            password,
            phoneNumber,
            tin,
            getFormattedDate(new Date(createdAt)),
            <BackspaceIcon
              className="needHover"
              onClick={() => deleteItem(id)}
            />
          )
        );
      });
      setRows(arr);

      setloading(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  if (!loading)
    return (
      <Paper className={classes.root}>
        <Modal
          selectedUser={selected}
          open={open2}
          cancel={() => setopen2(false)}
          Content={
            <EditUserform
              selectedUser={selected}
              updatePage={Update}
              cancel={() => setopen2(false)}
              edit={edit}
            />
          }
        ></Modal>
        

        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .sort((a, b) => a.user_id - b.user_id)
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    );
  else return <CircularProgress></CircularProgress>;
}
const mapStateToProps = (state) => ({
  admin: state.user.admin,
});

export default connect(mapStateToProps)(StickyHeadTable);

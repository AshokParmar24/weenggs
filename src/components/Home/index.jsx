import React, { useState, useEffect, useReducer } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Box, Typography } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import IconButton from "@mui/material/IconButton";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Home() {
  const { sections } = useSelector((state) => state?.sectionReducer);
  const navigate = useNavigate();

  console.log("sections :>> ", sections);

  const totalAmount = sections.reduce((acc, section) => {
    return acc + parseFloat(section.markup_items_total || 0);
  }, 0);

  console.log("totalAmounttotalAmount :>> ", totalAmount);

  const columns = [
    {
      id: "srno",
      label: "Sr No",
      format: (value, index) => {
        console.log("index :>> ", index);
        return index + 1;
      },
    },
    { id: "section_name", label: "Section Name" },
    {
      id: "markup_items_total",
      label: "Markup Items Total",
      format: (value) => {
        return `$ ${value}`;
      },
    },

    {
      id: "action",
      label: "Action",
      format: (value, index, row) => {
        console.log("rowrowrowrow :>> ", row);
        return (
          <IconButton onClick={() => navigate(`about/${row?.section_id}`)}>
            {" "}
            <VisibilityIcon color="success" />
          </IconButton>
        );
      },
    },
  ];

  function createData(name, markup_items_total) {
    return { name, markup_items_total };
  }

  const rows = sections.map((v) => {
    return { ...v, ...createData(v?.section_name, v?.markup_items_total) };
  });

  return (
    <Box padding={4}>
      <Paper sx={{ width: "100%" }}>
        <TableContainer sx={{}}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell colSpan={12} sx={{ background: "#FAFBFB" }}>
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography variant="h6">- Custome Section </Typography>
                    <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                      <Typography variant="h6">$ {totalAmount}</Typography>
                    </Box>
                  </Box>
                </TableCell>
              </TableRow>
              <TableRow>
                {columns.map((column, i) => (
                  <TableCell
                    key={column.id}
                    // align={column.align}
                    // style={{ top: 57, minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row?.section_id}
                  >
                    {columns.map((column, i) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={i} align={column.align}>
                          {column.format
                            ? column.format(value, index, row)
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
      </Paper>
    </Box>
  );
}

export default Home;

import {
  Box,
  Button,
  Checkbox,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearSectionItem,
  getSetctionItem,
  updateSectionAmount,
  updateSectionItem,
} from "../../redux/actions/sectionActions";
import { useParams } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CheckIcon from "@mui/icons-material/Check";

const About = () => {
  const { id } = useParams();
  const [isEdit, setIsEdite] = useState(false);
  const [form, setForm] = useState(null);
  const dispatch = useDispatch();
  const { sectionItem } = useSelector((state) => state?.sectionReducer);
  useEffect(() => {
    if (id) {
      dispatch(clearSectionItem());
      dispatch(getSetctionItem(id));
    }
  }, [id]);

  const totalAmount = sectionItem.reduce((acc, section) => {
    return acc + parseFloat(section?.item_total || 0);
  }, 0);

  useEffect(() => {
    dispatch(updateSectionAmount({ sectionId: id, totalAmount }));
  }, [totalAmount]);

  const onHandlerChange = (e) => {
    const { name, value } = e.target;

    const updatedForm = {
      ...form,
      [name]: value,
    };

    const quantity = parseFloat(updatedForm?.quantity || 0);
    const unitCost = parseFloat(updatedForm?.unit_cost || 0);

    const total = Number((quantity * unitCost).toFixed(2));

    setForm({
      ...updatedForm,
      item_total: total,
    });
  };

  const columns = [
    {
      id: "item_type_display_name",
      label: "Type",
      input: (
        <TextField
          type="text"
          variant="standard"
          name="item_type_display_name"
          onChange={(e) => onHandlerChange(e)}
          value={form?.item_type_display_name}
        />
      ),
    },
    {
      id: "item_type_name",
      label: "Item Name",
      input: (
        <TextField
          type="text"
          variant="standard"
          name="item_type_name"
          onChange={(e) => onHandlerChange(e)}
          value={form?.item_type_name}
        />
      ),
    },
    {
      id: "quantity",
      label: "QTY",
      input: (
        <TextField
          type="number"
          variant="standard"
          name="quantity"
          inputProps={{
            min: 0,
          }}
          onChange={(e) => onHandlerChange(e)}
          value={form?.quantity}
        />
      ),
    },
    {
      id: "unit_cost",
      label: "Unit Cost",
      format: (value) => {
        return `$ ${parseFloat(value).toFixed(2)}`;
      },
      input: (
        <TextField
          type="number"
          variant="standard"
          name="unit_cost"
          inputProps={{
            min: 0,
          }}
          onChange={(e) => onHandlerChange(e)}
          value={form?.unit_cost}
        />
      ),
    },
    {
      id: "unit",
      label: "Unit",
      // input: (
      //   <TextField
      //     type="text"
      //     variant="standard"
      //     name="unit"
      //     min={0}
      //     onChange={(e) => onHandlerChange(e)}
      //     value={form?.unit}
      //   />
      // ),
    },
    {
      id: "item_total",
      label: "Total",
      format: (value) => {
        return `$ ${parseFloat(value).toFixed(2)}`;
      },
      input: (
        <TextField
          type="text"
          variant="standard"
          name="unit"
          disabled
          min={0}
          onChange={(e) => onHandlerChange(e)}
          value={form?.item_total}
        />
      ),
    },
    {
      id: "apply_global_tax",
      label: "Tax",
      format: (value) => {
        return value ? <CheckIcon /> : "";
      },
      // input: (
      //   <Checkbox
      //     checked={form?.apply_global_tax === 1}
      //     onChange={(e) => {
      //       setForm({
      //         ...form,
      //         apply_global_tax: e.target.checked ? 1 : 0,
      //       });
      //     }}
      //   />
      // ),
    },
    {
      id: "cost_code",
      label: "Cost Code",
      input: (
        <TextField
          type="text"
          variant="standard"
          name="cost_code"
          onChange={(e) => onHandlerChange(e)}
          value={form?.cost_code}
        />
      ),
    },
    {
      id: "action",
      label: "",
      format: (value, index, row) =>
        isEdit && form?.item_id == row?.item_id ? (
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              variant="text"
              onClick={() => {
                dispatch(updateSectionItem({ sectionId: id, form }));
                setIsEdite(false);
                setForm(null);
              }}
            >
              Updata
            </Button>
            <Button
              variant="text"
              onClick={() => {
                setIsEdite(false);
                setForm(null);
              }}
            >
              Cancel
            </Button>
          </Box>
        ) : (
          <IconButton
            onClick={() => {
              setForm(row);

              setIsEdite(true);
            }}
          >
            {" "}
            <VisibilityIcon color="success" />
          </IconButton>
        ),
    },
  ];

  console.log("fromfromfromfromfrom :>> ", form);

  function createData(
    item_type_display_name,
    item_type_name,
    quantity,
    unit_cost,
    unit,
    item_total,
    apply_global_tax,
    cost_code
  ) {
    return {
      item_type_display_name,
      item_type_name,
      quantity,
      unit_cost,
      unit,
      item_total,
      apply_global_tax,
      cost_code,
    };
  }

  const rows = sectionItem.map((v) => {
    return {
      ...v,
      ...createData(
        v?.item_type_display_name,
        v?.item_type_name,
        v?.quantity,
        v?.unit_cost,
        v?.unit,
        v?.item_total,
        v?.tax,
        v?.cost_code
      ),
    };
  });

  return (
    <Box padding={4}>
      <Paper sx={{ width: "100%" }}>
        <TableContainer>
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
                    key={row?.item_id}
                  >
                    {columns.map((column, i) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={i} align={column.align}>
                          {isEdit &&
                          form?.item_id == row?.item_id &&
                          column.input
                            ? column.input
                            : column.format
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
};

export default About;

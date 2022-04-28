import * as React from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

export default function ContrlledSwitch({ handleChange, checked }) {
  return (
    <FormGroup>
      <FormControlLabel
        control={<Switch onChange={handleChange} checked={checked} />}
        label="Shuffle"
      />
      {/* <FormControlLabel disabled control={<Switch />} label="Disabled" /> */}
    </FormGroup>
  );
}

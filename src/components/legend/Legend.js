import RectangleIcon from "@mui/icons-material/Rectangle";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { Box } from "@mui/system";
const Legend = () => {
  return (
    <Box
      id="legend"
      sx={{
        order: 2,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <FormGroup>
        <FormControlLabel
          sx={{
            marginRight: "auto",
            marginBottom: -5,
            padding: 3,
          }}
          control={
            <Checkbox
              sx={{
                "&.Mui-checked": {
                  color: "rgb(100, 240, 95)",
                },
              }}
              checked={true}
              checkedIcon={<RectangleIcon />}
            />
          }
          label="Completed task"
        />
        <FormControlLabel
          sx={{
            marginRight: "auto",
            padding: 3,
          }}
          control={
            <Checkbox
              sx={{
                "&.Mui-checked": {
                  color: "rgb(252, 193, 2)",
                },
              }}
              checkedIcon={<RectangleIcon />}
              checked
            />
          }
          label="Pending task"
        />
      </FormGroup>
    </Box>
  );
};
export default Legend;

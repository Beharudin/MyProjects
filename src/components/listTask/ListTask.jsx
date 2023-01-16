import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";

const ListTask = ({ list, setList }) => {
  const backHandler = () => setList("");
  return (
    <>
      <Button onClick={backHandler} sx={{ margin: 2 }}>
        <ChevronLeftIcon />
        back
      </Button>
      <Grid container display="flex">
        {list.map((el) => (
          <Card xs="3" sx={{ margin: 3 }}>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: "red[500]" }} aria-label="recipe">
                  R
                </Avatar>
              }
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
              title={`requester: ${el.details?.cust?.full_name || "John Doe"}`}
              subheader={`${new Date(
                el.details?.created_at
              ).getDay()}-${new Date(
                el.details?.created_at
              ).getDate()}-${new Date(el.details?.created_at).getFullYear()}`}
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                amount: {el.details?.loan_amount}
                <br />
                purpose: {el.details?.loan_purpose}
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <IconButton aria-label="add to favorites">
                <FavoriteIcon />
              </IconButton>
              <IconButton aria-label="share">
                <ShareIcon />
              </IconButton>
              <Button size="small" sx={{ marginLeft: "auto" }}>
                List all <ChevronRightIcon />
              </Button>
            </CardActions>
          </Card>
        ))}
      </Grid>
    </>
  );
};
export default ListTask;

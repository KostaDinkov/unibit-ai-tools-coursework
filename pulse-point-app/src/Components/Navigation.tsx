import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
export default function Navigation({ pageTitle }: { pageTitle: string }) {
  return (
    <nav>
      <Stack
        direction="row"
        alignItems={"baseLine"}
        spacing={2}
        padding={"0 0 20px 0"}
      >
        <Button>
          <Link to="/">Home</Link>
        </Button>
        <Typography variant="h4">{pageTitle}</Typography>
      </Stack>
    </nav>
  );
}

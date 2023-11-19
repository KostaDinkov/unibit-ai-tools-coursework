import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { TooltipProps } from "recharts";
import { ValueType, NameType } from "recharts/types/component/DefaultTooltipContent";

export default function CustomTooltip  (props: TooltipProps<ValueType, NameType>) {
    const { active, payload } = props;
    const comment = payload && payload.length ? payload[0].payload.comment : "";
    if (active && payload && payload.length) {
      return (
        <Box sx={{backgroundColor:"rgba(255,255,255, 0.2)", padding:"5px", borderRadius:"5px"}} >
          <Stack >
              <span>{payload[0].value}</span>
              {comment && <span>{comment}</span>}
          </Stack>
        </Box>
      );
    }
    return null;
  }
export default function CustomizedDot(props: {
  cx: number;
  cy: number;
  stroke: string;
  payload: { comment: string };
}) {
  const { cx, cy, stroke, payload } = props;

  if (payload.comment !== "" && payload.comment !== undefined) {
    return (
      <circle
        cx={cx}
        cy={cy}
        r={5}
        stroke={stroke}
        style={{ opacity: "0.9" }}
        strokeWidth={1}
        fill={"orange"}
      />
    );
  }

  return (
    <circle
      cx={cx}
      cy={cy}
      r={4}
      stroke={stroke}
      style={{ opacity: "0.9" }}
      strokeWidth={1}
      fill={"white"}
    />
  );
}

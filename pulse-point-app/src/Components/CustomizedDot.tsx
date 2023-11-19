export default function CustomizedDot(props: any) {
  const { cx, cy, stroke, payload } = props;
  console.log(props);

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

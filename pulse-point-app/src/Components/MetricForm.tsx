import { useState } from "react";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

const defaultFormState: Metric = {
  name: "",
  description: "",
  unit: "",
  preferredValue: undefined,
  id: crypto.randomUUID(),
  referenceRange: {
    min: undefined,
    max: undefined,
  },
};
export default function MetricForm({
  metric,
  isEdit,
  handleSubmit,
}: {
  metric: Metric | null;
  handleSubmit: (metric: Metric) => void;
  isEdit: boolean;
}) {
  const navigate = useNavigate();

  const [formState, setFormState] = useState(metric || defaultFormState);

  const onChange = (e: React.ChangeEvent) => {
    const { name, value } = e.target as HTMLInputElement;
    setFormState({ ...formState, [name]: value });
  };

  const onChangeRef = (e: React.ChangeEvent) => {
    const { name, value } = e.target as HTMLInputElement;
    setFormState({
      ...formState,
      referenceRange: {
        ...formState.referenceRange,
        [name]: value ? parseFloat(value) : null,
      },
    });
  };
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(formState as Metric);
      }}
    >
      <Stack direction="column" spacing={2} alignItems={'flex-start'}>
        <label>
          Name{" "}
          <input
            disabled={isEdit}
            name="name"
            type="text"
            value={formState.name}
            onChange={onChange}
            required
          />
        </label>

        <label>
          Description{" "}
          <input
            id="description"
            name="description"
            type="text"
            value={formState.description}
            onChange={onChange}
          />
        </label>

        <label>
          Unit{" "}
          <input
            name="unit"
            type="text"
            value={formState.unit}
            onChange={onChange}
            required
          />
        </label>

        <label>
          Preferred Value{" "}
          <input
            type="number"
            value={formState.preferredValue}
            onChange={onChange}
            name="preferredValue"
          />
        </label>

        <fieldset>
          <Stack direction="column" spacing={2}>
            <legend>Reference range</legend>
            <label>
              <span>Minimum Value </span>
              <input
                name="min"
                value={formState.referenceRange?.min}
                onChange={onChangeRef}
                type="number"
              />
            </label>

            <label>
              <span>Maximum Value </span>
              <input
                name="max"
                value={formState.referenceRange?.max}
                onChange={onChangeRef}
                type="number"
              />
            </label>
          </Stack>
        </fieldset>

        <Button type="submit">{isEdit ? "Edit Metric" : "Add Metric"}</Button>
        <Button
          onClick={(e) => {
            e.preventDefault();
            navigate(-1);
          }}
        >
          Cancel
        </Button>
      </Stack>
    </form>
  );
}

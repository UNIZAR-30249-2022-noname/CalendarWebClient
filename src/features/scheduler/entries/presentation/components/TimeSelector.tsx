import { Form, TimePicker } from "antd";

const format = "HH:mm";
const { RangePicker } = TimePicker;

interface TimeSelectorProps {
  setHour: React.Dispatch<React.SetStateAction<string>>;
}

export const TimeSelector = ({ setHour }: TimeSelectorProps) => {
  return (
    <Form.Item
      label="Horas"
      name="time"
      required
      rules={[
        {
          type: "array" as const,
          required: true,
          message: "Elige una hora!",
        },
      ]}
    >
      <RangePicker
        format={format}
        minuteStep={10}
        disabledHours={() => [0, 1, 2, 3, 4, 5, 6, 21, 22, 23]}
        hideDisabledOptions
        placeholder={["Inicio", "Final"]}
        onChange={(hour) => {
          console.log(hour);
          setHour("10");
        }}
      />
    </Form.Item>
  );
};

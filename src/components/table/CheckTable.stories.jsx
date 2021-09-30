import CheckTable from "./CheckTable";

export default {
  title: "components/CheckTable",
  component: CheckTable,
};

export const Default = (args) => <CheckTable {...args} />;
Default.args = {
  width: 0,
  height: 400,
  columns: [
    {
      key: "status",
      label: "Status",
      format: "status",
      sorting: false,
    },
    {
      key: "number",
      label: "Number",
      format: null,
      sorting: false,
    },
  ],
  data: [
    {
      id: "1-1",
      status: "Waiting",
      number: 123,
    },
    {
      id: "1-2",
      status: "Waiting",
      number: 123,
    },
    {
      id: "1-3",
      status: "Shipping",
      number: 12322,
    },
  ],
};

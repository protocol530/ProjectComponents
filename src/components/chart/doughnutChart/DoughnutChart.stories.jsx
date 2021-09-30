import { DoughnutChart } from "../index";

export default {
  title: "components/DoughnutChart",
  component: DoughnutChart,
};

export const Default = (args) => <DoughnutChart {...args} />;
Default.args = {
  width: 200,
  height: 200,
  data: {
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 3, 22],
        backgroundColor: ["#129BDB", "#3A9E52", "#FCA01F", "#D2D1D1"],
        borderColor: ["#129BDB", "#3A9E52", "#FCA01F", "#D2D1D1"],
        borderWidth: 1,
        cutout: 80,
      },
    ],
  },
  totalLabel: "Coconut Silo",
  totalValue: 200,
};

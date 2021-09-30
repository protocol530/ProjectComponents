import Pagination from "./index";
import { tableInfo_Request } from "../../assets/data/dummy/orderManagement";

export default {
  title: "components/Pagination",
  component: Pagination,
};

export const Default = (args) => <Pagination {...args} />;
Default.args = {
  ...tableInfo_Request.pageInfo,
};

export const OrderRequestAcceptCol = [
  {
    key: "state",
    label: "Status",
    format: "status",
    sorting: false,
    width: "17%",
  },
  {
    key: "company_name",
    label: "Company",
    format: null,
    sorting: false,
  },
  {
    key: "location",
    label: "Location",
    format: "location",
    sorting: false,
    width: "21%",
  },
  {
    key: "truck_type_ko",
    label: "Truck Type",
    format: null,
    sorting: false,
  },
  {
    key: "truck_count",
    label: "Number",
    format: "trucks",
    sorting: false,
  },
  {
    key: "truck_option_en",
    label: "Option",
    format: null,
    sorting: false,
    width: "15%",
  },
  {
    key: "info",
    label: "Product",
    format: null,
    sorting: false,
    width: "370px",
  },
];

export const OrderBeforeShipping = [
  {
    key: "order_number",
    label: "Order Number",
    format: null,
    sorting: false,
  },
  {
    key: "company_name",
    label: "Company",
    format: null,
    sorting: false,
  },
  {
    key: "location",
    label: "Location",
    format: "location",
    sorting: false,
  },
  {
    key: "truck_type_en",
    label: "Truck Type",
    format: null,
    sorting: false,
  },
  {
    key: "truck_count",
    label: "Number",
    format: "trucks",
    sorting: false,
  },
  {
    key: "truck_option_en",
    label: "Option",
    format: null,
    sorting: false,
  },
];

export const OrderCompleted = [
  {
    key: "state",
    label: "Status",
    format: "status",
    sorting: false,
    width: "17%",
  },
  {
    key: "order_number",
    label: "Order Number",
    format: null,
    sorting: false,
  },
  {
    key: "company_name",
    label: "Company",
    format: null,
    sorting: false,
  },
  {
    key: "location",
    label: "Location",
    format: "location",
    sorting: false,
    width: "21%",
  },
  {
    key: "price",
    label: "Price",
    format: "dong",
    sorting: false,
  },
  {
    key: "vat",
    label: "Tax",
    format: "dong",
    sorting: false,
  },
  {
    key: "total",
    label: "Total",
    format: "dong",
    sorting: false,
  },
];

export const findingTruck = {
  title: "Truck Select",
  columns: [
    {
      key: "status",
      label: "Status",
      format: "status",
      sorting: false,
      width: "17%",
    },
    {
      key: "number",
      label: "Number",
      format: null,
      sorting: false,
    },
    {
      key: "truckType",
      label: "Truck Type",
      format: null,
      sorting: false,
    },
    {
      key: "option",
      label: "Option",
      format: null,
      sorting: false,
      width: "15%",
    },
    {
      key: "size",
      label: "Size",
      format: null,
      sorting: false,
      width: "20.6%",
    },
    {
      key: "year",
      label: "Year",
      format: null,
      sorting: false,
      width: "6.4%",
    },
    {
      key: "garage_name",
      label: "Garage",
      format: null,
      sorting: false,
      width: "13%",
    },
    {
      key: "select",
      label: "",
      format: "select",
      sorting: false,
      width: "5.1%",
      minwidth: "173px",
    },
  ],
};
export const findingDriver = {
  title: "Driver Select",
  columns: [
    {
      key: "status",
      label: "Status",
      format: "status",
      sorting: false,
      width: "17%",
    },
    {
      key: "name",
      label: "Name",
      format: null,
      sorting: false,
      width: "16.8%",
    },
    {
      key: "contact",
      label: "Contact",
      format: null,
      sorting: false,
      width: "17.1%",
    },
    {
      key: "last_date",
      label: "Last Shipping",
      format: "date",
      sorting: false,
      width: "15.6%",
    },
    {
      key: "created",
      label: "Regist Date",
      format: "date",
      sorting: false,
      width: "29.5%",
    },
    {
      key: "select",
      label: "",
      format: "select",
      sorting: false,
      width: "5.1%",
      minwidth: "173px",
    },
  ],
};

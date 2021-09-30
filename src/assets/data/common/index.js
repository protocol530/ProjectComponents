export const color = {};

export const PATH = {
  root: "/",
  login: "/login",
  dashboard: "/dashboard",
  orderManagement_req: "/orderManagement",
  orderManagement_req_send: "/orderManagement/request/send",
  orderManagement_req_notsend: "/orderManagement/request/notsend",
  orderManagement_req_deny: "/orderManagement/request/deny",
  orderManagement_accept: "/orderManagement/accept",
  orderManagement_accept_findingDrivers:
    "/orderManagement/accept/findingDrivers",
  orderManagement_accept_findingDriversModify:
    "/orderManagement/accept/findingDriversModify",
  orderManagement_accept_detail: "/orderManagement/accept/detail",
  orderManagement_before: "/orderManagement/before",
  orderManagement_before_detail: "/orderManagement/before/detail",
  orderManagement_shipping: "/orderManagement/shipping",
  orderManagement_shipping_detail: "/orderManagement/shipping/detail",
  orderManagement_shipping_map: "/orderManagement/shipping/map",
  orderManagement_account: "/orderManagement/account",
  orderManagement_account_waiting: "/orderManagement/account/detail",
  orderManagement_account_completed: "/orderManagement/account/completed",
  vehicleManagement: "/vehicleManagement",
  vehicleManagement_registration: "/vehicleManagement/registration",
  vehicleManagement_detail: "/vehicleManagement/detail",
  vehicleManagement_modify: "/vehicleManagement/modify",
  driverManagement: "/driverManagement",
  driverManagement_registration: "/driverManagement/registration",
  driverManagement_modify: "/driverManagement/modify",
  driverManagement_detail: "/driverManagement/detail",
  garageManagement: "/garageManagement",
  serviceCenter: "/serviceCenter",
  setting: "/setting",
  myPage: "/myPage",
};

export const STATUS = {
  order_req: {
    0: "Not Quoted Yet",
    1: "Quoted",
    2: "Carrier Denied",
  },
  order_accept: {
    0: "Finding Drivers",
    1: "Allocated",
    2: "Driver Denied",
  },
  order_completed: {
    0: "Waiting",
    1: "Completed",
  },
  vehicle: {
    0: "Wating",
    1: "On the way back",
    2: "Shipping",
    3: "Unavaliable",
  },
  driver: {
    0: "Wating",
    1: "On the way back",
    2: "Shipping",
  },
};

export const DEPTH = {
  modal: 9999,
  nav: 500,
  high: 100,
  middle: 50,
  low: 30,
};

export const URLPATH = {
  s3Img: "/v1/file",
  orderRequest: "/v1/logis/order/requested",
  orderDetail: "/v1/logis/order",
  orderAccept: "/v1/logis/order/accepted",
  orderBeforeShipping: "/v1/logis/order/dispatched",
  orderShipping: "/v1/logis/order/shipping",
  orderCompleted: "/v1/logis/order/completed",
  orderAccount: "",
  loginLogis: "/v1/logis/login",
  logoutLogis: "/v1/logis/logout",
  logis: "/v1/logis",
  logisTruck: "/v1/logis/truck",
  logisOrderTruckList: "/v1/logis/dispatch/truck",
  logisOrderTruckTypeList: "/v1/logis/truck/type",
  logisOrderTruckOptionList: "/v1/logis/truck/option",
  logisOrderDriverList: "/v1/logis/dispatch/driver",
  orderOffer: "/v1/logis/offer",
  logisOrderOptionTpyeList: "/v1/logis/truck/option",
  logisDispatch: "/v1/logis/dispatch",
  logisDriver: "/v1/logis/driver",
  garage: "/v1/logis/garage",
  loogisMember: "v1/logis/member",
  dashboard: "v1/logis/dashboard",
  dashboardSales: "v1/logis/dashboard/sales",
  dashboardSchedule: "v1/logis/dashboard/schedule",
};

export const MONTHLY = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const WEEKLY = ["Sun", "Mon", "Thu", "Wed", "Thur", "Fri", "Sat"];

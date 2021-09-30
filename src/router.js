import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import {
  BaseLayout,
  DetailPageLayout,
  TabNavLayout,
} from "./components/layout";
import { PATH } from "./assets/data/common";
import { jwtVerify } from "./utils/jwt";
import Expired from "./containers/pages/expired";
import {
  Dashboard,
  Login,
  NotFound,
  OrderManagementRequest,
  OrderManagementAccept,
  OrderManagementAccount,
  OrderManagementBefore,
  OrderManagementShipping,
  VehicleManagement,
  VehicleManagementDetail,
  VehicleManagementRegistration,
  VehicleManagementModify,
  OrderManagementRequestDetail,
  OrderManagementAcceptFindingDrivers,
  OrderManagementAcceptFindingDriversModify,
  OrderManagementAcceptDetail,
  OrderManagementBeforeDetail,
  OrderManagementShippingDetail,
  OrderManagementAccountDetail,
  DriverManagement,
  DriverManagementRegistration,
  DriverManagementDetail,
  DriverManagementModify,
  GarageManagement,
} from "./containers/pages";
import Setting from "./containers/pages/Setting";

const checkAuthCompo = () => {
  const localStorage = window.localStorage.userData;
  const sessionStorage = window.sessionStorage.userData;
  try {
    //  토큰이 있으면
    jwtVerify(localStorage ? localStorage : sessionStorage);
  } catch (error) {
    //  토큰이 만료되면
    if (error.name === "TokenExpiredError") {
      return false;
    }
  }

  if (localStorage || sessionStorage) {
    return true;
  }

  return false;
};

const AuthRouter = ({ path, children, ...props }) => {
  try {
    if (window.localStorage.userData) {
      jwtVerify(window.localStorage.userData);
    } else if (window.sessionStorage.userData) {
      jwtVerify(window.sessionStorage.userData);
    }
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return <Expired />;
    }
  }

  const render = () => {
    const checkAuth = checkAuthCompo();
    return checkAuth ? children : <Redirect to="/" />;
  };
  return <Route path={path} render={render} {...props} />;
};

const PubilcRouter = ({ path, children, ...props }) => {
  const render = () => children;
  if (window.localStorage.userData || window.sessionStorage.userData) {
    return <Redirect to={PATH.dashboard} />;
  }
  return <Route path={path} render={render} {...props} />;
};

export default function _Router() {
  return (
    <BrowserRouter>
      <Switch>
        <AuthRouter
          path={[
            PATH.dashboard,
            PATH.orderManagement_req,
            PATH.orderManagement_req_send,
            PATH.orderManagement_req_notsend,
            PATH.orderManagement_req_deny,
            PATH.orderManagement_accept,
            PATH.orderManagement_accept_findingDrivers,
            PATH.orderManagement_accept_detail,
            PATH.orderManagement_before,
            PATH.orderManagement_shipping,
            PATH.orderManagement_account,
            PATH.vehicleManagement,
            PATH.vehicleManagement_detail,
            PATH.driverManagement,
            PATH.garageManagement,
            PATH.serviceCenter,
            PATH.setting,
          ]}
        >
          <BaseLayout>
            <Switch>
              <Route path={PATH.dashboard} component={Dashboard} />
              <Route
                exact
                path={[
                  PATH.orderManagement_req,
                  PATH.orderManagement_accept,
                  PATH.orderManagement_before,
                  PATH.orderManagement_shipping,
                  PATH.orderManagement_account,
                ]}
                render={() => {
                  return (
                    <TabNavLayout>
                      <Switch>
                        <Route
                          exact
                          path={PATH.orderManagement_req}
                          component={OrderManagementRequest}
                        />
                        <Route
                          path={PATH.orderManagement_accept}
                          component={OrderManagementAccept}
                        />
                        <Route
                          path={PATH.orderManagement_before}
                          component={OrderManagementBefore}
                        />
                        <Route
                          path={PATH.orderManagement_shipping}
                          component={OrderManagementShipping}
                        />
                        <Route
                          path={PATH.orderManagement_account}
                          component={OrderManagementAccount}
                        />
                      </Switch>
                    </TabNavLayout>
                  );
                }}
              />
              <Route
                exact
                path={[
                  PATH.orderManagement_req_send,
                  PATH.orderManagement_req_notsend,
                  PATH.orderManagement_req_deny,
                  PATH.orderManagement_accept_detail,
                  PATH.orderManagement_before_detail,
                  PATH.orderManagement_shipping_detail,
                  PATH.orderManagement_account_waiting,
                  PATH.orderManagement_account_completed,
                ]}
                render={() => {
                  return (
                    <DetailPageLayout>
                      <Switch>
                        <Route
                          exact
                          path={PATH.orderManagement_req_notsend}
                          render={() => {
                            return (
                              <OrderManagementRequestDetail pageType="write" />
                            );
                          }}
                        />
                        <Route
                          path={PATH.orderManagement_req_send}
                          render={() => {
                            return (
                              <OrderManagementRequestDetail pageType="send" />
                            );
                          }}
                        />
                        <Route
                          path={PATH.orderManagement_req_deny}
                          render={() => {
                            return (
                              <OrderManagementRequestDetail pageType="deny" />
                            );
                          }}
                        />
                        <Route
                          path={PATH.orderManagement_accept_detail}
                          render={() => {
                            return <OrderManagementAcceptDetail />;
                          }}
                        />
                        <Route
                          path={PATH.orderManagement_before_detail}
                          render={() => {
                            return <OrderManagementBeforeDetail />;
                          }}
                        />
                        <Route
                          path={PATH.orderManagement_shipping_detail}
                          render={() => {
                            return <OrderManagementShippingDetail />;
                          }}
                        />
                        <Route
                          path={PATH.orderManagement_account_waiting}
                          render={() => {
                            return (
                              <OrderManagementAccountDetail pageType="waiting" />
                            );
                          }}
                        />
                        <Route
                          path={PATH.orderManagement_account_completed}
                          render={() => {
                            return (
                              <OrderManagementAccountDetail pageType="completed" />
                            );
                          }}
                        />
                      </Switch>
                    </DetailPageLayout>
                  );
                }}
              />
              <Route
                exact
                path={[
                  PATH.vehicleManagement_registration,
                  PATH.vehicleManagement_modify,
                  PATH.driverManagement_registration,
                  PATH.driverManagement_modify,
                ]}
                render={() => {
                  return (
                    <DetailPageLayout shortWidth>
                      <Switch>
                        <Route
                          path={PATH.vehicleManagement_registration}
                          component={VehicleManagementRegistration}
                        />
                        <Route
                          path={PATH.vehicleManagement_modify}
                          component={VehicleManagementModify}
                        />
                        <Route
                          path={PATH.driverManagement_registration}
                          component={DriverManagementRegistration}
                        />
                        <Route
                          path={PATH.driverManagement_modify}
                          component={DriverManagementModify}
                        />
                      </Switch>
                    </DetailPageLayout>
                  );
                }}
              />

              <Route
                path={PATH.orderManagement_accept_findingDrivers}
                component={OrderManagementAcceptFindingDrivers}
              />
              <Route
                path={PATH.orderManagement_accept_findingDriversModify}
                component={OrderManagementAcceptFindingDriversModify}
              />
              <Route
                exact
                path={PATH.vehicleManagement}
                component={VehicleManagement}
              />
              <Route
                exact
                path={PATH.vehicleManagement_detail}
                component={VehicleManagementDetail}
              />
              <Route
                exact
                path={PATH.driverManagement}
                component={DriverManagement}
              />
              <Route
                path={PATH.driverManagement_detail}
                component={DriverManagementDetail}
              />
              <Route
                path={PATH.garageManagement}
                component={GarageManagement}
              />
              <Route path={PATH.setting} component={Setting} />
              <Route component={NotFound} />
            </Switch>
          </BaseLayout>
        </AuthRouter>
        <PubilcRouter exact path={[PATH.root, PATH.login]}>
          <Switch>
            <Route exact path={PATH.root} component={Login} />
            <Route exact path={PATH.login} component={Login} />
          </Switch>
        </PubilcRouter>
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}

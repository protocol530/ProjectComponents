import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import CustomLink from "./CustomLink";
import { PATH } from "../assets/data/common";
import IconImg from "./IconImg";
import { handleLogout } from "../utils/logout";
import { DEPTH } from "../assets/data/common";
import { isToggle } from "../store/reducers/commonSlice";

const navDataSet = [
  {
    imgType: "icon_home",
    imgTypeActive: "icon_home_active",
    label: "Dashboard",
    link: PATH.dashboard,
  },
  {
    imgType: "icon_dispatch",
    imgTypeActive: "icon_dispatch_active",
    label: "Order Management",
    link: PATH.orderManagement_req,
  },
  {
    imgType: "icon_vehicle",
    imgTypeActive: "icon_vehicle_active",
    label: "Vehicle Management",
    link: PATH.vehicleManagement,
  },
  {
    imgType: "icon_garage",
    imgTypeActive: "icon_garage_active",
    label: "Garage Management",
    link: PATH.garageManagement,
  },
  {
    imgType: "icon_driver",
    imgTypeActive: "icon_driver_active",
    label: "Driver Management",
    link: PATH.driverManagement,
  },
  {
    imgType: "icon_setting",
    imgTypeActive: "icon_setting_active",
    label: "Setting",
    link: PATH.setting,
  },
];

const Styled = {
  SideNav: styled.div`
    position: sticky;
    top: 0;
    left: 0;
    background-color: #192437;
    width: ${(props) => (props.isToggleWidth ? "80px" : "300px")};

    height: 100vh;
    padding: 40px 25px 171px;
    color: white;
    z-index: ${DEPTH.nav};
    .logo {
      width: ${(props) => (props.isToggleWidth ? "35px" : "200px")};
      height: 25px;
      margin-bottom: 60px;
    }

    .hamburger-btn {
      width: 80px;
      height: 60px;
      border: 0;
      background-color: transparent;
      margin-left: -25px;
    }

    .nav-bottom {
      position: absolute;
      bottom: 51px;
      left: 25px;
    }
  `,
};

export default function SideNav({}) {
  const dispatch = useDispatch();
  const inquiryTarget = useSelector((state) => {
    return state.commonSlice.navToggle;
  });
  const navToggle = () => {
    dispatch(isToggle());
  };

  return (
    <Styled.SideNav isToggleWidth={inquiryTarget}>
      <h1 className="logo">
        <IconImg
          imgType="logo"
          imgTypeActive="logo_small"
          isActive={inquiryTarget}
        />
      </h1>
      <button className="hamburger-btn" onClick={navToggle}>
        <IconImg imgType="hamburger" width={20} height={20} />
      </button>
      <div className="nav-link">
        {navDataSet.map((item) => {
          return (
            <CustomLink
              key={item.link}
              {...item}
              activeColor={"#ACC3F6"}
              gap={15}
              width={20}
              height={20}
              singleLabel={inquiryTarget}
              fontSize="15px"
            />
          );
        })}
      </div>
      <div className="nav-bottom">
        <CustomLink
          imgType="logout"
          label="Log Out"
          link="/"
          exact
          gap={15}
          width={20}
          height={20}
          singleLabel={inquiryTarget}
          fontSize="15px"
          onClick={() => handleLogout()}
        />
      </div>
    </Styled.SideNav>
  );
}

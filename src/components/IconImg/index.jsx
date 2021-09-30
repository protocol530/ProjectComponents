import styled from "styled-components";
import logo from "../../assets/img/logo.svg";
import hamburger from "../../assets/img/hamburger.svg";
import icon_dispatch from "../../assets/img/icon_dispatch.svg";
import icon_dispatch_active from "../../assets/img/icon_dispatch_active.svg";
import icon_driver from "../../assets/img/icon_driver.svg";
import icon_driver_active from "../../assets/img/icon_driver_active.svg";
import icon_service from "../../assets/img/icon_service.svg";
import icon_service_active from "../../assets/img/icon_service_active.svg";
import icon_setting from "../../assets/img/icon_setting.svg";
import icon_setting_active from "../../assets/img/icon_setting_active.svg";
import icon_vehicle from "../../assets/img/icon_vehicle.svg";
import icon_vehicle_active from "../../assets/img/icon_vehicle_active.svg";
import icon_home from "../../assets/img/icon_home.svg";
import icon_home_active from "../../assets/img/icon_home_active.svg";
import icon_garage from "../../assets/img/icon_garage.svg";
import icon_garage_active from "../../assets/img/icon_garage_active.svg";
import logo_small from "../../assets/img/logo_small.svg";
import logout from "../../assets/img/logout.svg";
import profileImg from "../../assets/img/profileImg.svg";
import prevArrow from "../../assets/img/prevArrow.svg";
import nextArrow from "../../assets/img/nextArrow.svg";
import loginImg from "../../assets/img/loginImg.svg";
import loginIcon from "../../assets/img/loginIcon.svg";
import alert from "../../assets/img/alert.svg";
import en from "../../assets/img/en.svg";

const imgInfo = {
  logo,
  hamburger,
  icon_dispatch,
  icon_dispatch_active,
  icon_driver,
  icon_driver_active,
  icon_service,
  icon_service_active,
  icon_setting,
  icon_setting_active,
  icon_vehicle,
  icon_vehicle_active,
  icon_home,
  icon_home_active,
  icon_garage,
  icon_garage_active,
  logo_small,
  logout,
  profileImg,
  prevArrow,
  nextArrow,
  loginImg,
  loginIcon,
  alert,
  en,
};

const Styled = {
  Icon: styled.img`
    display: ${(props) => (props.block ? "block" : "inline-block")};
    width: ${(props) => (props.width ? `${props.width}px` : "100%")};
    height: ${(props) => (props.height ? `${props.height}px` : "100%")};
  `,
};

export default function IconImg({
  imgType,
  imgTypeActive,
  block = false,
  isActive = false,
  width,
  height,
}) {
  return (
    <Styled.Icon
      src={isActive ? imgInfo[imgTypeActive] : imgInfo[imgType]}
      block={block}
      width={width}
      height={height}
    />
  );
}

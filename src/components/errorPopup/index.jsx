import * as React from "react";
import PortalModal from "../modal/Portal";
import { Check } from "../modal/custom";
import { useSelector } from "react-redux";

export default function ErrorPopup({ visible = false, setVisible }) {
  const errorType = useSelector((state) => state.commonSlice.errorType);

  const popup = {
    overlapLogin: <></>,
  };

  return <PortalModal visible={visible} setVisible={setVisible}></PortalModal>;
}

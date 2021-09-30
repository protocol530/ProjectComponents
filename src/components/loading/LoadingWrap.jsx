import { useSelector } from "react-redux";
import Loading from "./index";

export default function LoadingWrap({ children, pageSlice }) {
  const isLoading = useSelector((state) => state[pageSlice].isLoading);

  return isLoading ? <Loading loading={isLoading} /> : children;
}

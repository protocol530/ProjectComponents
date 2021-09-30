export const borderStyle = (border) => {
  switch (border) {
    case "bottom":
      return {
        borderBottom: "1px dotted #e3e3e3",
        // clipPath:
        //   "polygon(0 0, 100% 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 10px 100%, 0 calc(100% - 10px), 0 0)",
      };
    case "top":
      return {
        borderTop: "1px dotted #e3e3e3",
        // clipPath:
        //   "polygon(10px 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 100% 100%, 0 100%, 0 100%, 0 10px)",
      };
    case "both":
      return {
        border: "1px dotted #e3e3e3",
        // clipPath:
        //   "polygon(10px 0, calc(100% - 10px) 0, 100% 10px, 100% calc(100% - 10px), calc(100% - 10px) 100%, 10px 100%, 0 calc(100% - 10px), 0 10px)",
      };
    default:
      return;
  }
};

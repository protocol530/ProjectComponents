import * as React from "react";
import { useImmer } from "use-immer";

const Styled = {
  FileUpload: styled.div`
    .file-upload {
      display: block;
    }
    input[type="file"] {
      display: none;
    }
  `,
};

export default function FileUpload({ setFile, multiple, className, children }) {
  const onChange = (e) => {
    const target = e.target.files[0];
    setFile(target);
  };

  return (
    <Styled.FileUpload className={className}>
      <label htmlFor="uploader" className="file-upload">
        {children}
      </label>
      <input
        type="file"
        id="uploader"
        multiple={multiple}
        onChange={onChange}
      />
    </Styled.FileUpload>
  );
}

import React from "react";

const FileUpload = React.forwardRef(
  ({ value = "", label, error, isRequired = false, ...props }, ref) => {
    return (
      <div>
        <div className="bg-white border-1 rounded-xl">
          <span className="text-xs pl-2">
            {label}
            {isRequired && <span className="text-red-500 text-sm"> *</span>}
          </span>
          <div className=" flex w-full items-center justify-between space-x-4 p-2 pt-1">
            <input
              type="file"
              ref={ref}
              {...props}
              className="block w-3/4 text-sm text-white file:mr-4 file:py-1.5 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-600 hover:file:bg-green-100"
            />
            <span className="text-xs">{value?.name}</span>
          </div>
        </div>
        {error && (
          <span className="text-red-500 text-xs pl-1">{error?.message}</span>
        )}
      </div>
    );
  }
);

FileUpload.displayName = "FileUpload";

export default FileUpload;

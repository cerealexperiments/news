import React, { HTMLInputTypeAttribute } from "react";

type FormFieldProps = {
  label: string;
  value: string | undefined | File;
  className?: string;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  type: HTMLInputTypeAttribute | "textarea" | "file";
  inputSize?: "default" | "large";
};

const FormField: React.FC<FormFieldProps> = ({
  label,
  value,
  className = "",
  onChange,
  type,
  inputSize = "default",
}) => {
  return (
    <div className={`flex justify-between items-start  ${className}`}>
      <label htmlFor={label}>{label}</label>
      {type === "textarea" ? (
        <textarea
          value={value!.toString()}
          onChange={onChange}
          className={`w-full ${
            inputSize === "large" ? "max-w-xs" : "max-w-[268px]"
          } border border-slate-300 rounded-md p-1.5 pl-3 focus:outline-none`}
          id={label}
          rows={4}
        />
      ) : type === "file" ? (
        <input
          onChange={onChange}
          className="max-w-xs w-full file:py-1 file:px-4 file:border file:border-gray-300 file:text-sm file:rounded outline-none file:bg-white file:border-solid focus:outline-none"
          type="file"
          accept="image"
          title="Загрузить"
        />
      ) : (
        <input
          value={value!.toString()}
          onChange={onChange}
          className={`w-full ${
            inputSize === "large" ? "max-w-xs" : "max-w-[268px]"
          } border border-slate-300 rounded-md p-1.5 pl-3 focus:outline-none`}
          id={label}
          type={type}
        />
      )}
    </div>
  );
};

export default FormField;

import { forwardRef } from "react";

import { TextareaProps } from "@/types";

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ id, label, className, ...props }, ref) => {
    return (
      <div>
        {label && id && (
          <label htmlFor={id}>
            <h6 className="h6-regular text-base-100 ml-2.5">{label}</h6>
          </label>
        )}

        <textarea
          id={id}
          className={`${className} bg-base-500 appearance-none border border-base-500 rounded-sm text-[16px] font-medium leading-[24px] w-full pl-2.5 py-[5px] pr-[5px] text-base-100 focus:outline-none`}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };

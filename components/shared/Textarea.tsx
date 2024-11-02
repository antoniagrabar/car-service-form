import { TextareaHTMLAttributes, forwardRef } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  id?: string;
  label?: string;
  className?: string;
}

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
          className={`${className}input border-base-500`}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);
Textarea.displayName = "Textarea";

export default Textarea;

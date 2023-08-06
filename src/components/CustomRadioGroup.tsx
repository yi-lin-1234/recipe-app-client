import { RadioGroup } from "@headlessui/react";
import { CustomRadioGroupProps } from "../type";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

function CustomRadioGroup({
  label,
  value,
  onChange,
  options,
}: CustomRadioGroupProps) {
  return (
    <div className="col-span-full">
      <label className="block text-sm font-medium leading-6 text-gray-900">
        {label}
      </label>
      <div className="mt-2.5">
        <RadioGroup value={value} onChange={onChange} className="mt-2">
          <div className="grid grid-cols-4 gap-3">
            {options.map((option) => (
              <RadioGroup.Option
                key={option}
                value={option}
                className={({ active, checked }) =>
                  classNames(
                    active ? "ring-2 ring-indigo-600 ring-offset-2" : "",
                    checked
                      ? "bg-indigo-600 text-white hover:bg-indigo-500"
                      : "ring-1 ring-inset ring-gray-300 bg-white text-gray-900 hover:bg-gray-50",
                    "flex items-center justify-center rounded-md py-2 px-3 text-sm font-semibold sm:flex-1"
                  )
                }
              >
                <RadioGroup.Label as="span">{option}</RadioGroup.Label>
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      </div>
    </div>
  );
}

export default CustomRadioGroup;

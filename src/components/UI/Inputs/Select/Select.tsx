import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";

import { FaCheck, FaChevronDown } from "react-icons/fa6";
import { Fragment } from "react/jsx-runtime";
import style from "./Select.module.css";

interface SelectItem {
  id: string | number | boolean;
}

interface SelectProps<T extends SelectItem, V = T | T[keyof T]> {
  className?: string;
  items: T[];
  selected: V | null;
  labelKey: keyof T | ((item: T) => string);
  valueKey?: keyof T;
  onChange: (item: V | null) => void;
  nullLabel?: string;
  label?: string;
  showNullOption?: boolean;
}

function Select<T extends SelectItem, V = T | T[keyof T]>({
  items,
  selected,
  onChange,
  labelKey,
  valueKey,
  nullLabel = "Не выбрано",
  className,
  label,
  showNullOption = false,
}: SelectProps<T, V>): React.ReactNode {
  const selectedItem: T | null = valueKey
    ? items.find((item) => item[valueKey] === selected) || null
    : (selected as T | null);

  const getItemLabel = (item: T) => {
    if (typeof labelKey === "function") {
      return labelKey(item);
    }
    return item[labelKey] as string;
  };

  return (
    <Listbox value={selected} onChange={(value) => onChange(value)}>
      <ListboxButton as={Fragment}>
        <label className={style.textInputWrapper}>
          {label && <span className={style.textInputLabel}>{label}</span>}
          <button type="button" className={[style.button, className].join(" ")}>
            <p className={style.buttonText}>
              {selectedItem ? getItemLabel(selectedItem) : nullLabel}
            </p>
            <FaChevronDown className={style.icon} />
          </button>
        </label>
      </ListboxButton>
      <ListboxOptions
        anchor={{
          padding: 20,
          to: "bottom",
        }}
        className={style.options}
        style={{ width: "var(--button-width)" }}
      >
        {showNullOption && (
          <ListboxOption value={null} className={style.option}>
            <FaCheck className={style.buttonIcon} /> {nullLabel}
          </ListboxOption>
        )}
        {items.map((item) => (
          <ListboxOption
            key={item.id}
            value={valueKey ? item[valueKey] : item}
            className={style.option}
          >
            <FaCheck className={style.buttonIcon} /> {getItemLabel(item)}
          </ListboxOption>
        ))}
      </ListboxOptions>
    </Listbox>
  );
}

export default Select;

import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";

import style from "./Select.module.css";
import { Fragment } from "react/jsx-runtime";
import { FaChevronDown } from "react-icons/fa6";

interface SelectItem {
  id: string | number;
}

interface SelectProps<T extends SelectItem, V = T | T[keyof T]> {
  className?: string;
  items: T[];
  selected: V | null;
  labelKey: keyof T;
  valueKey?: keyof T;
  onChange: (item: V | null) => void;
  nullLabel?: string;
  label?: string;
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
}: SelectProps<T, V>): React.ReactNode {
  const selectedItem: T | null = valueKey
    ? items.find((item) => item[valueKey] === selected) || null
    : (selected as T | null);

  const change = (value: T | null) => {
    if (!value) {
      return onChange(null);
    }
    if (valueKey) {
      return onChange(value[valueKey] as V);
    }
    onChange(value as unknown as V);
  };

  return (
    <Listbox value={selected} onChange={(value) => change(value as T | null)}>
      <ListboxButton as={Fragment}>
        {label && <span className={style.inputLabel}>{label}</span>}
        <button className={[style.button, className].join(" ")}>
          <p className={style.buttonText}>
            {selectedItem ? (selectedItem[labelKey] as any) : nullLabel}
          </p>
          <FaChevronDown className={style.icon} />
        </button>
      </ListboxButton>
      <ListboxOptions anchor="bottom" className={style.options}>
        {items.map((item) => (
          <ListboxOption key={item.id} value={item} className={style.option}>
            {item[labelKey] as any}
          </ListboxOption>
        ))}
      </ListboxOptions>
    </Listbox>
  );
}

export default Select;

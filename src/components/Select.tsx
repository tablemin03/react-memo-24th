import type { ComponentProps } from "react";
import { TAG_COLORS } from "../constants/tags";
import type { MemoTag } from "../types/memos";
import PlayIcon from "./icons/PlayIcon";

type SelectOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

type SelectProps = Omit<
  ComponentProps<"select">,
  "children" | "value" | "defaultValue" | "onChange"
> & {
  options: readonly SelectOption[];
  value: string;
  onValueChange: (value: string) => void;
};

export default function Select({
  options,
  value,
  onValueChange,
  className = "",
  ...props
}: SelectProps) {
  const isSelected =
    value === "DAILY" || value === "OTHER" || value === "WORK";
  const selectedColor = isSelected
    ? TAG_COLORS[value as MemoTag]
    : "text-blue07";
  const selectedStyle = `${selectedColor} bg-blue01 text-action-medium py-1`;
  const basicStyle = "text-blue07 bg-blue01 text-action-small py-1.5";
  const selectedLabel =
    options.find((option) => option.value === value)?.label ?? "태그 선택";

  return (
    <div
      className={`relative inline-flex items-center gap-2 rounded-[36px] px-4
        ${isSelected ? selectedStyle : basicStyle} ${props.disabled ? "opacity-50" : ""} ${className}`}
    >
      {isSelected && (
        <span
          aria-hidden="true"
          className="size-5 shrink-0 rounded-full bg-current"
        />
      )}
      <span aria-hidden="true">{selectedLabel}</span>
      {!isSelected && <PlayIcon className="shrink-0" />}
      {/* 투명한 select가 아이콘을 포함한 전체 영역의 클릭을 받습니다. */}
      <select
        {...props}
        aria-label={props["aria-label"] ?? "태그 선택"}
        value={value}
        onChange={(event) => onValueChange(event.target.value)}
        className="absolute inset-0 h-full w-full cursor-pointer opacity-0 disabled:cursor-not-allowed"
      >
        {options.map(({ value, label, disabled }) => (
          <option key={value} value={value} disabled={disabled}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
}

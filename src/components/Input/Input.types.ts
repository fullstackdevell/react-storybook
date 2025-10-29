import type { InputHTMLAttributes } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;

  canTogglePassword?: boolean; // If `type="password"`: display an eye icon to toggle visibility
  isClearable?: boolean; // `clearable=true`: show a small "X" button to clear input
  onClear?: () => void;
}
import type { HTMLAttributes } from "react";

export interface MenuItem {
  id: string; 
  label: string;
  link?: string; 
  children?: MenuItem[]; 
}

export interface SidebarMenuProps extends HTMLAttributes<HTMLDivElement> {
  items: MenuItem[]; 
  isOpen: boolean; 
  onClose: () => void; 
}
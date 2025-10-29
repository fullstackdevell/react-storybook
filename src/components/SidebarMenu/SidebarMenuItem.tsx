import React, { useState } from 'react';
import type { MenuItem } from './SidebarMenu.types';

interface SidebarMenuItemProps {
    item: MenuItem;
    level: number;
    onClose: () => void;
}

const SidebarMenuItem: React.FC<SidebarMenuItemProps> = ({ item, level, onClose }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const hasChildren = item.children && item.children.length > 0;

    const handleItemClick = () => {
        if (hasChildren) {
            setIsExpanded(prev => !prev);
        } else if (item.link) {
            onClose(); 
        }
    };

    return (
        <li className={`menu-item level-${level}`}>
            <button 
                className="menu-item-button" 
                onClick={handleItemClick}
                aria-expanded={hasChildren ? isExpanded : undefined}
                aria-controls={hasChildren ? `submenu-${item.id}` : undefined}
                style={{ paddingLeft: `${15 + (level * 15)}px` }}
            >
                {item.label}
                {hasChildren && 
                    <span className="toggle-icon">
                        {isExpanded ? '▲' : '▼'}
                    </span>
                }
            </button>
            
            {hasChildren && isExpanded && (
                <ul className="submenu" id={`submenu-${item.id}`}>
                    {item.children!.map(child => (
                        <SidebarMenuItem 
                            key={child.id} 
                            item={child} 
                            level={level + 1} 
                            onClose={onClose} 
                        />
                    ))}
                </ul>
            )}
        </li>
    );
};

export default SidebarMenuItem;
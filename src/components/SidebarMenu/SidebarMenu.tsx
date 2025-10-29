import React, { useEffect, useRef } from 'react';
import type { SidebarMenuProps } from './SidebarMenu.types';
import SidebarMenuItem from './SidebarMenuItem';
import './SidebarMenu.css';

const useClickOutside = (
    ref: React.RefObject<HTMLDivElement | null>, 
    handler: (event: MouseEvent | TouchEvent) => void
) => {
    useEffect(() => {
        const listener = (event: MouseEvent | TouchEvent) => {
            if (!ref.current || ref.current.contains(event.target as Node)) {
                return;
            }
            handler(event);
        };

        document.addEventListener('mousedown', listener as any);
        document.addEventListener('touchstart', listener as any);
        
        return () => {
            document.removeEventListener('mousedown', listener as any);
            document.removeEventListener('touchstart', listener as any);
        };
    }, [ref, handler]);
};


const SidebarMenu: React.FC<SidebarMenuProps> = ({ items, isOpen, onClose, ...rest }) => {
    const sidebarRef = useRef<HTMLDivElement>(null);

    useClickOutside(sidebarRef, () => {
        if (isOpen) {
            onClose();
        }
    });

    return (
        <div 
            className={`sidebar-overlay ${isOpen ? 'is-open' : 'is-closed'}`}
            onClick={onClose} 
            {...rest}
        >
            <div 
                ref={sidebarRef}
                className="sidebar-panel"
                onClick={(e) => e.stopPropagation()} 
            >
                <nav>
                    <ul className="sidebar-menu-list">
                        {items.map(item => (
                            <SidebarMenuItem 
                                key={item.id} 
                                item={item} 
                                level={0}
                                onClose={onClose} 
                            />
                        ))}
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default SidebarMenu;
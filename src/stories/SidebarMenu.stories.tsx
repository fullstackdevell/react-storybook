import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import SidebarMenu from '../components/SidebarMenu/SidebarMenu';
import type { MenuItem, SidebarMenuProps } from '../components/SidebarMenu/SidebarMenu.types';


const nestedMenuData: MenuItem[] = [
  { id: '1', label: 'Dashboard', link: '/dashboard' },
  { id: '2', label: 'Products', children: [
    { id: '2.1', label: 'All Products', link: '/products' },
    { id: '2.2', label: 'Add New', link: '/products/new' },
    { id: '2.3', label: 'Categories', children: [
        { id: '2.3.1', label: 'Electronics', link: '/categories/electronics' },
        { id: '2.3.2', label: 'Apparel', link: '/categories/apparel' },
      ]
    },
  ]},
  { id: '3', label: 'Users', children: [
    { id: '3.1', label: 'Admins', link: '/users/admins' },
    { id: '3.2', label: 'Customers', link: '/users/customers' },
  ]},
  { id: '4', label: 'Settings', link: '/settings' },
];

const simpleMenuData: MenuItem[] = [
    { id: 'a', label: 'Home', link: '/home' },
    { id: 'b', label: 'Profile', link: '/profile' },
    { id: 'c', label: 'Logout', link: '/logout' },
];


const meta: Meta<typeof SidebarMenu> = {
    title: "Navigation/SidebarMenu",
    component: SidebarMenu,
    tags: ["autodocs"],
    parameters: {
        layout: 'fullscreen',
    },
    argTypes: {
        onClose: { action: 'menu closed' },
    }
};

export default meta;
type Story = StoryObj<typeof SidebarMenu>;

const SidebarManager = (args: Omit<SidebarMenuProps, 'isOpen' | 'onClose'>) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div style={{ padding: '20px', minHeight: '300px' }}>
            <h2>Sidebar Menu Test Bench</h2>
            <p>Use the button below to toggle the menu. Test the following:</p>
            <ul>
                <li>Clicking outside the menu to close it (Background Click).</li>
                <li>Expanding and collapsing nested submenus (Accordion).</li>
                <li>Clicking a link to close it.</li>
            </ul>

            <button onClick={() => setIsOpen(true)} disabled={isOpen} style={{ marginBottom: '20px', padding: '10px' }}>
                {isOpen ? "Menu is Open" : "Open Menu"}
            </button>
            
            <SidebarMenu 
                {...args}
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
            />
        </div>
    );
};


export const OpenAndClosedState: Story = {
    render: SidebarManager,
    args: {
        items: nestedMenuData,
    },
    name: "Test Open/Closed States (Multi-Level)",
};

export const MultiLevelNesting: Story = {
    render: SidebarManager,
    args: {
        items: nestedMenuData,
    },
    name: "Test 2-Level Nested Items & Accordion",
};

export const OneLevelMenu: Story = {
    render: SidebarManager,
    args: {
        items: simpleMenuData,
    },
    name: "Test 1-Level Items",
};
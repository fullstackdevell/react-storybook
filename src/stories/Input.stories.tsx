import type {Meta, StoryObj} from '@storybook/react';
import { useState } from 'react';
import Input from '../components/Input/Input';

const meta: Meta<typeof Input> = {
    title: "Components/Input",
    component: Input,
    tags: ["autodocs"],
    parameters: {
        layout: 'padded', 
    }
};

export default meta;
type Story = StoryObj<typeof Input>;

const InputStoryWrapper = (args: React.ComponentProps<typeof Input>) => {
    const [inputValue, setInputValue] = useState(args.value || "");

    return (
        <div style={{ maxWidth: '400px', padding: '20px' }}>
            <Input
                {...args}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onClear={args.isClearable ? () => setInputValue("") : undefined}
            />
        </div>
    );
};

export const PasswordToggle: Story = {
  render: InputStoryWrapper,
  args: {
    label: 'Password Input',
    type: 'password',
    canTogglePassword: true,
    placeholder: 'Enter secure password',
  },
};

export const ClearableInput: Story = {
  render: InputStoryWrapper,
  args: {
    label: 'Clearable Search Input',
    type: 'text',
    isClearable: true,
    placeholder: 'Start typing to clear',
    value: 'Some initial text',
  },
};

export const NumberInput: Story = {
  render: InputStoryWrapper,
  args: {
    label: 'Age Input (Number Type)',
    type: 'number',
    placeholder: 'Enter an age',
  },
};

export const DefaultText: Story = {
  render: InputStoryWrapper,
  args: {
    label: 'Standard Text Input',
    type: 'text',
    placeholder: 'Basic input field',
  },
};

export const CombinedFeatures: Story = {
  render: InputStoryWrapper,
  args: {
    label: 'Password with Clear',
    type: 'password',
    canTogglePassword: true,
    isClearable: true,
    placeholder: 'Test all features',
    value: 'Initial value for clearing',
  },
};
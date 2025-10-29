import React, { useState } from 'react';
import type { InputProps } from './Input.types';
import './Input.css';

const Input: React.FC<InputProps> = ({
    label,
    value,
    onChange,
    type = 'text',
    canTogglePassword = false,
    isClearable = false,
    onClear,
    ...rest
}) => {
    const [isTextVisible, setIsTextVisible] = useState(false);
    const isPasswordField = type === 'password';

    let actualType = type;
    if (isPasswordField && canTogglePassword && isTextVisible) {
        actualType = 'text';
    }

    const showPasswordToggle = isPasswordField && canTogglePassword;
    const showClearButton = isClearable && value && value.length > 0 && onClear;

    const inputClasses = [
        'input-field-element',
        showPasswordToggle ? 'has-toggle-control' : '',
        showClearButton ? 'has-clear-control' : ''
    ].join(' ').trim();

    return (
        <div className="input-field">
            {label && <label className="input-label" htmlFor={rest.id || label.replace(/\s/g, '-')}>{label}</label>} 

            <div className="input-control-wrapper"> 
                <input
                    {...rest}
                    className={inputClasses}
                    id={rest.id || label.replace(/\s/g, '-')}
                    type={actualType}
                    value={value}
                    onChange={onChange}
                />

                {showClearButton && (
                    <button
                        type="button"
                        className="clear-button"
                        onClick={onClear}
                        aria-label="Clear input"
                    >
                        &times;
                    </button>
                )}

                {showPasswordToggle && (
                    <button
                        type="button" 
                        className="toggle-button"
                        onClick={() => setIsTextVisible(prev => !prev)}
                        aria-label={isTextVisible ? "Hide password" : "Show password"}
                    >
                        {isTextVisible ? "🔒" : "👁️"}
                    </button>
                )}
            </div>
        </div>
    );
};
export default Input;
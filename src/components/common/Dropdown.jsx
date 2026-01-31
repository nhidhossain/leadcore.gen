import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import './Dropdown.css';

/**
 * Premium Global Dropdown Component
 * 
 * Replaces all native <select> elements with a custom, smooth, enterprise-grade dropdown
 * Matches design standards of modern SaaS tools (Notion, Linear, Stripe)
 * 
 * @param {Array} options - Array of option objects: [{ value: 'val', label: 'Label' }]
 * @param {string} value - Currently selected value
 * @param {function} onChange - Callback when selection changes: (value) => {}
 * @param {string} placeholder - Placeholder text when no value selected
 * @param {string} label - Optional label above dropdown
 * @param {boolean} disabled - Disable the dropdown
 * @param {string} className - Additional CSS classes
 * @param {boolean} fullWidth - Make dropdown full width (default: false)
 */
const Dropdown = ({
    options = [],
    value,
    onChange,
    placeholder = 'Select an option',
    label,
    disabled = false,
    className = '',
    fullWidth = false
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [focusedIndex, setFocusedIndex] = useState(-1);
    const dropdownRef = useRef(null);
    const menuRef = useRef(null);

    // Find selected option
    const selectedOption = options.find(opt => opt.value === value);
    const displayText = selectedOption ? selectedOption.label : placeholder;

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
                setFocusedIndex(-1);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            return () => document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [isOpen]);

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!isOpen) return;

            switch (e.key) {
                case 'Escape':
                    setIsOpen(false);
                    setFocusedIndex(-1);
                    break;
                case 'ArrowDown':
                    e.preventDefault();
                    setFocusedIndex(prev =>
                        prev < options.length - 1 ? prev + 1 : prev
                    );
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    setFocusedIndex(prev => prev > 0 ? prev - 1 : 0);
                    break;
                case 'Enter':
                    e.preventDefault();
                    if (focusedIndex >= 0 && focusedIndex < options.length) {
                        handleSelect(options[focusedIndex].value);
                    }
                    break;
                default:
                    break;
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown);
            return () => document.removeEventListener('keydown', handleKeyDown);
        }
    }, [isOpen, focusedIndex, options]);

    // Scroll focused item into view
    useEffect(() => {
        if (isOpen && focusedIndex >= 0 && menuRef.current) {
            const items = menuRef.current.querySelectorAll('.dropdown-item');
            if (items[focusedIndex]) {
                items[focusedIndex].scrollIntoView({
                    block: 'nearest',
                    behavior: 'smooth'
                });
            }
        }
    }, [focusedIndex, isOpen]);

    const handleToggle = () => {
        if (!disabled) {
            setIsOpen(!isOpen);
            if (!isOpen) {
                // Set initial focus to selected item or first item
                const selectedIndex = options.findIndex(opt => opt.value === value);
                setFocusedIndex(selectedIndex >= 0 ? selectedIndex : 0);
            }
        }
    };

    const handleSelect = (optionValue) => {
        onChange(optionValue);
        setIsOpen(false);
        setFocusedIndex(-1);
    };

    const containerClasses = `dropdown-container ${fullWidth ? 'dropdown-full-width' : ''} ${className}`;
    const triggerClasses = `dropdown-trigger ${isOpen ? 'dropdown-trigger-open' : ''} ${disabled ? 'dropdown-trigger-disabled' : ''}`;

    return (
        <div className={containerClasses} ref={dropdownRef}>
            {label && (
                <label className="dropdown-label">{label}</label>
            )}

            <button
                type="button"
                className={triggerClasses}
                onClick={handleToggle}
                disabled={disabled}
                aria-haspopup="listbox"
                aria-expanded={isOpen}
                aria-label={label || placeholder}
            >
                <span className={`dropdown-trigger-text ${!selectedOption ? 'dropdown-placeholder' : ''}`}>
                    {displayText}
                </span>
                <ChevronDown
                    size={18}
                    className={`dropdown-chevron ${isOpen ? 'dropdown-chevron-open' : ''}`}
                />
            </button>

            {isOpen && (
                <div
                    className="dropdown-menu"
                    ref={menuRef}
                    role="listbox"
                    aria-label={label || 'Dropdown menu'}
                >
                    {options.map((option, index) => (
                        <div
                            key={option.value}
                            className={`dropdown-item ${option.value === value ? 'dropdown-item-selected' : ''
                                } ${index === focusedIndex ? 'dropdown-item-focused' : ''
                                }`}
                            onClick={() => handleSelect(option.value)}
                            role="option"
                            aria-selected={option.value === value}
                        >
                            {option.label}
                        </div>
                    ))}
                    {options.length === 0 && (
                        <div className="dropdown-empty">No options available</div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Dropdown;

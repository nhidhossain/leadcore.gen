import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import './DatePicker.css';

const DatePicker = ({ selectedDate, onChange }) => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [isOpen, setIsOpen] = useState(false);

    // Initial ref for click outside could be added, but for now specific toggle

    // Helpers
    const getDaysInMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        return new Date(year, month + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        return new Date(year, month, 1).getDay();
    };

    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const handlePrevMonth = () => {
        const newDate = new Date(currentMonth);
        newDate.setMonth(currentMonth.getMonth() - 1);
        // Don't allow going back past current month if it's the current month? 
        // Logic: Allow viewing past months? 
        // Requirement: "no previous date should be inputed".
        // It's cleaner to disable the prev button if previous month is fully in past.
        // Simple check: if currentMonth is same as today's month, disable prev? 
        // Actually, let's just allow navigation but disable clicks.
        setCurrentMonth(newDate);
    };

    const handleNextMonth = () => {
        const newDate = new Date(currentMonth);
        newDate.setMonth(currentMonth.getMonth() + 1);
        setCurrentMonth(newDate);
    };

    const handleDateClick = (day) => {
        const clickedDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
        if (clickedDate < today) return; // Disable past dates

        onChange(clickedDate);
        setIsOpen(false);
    };

    const isSelected = (day) => {
        if (!selectedDate) return false;
        return (
            selectedDate.getDate() === day &&
            selectedDate.getMonth() === currentMonth.getMonth() &&
            selectedDate.getFullYear() === currentMonth.getFullYear()
        );
    };

    const formatDate = (date) => {
        if (!date) return '';
        return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    };

    // Generate days array
    const days = [];
    for (let i = 0; i < firstDay; i++) {
        days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }
    for (let day = 1; day <= daysInMonth; day++) {
        const dateToCheck = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
        const isDisabled = dateToCheck < today;

        days.push(
            <div
                key={day}
                className={`calendar-day ${isSelected(day) ? 'selected' : ''} ${isDisabled ? 'disabled' : ''}`}
                onClick={() => !isDisabled && handleDateClick(day)}
            >
                {day}
            </div>
        );
    }

    // Toggle Dropdown
    const toggleCalendar = () => setIsOpen(!isOpen);

    return (
        <div className="custom-datepicker-container">
            {/* Input Trigger */}
            <div className="datepicker-trigger" onClick={toggleCalendar}>
                <CalendarIcon size={20} className="datepicker-icon" />
                <span className={`datepicker-text ${!selectedDate ? 'placeholder' : ''}`}>
                    {selectedDate ? formatDate(selectedDate) : 'Select a date...'}
                </span>
            </div>

            {/* Calendar Dropdown */}
            {isOpen && (
                <div className="calendar-dropdown">
                    <div className="calendar-header">
                        <button type="button" onClick={handlePrevMonth} className="nav-btn">
                            <ChevronLeft size={20} />
                        </button>
                        <span className="month-label">
                            {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                        </span>
                        <button type="button" onClick={handleNextMonth} className="nav-btn">
                            <ChevronRight size={20} />
                        </button>
                    </div>

                    <div className="calendar-grid">
                        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
                            <div key={d} className="calendar-weekday">{d}</div>
                        ))}
                        {days}
                    </div>
                </div>
            )}
        </div>
    );
};

export default DatePicker;

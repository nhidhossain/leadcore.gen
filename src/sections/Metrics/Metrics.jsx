import React from 'react';
import './Metrics.css';

const Metrics = () => {
    const metrics = [
        { value: '50k+', label: 'Leads Generated', suffix: '' },
        { value: '1.2M', label: 'Emails Sent', suffix: '' },
        { value: '92%', label: 'Client Satisfaction', suffix: '' },
        { value: '250%', label: 'Avg. ROI Increase', suffix: '' },
    ];

    return (
        <section className="metrics-section container">
            <div className="metrics-grid">
                {metrics.map((metric, index) => (
                    <div key={index} className="metric-card">
                        <span className="metric-value">{metric.value}</span>
                        <span className="metric-label">{metric.label}</span>
                        <div className="metric-accent"></div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Metrics;

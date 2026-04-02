import React from 'react';
import './CalloutBox.css';

type CalloutType = 'warning' | 'danger' | 'info' | 'evidence';

interface CalloutBoxProps {
  type: CalloutType;
  title?: string;
  children: React.ReactNode;
}

const icons: Record<CalloutType, string> = {
  warning: '⚠️',
  danger: '🚨',
  info: '💡',
  evidence: '📊',
};

const defaultTitles: Record<CalloutType, string> = {
  warning: 'Warning',
  danger: 'Critical',
  info: 'Note',
  evidence: 'Evidence',
};

export default function CalloutBox({ type, title, children }: CalloutBoxProps) {
  return (
    <div className={`callout-box callout-${type}`}>
      <div className="callout-header">
        <span className="callout-icon">{icons[type]}</span>
        <span className="callout-title">{title || defaultTitles[type]}</span>
      </div>
      <div className="callout-content">{children}</div>
    </div>
  );
}

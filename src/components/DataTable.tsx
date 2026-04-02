import React from 'react';
import './DataTable.css';

interface DataTableProps {
  title: string;
  source: string;
  sourceUrl: string;
  lastUpdated: string;
  children: React.ReactNode;
}

export default function DataTable({ title, source, sourceUrl, lastUpdated, children }: DataTableProps) {
  return (
    <div className="data-table-wrapper">
      <div className="data-table-header">
        <h4 className="data-table-title">{title}</h4>
        <div className="data-table-meta">
          <span className="data-table-source">
            Source:{' '}
            <a href={sourceUrl} target="_blank" rel="noopener noreferrer">
              {source}
            </a>
          </span>
          <span className="data-table-date">Last Updated: {lastUpdated}</span>
        </div>
      </div>
      <div className="data-table-scroll">
        {children}
      </div>
    </div>
  );
}

import React from 'react';
import './HeroSection.css';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  chapterCount: number;
  icon?: string;
}

export default function HeroSection({ title, subtitle, chapterCount, icon = '📖' }: HeroSectionProps) {
  return (
    <div className="hero-section">
      <div className="hero-icon">{icon}</div>
      <h1 className="hero-title">{title}</h1>
      <p className="hero-subtitle">{subtitle}</p>
      <div className="hero-meta">
        <span className="hero-chapters">{chapterCount} chapters</span>
      </div>
    </div>
  );
}

import React, { useState, useEffect, useRef } from 'react';
import { Layers } from 'lucide-react';
import { SKILL_CATEGORIES } from '../data/portfolioData';

export default function Skills({ isDark }) {
  const [selectedSkillCategory, setSelectedSkillCategory] = useState('all');
  const skillsSectionRef = useRef(null);
  const [skillsAnimated, setSkillsAnimated] = useState(false);

  // Trigger smooth 0% -> target% skill progress bar animation once when Skills section enters viewport
  useEffect(() => {
    if (skillsAnimated) return;
    const node = skillsSectionRef.current;
    if (!node || typeof IntersectionObserver === 'undefined') {
      const fallbackTimer = setTimeout(() => setSkillsAnimated(true), 250);
      return () => clearTimeout(fallbackTimer);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setSkillsAnimated(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.12 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [skillsAnimated]);

  const filteredSkillCategories =
    selectedSkillCategory === 'all'
      ? SKILL_CATEGORIES
      : SKILL_CATEGORIES.filter((c) => c.id === selectedSkillCategory);

  return (
    <section
      id="skills"
      ref={skillsSectionRef}
      className="relative z-10 py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-cyan-400 mb-2">
            <Layers className="w-4 h-4" />
            <span>02 / Technical Arsenal</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Categorized Full Stack Capabilities
          </h2>
        </div>

        <div className="flex flex-wrap gap-2">
          {[
            { id: 'all', label: 'All Technologies (14)' },
            { id: 'frontend', label: 'Frontend (6)' },
            { id: 'backend', label: 'Backend (3)' },
            { id: 'database', label: 'Database (2)' },
            { id: 'tools', label: 'Tools (3)' }
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setSelectedSkillCategory(tab.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition ${
                selectedSkillCategory === tab.id
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                  : isDark
                  ? 'bg-slate-900 border border-slate-800 text-slate-300 hover:border-slate-700'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-10">
        {filteredSkillCategories.map((category) => {
          const IconComponent = category.icon;
          return (
            <div
              key={category.id}
              className={`rounded-3xl border p-6 sm:p-8 transition ${
                isDark
                  ? 'bg-slate-900/50 border-slate-800/90'
                  : 'bg-white border-slate-200 shadow-sm'
              }`}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700/70">
                  <IconComponent className={`w-6 h-6 ${category.color}`} />
                </div>
                <div>
                  <h3 className="text-xl font-bold">{category.title}</h3>
                  <p className={`text-xs font-mono ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    {category.skills.length} Core Technologies
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {category.skills.map((skill, skillIdx) => (
                  <div
                    key={skill.name}
                    className={`group relative rounded-2xl border p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-cyan-500/10 bg-gradient-to-br ${
                      category.bgGlow
                    } ${
                      isDark
                        ? `bg-slate-950/70 border-slate-800/90 ${category.borderGlow}`
                        : 'bg-slate-50/70 border-slate-200 hover:border-cyan-500/50'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h4 className="font-bold text-base group-hover:text-cyan-400 transition">
                        {skill.name}
                      </h4>
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span>Active • {skill.level}%</span>
                      </span>
                    </div>
                    <div className="text-xs font-mono text-cyan-400/90 mb-2">{skill.tag}</div>
                    <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      {skill.desc}
                    </p>
                    <div
                      className={`mt-4 h-1.5 w-full rounded-full overflow-hidden ${
                        isDark ? 'bg-slate-800/90' : 'bg-slate-200'
                      }`}
                      role="progressbar"
                      aria-label={`${skill.name} proficiency`}
                      aria-valuenow={skillsAnimated ? skill.level : 0}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    >
                      <div
                        style={{
                          width: skillsAnimated ? `${skill.level}%` : '0%',
                          transition: `width 1100ms cubic-bezier(0.22, 1, 0.36, 1) ${skillIdx * 65}ms`
                        }}
                        className="h-full bg-gradient-to-r from-cyan-400 to-violet-500 rounded-full group-hover:brightness-110 transition-[filter] duration-300"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

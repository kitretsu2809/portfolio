'use client';
import React, { useState } from 'react';
import { Folder, FileText, ArrowLeft, Code, Link, GitBranch } from 'lucide-react';
import { motion } from 'framer-motion';
import portfolioData from '@/data/portfolio.json';

interface Project {
  id: number;
  name: string;
  type: 'folder';
  description: string;
  stack: string[];
  repoLink: string;
  liveLink: string;
  details: string[];
}

const PROJECTS: Project[] = portfolioData.projects?.map(p => ({
  ...p,
  type: 'folder' as const,
  stack: p.tech,
  repoLink: `https://github.com/kitretsu2809/${p.name.toLowerCase().replace(/\s+/g, '-')}`,
  liveLink: `https://${p.name.toLowerCase().replace(/\s+/g, '-')}.vercel.app`,
  details: [
    `Status: ${p.status}`,
    `Tech Stack: ${p.tech.join(', ')}`,
    p.description
  ]
})) || [];

const FileIcon: React.FC<{ name: string, icon: React.ReactNode, onClick: () => void }> = ({ name, icon, onClick }) => (
  <button 
    onClick={onClick}
    className="
      flex items-center space-x-3 p-3 rounded-lg 
      hover:bg-pop-light-accent/30 transition-colors 
      w-full text-left border-b border-pop-text-muted/10
    "
  >
    <span className="text-xl">{icon}</span>
    <span className="font-sans text-sm font-medium">{name}</span>
  </button>
);


const FileExplorerApp: React.FC = () => {
  const [currentView, setCurrentView] = useState<'list' | 'project'>('list');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleOpenProject = (project: Project) => {
    setSelectedProject(project);
    setCurrentView('project');
  };

  const handleBack = () => {
    setCurrentView('list');
    setSelectedProject(null);
  };

  const renderListView = () => (
    <div className="flex flex-col space-y-1">
      <h3 className="text-pop-text-light/80 text-lg mb-4 border-b border-pop-text-muted/20 pb-2 font-semibold">
        📂 /home/developer/Projects
      </h3>
      {PROJECTS.map(project => (
        <FileIcon 
          key={project.id}
          name={project.name}
          icon={<Folder size={20} className="text-yellow-400" />}
          onClick={() => handleOpenProject(project)}
        />
      ))}
    </div>
  );

  const renderProjectView = (project: Project) => (
    <motion.div 
      className="text-pop-text-light space-y-6"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <button 
        onClick={handleBack}
        className="flex items-center text-pop-accent hover:text-pop-light-accent transition-colors p-1 rounded-md mb-4 text-sm font-medium"
      >
        <ArrowLeft size={16} className="mr-2" /> Back to Repositories
      </button>

      <h2 className="text-3xl font-extrabold text-pop-accent border-b border-pop-text-muted/30 pb-3">{project.name}</h2>
      <p className="text-pop-text-muted italic">{project.description}</p>
      <div>
        <h4 className="font-semibold text-lg text-pop-text-light">Stack:</h4>
        <div className="flex flex-wrap gap-2 pt-1">
          {project.stack.map((tech, index) => (
            <span 
              key={index} 
              className="bg-pop-light-accent/20 text-pop-light-accent text-xs font-mono px-3 py-1 rounded-full shadow-inner"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
      <div>
        <h4 className="font-semibold text-lg text-pop-text-light">Features & Details:</h4>
        <ul className="list-disc list-inside space-y-2 pl-4 text-sm">
          {project.details.map((detail, index) => (
            <li key={index} className="text-pop-text-muted/90">{detail}</li>
          ))}
        </ul>
      </div>
      <div className="flex space-x-4 pt-6">
        <a 
          href={project.repoLink} 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-pop-accent hover:bg-pop-light-accent text-white font-semibold py-2 px-4 rounded transition-colors flex items-center shadow-md"
        >
          <GitBranch size={18} className="mr-2" /> View Repository
        </a>
        <a 
          href={project.liveLink === 'current-site' ? '#' : project.liveLink} 
          target="_blank" 
          rel="noopener noreferrer"
          className="border border-pop-accent text-pop-accent hover:bg-pop-accent/10 font-semibold py-2 px-4 rounded transition-colors flex items-center shadow-sm"
        >
          <Link size={18} className="mr-2" /> Live Demo
        </a>
      </div>

    </motion.div>
  );

  return (
    <div className="w-full h-full bg-pop-dark/95 text-pop-text-light p-6 overflow-y-auto">
      {currentView === 'list' 
        ? renderListView() 
        : selectedProject && renderProjectView(selectedProject)
      }
    </div>
  );
};

export default FileExplorerApp;
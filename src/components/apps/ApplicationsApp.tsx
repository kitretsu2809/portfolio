'use client';

import React from 'react';
import { User, Briefcase, Mail, MapPin, Calendar, Award } from 'lucide-react';
import portfolioData from '@/data/portfolio.json';

const ApplicationsApp: React.FC = () => {
  const userInfo = {
    name: portfolioData.personal.name,
    profession: portfolioData.personal.profession,
    email: portfolioData.personal.email,
    location: portfolioData.personal.location,
    joinDate: portfolioData.personal.joinDate,
    bio: portfolioData.personal.bio,
    skills: portfolioData.skills,
    experience: portfolioData.experience
  };

  return (
    <div className="h-full overflow-y-auto bg-gradient-to-br from-pop-dark via-pop-dark to-pop-light-accent/10">
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <div className="bg-pop-light-accent/10 backdrop-blur-sm border border-pop-light-accent/30 rounded-lg p-6">
          <div className="flex items-start space-x-4">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-pop-accent to-pop-light-accent flex items-center justify-center text-4xl font-bold text-white">
              {userInfo.name.charAt(0)}
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-pop-text-light mb-1">{userInfo.name}</h1>
              <p className="text-xl text-pop-accent mb-2">{userInfo.profession}</p>
              <div className="flex flex-wrap gap-4 text-sm text-pop-text-muted">
                <a href={`mailto:${userInfo.email}`} className="flex items-center space-x-1 hover:text-pop-accent transition-colors cursor-pointer">
                  <Mail size={14} />
                  <span>{userInfo.email}</span>
                </a>
                <div className="flex items-center space-x-1">
                  <MapPin size={14} />
                  <span>{userInfo.location}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar size={14} />
                  <span>Joined {userInfo.joinDate}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-pop-light-accent/10 backdrop-blur-sm border border-pop-light-accent/30 rounded-lg p-6">
          <div className="flex items-center space-x-2 mb-3">
            <User className="text-pop-accent" size={20} />
            <h2 className="text-xl font-semibold text-pop-text-light">About</h2>
          </div>
          <p className="text-pop-text-muted leading-relaxed">{userInfo.bio}</p>
        </div>
        <div className="bg-pop-light-accent/10 backdrop-blur-sm border border-pop-light-accent/30 rounded-lg p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Award className="text-pop-accent" size={20} />
            <h2 className="text-xl font-semibold text-pop-text-light">Skills & Expertise</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {userInfo.skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1.5 bg-pop-accent/20 border border-pop-accent/40 rounded-full text-sm text-pop-text-light hover:bg-pop-accent/30 transition-colors"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
        <div className="bg-pop-light-accent/10 backdrop-blur-sm border border-pop-light-accent/30 rounded-lg p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Briefcase className="text-pop-accent" size={20} />
            <h2 className="text-xl font-semibold text-pop-text-light">Experience</h2>
          </div>
          <div className="space-y-4">
            {userInfo.experience.map((exp, index) => (
              <div
                key={index}
                className="border-l-2 border-pop-accent/50 pl-4 pb-4 last:pb-0"
              >
                <h3 className="text-lg font-semibold text-pop-text-light">{exp.role}</h3>
                <p className="text-pop-accent text-sm mb-1">{exp.company}</p>
                <p className="text-xs text-pop-text-muted mb-2">{exp.period}</p>
                <p className="text-sm text-pop-text-muted">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="text-center text-xs text-pop-text-muted pt-4 pb-2">
          <p>💡 Tip: Update your info in src/data/portfolio.json</p>
        </div>
      </div>
    </div>
  );
};

export default ApplicationsApp;

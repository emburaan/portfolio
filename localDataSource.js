/**
 * DATA LAYER — Local Data Source
 * Provides static portfolio data (replace with API/CMS in production)
 */

import { Developer, Project, Skill, SkillGroup } from '../../domain/model/entities.js';

export class LocalPortfolioDataSource {
  getDeveloperData() {
    return new Developer({
      name: 'Your Name',
      title: 'Android Developer',
      tagline: '六年半の経験 — Crafting seamless Android experiences with precision, purpose & wabi-sabi.',
      yearsOfExperience: 6.5,
      company: 'Deloitte',
      role: 'Technology Consultant',
      email: 'your@email.com',
      github: 'https://github.com/yourhandle',
      linkedin: 'https://linkedin.com/in/yourname',
    });
  }

  getProjectsData() {
    return [
      new Project({
        id: 'fintrack-pro',
        index: '01',
        title: 'FinTrack Pro',
        role: 'Lead Android Developer · Deloitte',
        description: 'Enterprise financial tracking application serving 500K+ users. Built with Jetpack Compose, MVVM, and real-time sync via Firebase.',
        tags: ['Kotlin', 'Compose', 'MVVM', 'Firebase'],
        impact: '500K+ users',
        featured: true,
        link: '#',
      }),
      new Project({
        id: 'healthpulse',
        index: '02',
        title: 'HealthPulse',
        role: 'Android Architect · Healthcare Client',
        description: 'Patient-facing health monitoring app with Bluetooth device integration and encrypted data storage. HIPAA compliant architecture.',
        tags: ['Kotlin', 'BLE', 'Clean Arch', 'Hilt'],
        impact: '1M+ downloads',
        featured: true,
        link: '#',
      }),
      new Project({
        id: 'logiflow',
        index: '03',
        title: 'LogiFlow',
        role: 'Senior Android Dev · Logistics Startup',
        description: 'Real-time logistics tracking platform with offline-first architecture. Handles 10K+ concurrent deliveries with sub-second updates.',
        tags: ['Kotlin', 'Room DB', 'WorkManager', 'Maps SDK'],
        impact: '10K deliveries/day',
        featured: false,
        link: '#',
      }),
      new Project({
        id: 'edukan',
        index: '04',
        title: 'EduKan',
        role: 'Personal Project',
        description: 'Japanese language learning app with spaced repetition and handwriting recognition. A passion project inspired by love for Japanese culture.',
        tags: ['Kotlin', 'ML Kit', 'Compose'],
        impact: 'Open Source',
        featured: false,
        link: 'https://github.com/yourhandle/edukan',
      }),
    ];
  }

  getSkillGroupsData() {
    return [
      new SkillGroup({
        title: 'Core',
        kanji: '核',
        skills: [
          new Skill({ name: 'Kotlin', level: 95, category: 'core' }),
          new Skill({ name: 'Java', level: 90, category: 'core' }),
          new Skill({ name: 'Jetpack Compose', level: 88, category: 'core' }),
          new Skill({ name: 'Android SDK', level: 85, category: 'core' }),
        ],
      }),
      new SkillGroup({
        title: 'Architecture',
        kanji: '建',
        skills: [
          new Skill({ name: 'Clean Architecture', level: 92, category: 'architecture' }),
          new Skill({ name: 'MVVM / MVI', level: 90, category: 'architecture' }),
          new Skill({ name: 'Hilt / Dagger', level: 85, category: 'architecture' }),
          new Skill({ name: 'Coroutines / Flow', level: 80, category: 'architecture' }),
        ],
      }),
      new SkillGroup({
        title: 'Tools',
        kanji: '道',
        skills: [
          new Skill({ name: 'Firebase', level: 88, category: 'tools' }),
          new Skill({ name: 'Retrofit / OkHttp', level: 82, category: 'tools' }),
          new Skill({ name: 'Room Database', level: 78, category: 'tools' }),
          new Skill({ name: 'CI/CD · Git', level: 75, category: 'tools' }),
        ],
      }),
    ];
  }
}

// Mock contact sender (replace with email service in production)
export class MockContactDataSource {
  async sendMessage(message) {
    console.log('[ContactDataSource] Sending message:', message);
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    return { success: true };
  }
}

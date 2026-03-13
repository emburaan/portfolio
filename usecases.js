/**
 * DOMAIN LAYER — Use Cases
 * Clean Architecture: business logic, orchestrates entities & repositories
 */

import { ContactMessage } from '../model/entities.js';

// ----- GetDeveloperUseCase -----
export class GetDeveloperUseCase {
  /** @param {import('../repository/interfaces.js').PortfolioRepository} repository */
  constructor(repository) {
    this.repository = repository;
  }

  /** @returns {Promise<import('../model/entities.js').Developer>} */
  async execute() {
    return this.repository.getDeveloper();
  }
}

// ----- GetProjectsUseCase -----
export class GetProjectsUseCase {
  constructor(repository) {
    this.repository = repository;
  }

  /**
   * @param {{ featuredOnly?: boolean }} params
   * @returns {Promise<import('../model/entities.js').Project[]>}
   */
  async execute({ featuredOnly = false } = {}) {
    const projects = await this.repository.getProjects();
    return featuredOnly ? projects.filter(p => p.featured) : projects;
  }
}

// ----- GetSkillGroupsUseCase -----
export class GetSkillGroupsUseCase {
  constructor(repository) {
    this.repository = repository;
  }

  /** @returns {Promise<import('../model/entities.js').SkillGroup[]>} */
  async execute() {
    return this.repository.getSkillGroups();
  }
}

// ----- SendContactMessageUseCase -----
export class SendContactMessageUseCase {
  /** @param {import('../repository/interfaces.js').ContactRepository} contactRepository */
  constructor(contactRepository) {
    this.contactRepository = contactRepository;
  }

  /**
   * @param {{ senderName: string, senderEmail: string, body: string }} params
   * @returns {Promise<{ success: boolean }>}
   */
  async execute({ senderName, senderEmail, body }) {
    const message = new ContactMessage({ senderName, senderEmail, body });
    return this.contactRepository.sendMessage(message);
  }
}

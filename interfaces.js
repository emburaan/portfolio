/**
 * DOMAIN LAYER — Repository Interfaces (Contracts)
 * Clean Architecture: define contracts, not implementations
 */

// Abstract base — not enforced in JS but serves as documentation contract
export class PortfolioRepository {
  /** @returns {Promise<Developer>} */
  async getDeveloper() { throw new Error('Not implemented'); }

  /** @returns {Promise<Project[]>} */
  async getProjects() { throw new Error('Not implemented'); }

  /** @returns {Promise<SkillGroup[]>} */
  async getSkillGroups() { throw new Error('Not implemented'); }
}

export class ContactRepository {
  /**
   * @param {ContactMessage} message
   * @returns {Promise<{ success: boolean }>}
   */
  async sendMessage(message) { throw new Error('Not implemented'); }
}

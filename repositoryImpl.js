/**
 * DATA LAYER — Repository Implementations
 * Clean Architecture: implements domain contracts using data sources
 */

import { PortfolioRepository, ContactRepository } from '../../domain/repository/interfaces.js';
import { LocalPortfolioDataSource, MockContactDataSource } from '../datasource/localDataSource.js';

export class PortfolioRepositoryImpl extends PortfolioRepository {
  /** @param {LocalPortfolioDataSource} dataSource */
  constructor(dataSource) {
    super();
    this.dataSource = dataSource;
  }

  async getDeveloper() {
    return this.dataSource.getDeveloperData();
  }

  async getProjects() {
    return this.dataSource.getProjectsData();
  }

  async getSkillGroups() {
    return this.dataSource.getSkillGroupsData();
  }
}

export class ContactRepositoryImpl extends ContactRepository {
  /** @param {MockContactDataSource} dataSource */
  constructor(dataSource) {
    super();
    this.dataSource = dataSource;
  }

  async sendMessage(message) {
    return this.dataSource.sendMessage(message);
  }
}

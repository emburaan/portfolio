/**
 * DI LAYER — Dependency Injection Container
 * Clean Architecture: wires all layers together at the composition root
 */

import { LocalPortfolioDataSource, MockContactDataSource } from '../data/datasource/localDataSource.js';
import { PortfolioRepositoryImpl, ContactRepositoryImpl } from '../data/repository/repositoryImpl.js';
import {
  GetDeveloperUseCase,
  GetProjectsUseCase,
  GetSkillGroupsUseCase,
  SendContactMessageUseCase,
} from '../domain/usecase/usecases.js';

// Singleton DI container
class DIContainer {
  constructor() {
    // --- Data Sources ---
    this._localPortfolioDS = new LocalPortfolioDataSource();
    this._mockContactDS = new MockContactDataSource();

    // --- Repositories ---
    this._portfolioRepo = new PortfolioRepositoryImpl(this._localPortfolioDS);
    this._contactRepo = new ContactRepositoryImpl(this._mockContactDS);

    // --- Use Cases ---
    this.getDeveloperUseCase = new GetDeveloperUseCase(this._portfolioRepo);
    this.getProjectsUseCase = new GetProjectsUseCase(this._portfolioRepo);
    this.getSkillGroupsUseCase = new GetSkillGroupsUseCase(this._portfolioRepo);
    this.sendContactMessageUseCase = new SendContactMessageUseCase(this._contactRepo);
  }
}

// Export a single shared instance (module-level singleton)
export const di = new DIContainer();

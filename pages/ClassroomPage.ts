import { type Page, type Locator } from '@playwright/test';

export class ClassroomPage {
  readonly page: Page;
  readonly classroomInfoRegion: Locator;
  readonly miProgresoLink: Locator;
  readonly listasDeTareasLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.classroomInfoRegion = page.getByRole('main').getByRole('region').first();
    this.miProgresoLink = page.getByRole('link', { name: 'Mi progreso' });
    this.listasDeTareasLink = page.getByRole('link', { name: 'Lista de Tareas' });
  }

  async waitForLoad() {
    await this.classroomInfoRegion.waitFor({ state: 'visible' });
  }

  async navigateToMyProgress() {
    await this.miProgresoLink.waitFor({ state: 'visible' });
    await this.miProgresoLink.click();
  }

  async navigateToTaskList() {
    await this.listasDeTareasLink.waitFor({ state: 'visible' });
    await this.listasDeTareasLink.click();
  }
}

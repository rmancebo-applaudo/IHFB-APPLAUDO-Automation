import { type Page, type Locator } from '@playwright/test';

export class ClassroomPage {
  readonly page: Page;
  readonly classroomInfoRegion: Locator;
  readonly classroomTitle: Locator;
  readonly miProgresoLink: Locator;
  readonly listasDeTareasLink: Locator;
  readonly trimesterList: Locator;

  constructor(page: Page) {
    this.page = page;
    this.classroomInfoRegion = page.getByRole('main').getByRole('region').first();
    this.classroomTitle = page.locator("xpath=//p[contains(@class,'h4')]").first();
    this.miProgresoLink = page.getByRole('link', { name: 'Mi progreso' });
    this.listasDeTareasLink = page.getByRole('link', { name: 'Lista de Tareas' });
    this.trimesterList = page.locator("xpath=//div[contains(@class,'ExpansionPanel_headerContainer')]");
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

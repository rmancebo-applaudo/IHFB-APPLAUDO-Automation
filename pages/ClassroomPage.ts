import { type Page, type Locator } from '@playwright/test';

export class ClassroomPage {
  readonly page: Page;
  readonly classroomInfoRegion: Locator;
  readonly classroomTitle: Locator;
  readonly miProgresoLink: Locator;
  readonly listaDeTareasLink: Locator;
  readonly errorNotebookLink: Locator;
  readonly trimesterList: Locator;

  constructor(page: Page) {
    this.page = page;
    this.classroomInfoRegion = page.getByRole('main').getByRole('region').first();
    this.classroomTitle = page.locator("xpath=//p[contains(@class,'h4')]").first();
    this.miProgresoLink = page.getByRole('link', { name: 'Mi progreso' });
    this.listaDeTareasLink = page.getByRole('navigation').getByRole('link', { name: 'Lista de tareas' });
    this.errorNotebookLink = page.getByRole('navigation').getByRole('link', { name: 'Libreta de fallos' });
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
    await this.listaDeTareasLink.waitFor({ state: 'visible' });
    await this.listaDeTareasLink.click();
  }

  async navigateToErrorNotebook() {
    await this.errorNotebookLink.waitFor({ state: 'visible' });
    await this.errorNotebookLink.click();
  }
}

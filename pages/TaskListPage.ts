import { type Page, type Locator } from '@playwright/test';

export class TaskListPage {
  readonly page: Page;
  readonly heading: Locator;
  readonly noAssignmentsText: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByRole('heading', { name: 'Lista de Tareas' });
    this.noAssignmentsText = page.getByText('Aún no tienes tareas asignadas.');
  }

  async waitForLoad() {
    await this.heading.waitFor({ state: 'visible' });
    await this.page.waitForLoadState('domcontentloaded');
  }
}

import { type Page, type Locator } from '@playwright/test';

export class TaskListPage {
  readonly page: Page;
  readonly taskListHeading: Locator;
  readonly taskItems: Locator;

  constructor(page: Page) {
    this.page = page;
    this.taskListHeading = page.getByRole('heading', { name: 'Lista de tareas', level: 1 });
    this.taskItems = page.getByRole('main').getByRole('list').getByRole('listitem');
  }

  async waitForLoad() {
    await this.taskListHeading.waitFor({ state: 'visible' });
  }

  async clickFirstTask() {
    await this.taskItems.first().getByRole('link').click();
  }
}

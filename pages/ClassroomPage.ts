import { type Page, type Locator } from '@playwright/test';

export class ClassroomPage {
  readonly page: Page;
  readonly classroomInfoRegion: Locator;
  readonly miProgresoLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.classroomInfoRegion = page.getByRole('main').getByRole('region').first();
    this.miProgresoLink = page.getByRole('link', { name: 'Mi progreso' });
  }

  async waitForLoad() {
    await this.classroomInfoRegion.waitFor({ state: 'visible' });
  }

  async navigateToMyProgress() {
    await this.miProgresoLink.waitFor({ state: 'visible' });
    await this.miProgresoLink.click();
  }
}

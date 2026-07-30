import { type Page, type Locator } from '@playwright/test';

export class ClassroomPage {
  readonly page: Page;
  readonly classroomInfoRegion: Locator;
  readonly classroomTitle: Locator;
  readonly miProgresoLink: Locator;
  readonly trimesterList: Locator;

  constructor(page: Page) {
    this.page = page;
    this.classroomInfoRegion = page.getByRole('main').getByRole('region').first();
    this.classroomTitle = page.locator("//p[contains(@class,'h4')]");
    this.miProgresoLink = page.getByRole('link', { name: 'Mi progreso' });
    this.trimesterList = page.locator("//div[contains(@class,'ExpansionPanel_headerContainer')]");
  }

    async waitForLoad() {
    await this.classroomInfoRegion.waitFor({ state: 'visible' });
  }

  async navigateToMyProgress() {
    await this.miProgresoLink.waitFor({ state: 'visible' });
    await this.miProgresoLink.click();
  }
}

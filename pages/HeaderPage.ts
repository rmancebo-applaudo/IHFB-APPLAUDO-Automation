import { type Page, type Locator } from '@playwright/test';

export class HeaderPage {
  readonly page: Page;
  readonly accountButton: Locator;
  readonly logOutButton: Locator;
  readonly studentNameInMenu: Locator;

  constructor(page: Page) {
    this.page = page;
    this.accountButton = page.getByRole('button', { name: /Información de la cuenta/ });
    this.logOutButton = page.getByRole('menuitem', { name: 'Cerrar sesión' });
    this.studentNameInMenu = page.locator("xpath=//p[contains(text(),'Student')]");
  }

  async openAccountMenu() {
    await this.accountButton.click();
  }
}

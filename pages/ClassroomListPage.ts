import { type Page, type Locator } from '@playwright/test';

export class ClassroomListPage {
  readonly page: Page;
  readonly gestionDeAulasTitle: Locator;
  readonly listaDeAulasHeading: Locator;
  readonly yearLabel: Locator;
  readonly dateButton: Locator;
  readonly accountButton: Locator;
  readonly logoutMenuItem: Locator;
  readonly allClassroomsTab: Locator;
  readonly classroomItems: Locator;

  constructor(page: Page) {
    this.page = page;
    this.gestionDeAulasTitle = page.getByText('Gestión de Aulas').first();
    this.listaDeAulasHeading = page.getByRole('heading', { name: 'Lista de Aulas', level: 1 });
    this.yearLabel = page.locator('main p').filter({ hasText: new RegExp(`^${new Date().getFullYear()}$`) });
    this.dateButton = page.getByRole('button', { name: /,\s*\d{1,2}\s+de\s+/ });
    this.accountButton = page.getByRole('button', { name: /Información de la cuenta/ });
    this.logoutMenuItem = page.getByRole('menuitem', { name: 'Cerrar sesión' });
    this.allClassroomsTab = page.getByRole('tab', { name: /Todo/ });
    this.classroomItems = page.getByRole('list').getByRole('listitem');
  }

  async waitForLoad() {
    await this.listaDeAulasHeading.waitFor({ state: 'visible' });
  }

  async openAccountMenu() {
    await this.accountButton.click();
  }

  async selectAllClassroomsTab() {
    await this.allClassroomsTab.click();
  }

  classroomItemTitle(nth: number): Locator {
    return this.classroomItems.nth(nth).getByRole('heading', { level: 3 });
  }

  classroomItemIcon(nth: number): Locator {
    return this.classroomItems.nth(nth).getByRole('img');
  }
}

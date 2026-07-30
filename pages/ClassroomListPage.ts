import { type Page, type Locator } from '@playwright/test';

export class ClassroomListPage {
  readonly page: Page;
  readonly gestionDeAulasTitle: Locator;
  readonly listaDeAulasHeading: Locator;
  readonly yearLabel: Locator;
  readonly dateButton: Locator;
  readonly allClassroomsTab: Locator;
  readonly classroomItems: Locator;
  readonly datePicker: Locator;
  readonly cancelarButton: Locator;
  readonly confirmarButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.gestionDeAulasTitle = page.getByText('Gestión de Aulas').first();
    this.listaDeAulasHeading = page.getByRole('heading', { name: 'Lista de Aulas', level: 1 });
    this.yearLabel = page.locator('main p').filter({ hasText: new RegExp(`^${new Date().getFullYear()}$`) });
    this.dateButton = page.getByRole('button', { name: /,\s*\d{1,2}\s+de\s+/ });
    this.allClassroomsTab = page.getByRole('tab', { name: /Todo/ });
    this.classroomItems = page.getByRole('list').getByRole('listitem');
    this.datePicker = page.getByRole('dialog');
    this.cancelarButton = this.datePicker.getByRole('button', { name: 'Cancelar' });
    this.confirmarButton = this.datePicker.getByRole('button', { name: 'Confirmar' });
  }

  async waitForLoad() {
    await this.listaDeAulasHeading.waitFor({ state: 'visible' });
    await this.page.waitForLoadState('networkidle');
  }

  async selectAllClassroomsTab() {
    await this.allClassroomsTab.click();
  }

  async clickClassroomItem(nth: number = 0) {
    await this.classroomItems.nth(nth).getByRole('heading').getByRole('link').click();
  }

  classroomItemTitle(nth: number): Locator {
    return this.classroomItems.nth(nth).getByRole('heading', { level: 3 });
  }

  classroomItemIcon(nth: number): Locator {
    return this.classroomItems.nth(nth).getByRole('img');
  }
}

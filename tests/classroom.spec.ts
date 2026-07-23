import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ClassroomListPage } from '../pages/ClassroomListPage';

const STUDENT_EMAIL = 'qa1s1@test.com';
const STUDENT_PASSWORD = 'test123';

test('EI-T138 - Home/Pantalla de Inicio (Estudiante) - Validación general', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const classroomListPage = new ClassroomListPage(page);

  // Step 1: Ir a la página correspondiente
  await loginPage.goto();
  await expect(loginPage.emailInput).toBeVisible();
  await expect(loginPage.passwordInput).toBeVisible();
  await expect(loginPage.loginButton).toBeVisible();

  // Step 2: Iniciar sesión como estudiante y validar la pantalla de inicio
  await loginPage.login(STUDENT_EMAIL, STUDENT_PASSWORD);
  await classroomListPage.waitForLoad();

  // Título: Gestión de Aulas
  await expect(classroomListPage.gestionDeAulasTitle).toBeVisible();

  // Lista de Aulas heading
  await expect(classroomListPage.listaDeAulasHeading).toBeVisible();

  // Fecha
  await expect(classroomListPage.yearLabel).toBeVisible();
  await expect(classroomListPage.dateButton).toBeVisible();

  // Icono con el nombre del estudiante
  await expect(classroomListPage.accountButton).toBeVisible();

  // Opción de Cerrar Sesión
  await classroomListPage.openAccountMenu();
  await expect(classroomListPage.logoutMenuItem).toBeVisible();
  await page.keyboard.press('Escape');

  // Botones para acceder al aula correspondiente - validar ícono y título por cada aula
  await classroomListPage.selectAllClassroomsTab();
  const itemCount = await classroomListPage.classroomItems.count();
  for (let i = 0; i < itemCount; i++) {
    await expect(classroomListPage.classroomItemTitle(i)).toBeVisible();
    await expect(classroomListPage.classroomItemIcon(i)).toBeVisible();
  }
});
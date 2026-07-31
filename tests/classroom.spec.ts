import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ClassroomListPage } from '../pages/ClassroomListPage';
import { ClassroomPage } from '../pages/ClassroomPage';
import { DashboardPage } from '../pages/DashboardPage';
import { HeaderPage } from '../pages/HeaderPage';
import { TaskListPage } from '../pages/TaskListPage';

const STUDENT_EMAIL = 'qa1s1@test.com';
const STUDENT_PASSWORD = 'test123';
const STUDENT_NAME = 'Student';

test('EI-T138 - Home/Pantalla de Inicio (Estudiante) - Validación general', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const classroomListPage = new ClassroomListPage(page);
  const headerPage = new HeaderPage(page);

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
  await expect(headerPage.accountButton).toBeVisible();

  // Opción de Cerrar Sesión
  await headerPage.openAccountMenu();
  await expect(headerPage.logOutButton).toBeVisible();
  await page.keyboard.press('Escape');

  // Botones para acceder al aula correspondiente - validar ícono y título por cada aula
  await classroomListPage.selectAllClassroomsTab();
  const itemCount = await classroomListPage.classroomItems.count();
  for (let i = 0; i < itemCount; i++) {
    await expect(classroomListPage.classroomItemTitle(i)).toBeVisible();
    await expect(classroomListPage.classroomItemIcon(i)).toBeVisible();
  }
});

test('EI-T145 - Tablero (Estudiante) - Validación general', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const classroomListPage = new ClassroomListPage(page);
  const classroomPage = new ClassroomPage(page);
  const dashboardPage = new DashboardPage(page);

  // Step 1: Ir a la página correspondiente
  await loginPage.goto();
  await expect(loginPage.emailInput).toBeVisible();
  await expect(loginPage.passwordInput).toBeVisible();
  await expect(loginPage.loginButton).toBeVisible();

  // Step 2: Iniciar sesión como estudiante
  await loginPage.login(STUDENT_EMAIL, STUDENT_PASSWORD);
  await classroomListPage.waitForLoad();

  // Step 3: Seleccionar alguna de las clases listadas
  await classroomListPage.selectAllClassroomsTab();
  await classroomListPage.clickClassroomItem(0);
  await classroomPage.waitForLoad();

  // El 'Espacio de la Clase' se visualiza
  await expect(classroomPage.classroomInfoRegion).toBeVisible();

  // Step 4: En el panel izquierdo, seleccionar la opción 'Tablero'
  await classroomPage.navigateToMyProgress();
  await dashboardPage.waitForLoad();

  // La información del tablero se despliega correctamente

  // Gráficos
  // Clases completadas
  await expect(dashboardPage.completedClassesSection).toBeVisible();
  await expect(dashboardPage.completedClassesText).toBeVisible();
  if (await dashboardPage.completedClassesChart.count() > 0) {
    await expect(dashboardPage.completedClassesChart).toBeVisible();
  } else {
    await expect(dashboardPage.completedClassesSection.getByText('Esta unidad no incluye ninguna actividad.')).toBeVisible();
  }

  // Promedio de tasa de respuestas correctas
  await expect(dashboardPage.averageSection).toBeVisible();
  await expect(dashboardPage.averageText).toBeVisible();
  if (await dashboardPage.averageChart.count() > 0) {
    await expect(dashboardPage.averageChart).toBeVisible();
    await expect(dashboardPage.secondAverageChart).toBeVisible();
    await expect(dashboardPage.thirdAverageChart).toBeVisible();
    await expect(dashboardPage.fourthAverageChart).toBeVisible();
  } else {
    await expect(dashboardPage.averageSection.getByText('Esta unidad no incluye ninguna actividad.')).toBeVisible();
  }

  // Tasa de finalización de preguntas
  await expect(dashboardPage.questionsCompletionSection).toBeVisible();
  await expect(dashboardPage.questionsCompletionText).toBeVisible();
  if (await dashboardPage.questionsCompletionChart.count() > 0) {
    await expect(dashboardPage.questionsCompletionChart).toBeVisible();
    await expect(dashboardPage.secondQuestionsCompletionChart).toBeVisible();
    await expect(dashboardPage.thirdQuestionsCompletionChart).toBeVisible();
    await expect(dashboardPage.fourthQuestionsCompletionChart).toBeVisible();
  } else {
    await expect(dashboardPage.questionsCompletionSection.getByText('Esta unidad no incluye ninguna actividad.')).toBeVisible();
  }

  // Tasa de finalización de actividades
  await expect(dashboardPage.activitiesCompletionSection).toBeVisible();
  await expect(dashboardPage.activitiesCompletionText).toBeVisible();
  if (await dashboardPage.activitiesCompletionChart.count() > 0) {
    await expect(dashboardPage.activitiesCompletionChart).toBeVisible();
    await expect(dashboardPage.secondActivitiesCompletionChart).toBeVisible();
    await expect(dashboardPage.thirdActivitiesCompletionChart).toBeVisible();
    await expect(dashboardPage.fourthActivitiesCompletionChart).toBeVisible();
  } else {
    await expect(dashboardPage.activitiesCompletionSection.getByText('Esta unidad no incluye ninguna actividad.')).toBeVisible();
  }

  // Flechas para expandir o colapsar información
  await expect(dashboardPage.expandCollapseButtons.first()).toBeVisible();

  // Botones
  await expect(dashboardPage.dashboardHeading).toBeVisible();
});

test('EI-T142 - Home/Pantalla de Inicio (Estudiante) - Icono con nombre de estudiante y Cerrar Sesión', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const classroomListPage = new ClassroomListPage(page);
  const headerPage = new HeaderPage(page);

  // Step 1: Ir a la página correspondiente
  await loginPage.goto();
  await expect(loginPage.emailInput).toBeVisible();
  await expect(loginPage.passwordInput).toBeVisible();
  await expect(loginPage.loginButton).toBeVisible();

  // Step 2: Iniciar sesión como estudiante
  await loginPage.login(STUDENT_EMAIL, STUDENT_PASSWORD);
  await classroomListPage.waitForLoad();

  // Step 3: Dar click en el ícono azul de la esquina superior derecha
  await headerPage.openAccountMenu();

  // Se debe de mostrar el nombre del estudiante y la opción de 'Cerrar Sesión'
  await expect(headerPage.studentNameInMenu(STUDENT_NAME)).toBeVisible();
  await expect(headerPage.logOutButton).toBeVisible();

  // Cerrar sesión y verificar que el usuario es redirigido al login
  await headerPage.logOutButton.click();
  await expect(loginPage.emailInput).toBeVisible();
  await expect(loginPage.passwordInput).toBeVisible();
  await expect(loginPage.loginButton).toBeVisible();
});

test('EI-T139 - Date Picker (Estudiante) - Validación del selector de fecha', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const classroomListPage = new ClassroomListPage(page);

  // Step 1: Ir a la página correspondiente
  await loginPage.goto();
  await expect(loginPage.emailInput).toBeVisible();
  await expect(loginPage.passwordInput).toBeVisible();
  await expect(loginPage.loginButton).toBeVisible();

  // Step 2: Iniciar sesión como estudiante
  await loginPage.login(STUDENT_EMAIL, STUDENT_PASSWORD);
  await classroomListPage.waitForLoad();

  // Step 3: Dar click en el botón de la fecha
  await classroomListPage.dateButton.click();

  // Un date picker debiera de estar disponible para que el estudiante pueda seleccionar una fecha específica
  await expect(classroomListPage.datePicker).toBeVisible();

  // Hacer click en Cancelar y confirmar que el date picker se cierra
  await expect(classroomListPage.cancelarButton).toBeVisible();
  await classroomListPage.cancelarButton.click();
  await expect(classroomListPage.datePicker).toBeHidden();

  // Abrir el date picker nuevamente, hacer click en Confirmar y confirmar que se cierra
  await classroomListPage.dateButton.click();
  await expect(classroomListPage.datePicker).toBeVisible();
  await expect(classroomListPage.confirmarButton).toBeVisible();
  await classroomListPage.confirmarButton.click();
  await expect(classroomListPage.datePicker).toBeHidden();
});

test('EI-T - Lista de Tareas (Estudiante) - Validación de No hay asignaciones', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const classroomListPage = new ClassroomListPage(page);
  const classroomPage = new ClassroomPage(page);
  const taskListPage = new TaskListPage(page);

  // Step 1: Ir a la página de inicio
  await loginPage.goto();
  await expect(loginPage.emailInput).toBeVisible();
  await expect(loginPage.passwordInput).toBeVisible();
  await expect(loginPage.loginButton).toBeVisible();

  // Step 2: Iniciar sesión como estudiante sin asignaciones
  await loginPage.login(STUDENT_EMAIL, STUDENT_PASSWORD);
  await classroomListPage.waitForLoad();

  // Step 3: Seleccionar alguna de las clases listadas
  await classroomListPage.selectAllClassroomsTab();
  await classroomListPage.clickClassroomItem(0);
  await classroomPage.waitForLoad();

  // El 'Espacio de la Clase' se visualiza
  await expect(classroomPage.classroomInfoRegion).toBeVisible();

  // Step 4: En el panel izquierdo, seleccionar la opción 'Lista de Tareas'
  await classroomPage.navigateToTaskList();
  await taskListPage.waitForLoad();

  // La página 'Lista de Tareas' se debe de desplegar
  await expect(taskListPage.heading).toBeVisible();

  // En el cuadro principal se debe de leer el texto 'No hay asignaciones.'
  await expect(taskListPage.noAssignmentsText).toBeVisible();
});
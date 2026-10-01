/**
 * Test Credentials Helper
 * Loads credentials from environment variables (.env files)
 */

export interface Credentials {
  email: string;
  password: string;
}

export interface TestUsers {
  student: Credentials;
  teacher?: Credentials;
}

/**
 * Get student credentials
 * Returns the first configured student email
 */
export function getStudentCredentials(): Credentials {
  const emails = [
    process.env.STUDENT_EMAIL_1,
    process.env.STUDENT_EMAIL_2,
    process.env.STUDENT_EMAIL_3,
    process.env.STUDENT_EMAIL_4,
    process.env.STUDENT_EMAIL_5,
  ].filter(Boolean);

  if (emails.length === 0) {
    throw new Error('No student emails configured. Check .env or .env.production');
  }

  // Use first email by default (can be randomized if needed)
  const email = emails[0];
  const password = process.env.STUDENT_PASSWORD;

  if (!password) {
    throw new Error('STUDENT_PASSWORD not configured. Check .env or .env.production');
  }

  return { email, password };
}

/**
 * Get teacher credentials
 */
export function getTeacherCredentials(): Credentials {
  const email = process.env.TEACHER_EMAIL;
  const password = process.env.TEACHER_PASSWORD;

  if (!email || !password) {
    throw new Error('Teacher credentials not configured. Check .env or .env.production');
  }

  return { email, password };
}

/**
 * Get the expected student display name
 */
export function getStudentName(): string {
  const name = process.env.STUDENT_NAME;
  if (!name) {
    throw new Error('STUDENT_NAME not configured. Check .env or .env.production');
  }
  return name;
}

/**
 * Get all configured test users
 */
export function getTestUsers(): TestUsers {
  return {
    student: getStudentCredentials(),
    ...(process.env.TEACHER_EMAIL && {
      teacher: getTeacherCredentials(),
    }),
  };
}

/**
 * Get a specific student email by index
 */
export function getStudentEmailByIndex(index: number): string {
  const emails = [
    process.env.STUDENT_EMAIL_1,
    process.env.STUDENT_EMAIL_2,
    process.env.STUDENT_EMAIL_3,
    process.env.STUDENT_EMAIL_4,
    process.env.STUDENT_EMAIL_5,
  ].filter(Boolean);

  if (index >= emails.length) {
    throw new Error(
      `Student email at index ${index} not found. Only ${emails.length} emails configured.`
    );
  }

  return emails[index];
}

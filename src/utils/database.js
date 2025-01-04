import * as SQLite from 'expo-sqlite';
import { ACCESS_TOKEN, IS_SIGNUPFLOW_COMPLETE, REFRESH_TOKEN, REFRESH_TOKEN_EXPIRY_TIME } from './storageKeys';

export const db = SQLite.openDatabaseAsync('Kshirsa.db');

export async function initializeDatabase() {
  try {
    // Create table
    await (await db).execAsync(`
      CREATE TABLE IF NOT EXISTS AuthTable (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        ${ACCESS_TOKEN} TEXT,
        ${REFRESH_TOKEN} TEXT,
        ${REFRESH_TOKEN_EXPIRY_TIME} NOT NULL DEFAULT 0,
        ${IS_SIGNUPFLOW_COMPLETE} BOOLEAN DEFAULT 0
      )
    `);

    // Ensure only one row exists
    await (await db).execAsync(`DELETE FROM AuthTable WHERE id != 1`);
    const result = await (await db).execAsync(`SELECT * FROM AuthTable WHERE id = 1`);
    console.log('Database initialized and single row ensured.', result?.[0]);
  } catch (error) {
    console.error('Database initialization error:', error);
  }
}

export async function saveAuthData(data) {
  try {
    const { jwtToken, refreshToken, isSignUpFlowCompleted, refreshTokenExpirationTime } = data;

    // Ensure only one row exists
    await (await db).execAsync(`DELETE FROM AuthTable WHERE id != 1`);

    // Insert or replace the row
    const result = await (await db).runAsync(
      `INSERT OR REPLACE INTO AuthTable (id, ${ACCESS_TOKEN}, ${REFRESH_TOKEN}, ${IS_SIGNUPFLOW_COMPLETE}, ${REFRESH_TOKEN_EXPIRY_TIME})
       VALUES (1, ?, ?, ?, ?)`,
      [jwtToken, refreshToken, isSignUpFlowCompleted ? 1 : 0, refreshTokenExpirationTime]
    );
    console.log('Data saved:', result.lastInsertRowId);
  } catch (error) {
    console.error('Error saving auth data:', error);
  }
}

export async function getAuthData(columnName) {
  try {
    if (!columnName) {
      throw new Error('Column name is required.');
    }

    const result = await (await db).getAllAsync(
      `SELECT ${columnName} FROM AuthTable WHERE id = 1`
    );

    if (result.length > 0) {
      console.log(`${columnName} fetched:`, result[0][columnName]);
      return result[0][columnName];
    } else {
      console.warn('No data found.');
      return null;
    }
  } catch (error) {
    console.error(`Error fetching ${columnName}:`, error);
    return null;
  }
}

export async function getAllAuthData() {
  try {
    const result = await (await db).getAllAsync(
      `SELECT * FROM AuthTable WHERE id = 1`
    );
    return result.length > 0 ? result[0] : null;
  } catch (error) {
    console.error('Error fetching all auth data:', error);
    return null;
  }
}

export async function updateAuthField(field, value) {
  try {
    if (!field) {
      throw new Error('Field name is required.');
    }

    // Update the specific field
    const result = await (await db).runAsync(
      `UPDATE AuthTable SET ${field} = ? WHERE id = 1`,
      [value]
    );

    console.log(`Field "${field}" updated with value:`, value);
    return result.changes > 0;
  } catch (error) {
    console.error('Error updating auth field:', error);
    return false;
  }
}

export async function deleteAuthRow() {
  try {
    const result = await (await db).runAsync(`DELETE FROM AuthTable WHERE id = 1`);
    console.log('Entire row deleted.');
    return result.changes > 0;
  } catch (error) {
    console.error('Error deleting row:', error);
    return false;
  }
}

export async function deleteAuthField(field) {
  try {
    if (!field) {
      throw new Error('Field name is required.');
    }

    // Set the specific field to NULL
    const result = await (await db).runAsync(
      `UPDATE AuthTable SET ${field} = NULL WHERE id = 1`
    );

    console.log(`Field "${field}" value deleted.`);
    return result.changes > 0;
  } catch (error) {
    console.error('Error deleting field value:', error);
    return false;
  }
}

export async function deleteAuthTable() {
  try {
    // Drop the AuthTable
    const result = await (await db).execAsync(`DROP TABLE IF EXISTS AuthTable`);
    console.log('AuthTable deleted successfully.');
    return true;
  } catch (error) {
    console.error('Error deleting AuthTable:', error);
    return false;
  }
}

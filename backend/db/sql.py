'''Use a relational database here for CRUD operations
'''


import mysql.connector
from mysql.connector import Error
from typing import List, Dict, Any, Optional

# Database configuration dictionary
DB_CONFIG = {
    'host': 'localhost',
    'user': 'your_username',
    'password': 'your_password',
    'database': 'your_database'
}


def create_connection() -> Optional[mysql.connector.connection_cext.CMySQLConnection]:
    """
    Create and return a new MySQL database connection.

    Returns:
        mysql.connector.connection_cext.CMySQLConnection: Database connection object if successful.
        None: If connection fails.
    """
    try:
        connection = mysql.connector.connect(**DB_CONFIG)
        if connection.is_connected():
            print("Connection to MySQL database established.")
            return connection
    except Error as e:
        print(f"Error connecting to MySQL database: {e}")
    return None


def create_record(table: str, data: Dict[str, Any]) -> bool:
    """Insert a new record into a specified table.
    """
    placeholders = ", ".join(["%s"] * len(data))
    columns = ", ".join(data.keys())
    sql = f"INSERT INTO {table} ({columns}) VALUES ({placeholders})"
    values = tuple(data.values())

    connection = create_connection()
    if connection is None:
        return False

    try:
        cursor = connection.cursor()
        cursor.execute(sql, values)
        connection.commit()
        print(f"Record inserted into {table} successfully.")
        return True
    except Error as e:
        print(f"Failed to insert record into {table}: {e}")
        return False
    finally:
        cursor.close()
        connection.close()


def read_records(
    table: str, columns: Optional[List[str]] = None, where: Optional[str] = None,
    params: Optional[tuple] = None
) -> Optional[List[Dict[str, Any]]]:
    """Retrieve records from a specified table with optional filtering.
    """
    columns_part = ", ".join(columns) if columns else "*"
    sql = f"SELECT {columns_part} FROM {table}"
    if where:
        sql += f" WHERE {where}"

    connection = create_connection()
    if connection is None:
        return None

    try:
        cursor = connection.cursor(dictionary=True)
        cursor.execute(sql, params)
        records = cursor.fetchall()
        print(f"Retrieved {len(records)} record(s) from {table}.")
        return records
    except Error as e:
        print(f"Failed to read records from {table}: {e}")
        return None
    finally:
        cursor.close()
        connection.close()


def update_record(table: str, data: Dict[str, Any], where: str, params: tuple) -> bool:
    """Update existing records in a specified table.
    """
    set_clause = ", ".join([f"{column} = %s" for column in data.keys()])
    sql = f"UPDATE {table} SET {set_clause} WHERE {where}"
    values = tuple(data.values()) + params

    connection = create_connection()
    if connection is None:
        return False

    try:
        cursor = connection.cursor()
        cursor.execute(sql, values)
        connection.commit()
        if cursor.rowcount == 0:
            print("No records were updated.")
            return False
        print(f"{cursor.rowcount} record(s) updated in {table}.")
        return True
    except Error as e:
        print(f"Failed to update records in {table}: {e}")
        return False
    finally:
        cursor.close()
        connection.close()


def delete_record(table: str, where: str, params: tuple) -> bool:
    """
Delete records from a specified table.
    """
    sql = f"DELETE FROM {table} WHERE {where}"

    connection = create_connection()
    if connection is None:
        return False

    try:
        cursor = connection.cursor()
        cursor.execute(sql, params)
        connection.commit()
        if cursor.rowcount == 0:
            print("No records were deleted.")
            return False
        print(f"{cursor.rowcount} record(s) deleted from {table}.")
        return True
    except Error as e:
        print(f"Failed to delete records from {table}: {e}")
        return False
    finally:
        cursor.close()
        connection.close()

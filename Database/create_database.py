import mysql.connector

def create_database():
    connection = None  # Initialize connection to None
    try:
        connection = mysql.connector.connect(
            host="cloudappfindpk-server.mysql.database.azure.com",
            user="dzcqxcilee",  # Consider using "dzcqxcilee@cloudappfindpk-server" if necessary
            password="root@1981",
        )
        cursor = connection.cursor()
        cursor.execute("CREATE DATABASE IF NOT EXISTS azure_cloud")
        cursor.close()
        print("Connected to MySQL Server and database created successfully")
    except mysql.connector.Error as e:
        print(f"Error connecting to MySQL: {e}")
    finally:
        if connection and connection.is_connected():
            connection.close()

def create_tables():
    try:
        connection = mysql.connector.connect(
            host="cloudappfindpk-server.mysql.database.azure.com",  # Your Azure MySQL server name
            # user="dzcqxcilee@cloudappfindpk-server",  # Your Azure MySQL server admin login name
            user="dzcqxcilee",
            password="root@1981",
            database="azure_cloud"
        )
        cursor = connection.cursor()

        user_table = """
        CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(255) NOT NULL UNIQUE,
            email VARCHAR(255) NOT NULL UNIQUE,
            password_hash VARCHAR(255) NOT NULL,
            is_active BOOLEAN DEFAULT TRUE
        )
        """
        storage_table = """
        CREATE TABLE IF NOT EXISTS storage (
            user_id INT PRIMARY KEY,
            storage_used INT DEFAULT 0,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        )
        """
        files_table = """
        CREATE TABLE IF NOT EXISTS files (
            id INT AUTO_INCREMENT PRIMARY KEY,
            user_id INT,
            filename VARCHAR(255) NOT NULL,
            filesize INT DEFAULT 0,
            upload_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        )
        """
        usage_log_table = """
        CREATE TABLE IF NOT EXISTS usage_log (
            id INT AUTO_INCREMENT PRIMARY KEY,
            user_id INT,
            action VARCHAR(255) NOT NULL,
            data_used INT,
            timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        )
        """

        cursor.execute(user_table)
        cursor.execute(storage_table)
        cursor.execute(files_table)
        cursor.execute(usage_log_table)

        print("Tables created successfully")
    except mysql.connector.Error as error:
        print("Failed to create tables: {}".format(error))
    finally:
        if connection.is_connected():
            cursor.close()
            connection.close()

if __name__ == "__main__":
    create_database()
    create_tables()



















# import mysql.connector
# import os

# # It's recommended to use environment variables for credentials
# # However, for the sake of this example, I'm writing them directly
# # In production, replace these with os.getenv('ENV_VARIABLE_NAME')



# def create_tables():
#     try:
#         connection = mysql.connector.connect(
#             host="cloudstorage1.mysql.database.azure.com",
#             user="pakistan123@cloudstorage1",
#             password="root@1981",
#             database="aws_cloud"
#         )
#         cursor = connection.cursor()

#         # Define your table creation SQL statements here
#         # ...

#         # Execute the SQL statements to create tables
#         cursor.execute(user_table)
#         cursor.execute(storage_table)
#         cursor.execute(files_table)
#         cursor.execute(usage_log_table)

#         print("Tables created successfully")
#     except mysql.connector.Error as error:
#         print("Failed to create tables: {}".format(error))
#     finally:
#         if connection.is_connected():
#             cursor.close()
#             connection.close()

# if __name__ == "__main__":
#     create_database()
#     create_tables()

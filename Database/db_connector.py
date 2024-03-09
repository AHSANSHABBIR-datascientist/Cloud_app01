import mysql.connector

def connect_to_database():
    return mysql.connector.connect(
        host="cloudappfindpk-server.mysql.database.azure.com",  # Your Azure MySQL server name
        # host="cloudappfindpk-server.mysql.database.azure.com",  # Your Azure MySQL server name
        # user="dzcqxcilee@cloudappfindpk-server",  # Your Azure MySQL server admin login name
        user="dzcqxcilee",
        database="azure_cloud",
        password="root@1981"  # Your database name
    )
# def connect_to_database():
#     return mysql.connector.connect(
#         host="localhost",
#         user="root",
#         password="osintRoot@786",
#         database="aws_cloud"
#     )




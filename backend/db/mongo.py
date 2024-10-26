'''MongoDB CRUD operations to be defined here
'''

# pylint: disable=broad-except

import os
import logging
from typing import Optional, List, Union
from pymongo import MongoClient
from dotenv import load_dotenv
load_dotenv()


# def connect(
#         func: Optional[Callable] = None,
#         *,
#         string: Optional[str] = os.environ.get("MONGO_CONNECTION_STRING"),
#         database: Optional[str] = os.environ.get("DATABASE"),
#         collection: Optional[str] = os.environ.get("COLLECTION"),
#         close: bool = True
# ) -> Any:
#     '''MongoDB client connection decorator'''

#     def decorator(func: Callable):
#         @wraps(func)
#         def wrapper(*args, **kwargs):
#             client = MongoClient(string)
#             db = client[database]
#             conn = db[collection]
#             try:
#                 result = func(conn, *args, **kwargs)
#             finally:
#                 if close:
#                     client.close()
#             return result
#         return wrapper

#     if callable(func):
#         return decorator(func)
#     else:
#         return decorator


# def connect(
#     string: Optional[str] = os.environ.get("MONGO_CONNECTION_STRING"),
#     database: Optional[str] = os.environ.get("DATABASE"),
#     collection: Optional[str] = os.environ.get("COLLECTION"),
# ):
#     '''connect to mongodb
#     '''
#     client = MongoClient(string)
#     db = client[database]
#     conn = db[collection]
#     return conn


def create(
    doc: Union[dict, list],
    collection: str='users',
    string: Optional[str] = os.environ.get("MONGO_CONNECTION_STRING"),
    database: Optional[str] = os.environ.get("DATABASE"),
) -> bool:
    '''Create records in DB
    '''
    try:
        client = MongoClient(string)
        db = client[database]
        conn = db[collection]
        if isinstance(doc, dict):
            conn.insert_one(doc)
            return True
        conn.insert_many(doc)
        return True
    except Exception as e:  # pylint: disable=broad-except
        logging.error("Error, unable to create records! %s", e)
        return False


def update(
    query: dict,
    new_values: dict,
    collection: str='users',
    string: Optional[str] = os.environ.get("MONGO_CONNECTION_STRING"),
    database: Optional[str] = os.environ.get("DATABASE"),
) -> bool:
    '''Update records in DB
    '''
    try:
        client = MongoClient(string)
        db = client[database]
        conn = db[collection]
        if conn.count_documents(query) > 1:
            conn.update_many(query, {"$set": new_values})
            return True
        conn.update_one(query, {"$set": new_values})
        return True
    except Exception as e:
        logging.error("Error, unable to update records! %s", e)
        return False


def read(
    query: dict,
    collection: str='users',
    string: Optional[str] = os.environ.get("MONGO_CONNECTION_STRING"),
    database: Optional[str] = os.environ.get("DATABASE"),
) -> List[dict]:
    '''Read records from DB
    '''
    try:
        client = MongoClient(string)
        db = client[database]
        conn = db[collection]
        return list(conn.find(query))
    except Exception as e:  # pylint: disable=broad-except
        logging.error("Error, unable to read records! %s", e)
        return None


def delete(
    del_query: dict,
    collection: str='users',
    string: Optional[str] = os.environ.get("MONGO_CONNECTION_STRING"),
    database: Optional[str] = os.environ.get("DATABASE"),
) -> bool:
    '''Delete records from DB
    '''
    try:
        client = MongoClient(string)
        db = client[database]
        conn = db[collection]
        if conn.count_documents(del_query) > 1:
            conn.delete_many(del_query)
            return True
        conn.delete_one(del_query)
        return True
    except Exception as e:  # pylint: disable=broad-except
        logging.error("Error, unable to delete records! %s", e)
        return False

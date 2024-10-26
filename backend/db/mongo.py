'''MongoDB CRUD operations to be defined here
'''


import os
import logging
from functools import wraps
from typing import Optional, Any, List, Union, Callable
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


def connect(
    string: Optional[str] = os.environ.get("MONGO_CONNECTION_STRING"),
    database: Optional[str] = os.environ.get("DATABASE"),
    collection: Optional[str] = os.environ.get("COLLECTION"),
):
    '''connect to mongodb
    '''
    client = MongoClient(string)
    db = client[database]
    conn = db[collection]
    return conn


def create(
    collection: MongoClient,
    doc: Union[dict, list]
) -> bool:
    '''Create records in DB
    '''
    try:
        if isinstance(doc, dict):
            collection.insert_one(doc)
            return True
        collection.insert_many(doc)
        return True
    except Exception as e:  # pylint: disable=broad-except
        logging.error("Error, unable to create records! %s", e)
        return False


def update(
    collection: MongoClient,
    query: dict,
    new_values: dict
) -> bool:
    '''Update records in DB
    '''
    try:
        if collection.count_documents(query) > 1:
            collection.update_many(query, {"$set": new_values})
            return True
        collection.update_one(query, {"$set": new_values})
        return True
    except Exception as e:  # pylint: disable=broad-except
        logging.error("Error, unable to update records! %s", e)
        return False


def read(
    collection: MongoClient,
    query: dict
) -> List[dict]:
    '''Read records from DB
    '''
    try:
        return list(collection.find(query))
    except Exception as e:  # pylint: disable=broad-except
        logging.error("Error, unable to read records! %s", e)
        return None


def delete(
    collection: MongoClient,
    del_query: dict
) -> bool:
    '''Delete records from DB
    '''
    try:
        if collection.count_documents(del_query) > 1:
            collection.delete_many(del_query)
            return True
        collection.delete_one(del_query)
        return True
    except Exception as e:  # pylint: disable=broad-except
        logging.error("Error, unable to delete records! %s", e)
        return False

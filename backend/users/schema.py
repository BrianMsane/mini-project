account = {
    "$jsonSchema": {
      "bsonType": "object",
      "required": ["username", "email", "password", "created"],
      "properties": {
        "username": {
          "bsonType": "string",
          "description": "must be a string and is required"
        },
        "email": {
          "bsonType": "string",
          "pattern": "^.+@.+$",
          "description": "must be a valid email address and is required"
        },
        "password": {
          "bsonType": "string",
          "description": "must be a string and is required"
        },
        "created": {
          "bsonType": "string",
          "pattern": "^\\d{4}-\\d{2}-\\d{2}$",
          "description": "must be a string in the format YYYY-MM-DD and is required"
        }
      }
    }
}

student = {
  "$jsonSchema": {
    "bsonType": "object",
    "required": ["demographic", "family", "education", "citizenship", "interests", "_type"],
    "properties": {
      "demographic": {
        "bsonType": "object",
        "required": ["first_name", "surname", "date_of_birth", "gender", "home_address", "phone", "race", "languages"],
        "properties": {
          "first_name": {
            "bsonType": "string",
            "description": "must be a string and is required"
          },
          "middle_name": {
            "bsonType": "string",
            "description": "must be a string and is optional"
          },
          "surname": {
            "bsonType": "string",
            "description": "must be a string and is required"
          },
          "date_of_birth": {
            "bsonType": "string",
            "pattern": "^\\d{4}-\\d{2}-\\d{2}$",
            "description": "must be a string in the format YYYY-MM-DD and is required"
          },
          "gender": {
            "bsonType": "string",
            "description": "must be a string and is required"
          },
          "home_address": {
            "bsonType": "string",
            "description": "must be a string and is required"
          },
          "phone": {
            "bsonType": ["string", "array"],
            "items": {
              "bsonType": "string"
            },
            "description": "must be a string or array of strings and is required"
          },
          "email": {
            "bsonType": "string",
            "pattern": "^.+@.+$",
            "description": "must be a valid email address and is optional"
          },
          "race": {
            "enum": ["Black", "White", "Colored", "Indian", "Asian"],
            "description": "must be one of the specified racial categories and is required"
          },
          "languages": {
            "bsonType": "array",
            "items": {
              "bsonType": "string"
            },
            "description": "must be an array of strings and is required"
          }
        }
      },
      "family": {
        "bsonType": "object",
        "required": ["name", "address", "area"],
        "properties": {
          "name": {
            "bsonType": "array",
            "items": {
              "bsonType": "string"
            },
            "description": "must be an array of strings and is required"
          },
          "contacts": {
            "bsonType": "array",
            "items": {
              "bsonType": "string"
            },
            "description": "must be an array of strings and is optional"
          },
          "address": {
            "bsonType": "string",
            "description": "must be a string and is required"
          },
          "area": {
            "bsonType": "string",
            "description": "must be a string and is required"
          }
        }
      },
      "education": {
        "bsonType": "object",
        "required": ["high_school_name", "high_school_address", "high_school_transcript", "standardized_test_scores"],
        "properties": {
          "high_school_name": {
            "bsonType": "string",
            "description": "must be a string and is required"
          },
          "high_school_address": {
            "bsonType": "string",
            "description": "must be a string and is required"
          },
          "high_school_transcript": {
            "bsonType": "string",
            "description": "must be a string and is required"
          },
          "standardized_test_scores": {
            "bsonType": "object",
            "additionalProperties": {
              "bsonType": ["int", "string"]
            },
            "description": "must be a dictionary with test names as keys and scores as int or string values, required"
          }
        }
      },
      "citizenship": {
        "bsonType": "object",
        "required": ["citizenship_status", "country_of_birth", "state_residency"],
        "properties": {
          "citizenship_status": {
            "bsonType": "string",
            "description": "must be a string and is required"
          },
          "country_of_birth": {
            "bsonType": "string",
            "description": "must be a string and is required"
          },
          "state_residency": {
            "bsonType": "string",
            "description": "must be a string and is required"
          }
        }
      },
      "interests": {
        "bsonType": "array",
        "items": {
          "bsonType": "string"
        },
        "description": "must be an array of strings and is required"
      },
      "_type": {
        "bsonType": "string",
        "description": "must be a string and is required, defaults to 'users.Student'"
      }
    }
  }
}
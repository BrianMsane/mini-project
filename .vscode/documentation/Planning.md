Dates: The project work begins on the 19th of September  and it should be submitted at the last day of October

Nkuntju
========

- Signin Page
- Signup Page
- Home Page Structuring and formating 
- Contact Us Page
- Error 404 page
- Beautify the entire website

Mcanco
=======
- Home Page
- Form for information
- About Us Page
- Add Event Calendar


Me 
===
- Adding Utility function
- Proposed Database
- Normalization and schema design (enforced as modereates)
- Link code and files for processing information
- Add Server and adjust it to work with the SignUp page [by storing data in mongodb in the desired structure]
- Make sure that all the links and methods [POST, GET, PUT, PATCH] are made the right way in the server


* I think we should cancel the search  or just link chatgpt3.5 to answer any question based on application and our services*

## Document for Symbols
In MongoDB, you can't store documents or images as they are but what we need to do is to store it in a temporary storage
so that we can be able to access it for running the optical character recognition. Once we have the text from OCR, we might as well delete the document because it may not be relevant but, do keep in mind that the user might want to initiate a conversation using the very same document and results so it is not a good idea to have them upload the document again and again. 

## resturcture everything
We can get the information from the user and use it for Retrieval Augmented Generation so that we can make good recommendations and in a chatty format with the user. Use this in an agentic workflow to take benefit from the reasoning capabilities of the models as well as the agentic architecture. The user will converse with agent/model and during the cause of that, we get the vital information and use that information together with the information about the programs and all of . For this, we need the forms and a chat interface similar to OpenAI's ChatGPT interface.

Use function calling to call the api which gives us all the relevant programs that the user qualifies for.

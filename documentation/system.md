<h1>System modeling</h1>

<li>Email Support on Contact us page</li>
The server will load the contact us page when the user click on the contact us hypelink in the landing page or anywhere we have the link. So this page willl render information with which the user can reach us and this include on Postal address, phone number, and email address. On top of that we have email support. The form on the right side of the page enables to user to reach us and deliver a message to us.

This form requires the name of the user, their email address, and the message they want to deliver to us. Upon filling the form, the information will be sent to the backend via an API call which will trigger a process on the backend. This process is as follows: The backend sends this message alongside the user information to my email address and this is where I will attend to it and then manually reply to the user, on the specified email address.

So this necessitates for constant access of my email address as failure to do so will result in the user being left stranded. To be fair, we need to let the user know when to expect feedback and give him or her a glimpse of the process that are going to happend until we reach back to them. Hence, we need a pop-up message to communicate this information. When the details are successfully send to the backend, we need to let the user know that their communication has been received and we're going to manually have a look and respond to their message.

Technical:
- form
    - POST method to secure user data
    - Action attribute will specify and enpoint on the express server. 
    - This endpoint is the one which triggers our backend and send the information.
- backend
    - in the backend, we send the details to my email address

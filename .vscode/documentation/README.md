<h1>Documentation</h1>
<h3>Introduction</h3>
When the user signs up for our services, the information is directly stored in the database so now when he/she signs up we need to ensure that he/she is logged in when this process has been successful. Upon logging in, we then perform our services
by implementing the backend logic.<br>

So for uploading the document, we need to ensure that we have captured the results in an effective manner so we need to
reproduce the OCR results back to the user to ensure that he/she confirms it, if he does not, we then allow him to 
modify them. <br>

NOTE THAT WE'RE USING THIS AS A TEMPORARY PROCESS BUT AFTERALL, WE NEED TO USER THE DATABASE FROM THE MINISTRY
OF EDUCATION AND TRAINING!

<h3>Logic</h3>
Once we have the information, we need we need to:<br>
<li> Compute the total number of points that the user has. <br>
<li> This number is used to get all the programs that the user qualifies for [run it against the program database].<br>
<li> Refine the results based on the user specified streams of study:<br>
    <li> so from each stream, take the best 5 programs that they qualify for <br>
    <li> this list should be the options given to the user and he/she needs to take it into great consideration <br>
    <li> for now, this recommendation is what we need to focus on<br>

<h3>Comments and Considerations</h3>
Further advancement of the project are going to be seen as we progress so for now, this is the scope!
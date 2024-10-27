
// REQUIRED PACKAGES
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const axios = require('axios');
const multer = require('multer');
const FormData = require('form-data');
const fs = require('fs');
const app = express();
const PORT = 3016;


// MIDDLEWARE TO SERVE STATIC FILES AND PARSE REQUEST BODIES
app.use(express.static(path.join(__dirname, 'website')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const upload = multer({ dest: 'temp_uploads/' });


// PAGES
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'website', 'index.html'));
});
app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'website', 'contact.html'));
});
app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'website', 'about_us.html'));
});
app.get('/form', (req, res) => {
    res.sendFile(path.join(__dirname, 'website', 'form.html'));
});
app.get('/error', (req, res) => {
    res.sendFile(path.join(__dirname, 'website', 'error.html'));
});
app.get('/recommend', (req, res) => {
    res.sendFile(path.join(__dirname, 'website', 'recommend.html'));
});
app.get('/signin', (req, res) => {
    res.sendFile(path.join(__dirname, 'website', 'signin.html'));
});
app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'website', 'signup.html'));
});


// SIGN UP
app.post('/signup-process', async (req, res) => {
    try {
        const response = await axios.post('http://localhost:3017/register', req.body);
        if (response.status === 200) {
            if (response.data.authenticated === true) {
                res.redirect(`/login?username=${userLogin.username}&password=${userLogin.password}`);
            } else {
                res.redirect('/error');
            }
        }
    } catch (error) {
        console.error('Error sending data to backend:', error);
        res.status(500).send('Failed to process the request.');
    }
});


// LOGIN
app.post('/login-process', async (req, res) => {
    try {
        const response = await axios.post('http://localhost:3017/authenticate', req.body);
        if (response.status === 200) {
            if (response.data.authenticated === true) {
                res.redirect('/dashboard'); // Redirect to a dashboard or home page
            } else {
                res.redirect('/signin?error=invalid_credentials');
            }
        }
    } catch (error) {
        console.error('Error sending data to backend:', error);
        res.status(500).send('Failed to process the request.');
    }
});


// CONTACT US
app.post('/email', async (req, res) => {
    try {
        const response = await axios.post('http://localhost:3017/contact-us', req.body);
        if (response.status === 200) {
            res.sendFile(path.join(__dirname, 'website', 'contact-us.html'));
        } else {
            res.redirect('/error');
        }
    } catch (error) {
        console.error('Error sending data to backend:', error);
        res.status(500).send('Failed to process the request.');
    }
});


// FORM PROCESSING
app.post('/form-process', upload.any(), async (req, res) => {
    // Extract form data and files
    const formData = req.body;
    const files = req.files;

    // Serialize form data into JSON according to your data classes
    const demographic = {
        first_name: formData.firstName,
        middle_name: formData.middleName || null,
        surname: formData.lastName,
        date_of_birth: formData.dob,
        gender: formData.gender,
        nationality: formData.nationality,
        identity_no: formData.identityNumber,
        maritual: formData.maritalStatus,
        residence: formData.residence,
        disability: formData.disabilities,
        medical: formData.medicalConditions
    };

    const contact = {
        address: formData.address,
        region: formData.city,
        country: formData.country,
        phone: formData.mobile,
        telephone: formData.homeTel || null,
        email: formData.email
    };

    const kin = {
        firstname: formData.kinFirstName,
        middlename: formData.kinMiddleName || null,
        surname: formData.kinLastName,
        relationship: formData.relationship,
        phone: formData.kinMobile,
        email: formData.kinEmail
    };

    const education = {
        school: formData.previousSchool,
        qualifications: formData.qualifications,
        grades: formData.grades,
        stream: formData.stream || null
    };

    const applicantData = {
        demographic,
        contact,
        kin,
        education,
        interests: [formData.preferredProgram, formData.alternativeProgram].filter(Boolean),
        _type: 'users.Applicant'
    };

    // Prepare form data to send to FastAPI
    const axiosFormData = new FormData();
    axiosFormData.append('data', JSON.stringify(applicantData));

    // Append the files
    if (files && files.length > 0) {
        files.forEach(file => {
            const fileStream = fs.createReadStream(file.path);
            axiosFormData.append(file.fieldname, fileStream, file.originalname);
        });
    }

    try {
        const response = await axios.post('http://localhost:3017/form', axiosFormData, {
            headers: axiosFormData.getHeaders()
        });

        if (response.status === 200) {
            res.sendFile(path.join(__dirname, 'website', 'recommend.html'));
        } else {
            res.redirect('/error');
        }
    } catch (error) {
        console.error('Error sending form data to backend:', error);
        res.status(500).send('Failed to process the request.');
    } finally {
        // Clean up the temp files
        if (files && files.length > 0) {
            files.forEach(file => {
                fs.unlink(file.path, err => {
                    if (err) console.error('Error deleting temp file:', err);
                });
            });
        }
    }
});


// START THE SERVER
app.listen(PORT, () => {
    console.log(`Server started successfully on port ${PORT}!`);
});

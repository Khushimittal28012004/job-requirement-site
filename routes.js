const express = require('express');
const router = express.Router();
const Job = require('../models/Job');
const multer = require('multer');
const path = require('path');

// Multer configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// Root route to redirect to the job listings page
router.get('/', (req, res) => {
    res.redirect('/jobs');
});

// Route to render the job form
router.get('/create-job', (req, res) => {
    res.render('admin');
});

// Route to handle job form submission with file upload
router.post('/create-job', upload.single('resume'), async (req, res) => {
    const { name, number, email, title, description, requirements } = req.body;
    const resume = req.file ? req.file.filename : null;
    const job = new Job({ name, number, email, title, description, requirements, resume });
    await job.save();
    res.redirect('/jobs');
});

// Route to display all jobs
router.get('/jobs', async (req, res) => {
    const jobs = await Job.find();
    res.render('jobs', { jobs });
});

module.exports = router;

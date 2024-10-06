import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, Box, Paper, Avatar } from '@mui/material';
import { AddCircleOutline, PhotoCamera } from '@mui/icons-material';
import { makeCv } from '../store/action/userAppStorage';
import { useDispatch } from 'react-redux';




const CVForm = () => {
  const [education, setEducation] = useState([{ degree: '', institution: '', year: '' }]);
  const [workExperience, setWorkExperience] = useState([{ title: '', company: '', duration: '', responsibilities: '' }]);
  let dispatch = useDispatch()

  const handleEducationChange = (index, field, value) => {
    const updatedEducation = [...education];
    updatedEducation[index][field] = value;
    setEducation(updatedEducation);
  };

  const handleAddEducation = () => {
    setEducation([...education, { degree: '', institution: '', year: '' }]);
  };

  const handleWorkExperienceChange = (index, field, value) => {
    const updatedWorkExperience = [...workExperience];
    updatedWorkExperience[index][field] = value;
    setWorkExperience(updatedWorkExperience);
  };

  const handleAddWorkExperience = () => {
    setWorkExperience([...workExperience, { title: '', company: '', duration: '', responsibilities: '' }]);
  };


  let generateHandler = ()=>{
    let data = {
      workExperience:workExperience,
      education:education
    }
    console.log(data)

    dispatch(makeCv(data))
  }





  return (
    <Paper elevation={3} style={{ padding: '20px', maxWidth: '900px', margin: 'auto', marginTop: '20px' }}>
      <Box display="flex" justifyContent="center" marginBottom="20px">
        <Avatar
          style={{
            width: '100px',
            height: '100px',
            marginBottom: '10px',
          }}
        >
          <PhotoCamera />
        </Avatar>
      </Box>
      <Typography variant="h4" align="center" gutterBottom>
        CV Builder
      </Typography>

      {/* Personal Information */}
      <Typography variant="h6" gutterBottom>
        Personal Information
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField label="Full Name" variant="outlined" fullWidth required />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="Job Title" variant="outlined" fullWidth required />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="Phone Number" variant="outlined" fullWidth required />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="Email" variant="outlined" fullWidth required />
        </Grid>
        <Grid item xs={12}>
          <TextField label="Address" variant="outlined" fullWidth required />
        </Grid>
      </Grid>

      {/* Summary */}
      <Typography variant="h6" gutterBottom style={{ marginTop: '20px' }}>
        Summary
      </Typography>
      <TextField
        label="Write a short summary about yourself"
        variant="outlined"
        multiline
        rows={4}
        fullWidth
        required
      />

      {/* Education Section */}
      <Typography variant="h6" gutterBottom style={{ marginTop: '20px' }}>
        Education
      </Typography>
      {education.map((edu, index) => (
        <Grid container spacing={2} key={index}>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Degree"
              variant="outlined"
              fullWidth
              value={edu.degree}
              onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Institution"
              variant="outlined"
              fullWidth
              value={edu.institution}
              onChange={(e) => handleEducationChange(index, 'institution', e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Year"
              variant="outlined"
              fullWidth
              value={edu.year}
              onChange={(e) => handleEducationChange(index, 'year', e.target.value)}
            />
          </Grid>
        </Grid>
      ))}
      <Box display="flex" justifyContent="center" marginTop="10px">
        <Button onClick={handleAddEducation} startIcon={<AddCircleOutline />} color="primary">
          Add More Education
        </Button>
      </Box>

      {/* Work Experience Section */}
      <Typography variant="h6" gutterBottom style={{ marginTop: '20px' }}>
        Work Experience
      </Typography>
      {workExperience.map((work, index) => (
        <Grid container spacing={2} key={index}>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Job Title"
              variant="outlined"
              fullWidth
              value={work.title}
              onChange={(e) => handleWorkExperienceChange(index, 'title', e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Company"
              variant="outlined"
              fullWidth
              value={work.company}
              onChange={(e) => handleWorkExperienceChange(index, 'company', e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Duration"
              variant="outlined"
              fullWidth
              value={work.duration}
              onChange={(e) => handleWorkExperienceChange(index, 'duration', e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Responsibilities"
              variant="outlined"
              multiline
              rows={3}
              fullWidth
              value={work.responsibilities}
              onChange={(e) => handleWorkExperienceChange(index, 'responsibilities', e.target.value)}
            />
          </Grid>
        </Grid>
      ))}
      <Box display="flex" justifyContent="center" marginTop="10px">
        <Button onClick={handleAddWorkExperience} startIcon={<AddCircleOutline />} color="primary">
          Add More Experience
        </Button>
      </Box>

      {/* Skills */}
      <Typography variant="h6" gutterBottom style={{ marginTop: '20px' }}>
        Skills
      </Typography>
      <TextField label="List your skills (e.g. Design, JavaScript)" variant="outlined" fullWidth required />

      {/* Submit Button */}
      <Box display="flex" justifyContent="center" marginTop="20px">
        <Button variant="contained" color="primary" size="large" onClick={generateHandler}>
          Generate CV
        </Button>
      </Box>
    </Paper>
  );
};

export default CVForm;

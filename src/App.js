import React from 'react';
import { Container, Box, Typography, Grid, IconButton, ThemeProvider, createTheme, CssBaseline, Paper, Tooltip } from '@mui/material';
import { FaLinkedin, FaEnvelope, FaPhone, FaGithub, FaJs, FaPython, FaDatabase, FaReact, FaGitAlt, FaDocker, FaFileDownload, FaMicrosoft, FaLinux, FaUnity } from 'react-icons/fa';
import { SiC, SiCplusplus, SiWebgl, SiThreedotjs, SiRos, SiAdobephotoshop, SiDavinciresolve, SiArduino } from 'react-icons/si';
import { TbView360Number } from 'react-icons/tb';
import { Snackbar } from '@mui/material';
import { Environment, OrbitControls, Splat} from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import './App.css';
import './styles/Typography.css';

const darkTheme = createTheme({
  typography: {
    fontFamily: '"JetBrains Mono", monospace',
    h4: {
      fontWeight: 700,
    },
    h6: {
      fontWeight: 700,
    },
    sectionTitle: {
      fontSize: '2.0rem',
      fontWeight: 700,
      marginBottom: '3.0rem',
      color: '#ffffff'  // Fixed the color value (was '#fffff')
    },
  },
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
    text: {
      primary: '#ffffff',
      secondary: '#b0b0b0',
    },
  },
});

function App() {
  const contactInfo = {
    email: 'ethanong27@gmail.com',
    phone: '+6597913739',
    linkedin: 'https://linkedin.com/in/eozk',
    github: 'https://github.com/eozkzoe',
    resume: process.env.PUBLIC_URL + '/resume.pdf'  // Updated resume path
  };
  // Add state for snackbar
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');

  // Add clipboard function
  const handleCopy = (text, message) => {
    navigator.clipboard.writeText(text);
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const projects = [
    {
      title: 'Mecatron',
      description: 'Winner of <a href="https://sauvc.org/#teams" target="_blank" rel="noopener noreferrer" style={{ color: "inherit", textDecoration: "underline" }}>SAUVC 2025</a>! Bested 100+ teams from 20 countries. Software lead at NTU\'s Student-led Marine Robotics team. Leading ~10 SWEs in developing Behaviour Trees, localisation, object detection etc.',
      image: process.env.PUBLIC_URL + '/mecatron_sauvc.jpg',
      link: 'https://mecatron.sg'
    },
    {
      title: 'HMGICS Industry-FYP',
      description: '3D Gaussian Splatting techniques in reconstructing car components from sparse images, performing mesh extraction and pose estimation for automotive assembly',
      image: process.env.PUBLIC_URL + '/hmgics.jpg'
    },
    {
      title: 'Dyson-NTU Product Development Challenge',
      description: 'Perform market analysis and system design to fabricate an entire product from scratch!',
      image: process.env.PUBLIC_URL + '/dyson_submission.png'
    },
    {
      title: 'NTUSU MODE',
      description: 'Events Officer at NTU Student Union\'s Ministerial Open Discussions and Events Committee, fostering political engagement for Singapore\'s youth',
      image: process.env.PUBLIC_URL + '/NTUSU_MODE.jpeg'
    },
    {
      title: 'ESPRESSIF Systems U Amaze Venture',
      description: '1st Runner Up! Created a unique unmanned vehicle which completes an obstacle-laden maze in the shortest time',
      image: process.env.PUBLIC_URL + '/espressif.jpeg'
    }
  ];

  const skills = {
    'Programming': [
      { name: 'Python', icon: FaPython },
      { name: 'C++', icon: SiCplusplus },
      { name: 'C', icon: SiC },
      { name: 'JavaScript', icon: FaJs },
      { name: 'SQL', icon: FaDatabase },
      { name: 'GLSL', icon: SiWebgl },
    ],
    'Tools': [
      { name: 'ROS', icon: SiRos },
      { name: 'Git', icon: FaGitAlt },
      { name: 'Docker', icon: FaDocker },
      { name: 'Linux', icon: FaLinux },
      { name: 'Unity', icon: FaUnity },
      { name: 'Arduino', icon: SiArduino },
      { name: 'React', icon: FaReact },
      { name: 'Three.js', icon: SiThreedotjs },
      { name: 'Fusion360', icon: TbView360Number },
      { name: 'Microsoft Office', icon: FaMicrosoft }
    ],
    'Creative': [
      { name: 'Photoshop', icon: SiAdobephotoshop },
      { name: 'DaVinci Resolve', icon: SiDavinciresolve },
    ],
    'Languages': ['English', 'Mandarin']
  };

  const experience = [
    {
      company: 'Panasonic R&D Center Singapore',
      position: 'Research Intern',
      period: 'Jan 2025 - Present',
      description: 'I conduct cutting edge research on 3D reconstruction techniques such as SLAM and Gaussian Splatting. My main tasks revolve around WebGL development in Three.JS and GLSL to improve web-based splat renderers. I also survey, test, and implement experimental software and research papers',
      image: process.env.PUBLIC_URL + '/3d_recon.jpeg'
    },
    {
      company: 'Fling Asia',
      position: 'Software Engineer',
      period: 'Dec 2023 - Apr 2024',
      description: 'Developed commercial bulk QR labelling desktop software to support industry standard Zebra printers, and led marketing and product demonstrations at DHL and Ceva. Debugged crucial video-processing, computer vision, and core stock check report generation software',
      image: process.env.PUBLIC_URL + '/flabel.png'
    },
    {
      company: 'Fling Asia',
      position: 'Engineering Intern',
      period: 'Dec 2023 - Apr 2024',
      description: 'Led the design, fabrication, and feasibility testing of hardware additions such as drone lighting and quadcopter wing attachments. Contributed to key database management libraries and consolidated internal processes to an edge application',
      image: process.env.PUBLIC_URL + '/aerobeam.png'
    },
    {
      company: 'Republic of Singapore Air Force',
      position: 'WSO (FTR) Trainee',
      period: 'Oct 2018 - July 2021',
      description: 'Managed ~10 separate flying courses in flight, visa, health and safety currencies. I planned large scale activities with 200-300 participants, and forecasted manpower capacities for overseas detachments. I supported flight scheduling and critical life support systems',
      image: process.env.PUBLIC_URL + '/wso_ftr.jpg'
    }
  ];

  const education = [
    {
      school: 'Nanyang Technological University',
      degree: 'Mechanical Engineering w/ Specialisation in Robotics',
      period: 'Aug 2021 - Jun 2025',
      description: 'Grade: First Class Honours'
    },
    {
      school: 'Technische Universität München',
      degree: 'Mechanical Engineering Exchange',
      period: 'May 2024 - Aug 2024',
      description: '7 Modules @ 33 ECTS - Grade 2.5/5.0'
    }
  ];

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box className="App">
        {/* Contact Section */}
        <Box className="contact-section" sx={{ bgcolor: 'background.paper', color: 'text.primary', py: 2, mb: 4 }}>
          <Container>
            <Grid container spacing={2} alignItems="center" justifyContent="space-between">
            <Grid item>
                <Tooltip title="Download My Resume">
                <IconButton 
                    href={contactInfo.resume}
                    download="Ong_Zheng_Kai_Ethan_Resume.pdf"
                    color="inherit" 
                    sx={{
                        gap: 1, 
                        display: 'flex', 
                        alignItems: 'center',
                        '&:hover': {
                            color: 'primary.main',
                            transform: 'scale(1.05)',
                        },
                        transition: 'all 0.2s'
                    }}
                >
                    <Typography variant="button" sx={{display: {xs: 'none', sm: 'block'}}}>
                        Resume
                    </Typography>
                    <FaFileDownload size={15}/>
                </IconButton>
                </Tooltip>
            </Grid>
            <Grid item>
              <Grid container spacing={2} alignItems="center">
                <Grid item>
                    <IconButton href={`mailto:${contactInfo.email}`} color="inherit" onClick={(e) => {
                        e.preventDefault();
                        handleCopy(contactInfo.email, 'Email copied to clipboard!');
                    }} sx={{ fontSize: '1.2rem' }}>
                        <FaEnvelope size={20} />
                    </IconButton>
                </Grid>
                <Grid item>
                    <IconButton href={`tel:${contactInfo.phone}`} color="inherit" onClick={(e) => {
                        e.preventDefault();
                        handleCopy(contactInfo.phone, 'Phone number copied to clipboard!');
                    }} sx = {{ fontSize: '1.2rem' }}>
                        <FaPhone size={20} />
                    </IconButton>
                </Grid>
                <Grid item>
                    <IconButton href={contactInfo.linkedin} target="_blank" color="inherit">
                        <FaLinkedin />
                    </IconButton>
                </Grid>
                <Grid item>
                    <IconButton href={contactInfo.github} target="_blank" color="inherit">
                        <FaGithub />
                    </IconButton>
                </Grid>
            </Grid>
          </Grid>
          </Grid>
        </Container>
      </Box>

      <Container maxWidth="xl">
        {/* Split Layout Section */}
        <Grid container spacing={4} sx={{ mb: 6 }}>
          {/* Left Panel - Profile */}
          <Grid item xs={12} md={4}>
            <Box sx={{ mb: 3 }}>
              <Paper
                sx={{
                  width: '100%',
                  paddingTop: '100%',
                  position: 'relative',
                  overflow: 'hidden',
                  borderRadius: 4,
                  boxShadow: 3
                }}
              >
                <Box
                  component="img"
                  src={process.env.PUBLIC_URL + '/website_photo.jpeg'}
                  alt="Profile"
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
              </Paper>
            </Box>
            <Typography variant="h5" gutterBottom> Hi! 😊 I'm Ethan </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              I'm a final-year Mechanical Engineering student at Nanyang Technological University, Singapore. I specialise in Robotics 🤖 with a strong passion for software development. I recently led Team Mecatron's software division to victory at SAUVC 2025, so lookout for our next big thing 😉. Grit and hunger drives success, no pain no gain! 🦾
            </Typography>
          </Grid>

          
          {/* Right Panel - Gaussian Splatting */}
          <Grid item xs={12} md={8}>
            <Typography variant="h6" sx={{ mb: 1 }}>Gaussian Splatting with my coding buddy!</Typography>
            <Box sx={{ width: '100%', height: '60vh', position: 'relative' }}>
                <Canvas
                    camera={{ 
                        position: [0, 0, 2],
                        fov: 75,
                        near: 0.1,
                        far: 1000
                    }}
                    gl={{ antialias: true }}
                >
                    <color attach="background" args={['#1a1a1a']} />
                    <Splat src={process.env.PUBLIC_URL + '/maltese.splat'} position={[0, 0.3, 0]} scale={[20.0, 20.0, 20.0]}/>
                    <OrbitControls enableDamping dampingFactor={0.05} />
                    <Environment preset="sunset" />
                </Canvas>
            </Box>
            <Typography 
                variant="caption" 
                color="text.secondary" 
                sx={{ display: 'block', textAlign: 'center', mt: 1 }}
            >
                Gaussian Splatting implementation adapted from {' '}
                <a 
                    href="https://github.com/pmndrs/drei" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    style={{ color: 'inherit' }}
                >
                    drei
                </a>
            </Typography>

            {/* Add Snackbar at the end of the return statement */}
            <Snackbar
              open={snackbarOpen}
              autoHideDuration={2000}
              onClose={() => setSnackbarOpen(false)}
              message={snackbarMessage}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            />
          </Grid>
        </Grid>

        {/* Projects Section */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="sectionTitle" sx={{ fontSize: '2.5rem' }}>Projects</Typography>
          <Grid container spacing={2}>
            {projects.map((project, index) => (
              <Grid item xs={12} md={4} key={index}>
                <div className="project-item">
                    <a href={project.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
                  <Box
                    sx={{
                      width: '100%',
                      height: 250,
                      mb: 2,
                      overflow: 'hidden',
                      borderRadius: 2
                    }}
                  >
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      style={{ 
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }} 
                    />
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>{project.title}</Typography>
                  <Typography 
                    variant="body2" 
                    color="text.secondary" 
                    dangerouslySetInnerHTML={{ __html: project.description }}
                  />
                  </a>
                </div>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Skills Section */}
        <Box sx={{ mb: 5 }}>
          <Typography variant="sectionTitle" sx={{ fontSize: '2.5rem' }}>Skills</Typography>
          {Object.entries(skills).map(([category, items]) => (
            <div key={category} className="skill-category">
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <Typography variant="h6" sx={{ fontSize: '1.1rem', minWidth: '150px' }}>{category}</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                  {Array.isArray(items) ? (
                    items.map((skill, index) => (
                      <React.Fragment key={index}>
                        {typeof skill === 'string' ? (
                          <span className="skill-item" style={{ marginTop: '2px', marginBottom: '2px' }}>{skill}</span>
                        ) : (
                          <Tooltip title={skill.name} placement="top">
                            <IconButton 
                              sx={{ 
                                color: 'text.secondary',
                                '&:hover': {
                                  color: 'text.primary',
                                  transform: 'scale(1.1)',
                                },
                                transition: 'all 0.2s'
                              }}
                            >
                              {React.createElement(skill.icon, { size: 24 })}
                            </IconButton>
                          </Tooltip>
                        )}
                      </React.Fragment>
                    ))
                  ) : null}
                </Box>
              </Box>
            </div>
          ))}
        </Box>

        {/* Experience Section */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="sectionTitle" sx={{ fontSize: '2.5rem' }}>Work Experience</Typography>
          {experience.map((exp, index) => (
            <Box key={index} sx={{ mb: 4 }}>
              <Grid container spacing={3} alignItems="center">
                <Grid item xs={12} md={6}>
                  <Box
                    sx={{
                      width: '100%',
                      height: 200,
                      borderRadius: 2,
                      overflow: 'hidden',
                      boxShadow: 3
                    }}
                  >
                    <img
                      src={exp.image}
                      alt={exp.company}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box sx={{ pl: { md: 2 } }}>
                    <Typography variant="h6" color="primary">{exp.position}</Typography>
                    <Typography variant="subtitle1" color="secondary">{exp.company}</Typography>
                    <Typography variant="subtitle2" color="text.secondary">{exp.period}</Typography>
                    <Typography variant="body2">{exp.description}</Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          ))}
        </Box>

        {/* Education Section */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="sectionTitle" sx={{ fontSize: '2.5rem' }}>Education</Typography>
          {education.map((edu, index) => (
            <div key={index} className="education-item">
              <Typography variant="h6" color="primary">{edu.degree}</Typography>
              <Typography variant="subtitle1" color="secondary">{edu.school}</Typography>
              <Typography variant="subtitle2" color="text.secondary">{edu.period}</Typography>
              <Typography variant="body1">{edu.description}</Typography>
            </div>
          ))}
        </Box>
      </Container>
    </Box>
    </ThemeProvider>
  );
}

export default App;

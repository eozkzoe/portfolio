import React from 'react';
import { 
  Container, Box, Typography, Grid, IconButton, ThemeProvider, 
  createTheme, CssBaseline, Paper, Tooltip, Snackbar, Button,
  useScrollTrigger, Slide, Fade
} from '@mui/material';
import { 
  FaLinkedin, FaEnvelope, FaPhone, FaGithub, FaJs, FaPython, 
  FaDatabase, FaReact, FaGitAlt, FaDocker, FaFileDownload, 
  FaMicrosoft, FaLinux, FaUnity, FaArrowRight 
} from 'react-icons/fa';
import { 
  SiC, SiCplusplus, SiWebgl, SiThreedotjs, SiRos, 
  SiAdobephotoshop, SiDavinciresolve, SiArduino 
} from 'react-icons/si';
import { TbView360Number } from 'react-icons/tb';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';
import './index.css';

const theme = createTheme({
  typography: {
    fontFamily: '"Outfit", sans-serif',
    h1: { fontWeight: 700, fontSize: '4.5rem', letterSpacing: '-0.02em' },
    h2: { fontWeight: 700, fontSize: '3rem', letterSpacing: '-0.01em' },
    h3: { fontWeight: 600, fontSize: '2.25rem' },
    h4: { fontWeight: 600, fontSize: '1.75rem' },
    h5: { fontWeight: 600, fontSize: '1.25rem' },
    h6: { fontWeight: 600, fontSize: '1.1rem' },
    body1: { fontSize: '1.1rem', lineHeight: 1.7 },
  },
  palette: {
    mode: 'dark',
    primary: { main: '#6366f1' },
    secondary: { main: '#a855f7' },
    background: {
      default: '#0a0a0c',
      paper: 'rgba(255, 255, 255, 0.03)',
    },
    text: {
      primary: '#f8fafc',
      secondary: '#94a3b8',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          textTransform: 'none',
          fontWeight: 600,
          padding: '10px 24px',
        },
      },
    },
  },
});

function HideOnScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

function App() {
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');

  const contactInfo = {
    email: 'ethanong27@gmail.com',
    phone: '+6597913739',
    linkedin: 'https://linkedin.com/in/eozk',
    github: 'https://github.com/eozkzoe',
    resume: process.env.PUBLIC_URL + '/resume.pdf'
  };

  const handleCopy = (text, message) => {
    navigator.clipboard.writeText(text);
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const experience = [
    {
      company: 'Shopee',
      position: 'Project Manager',
      period: 'Jul. 2025 – Present',
      description: 'Managing AI Chatbot Projects across Backend, Data Science, Ops, and Product teams. Overseeing transitions from rule-based to skill-based agents and launching a project management multi-agent bot.',
      image: process.env.PUBLIC_URL + '/haltere.png'
    },
    {
      company: 'Hyundai Motor Group',
      position: 'Student Researcher',
      period: 'Aug. 2024 – May 2025',
      description: 'Improved digital reconstruction of car parts using 3D Gaussian Splatting for vision-based motion-planning.',
      image: process.env.PUBLIC_URL + '/hmgics.jpg'
    },
    {
      company: 'Panasonic R&D',
      position: 'Research Intern',
      period: 'Jan 2025 - Present',
      description: 'Researching 3D reconstruction techniques (SLAM, Gaussian Splatting). Developing in Three.js and GLSL.',
      image: process.env.PUBLIC_URL + '/3d_recon.jpeg'
    },
  ];

  const projects = [
    {
      title: 'Mecatron',
      description: 'Winner of SAUVC 2025! Led software development for an autonomous underwater vehicle.',
      image: process.env.PUBLIC_URL + '/mecatron_sauvc.jpg',
      link: 'https://mecatron.sg'
    },
    {
      title: 'Dyson-NTU Challenge',
      description: 'System design and fabrication of a full consumer product from scratch.',
      image: process.env.PUBLIC_URL + '/dyson_submission.png'
    },
    {
      title: 'Espressif U Amaze',
      description: '1st Runner Up! Created an unmanned vehicle for maze navigation.',
      image: process.env.PUBLIC_URL + '/espressif.jpeg'
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

  const skillGroups = {
    'Languages & Dev': [
      { name: 'Python', icon: FaPython },
      { name: 'C++', icon: SiCplusplus },
      { name: 'JavaScript', icon: FaJs },
      { name: 'SQL', icon: FaDatabase },
      { name: 'GLSL', icon: SiWebgl },
    ],
    'Robotics & Tools': [
      { name: 'ROS', icon: SiRos },
      { name: 'Three.js', icon: SiThreedotjs },
      { name: 'Docker', icon: FaDocker },
      { name: 'Linux', icon: FaLinux },
      { name: 'Unity', icon: FaUnity },
      { name: 'Arduino', icon: SiArduino },
    ],
    'Creative & Others': [
      { name: 'Photoshop', icon: SiAdobephotoshop },
      { name: 'DaVinci Resolve', icon: SiDavinciresolve },
      { name: 'Fusion360', icon: TbView360Number },
    ]
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box className="App">
        
        {/* Navigation */}
        <HideOnScroll>
          <Box className="sticky-header">
            <Container maxWidth="lg">
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 2 }}>
                <Typography variant="h5" sx={{ fontWeight: 700, color: 'primary.main' }}>
                  Ethan Ong
                </Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <IconButton href={contactInfo.github} target="_blank" color="inherit"><FaGithub size={20} /></IconButton>
                  <IconButton href={contactInfo.linkedin} target="_blank" color="inherit"><FaLinkedin size={20} /></IconButton>
                  <Button 
                    variant="contained" 
                    startIcon={<FaFileDownload />}
                    href={contactInfo.resume}
                    download
                  >
                    Resume
                  </Button>
                </Box>
              </Box>
            </Container>
          </Box>
        </HideOnScroll>

        {/* Hero Section */}
        <Box className="hero-section">
          <div className="hero-blob" style={{ top: '10%', left: '10%' }}></div>
          <div className="hero-blob" style={{ bottom: '20%', right: '10%', background: 'radial-gradient(circle, var(--secondary) 0%, transparent 70%)' }}></div>
          
          <Container maxWidth="lg">
            <Grid container spacing={6} alignItems="center">
              <Grid item xs={12} md={7}>
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  <Typography variant="h1" gutterBottom>
                    Crafting the future of <span className="gradient-text">Robotics</span>
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: '600px' }}>
                    Final-year Mechanical Engineering student at NTU specializing in Robotics & Software. 
                    Passionate about 3D reconstruction, computer vision, and building autonomous systems.
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button variant="contained" size="large" onClick={() => handleCopy(contactInfo.email, 'Email copied!')}>
                      Contact Me
                    </Button>
                    <Button variant="outlined" size="large" endIcon={<FaArrowRight />} onClick={() => window.scrollTo({ top: 800, behavior: 'smooth' })}>
                      View Projects
                    </Button>
                  </Box>
                </motion.div>
              </Grid>
              <Grid item xs={12} md={5}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <Box sx={{ position: 'relative' }}>
                    <Box
                      component="img"
                      src={process.env.PUBLIC_URL + '/website_photo.jpeg'}
                      alt="Ethan Ong"
                      className="rounded-image"
                      sx={{ width: '100%', maxWidth: '400px', display: 'block', margin: 'auto' }}
                    />
                  </Box>
                </motion.div>
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* Experience Section */}
        <Container maxWidth="lg" className="section-padding">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Typography variant="h2" gutterBottom className="gradient-text" sx={{ mb: 6 }}>
              Experience
            </Typography>
            <Grid container spacing={4}>
              {experience.map((exp, index) => (
                <Grid item xs={12} md={6} key={index}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    style={{ height: '100%' }}
                  >
                    <Paper className="glass-card experience-card" sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                      <Box
                        component="img"
                        src={exp.image}
                        alt={exp.company}
                        sx={{ width: '100%', height: '240px', objectFit: 'cover', borderRadius: '16px', mb: 3 }}
                      />
                      <Box sx={{ px: 1 }}>
                        <Typography variant="h4" gutterBottom>{exp.position}</Typography>
                        <Typography variant="h6" color="primary.main" gutterBottom>{exp.company}</Typography>
                        <Typography variant="overline" color="text.secondary" sx={{ fontWeight: 700, display: 'block', mb: 2 }}>
                          {exp.period}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                          {exp.description}
                        </Typography>
                      </Box>
                    </Paper>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </Container>

        {/* Education Section */}
        <Container maxWidth="lg" className="section-padding">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Typography variant="h2" gutterBottom className="gradient-text" sx={{ mb: 6 }}>
              Education
            </Typography>
            <Grid container spacing={4}>
              {education.map((edu, index) => (
                <Grid item xs={12} md={6} key={index}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    style={{ height: '100%' }}
                  >
                    <Paper className="glass-card experience-card" sx={{ height: '100%', p: 4 }}>
                      <Typography variant="overline" color="primary.main" sx={{ fontWeight: 700 }}>
                        {edu.period}
                      </Typography>
                      <Typography variant="h4" gutterBottom>{edu.degree}</Typography>
                      <Typography variant="h6" color="text.secondary" gutterBottom>{edu.school}</Typography>
                      <Typography variant="body1" color="text.secondary">
                        {edu.description}
                      </Typography>
                    </Paper>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </Container>

        {/* Projects Section */}
        <Box sx={{ bgcolor: 'rgba(255, 255, 255, 0.01)', borderY: '1px solid var(--glass-border)' }}>
          <Container maxWidth="lg" className="section-padding">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Typography variant="h2" gutterBottom className="gradient-text" sx={{ mb: 6 }}>
                Featured Projects
              </Typography>
              <Grid container spacing={4}>
                {projects.map((project, index) => (
                  <Grid item xs={12} md={4} key={index}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      style={{ height: '100%' }}
                    >
                      <Paper className="glass-card project-card" sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                        <Box
                          component="img"
                          src={project.image}
                          alt={project.title}
                          sx={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '12px', mb: 3 }}
                        />
                        <Typography variant="h4" gutterBottom>{project.title}</Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 3, flexGrow: 1 }}>
                          {project.description}
                        </Typography>
                        {project.link && (
                          <Button variant="text" color="primary" href={project.link} target="_blank" endIcon={<FaArrowRight />}>
                            Explore
                          </Button>
                        )}
                      </Paper>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            </motion.div>
          </Container>
        </Box>

        {/* Skills Section */}
        <Container maxWidth="lg" className="section-padding">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Typography variant="h2" gutterBottom className="gradient-text" sx={{ mb: 6 }}>
              Skillset
            </Typography>
            <Grid container spacing={6}>
              {Object.entries(skillGroups).map(([group, skills], groupIndex) => (
                <Grid item xs={12} md={4} key={group}>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: groupIndex * 0.1 }}
                  >
                    <Typography variant="h5" sx={{ mb: 3, color: 'text.primary' }}>{group}</Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
                      {skills.map((skill) => (
                        <Box key={skill.name} className="skill-pill">
                          {React.createElement(skill.icon)}
                          {skill.name}
                        </Box>
                      ))}
                    </Box>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </Container>

        {/* Footer */}
        <Box className="footer">
          <Container maxWidth="lg">
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>
              Let's build something together.
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              Open for interesting opportunities in Robotics and AI.
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3 }}>
              <IconButton href={`mailto:${contactInfo.email}`} color="inherit"><FaEnvelope size={24} /></IconButton>
              <IconButton href={contactInfo.linkedin} target="_blank" color="inherit"><FaLinkedin size={24} /></IconButton>
              <IconButton href={contactInfo.github} target="_blank" color="inherit"><FaGithub size={24} /></IconButton>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 6 }}>
              © {new Date().getFullYear()} Ethan Ong. Built with React & Passion.
            </Typography>
          </Container>
        </Box>

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={2000}
          onClose={() => setSnackbarOpen(false)}
          message={snackbarMessage}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        />
      </Box>
    </ThemeProvider>
  );
}

export default App;

import React from 'react';
import { 
  Container, Box, Typography, Grid, IconButton, ThemeProvider, 
  createTheme, CssBaseline, Paper, Snackbar, Button,
  useScrollTrigger, Slide
} from '@mui/material';
import { 
  FaLinkedin, FaGithub, FaJs, FaPython, 
  FaDatabase, FaReact, FaGitAlt, FaDocker, FaFileDownload, 
  FaMicrosoft, FaLinux, FaUnity 
} from 'react-icons/fa';
import { 
  SiC, SiCplusplus, SiWebgl, SiThreedotjs, SiRos, 
  SiAdobephotoshop, SiDavinciresolve, SiArduino 
} from 'react-icons/si';
import { TbView360Number } from 'react-icons/tb';
import './App.css';
import './index.css';

const darkTheme = createTheme({
  typography: {
    fontFamily: '"JetBrains Mono", monospace',
    h4: {
      fontWeight: 700,
    },
    h6: {
      fontWeight: 700,
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
      description: 'Managing AI Chatbot Projects across Backend, Data Science, Ops, and Product teams in China, Indonesia, and Singapore to improve customer satisfaction, deflection rates, reduce hallucinations, and generate shop sales. Coordinating PRDs, technical discussions, cross-team timelines, and conducting weekly/daily standups to solve bad cases during live testing, forecast technical and resource blockers, and ensure SLA and SOP adherence. Leveraged Jira APIs, SQL, Python scripts, and Hive Tables to monitor feature and tech project release and request frequency health and manpower efficiency across all AI product-lines in Shopee. Overseeing transitions from rule-based to skill-based agents, issue to intent KBs, and auto-QA/tagging/training. Launched a project management multi-agent bot and knowledge base to guide process and team onboarding, automate administrative tasks, and provide an interface to sync data across multiple project trackers & platforms',
      image: process.env.PUBLIC_URL + '/shopee_exp_photo.jpeg'
    },
    {
      company: 'Hyundai Motor Group Innovation Center Singapore',
      position: 'Student Researcher',
      period: 'Aug. 2024 – May 2025',
      description: 'Improved digital reconstruction of car parts using 3D Gaussian Splatting for vision-based motion-planning. Optimised image datasets, replanned robotic arm trajectories, and performed studies on point cloud and computer vision implementations.',
      image: process.env.PUBLIC_URL + '/hmgics.jpg'
    },
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

  const projects = [
    {
      title: 'Mecatron',
      description: 'Winner of SAUVC 2025! Bested 100+ teams from 20 countries. Software lead at NTU\'s Student-led Marine Robotics team. Leading ~10 SWEs in developing Behaviour Trees, localisation, object detection etc.',
      image: process.env.PUBLIC_URL + '/mecatron_sauvc.jpg',
      link: 'https://mecatron.sg'
    },
    {
      title: 'Dyson-NTU Product Development Challenge',
      description: 'Perform market analysis and system design to fabricate an entire product from scratch!',
      image: process.env.PUBLIC_URL + '/dyson_submission.png'
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

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box className="App">
        
        {/* Navigation */}
        <HideOnScroll>
          <Box sx={{ position: 'sticky', top: 0, zIndex: 1000, bgcolor: 'background.paper', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
            <Container maxWidth="lg">
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 2 }}>
                <Button 
                  variant="outlined" 
                  startIcon={<FaFileDownload />}
                  href={contactInfo.resume}
                  download
                  size="small"
                >
                  Resume
                </Button>
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                  <IconButton href={contactInfo.github} target="_blank" color="inherit"><FaGithub size={20} /></IconButton>
                  <IconButton href={contactInfo.linkedin} target="_blank" color="inherit"><FaLinkedin size={20} /></IconButton>
                  <Button 
                    variant="contained" 
                    size="small"
                    onClick={() => handleCopy(contactInfo.email, 'Email copied!')}
                    sx={{ ml: 1 }}
                  >
                    Contact Me
                  </Button>
                </Box>
              </Box>
            </Container>
          </Box>
        </HideOnScroll>

        {/* Hero Section */}
        <Container maxWidth="lg" sx={{ py: 8 }}>
          <Grid container spacing={4}>
            {/* Left Column: Pic + Intro */}
            <Grid item xs={12} md={5}>
              <Box sx={{ maxWidth: '400px' }}>
                <Box sx={{ mb: 4 }}>
                  <Paper
                    className="glass-card"
                    sx={{
                      width: '100%',
                      paddingTop: '100%',
                      position: 'relative',
                      overflow: 'hidden',
                      borderRadius: 4,
                    }}
                  >
                    <Box
                      component="img"
                      src={process.env.PUBLIC_URL + '/website_photo.jpeg'}
                      alt="Ethan Ong"
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
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 700 }}> Hi! 😊 I'm Ethan </Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                  I'm currently working as a Project Manager at Shopee overseeing AI Chatbot Projects for both Customer Service and Shop Growth. I studied Mechanical Engineering with a Specialisation in Robotics 🤖 at Nanyang Technological University, Singapore. I have a strong passion for software development, working in large research firms, startups, and competitions. Grit and hunger drives success, no pain no gain! 🦾
                </Typography>
              </Box>
            </Grid>

            {/* Right Column: PDF Viewer */}
            <Grid item xs={12} md={7}>
              <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h6" gutterBottom sx={{ mb: 3, fontWeight: 700 }}>
                  Check out my feature by NTU!
                </Typography>
                <Paper 
                  className="glass-card" 
                  sx={{ 
                    width: '100%', 
                    flexGrow: 1,
                    minHeight: { xs: '500px', md: '850px' }, 
                    overflow: 'hidden',
                    borderRadius: 2
                  }}
                >
                  <iframe
                    src={`${process.env.PUBLIC_URL}/ethan_ong_mae_feature.pdf#view=FitH`}
                    width="100%"
                    height="100%"
                    style={{ border: 'none' }}
                    title="NTU Feature"
                  />
                </Paper>
              </Box>
            </Grid>
          </Grid>
        </Container>

        {/* Experience Section */}
        <Container maxWidth="lg" className="section-padding">
          <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>Work Experience</Typography>
          <Grid container spacing={4}>
            {experience.map((exp, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Paper className="glass-card" sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <Box
                    component="img"
                    src={exp.image}
                    alt={exp.company}
                    sx={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: 2, mb: 2 }}
                  />
                  <Typography variant="h6" color="primary">{exp.position}</Typography>
                  <Typography variant="subtitle1" color="text.secondary">{exp.company}</Typography>
                  <Typography variant="overline" sx={{ display: 'block', mb: 1 }}>{exp.period}</Typography>
                  <Typography variant="body2" color="text.secondary">{exp.description}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>

        {/* Education Section */}
        <Container maxWidth="lg" className="section-padding">
          <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>Education</Typography>
          <Grid container spacing={4}>
            {education.map((edu, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Paper className="glass-card" sx={{ p: 3, height: '100%' }}>
                  <Typography variant="h6" color="primary">{edu.degree}</Typography>
                  <Typography variant="subtitle1" color="text.secondary">{edu.school}</Typography>
                  <Typography variant="overline" sx={{ display: 'block', mb: 1 }}>{edu.period}</Typography>
                  <Typography variant="body2">{edu.description}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>

        {/* Projects Section */}
        <Container maxWidth="lg" className="section-padding">
          <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>Projects</Typography>
          <Grid container spacing={4}>
            {projects.map((project, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Paper className="glass-card" sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <Box
                    component="img"
                    src={project.image}
                    alt={project.title}
                    sx={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: 2, mb: 2 }}
                  />
                  <Typography variant="h6" gutterBottom>{project.title}</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ flexGrow: 1 }}>{project.description}</Typography>
                  {project.link && (
                    <Button variant="text" color="primary" href={project.link} target="_blank" sx={{ mt: 2, alignSelf: 'flex-start' }}>
                      Learn More
                    </Button>
                  )}
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>

        {/* Skills Section */}
        <Container maxWidth="lg" className="section-padding">
          <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>Skills</Typography>
          <Grid container spacing={4}>
            {Object.entries(skills).map(([category, items]) => (
              <Grid item xs={12} key={category}>
                <Paper className="glass-card" sx={{ p: 3 }}>
                  <Typography variant="h6" color="primary" gutterBottom>{category}</Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                    {items.map((skill, index) => (
                      <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {skill.icon && <skill.icon />}
                        <Typography variant="body2">{typeof skill === 'string' ? skill : skill.name}</Typography>
                      </Box>
                    ))}
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>

        {/* Footer */}
        <Box sx={{ py: 6, textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.1)', mt: 4 }}>
          <Container maxWidth="lg">
            <Typography variant="body2" color="text.secondary">
              © {new Date().getFullYear()} Ethan Ong. Built with React.
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

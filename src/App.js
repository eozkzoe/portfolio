import React from 'react';
import { Container, Box, Typography, Grid, IconButton, ThemeProvider, createTheme, CssBaseline, Paper, Tooltip } from '@mui/material';
import { FaLinkedin, FaEnvelope, FaPhone, FaGithub, FaJs, FaPython, FaDatabase, FaReact, FaGitAlt, FaDocker, FaFileDownload, FaMicrosoft, FaLinux, FaUnity } from 'react-icons/fa';
import { SiC, SiCplusplus, SiWebgl, SiThreedotjs, SiRos, SiAdobephotoshop, SiDavinciresolve, SiArduino } from 'react-icons/si';
import { TbView360Number } from 'react-icons/tb';
import { Snackbar } from '@mui/material';
import { Environment, OrbitControls, useGLTF } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import * as THREE from 'three';
import './App.css';
import './styles/Typography.css';
import * as GaussianSplats3D from '@mkkellogg/gaussian-splats-3d';

function isWebGLAvailable() {
  try {
    const canvas = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
  } catch {
    return false;
  }
}

class ViewerErrorBoundary extends React.Component {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

function GlbModel({ url, position = [0, 0, 0], scale = [1, 1, 1] }) {
  const { scene } = useGLTF(url, false);
  const cloned = React.useMemo(() => scene.clone(), [scene]);
  return (
    <primitive object={cloned} position={position} scale={scale} />
  );
}


function AdvancedSplat({ url, position = [0, 0, 0], scale = [1, 1, 1], alphaTest = 0.1 }) {
  const viewer = React.useMemo(() => {
    return new GaussianSplats3D.DropInViewer({
      'gpuAcceleratedSort': true,
      'splatAlphaTest': alphaTest,
      'renderMode': GaussianSplats3D.RenderMode.All
    });
  }, [alphaTest]);

  React.useEffect(() => {
    if (!url) return;
    
    // Clear previous scenes if any
    viewer.addSplatScene(url, {
      'position': position,
      'rotation': [0, 0, 0],
      'scale': scale,
    });

    return () => {
      // Cleanup is handled by viewer disposal if needed, 
      // but DropInViewer is an Object3D that can be removed.
    };
  }, [viewer, url, position, scale]);

  return <primitive object={viewer} />;
}

function ModelViewer({ modelUrl, format, position, scale }) {
  return (
    <Suspense fallback={null}>
      {format === 'splat' || format === 'ply' ? (
        <AdvancedSplat 
            url={modelUrl} 
            position={position} 
            scale={scale} 
            alphaTest={0.02} // Low threshold to keep detail but remove noise
        />
      ) : (
        <GlbModel url={modelUrl} position={position} scale={scale} />
      )}
    </Suspense>
  );
}

function Viewer3DWithFormat() {
  const base = process.env.PUBLIC_URL || '';
  const [state, setState] = React.useState({ ready: false, format: 'ply', url: base + '/maltese.ply' });
  React.useEffect(() => {
    const splatUrl = base + '/maltese.splat';
    const glbUrl = base + '/maltese.glb';

    fetch(splatUrl, { method: 'HEAD' })
      .then((r) => {
        if (r.ok) {
          setState({ ready: true, format: 'splat', url: splatUrl });
        } else {
          return fetch(glbUrl, { method: 'HEAD' })
            .then((r2) => setState({ ready: true, format: r2.ok ? 'glb' : 'ply', url: r2.ok ? glbUrl : base + '/maltese.ply' }));
        }
      })
      .catch(() => {
        fetch(glbUrl, { method: 'HEAD' })
          .then((r2) => setState({ ready: true, format: r2.ok ? 'glb' : 'ply', url: r2.ok ? glbUrl : base + '/maltese.ply' }))
          .catch(() => setState({ ready: true, format: 'ply', url: base + '/maltese.ply' }));
      });
  }, [base]);
  if (!state.ready) {
    return (
      <Box sx={{ width: '100%', height: '100%', minHeight: 360, bgcolor: '#1a1a1a', borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="body2" color="text.secondary">Loading 3D…</Typography>
      </Box>
    );
  }
  return (
    <Canvas
      camera={{ position: [0, 1, 3], fov: 45, near: 0.1, far: 1000 }}
      gl={{ 
        antialias: false, 
        alpha: true,
        preserveDrawingBuffer: true,
      }}
      onCreated={({ gl }) => {
        gl.setClearColor('#1a1a1a');
      }}
    >
      <ModelViewer
        modelUrl={state.url}
        format={state.format}
        position={[0, 0, 0]}
        scale={[1, 1, 1]}
      />
      <OrbitControls enableDamping dampingFactor={0.05} makeDefault />
      <Environment preset="sunset" />
    </Canvas>
  );
}

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
      company: 'Shopee',
      position: 'Project Manager',
      period: 'Jul. 2025 – Present',
      description: 'Managing AI Chatbot Projects across Backend, Data Science, Ops, and Product teams in China, Indonesia, and Singapore to improve customer satisfaction, deflection rates, reduce hallucinations, and generate shop sales. Coordinating PRDs, technical discussions, cross-team timelines, and conducting weekly/daily standups to solve bad cases during live testing, forecast technical and resource blockers, and ensure SLA and SOP adherence. Leveraged Jira APIs, SQL, Python scripts, and Hive Tables to monitor feature and tech project release and request frequency health and manpower efficiency across all AI product-lines in Shopee. Overseeing transitions from rule-based to skill-based agents, issue to intent KBs, and auto-QA/tagging/training. Launched a project management multi-agent bot and knowledge base to guide process and team onboarding, automate administrative tasks, and provide an interface to sync data across multiple project trackers & platforms',
      image: process.env.PUBLIC_URL + '/haltere.png'
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

          
          {/* Right Panel - 3D model */}
          <Grid item xs={12} md={8}>
            <Typography variant="h6" sx={{ mb: 1 }}>3D model — my coding buddy!</Typography>
            <Box sx={{ width: '100%', height: '60vh', position: 'relative' }}>
              <ViewerErrorBoundary
                fallback={
                  <Box
                    sx={{
                      width: '100%',
                      height: '100%',
                      minHeight: 360,
                      bgcolor: '#1a1a1a',
                      borderRadius: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'text.secondary',
                      p: 2,
                      textAlign: 'center',
                    }}
                  >
                    <Box
                      component="img"
                      src={process.env.PUBLIC_URL + '/website_photo.jpeg'}
                      alt="Fallback"
                      sx={{ width: 120, height: 120, borderRadius: 2, objectFit: 'cover', mb: 2, opacity: 0.9 }}
                    />
                    <Typography variant="body2">
                      3D viewer unavailable in this browser. Try Chrome or Firefox for the interactive model.
                    </Typography>
                  </Box>
                }
              >
                {!isWebGLAvailable() ? (
                  <Box
                    sx={{
                      width: '100%',
                      height: '100%',
                      minHeight: 360,
                      bgcolor: '#1a1a1a',
                      borderRadius: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'text.secondary',
                      p: 2,
                      textAlign: 'center',
                    }}
                  >
                    <Box
                      component="img"
                      src={process.env.PUBLIC_URL + '/website_photo.jpeg'}
                      alt="Fallback"
                      sx={{ width: 120, height: 120, borderRadius: 2, objectFit: 'cover', mb: 2, opacity: 0.9 }}
                    />
                    <Typography variant="body2">
                      WebGL not supported. Try Chrome or Firefox for the interactive 3D model.
                    </Typography>
                  </Box>
                ) : (
                  <Viewer3DWithFormat />
                )}
              </ViewerErrorBoundary>
            </Box>
            <Typography 
                variant="caption" 
                color="text.secondary" 
                sx={{ display: 'block', textAlign: 'center', mt: 1 }}
            >
                For best Safari support, add <code>maltese.glb</code> (convert from PLY in Blender). Uses{' '}
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

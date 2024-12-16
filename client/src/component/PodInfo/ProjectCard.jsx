import React, { useState, useEffect } from 'react';
import { FaCircle, FaCalendarAlt } from 'react-icons/fa';
import { Cardss, CardContent, CardFooter } from '../../component/ClientInfo/Cards';
import Badge from '../../component/ClientInfo/Badge';
import { getTechStackById } from '../../api/projectApi';

const getStatusColor = (status) => {
  switch (status) {
    case 'stage':
      return 'yellow';
    case 'dev':
      return 'blue';
    case 'live':
      return 'green';
    default:
      return 'red';
  }
};

export const ProjectCard = ({ project }) => {
  const [techStack, setTechStack] = useState([]);
 
   useEffect(() => {
     const fetchTechStackDetails = async () => {
       try {
         const techStackPromises = project.techStack.map((id) => getTechStackById(id));
         const techStackDetails = await Promise.all(techStackPromises);
         
         console.log("Fetched Tech Stack Details: ", techStackDetails);
         
         setTechStack(techStackDetails.map(detail => detail.name)); // Save tech stack names in state
       } catch (error) {
         console.error("Error fetching tech stack details:", error);
       }
     };
 
     if (project.techStack && project.techStack.length > 0) {
       fetchTechStackDetails();
     }
   }, [project.techStack]);

  return (
    <Cardss className="project-card1">
      <CardContent className="project-image-container">
        <div className="project-image-wrapper">
          <img
            src={"https://picsum.photos/600/400?random=1"}
            alt={project.name}
            className="project-image"
          />
          <div className="project-image-overlay" />
        </div>
      </CardContent>
      <CardFooter className="project-info">
        <div className="project-details">
          <h4 className="project-title">{project.name}</h4>
          <div className="project-stat">
            {project.description}
          </div>
          <div className="project-status">
            <FaCircle style={{ color: getStatusColor(project.status), fontSize: '14px', margin: '5px' }} />
            <span style={{ color: "white" }}>{project.status}</span>
          </div>
          <div className="project-dates">
            <div className="project-start">
              <FaCalendarAlt style={{ color: "white", marginRight: '8px' }} />
              <span style={{color: "white"}}>{new Date(project.start_time).toLocaleDateString()}</span>-  <span style={{color: "white"}}>{new Date(project.end_time).toLocaleDateString()}</span>
            </div>
          </div>
          <div className="project-tech-stack">
            {techStack.map((tech, index) => (
              <Badge key={index} className="tech-badge">{tech}</Badge>
            ))}
          </div>
          <div className="project-links">
            {project.links && project.links.github && (
              <a href={project.links.github} target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            )}
            {project.links && project.links.links && (
              <a href={project.links.links} target="_blank" rel="noopener noreferrer">
                Live Demo
              </a>
            )}
          </div>
        </div>
      </CardFooter>
    </Cardss>
  );
};

export default ProjectCard;


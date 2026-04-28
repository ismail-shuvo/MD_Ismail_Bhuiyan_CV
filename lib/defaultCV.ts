import { CVData } from '@/types/cv'

export const defaultCV: CVData = {
  name: "Md. Ismail Bhuiyan",
  title: "DevOps & Linux System Administrator",
  email: "ismailshuvo13@gmail.com",
  phone: "(+880) 1706430533",
  linkedin: "https://www.linkedin.com/in/ismail-shuvo-b64637131/",
  address: "57/3 Matikata, Cantt, Dhaka, 1206, Bangladesh",
  about: "DevOps & Linux System Administrator with 5 years of experience in automation, CI/CD, containerization, and secure infrastructure management. Skilled in designing and maintaining DevOps, DevSecOps, and MLOps pipelines using Jenkins, GitHub Actions, Docker, Kubernetes, Prometheus, Grafana, MLflow, and security scanning tools like Bandit, Docker Scout, and DefectDojo.",
  skills: [
    "Linux System Administration", "Docker", "Kubernetes", "Jenkins",
    "GitHub Actions", "GitLab CI", "Terraform", "Ansible",
    "Prometheus", "Grafana", "ELK Stack", "MLflow",
    "Nginx", "Apache", "Python", "Bash",
    "MySQL", "MongoDB", "Redis", "PostgreSQL",
    "DevSecOps", "SAST/DAST", "Bandit", "Docker Scout", "DefectDojo"
  ],
  experiences: [
    {
      role: "DevOps Engineer",
      company: "IBCS-Primax Software (Bangladesh) Ltd.",
      period: "01/08/2025 – Present",
      location: "Dhaka, Bangladesh",
      bullets: [
        "Built and maintained CI/CD pipelines using Jenkins, GitLab CI, and GitHub Actions.",
        "Automated infrastructure provisioning with Terraform and configuration management using Ansible.",
        "Deployed and managed containerized applications using Docker and Kubernetes.",
        "Implemented end-to-end MLOps pipelines with Jenkins, Docker, MLflow, Prometheus, and Grafana.",
        "Set up monitoring, logging, and alerting using Prometheus, Grafana, and the ELK Stack.",
        "Integrated DevSecOps practices into CI/CD pipelines for security and compliance.",
        "Performed SAST and DAST using Bandit, Docker Scout, and DefectDojo.",
        "Configured networking components including firewalls, load balancers, DNS, and SSL/TLS."
      ]
    },
    {
      role: "System Administrator",
      company: "Mysoft Heaven (BD) Ltd.",
      period: "11/12/2023 – 31/07/2025",
      location: "Dhaka, Bangladesh",
      bullets: [
        "Web application deployment and server maintenance.",
        "Managed CI/CD pipelines using GitHub, GitLab, and Jenkins.",
        "Managed Docker and Kubernetes deployments.",
        "Administered databases including MySQL, MongoDB, and Redis.",
        "Set up monitoring with Prometheus and Grafana.",
        "Infrastructure automation using Ansible."
      ]
    },
    {
      role: "Jr. System Administrator",
      company: "IBSS - Integrated Business Systems & Solutions Pvt. Ltd.",
      period: "01/02/2021 – 31/10/2021",
      location: "Dhaka, Bangladesh",
      bullets: [
        "Responsible for virtual Linux servers, DB management, network technology, and VPN (OpenVPN).",
        "Worked on virtualization management, cloud technology, and monitoring.",
        "Managed infrastructure upgrades and end-user hardware/software issues.",
        "Managed IT staff monitoring and diagnosing server and data center problems.",
        "Performed data backups and disaster recovery operations.",
        "Managed a support team of 9 people."
      ]
    }
  ],
  projects: [
    {
      title: "MLOps Project: End-to-End Automated Pipeline",
      period: "01/11/2025 – 10/11/2025",
      description: "Jenkins, Docker, MLflow, Prometheus, Grafana",
      bullets: [
        "Designed and implemented a fully automated end-to-end MLOps pipeline.",
        "Automated model training, experiment tracking, containerized deployment, and CI/CD workflows.",
        "Implemented monitoring and observability for model performance and system health.",
        "Delivered a fully reproducible local MLOps environment with comprehensive documentation."
      ],
      link: "https://lnkd.in/gfp7JYMh"
    },
    {
      title: "DevOps Project: Microservices Deployment for a2i",
      period: "01/07/2025 – 13/07/2025",
      description: "Docker, Kubernetes, Jenkins, Prometheus, Grafana",
      bullets: [
        "Deployed a three-microservice application using a full DevOps toolchain.",
        "Containerized services with Docker and automated CI/CD using GitHub and Jenkins.",
        "Orchestrated and scaled microservices with Kubernetes for high availability.",
        "Implemented monitoring and alerting using Prometheus and Grafana."
      ]
    },
    {
      title: "DevSecOps Project: Automated Security Scanning & Vulnerability Management",
      period: "10/08/2025 – 19/08/2025",
      description: "GitHub Actions, Bandit, Docker Scout, DefectDojo",
      bullets: [
        "Developed and integrated an automated DevSecOps pipeline using GitHub Actions.",
        "Implemented SAST with Bandit and container scanning with Docker Scout.",
        "Centralized vulnerability management with DefectDojo.",
        "Enforced continuous security and shift security left in the CI workflow."
      ],
      link: "https://github.com/ismailShuvo/pygoat"
    }
  ],
  education: [
    {
      degree: "B.Sc in ICE",
      institution: "Bangladesh University of Professionals (BUP)",
      period: "01/01/2016 – 31/12/2019",
      location: "Dhaka, Bangladesh",
      link: "https://bup.edu.bd/"
    }
  ],
  certifications: ["CCNA", "RHCSA", "RHCE", "MTCNA"]
}

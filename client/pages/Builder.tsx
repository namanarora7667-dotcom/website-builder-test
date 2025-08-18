import { Trophy as TrophyIcon } from "lucide-react";
import { ArrowUpTrayIcon } from '@heroicons/react/24/solid';
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

import {
  Code,
  Palette,
  Zap,
  Rocket,
  ArrowLeft,
  Eye,
  Save,
  Download,
  Settings,
  Image,
  Type,
  Layout,
  Plus,
  Minus,
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Globe,
  Star,
  Calendar,
  Award,
  BookOpen,
  Users,
  Database,
  Server,
  Cloud,
  Terminal,
  Smartphone,
  Monitor,
  Layers,
  Box,
  Shield,
  TrendingUp,
  CheckCircle,
  ExternalLink,
  Play,
  Coffee,
  Briefcase,
  GraduationCap,
  Target,
  Lightbulb,
  Heart,
  MessageSquare,
  Building,
  ArrowRight,
  Sparkles,
  // Trophy,
} from "lucide-react";
import { Link } from "react-router-dom";

type TechStack = "frontend" | "backend" | "fullstack" | "cloud" | "techops" | "devops" | "custom" | null;

interface SectionConfig {
  id: string;
  name: string;
  enabled: boolean;
  required?: boolean;
  icon?: React.ReactNode;
}

interface TemplateSection {
  hero: boolean;
  about: boolean;
  skills: boolean;
  projects: boolean;
  experience: boolean;
  education: boolean;
  certifications: boolean;
  blog: boolean;
  testimonials: boolean;
  contact: boolean;
  github: boolean;
  achievements: boolean;
}

interface WebsiteData {
  name: string;
  tagline: string;
  description: string;
  skills: string;
  projects: string; // Keep for backward compatibility
  project1: string;
  project2: string;
  project3: string;
  aboutImage: string;
  

  // ✅ New fields for Project 1
  project1Image: string;
  project1Contributors: string;
  project1StartDate: string;
  project1EndDate: string;
  project1Institution: string;

  // ✅ New fields for Project 2
  project2Image: string;
  project2Contributors: string;
  project2StartDate: string;
  project2EndDate: string;
  project2Institution: string;

  // ✅ New fields for Project 3
  project3Image: string;
  project3Contributors: string;
  project3StartDate: string;
  project3EndDate: string;
  project3Institution: string;
  // converting strings to an array for the field related issue 
  experience: string;
  education: string;
  certifications: string;
  github: string;
  linkedin: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  achievements: string;
  bio: string;
  primaryColor: string;
  secondaryColor: string;
}


export default function Builder() {
  const [selectedStack, setSelectedStack] = useState<TechStack>(null);
  const [isInitializing, setIsInitializing] = useState(true);
  const location = useLocation();
  const [activeProjectIndex, setActiveProjectIndex] = useState<number | null>(null);
  const [showContactModal, setShowContactModal] = useState(false);
const [contactDetails, setContactDetails] = useState({name: "", number: "", email: "" });
const [showThankYouMessage, setShowThankYouMessage] = useState(false);
 

useEffect(() => {
  const params = new URLSearchParams(location.search);
  const templateParam = params.get("template") as TechStack;

  if (templateParam) {
    selectTemplate(templateParam);
  }
// }, [location.search]);

 setIsInitializing(false);
}, [location.search]);

  const [websiteData, setWebsiteData] = useState<WebsiteData>({
  name: "",
  tagline: "",
  description: "",
  skills: "",
  projects: "", // Keep for backward compatibility
  project1: "",
  project2: "",
  project3: "",
  aboutImage: "",

  // ✅ Add these
  project1Image: "",
  project1Contributors: "",
  project1StartDate: "",
  project1EndDate: "",
  project1Institution: "",

  project2Image: "",
  project2Contributors: "",
  project2StartDate: "",
  project2EndDate: "",
  project2Institution: "",

  project3Image: "",
  project3Contributors: "",
  project3StartDate: "",
  project3EndDate: "",
  project3Institution: "",
  // converting strings into an array for field related issue
  experience: "",
  education: "",
  certifications: "",
  github: "",
  linkedin: "",
  email: "",
  phone: "",
  location: "",
  website: "",
  achievements: "",
  bio: "",
  primaryColor: "#8b5cf6",
  secondaryColor: "#06b6d4",
});

  const [skillsList, setSkillsList] = useState<string[]>([]);
  const [showSkillModal, setShowSkillModal] = useState(false);
  const [newSkillInput, setNewSkillInput] = useState("");
  const [isDownloading, setIsDownloading] = useState(false);
  const [html, setHtml] = useState("");
  // const [isPublishing, setIsPublishing] = useState(false);
// const [publishStatus, setPublishStatus] = useState<null | string>(null);

  // Template-specific project data
  const [templateProjectData, setTemplateProjectData] = useState<Record<string, {
    project1: string;
    project2: string;
    project3: string;
  }>>({
    frontend: { project1: "", project2: "", project3: "" },
    backend: { project1: "", project2: "", project3: "" },
    fullstack: { project1: "", project2: "", project3: "" },
    cloud: { project1: "", project2: "", project3: "" },
    techops: { project1: "", project2: "", project3: "" },
    devops: { project1: "", project2: "", project3: "" },
    custom: { project1: "", project2: "", project3: "" },
  });

  // Custom template states
  const [selectedTheme, setSelectedTheme] = useState("modern");
  const [customSections, setCustomSections] = useState<Record<string, any>>({});
  const [contentPlaceholders, setContentPlaceholders] = useState<Record<string, string>>({
    title: "{{Your Professional Title}}",
    subtitle: "{{Your Tagline or Specialization}}",
    description: "{{Brief description about yourself}}",
    techStack: "{{Your primary technologies}}",
    project1Description: "{{Description of your first project}}",
    project2Description: "{{Description of your second project}}",
    project3Description: "{{Description of your third project}}",
    contactMessage: "{{Your contact call-to-action}}",
  });

  // Theme configurations
  const themes = {
    modern: {
      name: "Modern",
      colors: {
        primary: "from-blue-500 to-purple-600",
        secondary: "from-slate-100 to-blue-50",
        accent: "from-purple-400 to-pink-500",
      },
      font: "Inter",
      spacing: "normal",
    },
    minimal: {
      name: "Minimal",
      colors: {
        primary: "from-gray-800 to-slate-900",
        secondary: "from-gray-50 to-white",
        accent: "from-gray-600 to-gray-700",
      },
      font: "Inter",
      spacing: "tight",
    },
    bold: {
      name: "Bold",
      colors: {
        primary: "from-red-500 to-orange-600",
        secondary: "from-yellow-50 to-red-50",
        accent: "from-yellow-400 to-orange-500",
      },
      font: "Inter",
      spacing: "wide",
    },
    dark: {
      name: "Dark",
      colors: {
        primary: "from-slate-700 to-gray-900",
        secondary: "from-slate-800 to-black",
        accent: "from-blue-400 to-cyan-500",
      },
      font: "Inter",
      spacing: "normal",
    },
    pastel: {
      name: "Pastel",
      colors: {
        primary: "from-pink-300 to-purple-400",
        secondary: "from-pink-50 to-purple-50",
        accent: "from-cyan-300 to-blue-400",
      },
      font: "Inter",
      spacing: "wide",
    },
  };

  const [templateSections, setTemplateSections] = useState<TemplateSection>({
  hero: true,
  about: true,
  skills: true,
  projects: true,
  experience: false,
  education: false,
  certifications: false,
  blog: false,
  testimonials: false,
  github: false,
  achievements: false,
  contact: true,
});



  const techStacks = [
    {
      id: "frontend" as const,
      title: "Frontend Developer",
      description: "Beautiful, responsive websites with modern frameworks",
      icon: <Palette className="w-8 h-8" />,
      color: "from-blue-500 to-purple-600",
      bgGradient: "bg-gradient-to-br from-blue-50 to-purple-50",
      borderColor: "border-blue-200",
      features: [
        // "Interactive Portfolio",
        // "Project Showcase",
        // "Component Library",
        // "Performance Metrics",
        // "Design System",
        // "UI/UX Case Studies",
      ],
      defaultSections: {
        hero: true,
        about: true,
        skills: true,
        projects: true,
        experience: true,
        education: false,
        certifications: false,
        blog: false,
        testimonials: true,
        contact: true,
        github: true,
        achievements: false,
      },
    },
    {
      id: "backend" as const,
      title: "Backend Developer",
      description: "Robust server-side solutions",
      icon: <Code className="w-8 h-8" />,
      color: "from-green-500 to-emerald-600",
      bgGradient: "bg-gradient-to-br from-green-50 to-emerald-50",
      borderColor: "border-green-200",
      features: [
        // "API Documentation",
        // "System Architecture",
        // "Database Design",
        // "Performance Monitoring",
        // "Security Protocols",
        // "Microservices",
      ],
      defaultSections: {
        hero: true,
        about: true,
        skills: true,
        projects: true,
        experience: true,
        education: false,
        certifications: true,
        blog: true,
        testimonials: false,
        contact: true,
        github: true,
        achievements: false,
      },
    },
    {
      id: "fullstack" as const,
      title: "Full-stack Developer",
      description: "Complete end-to-end web applications",
      icon: <Zap className="w-8 h-8" />,
      color: "from-purple-500 to-pink-600",
      bgGradient: "bg-gradient-to-br from-purple-50 to-pink-50",
      borderColor: "border-purple-200",
      features: [
        // "End-to-End Projects",
        // "Tech Stack Mastery",
        // "Live Demos",
        // "Case Studies",
        // "Development Process",
        // "Client Testimonials",
      ],
      defaultSections: {
        hero: true,
        about: true,
        skills: true,
        projects: true,
        experience: true,
        education: true,
        certifications: false,
        blog: false,
        testimonials: true,
        contact: true,
        github: true,
        achievements: true,
      },
    },
    {
      id: "cloud" as const,
      title: "Cloud Engineer",
      description: "Scalable cloud-native applications",
      icon: <Rocket className="w-8 h-8" />,
      color: "from-orange-500 to-red-600",
      bgGradient: "bg-gradient-to-br from-orange-50 to-red-50",
      borderColor: "border-orange-200",
      features: [
        // "Infrastructure Diagrams",
        // "Cloud Certifications",
        // "DevOps Pipeline",
        // "Cost Optimization",
        // "Security & Compliance",
        // "Monitoring Dashboards",
      ],
      defaultSections: {
        hero: true,
        about: true,
        skills: true,
        projects: true,
        experience: true,
        education: false,
        certifications: true,
        blog: true,
        testimonials: false,
        contact: true,
        github: false,
        achievements: true,
      },
    },
    {
      id: "techops" as const,
      title: "TechOps Engineer",
      description: "Infrastructure management and system operations",
      icon: <Monitor className="w-8 h-8" />,
      color: "from-slate-500 to-gray-600",
      bgGradient: "bg-gradient-to-br from-slate-50 to-gray-50",
      borderColor: "border-slate-200",
      features: [
        // "System Administration",
        // "Network Operations",
        // "Security Management",
        // "Performance Monitoring",
        // "Infrastructure Automation",
        // "Incident Response",
      ],
      defaultSections: {
        hero: true,
        about: true,
        skills: true,
        projects: true,
        experience: true,
        education: false,
        certifications: true,
        blog: false,
        testimonials: false,
        contact: true,
        github: false,
        achievements: true,
      },
    },
    {
      id: "devops" as const,
      title: "DevOps Engineer",
      description: "Automated deployment and operational excellence",
      icon: <Settings className="w-8 h-8" />,
      color: "from-teal-500 to-cyan-600",
      bgGradient: "bg-gradient-to-br from-teal-50 to-cyan-50",
      borderColor: "border-teal-200",
      features: [
        // "CI/CD Automation",
        // "Container Orchestration",
        // "Infrastructure as Code",
        // "Monitoring & Observability",
        // "Release Management",
        // "Pipeline Optimization",
      ],
      defaultSections: {
        hero: true,
        about: true,
        skills: true,
        projects: true,
        experience: true,
        education: false,
        certifications: true,
        blog: true,
        testimonials: false,
        contact: true,
        github: true,
        achievements: false,
      },
    },
    {
      id: "custom" as const,
      title: "Custom Builder",
      description: "Fully customizable template for any domain or profession",  
      icon: <Sparkles className="w-8 h-8" />,
      color: "from-indigo-500 to-purple-600",
      bgGradient: "bg-gradient-to-br from-indigo-50 to-purple-50",
      borderColor: "border-indigo-200",
      features: [
        // "Drag & Drop Sections",
        // "5 Premium Themes",
        // "Markdown Support",
        // "Content Placeholders",
        // "Form-to-Website Generator",
        // "Complete Customization",
      ],
      defaultSections: {
        hero: true,
        about: true,
        skills: true,
        projects: true,
        experience: false,
        education: false,
        certifications: false,
        blog: false,
        testimonials: false,
        contact: true,
        github: false,
        achievements: false,
      },
    },
  ];

  const availableSections: SectionConfig[] = [
  {
    id: "hero",
    name: "Hero Section",
    enabled: true,
    required: true,
    icon: <Star className="w-4 h-4" />,
  },
  {
    id: "about",
    name: "About Me",
    enabled: true,
    icon: <Users className="w-4 h-4" />,
  },
  {
    id: "skills",
    name: "Skills & Technologies",
    enabled: true,
    icon: <Settings className="w-4 h-4" />,
  },
  {
    id: "projects",
    name: "Featured Projects",
    enabled: true,
    icon: <Layout className="w-4 h-4" />,
  },
  {
    id: "experience",
    name: "Work Experience",
    enabled: true, // changed from false to true
    icon: <Briefcase className="w-4 h-4" />,
  },
  {
    id: "education",
    name: "Education",
    enabled: true, // changed from false to true
    icon: <GraduationCap className="w-4 h-4" />,
  },
  {
    id: "certifications",
    name: "Certifications",
    enabled: true, // changed from false to true
    icon: <Award className="w-4 h-4" />,
  },
  {
    id: "blog",
    name: "Blog Posts",
    enabled: true, // changed from false to true
    icon: <BookOpen className="w-4 h-4" />,
  },
  {
    id: "testimonials",
    name: "Testimonials",
    enabled: true, // changed from false to true
    icon: <MessageSquare className="w-4 h-4" />,
  },
  // {
  //   id: "github",
  //   name: "GitHub Stats",
  //   enabled: true, // changed from false to true
  //   icon: <Github className="w-4 h-4" />,
  // },
  {
    id: "achievements",
    name: "Achievements",
    enabled: true, // changed from false to true
    icon: <Trophy className="w-4 h-4" />,
  },
  {
    id: "contact",
    name: "Contact",
    enabled: true,
    required: true,
    icon: <Mail className="w-4 h-4" />,
  },
];


  const handleInputChange = (field: keyof WebsiteData, value: string) => {
  setWebsiteData((prev) => ({
    ...prev,
    [field]: value,
  }));

  // Keep skillsList in sync if skills field is updated
  if (field === "skills") {
    const updatedSkills = value.split(",").map(skill => skill.trim());
    setSkillsList(updatedSkills);
  }

  // If it's a project field and we have a selected template, save to template-specific data
  if ((field === 'project1' || field === 'project2' || field === 'project3') && selectedStack) {
    setTemplateProjectData(prev => ({
      ...prev,
      [selectedStack]: {
        ...prev[selectedStack],
        [field]: value,
      }
    }));
  }
};

// syncing logic- fields not syncing with placeholders

  const toggleSection = (sectionId: keyof TemplateSection) => {
  // If we are in custom template mode, sync customSections too
  if (selectedStack === 'custom') {
    setCustomSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  }

  // Always update templateSections
  setTemplateSections((prev) => ({
    ...prev,
    [sectionId]: !prev[sectionId],
  }));
};


  const selectTemplate = (stackId: TechStack) => {
  setSelectedStack(stackId);

  // Clear custom sections if switching away from custom template
  if (stackId !== 'custom') {
    setCustomSections({});
  }

  const template = techStacks.find((s) => s.id === stackId);
  if (template) {
    // Merge default sections with sidebar availability
    const mergedSections = {} as TemplateSection;
    availableSections.forEach((section) => {
      mergedSections[section.id as keyof TemplateSection] =
        section.required ? true : template.defaultSections[section.id as keyof TemplateSection];
    });

    setTemplateSections(mergedSections); // Sync sidebar with default sections

    // Initialize skills list with default skills for the selected template
    const defaultSkills = getDefaultSkills(stackId).split(",").map(skill => skill.trim());

// Sync both skillsList and websiteData.skills
setSkillsList(defaultSkills);
setWebsiteData(prev => ({
  ...prev,
  skills: defaultSkills.join(", "), // keep preview in sync
  project1: templateProjectData[stackId]?.project1 || "",
  project2: templateProjectData[stackId]?.project2 || "",
  project3: templateProjectData[stackId]?.project3 || "",
}));

  }
};



  const removeSkill = (skillToRemove: string) => {
    setSkillsList(prev => prev.filter(skill => skill !== skillToRemove));
  };

  const addSkill = (newSkill: string) => {
    if (newSkill.trim() && !skillsList.includes(newSkill.trim())) {
      setSkillsList(prev => [...prev, newSkill.trim()]);
    }
  };

  const handleAddSkillSubmit = () => {
    if (newSkillInput.trim()) {
      addSkill(newSkillInput.trim());
      setNewSkillInput("");
      setShowSkillModal(false);
    }
  };

  const handleSkillModalClose = () => {
    setShowSkillModal(false);
    setNewSkillInput("");
  };

  const updateContentPlaceholder = (key: string, value: string) => {
    setContentPlaceholders(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const toggleCustomSection = (sectionId: string) => {
    setCustomSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const processContent = (content: string, fieldKey?: keyof WebsiteData) => {
  // If checking for a specific field (like 'name', 'tagline'), prioritize live data
  if (fieldKey) {
    return websiteData[fieldKey]?.trim()
      ? websiteData[fieldKey]
      : contentPlaceholders[fieldKey] || content || "";
  }

  // Global replacement for {{key}} patterns
  let processedContent = content || "";
  Object.entries(contentPlaceholders).forEach(([key, placeholder]) => {
    const actualValue =
      websiteData[key as keyof WebsiteData]?.trim() || placeholder;
    processedContent = processedContent.replace(
      new RegExp(`{{${key}}}`, "g"),
      actualValue
    );
  });

  return processedContent;
};



  const getCurrentTemplateProjects = () => {
    if (!selectedStack) return { project1: "", project2: "", project3: "" };
    return templateProjectData[selectedStack] || { project1: "", project2: "", project3: "" };
  };
  
  const getDefaultBio = (title: string) => 
  `Passionate ${title.toLowerCase()} with expertise in modern technologies and best practices. Building exceptional digital experiences that make a difference.`;
  const generateStaticWebsite = () => {
    const template = selectedTemplate;
    const skills = skillsList.length > 0 ? skillsList : getDefaultSkills(selectedStack).split(",").map(s => s.trim());
    const currentProjects = getCurrentTemplateProjects();

    // Generate complete HTML structure
    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${websiteData.name || 'Professional Portfolio'} - ${template.title}</title>
    <meta name="description" content="${websiteData.bio || `Professional ${template.title.toLowerCase()} portfolio`}">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <script src="https://unpkg.com/lucide@latest/dist/umd/lucide.js"></script>   
    



    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Inter', sans-serif;
            line-height: 1.6;
            color: #1e293b;
            background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
            min-height: 100vh;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 1rem;
        }

        .hero {
            background: linear-gradient(135deg, ${template.color.replace('from-', '').replace(' to-', ', ')});
            color: white;
            padding: 5rem 2rem;
            text-align: center;
            position: relative;
            overflow: hidden;
        }

        .hero::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.1);
            z-index: 1;
        }
          
        .hero-content {
            position: relative;
            z-index: 2;
        }

        .hero h1 {
            font-size: 3.5rem;
            font-weight: 700;
            margin-bottom: 1rem;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
        }

        .hero p {
            font-size: 1.25rem;
            margin-bottom: 2rem;
            opacity: 0.9;
        }

        .hero-avatar {
            width: 8rem;
            height: 8rem;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 50%;
            margin: 0 auto 2rem;
            display: flex;
            align-items: center;
            justify-content: center;
            backdrop-filter: blur(10px);
            border: 3px solid rgba(255, 255, 255, 0.3);
        }

        .section {
            padding: 4rem 2rem;
        }

        .section-title {
            font-size: 2.5rem;
            font-weight: 700;
            text-align: center;
            margin-bottom: 3rem;
            color: #1e293b;
        }

        .section-subtitle {
            width: 6rem;
            height: 0.25rem;
            background: linear-gradient(135deg, ${template.color.replace('from-', '').replace(' to-', ', ')});
            margin: 0 auto 3rem;
            border-radius: 2px;
        }

        .about-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 3rem;
            align-items: center;
        }

        .about-text {
            font-size: 1.125rem;
            line-height: 1.8;
            color: #475569;
        }

        .contact-info {
            margin-top: 2rem;
        }

        .contact-item {
            display: flex;
            align-items: center;
            margin-bottom: 1rem;
            padding: 0.75rem;
            background: rgba(255, 255, 255, 0.6);
            border-radius: 0.75rem;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(139, 92, 246, 0.1);
        }

        .contact-icon {
            width: 2.5rem;
            height: 2.5rem;
            background: linear-gradient(135deg, ${template.color.replace('from-', '').replace(' to-', ', ')});
            border-radius: 0.5rem;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 1rem;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .about-visual {
            text-align: center;
        }

        .about-card {
            width: 16rem;
            height: 16rem;
            background: linear-gradient(135deg, ${template.color.replace('from-', '').replace(' to-', ', ')});
            border-radius: 2rem;
            margin: 0 auto;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            overflow: hidden;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }

        

        .skill-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        }

        // .skill-icon {
        //     width: 3.5rem;
        //     height: 3.5rem;
        //     background: linear-gradient(135deg, ${template.color.replace('from-', '').replace(' to-', ', ')});
        //     border-radius: 1rem;
        //     margin: 0 auto 1rem;
        //     display: flex;
        //     align-items: center;
        //     justify-content: center;
        //     box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
        // }

        // .skill-name {
        //     font-weight: 600;
        //     color: #1e293b;
        // }
       .skills-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: center;
}

.skill-badge {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.5rem 1rem;
  background: linear-gradient(135deg, ${template.color.replace('from-', '').replace(' to-', ', ')});
  color: white;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
}

.skill-badge:hover {
  transform: translateY(-2px);
}

.skill-progress {
  width: 100%;
  height: 4px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 9999px;
  margin-top: 2px;
}

.skill-progress-bar {
  height: 4px;
  background: white;
  border-radius: 9999px;
}

        .projects-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: 2rem;
        }

        .project-card {
            background: linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.7));
            border-radius: 1.5rem;
            overflow: hidden;
            backdrop-filter: blur(10px);
            border: 2px solid rgba(255, 255, 255, 0.5);
            transition: all 0.3s ease;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        }

        .project-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15),
                0 0 20px rgba(139, 92, 246, 0.4); /* purple glow */
    border-color: rgba(139, 92, 246, 0.5);       /* glowing border color */
}


        .project-image {
            height: 12rem;
            background: linear-gradient(135deg, ${template.color.replace('from-', '').replace(' to-', ', ')});
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
        }

        .project-content {
            padding: 2rem;
        }

        .project-title {
            font-size: 1.25rem;
            font-weight: 700;
            margin-bottom: 1rem;
            color: #1e293b;
        }

        .project-description {
            color: #475569;
            margin-bottom: 1.5rem;
            line-height: 1.6;
        }

        .project-tech {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
        }

        .tech-badge {
            background: rgba(139, 92, 246, 0.1);
            color: #7c3aed;
            padding: 0.25rem 0.75rem;
            border-radius: 0.5rem;
            font-size: 0.875rem;
            font-weight: 500;
            border: 1px solid rgba(139, 92, 246, 0.2);
        }

        .btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            padding: 0.75rem 2rem;
            font-weight: 600;
            border-radius: 0.75rem;
            text-decoration: none;
            transition: all 0.3s ease;
            border: none;
            cursor: pointer;
        }

        .btn-primary {
            background: linear-gradient(135deg, ${template.color.replace('from-', '').replace(' to-', ', ')});
            color: white;
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
        }

        .btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
        }

        .btn-secondary {
            background: rgba(255, 255, 255, 0.2);
            color: white;
            border: 2px solid rgba(255, 255, 255, 0.3);
            backdrop-filter: blur(10px);
        }

        .btn-secondary:hover {
            background: rgba(255, 255, 255, 0.1);
            transform: translateY(-2px);
        }

        .contact-section {
            background: linear-gradient(135deg, ${template.color.replace('from-', '').replace(' to-', ', ')});
            color: white;
            text-align: center;
            position: relative;
            overflow: hidden;
        }

        .contact-section::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.1);
            z-index: 1;
        }

        .contact-content {
            position: relative;
            z-index: 2;
        }

        .social-links {
            display: flex;
            justify-content: center;
            gap: 1rem;
            margin-top: 2rem;
        }

        .social-link {
            width: 3rem;
            height: 3rem;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            text-decoration: none;
            transition: all 0.3s ease;
            backdrop-filter: blur(10px);
        }

        .social-link:hover {
            background: rgba(255, 255, 255, 0.3);
            transform: scale(1.1);
        }

        @media (max-width: 768px) {
            .hero h1 {
                font-size: 2.5rem;
            }

            .about-grid {
                grid-template-columns: 1fr;
                gap: 2rem;
            }

            // .skills-grid {
            //     grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            // }

            .projects-grid {
                grid-template-columns: 1fr;
            }
        }

        /* Animation keyframes */
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .animate-fadeInUp {
            animation: fadeInUp 0.8s ease-out;
        }
    </style>
</head>
<body>
    ${templateSections.hero || customSections['hero'] ? `
    <!-- Hero Section -->
    <section class="hero">
        <div class="hero-content container">
            
            <h1 class="animate-fadeInUp">${processContent(websiteData.name) || 'Your Name'}</h1>
<p class="animate-fadeInUp">${processContent(websiteData.tagline) || template.title}</p>
<p class="animate-fadeInUp" style="max-width: 600px; margin: 0 auto;">
    ${processContent(websiteData.bio) || getDefaultBio(template.title)}

</p>

            <div style="margin-top: 2rem;">
                <a href="#contact" class="btn btn-secondary" style="margin-right: 1rem;">
                    <i data-lucide="mail" style="width: 1rem; height: 1rem; margin-right: 0.5rem;"></i>
                    Contact Me
                </a>
                <a href="#" class="btn btn-secondary">
                    <i data-lucide="download" style="width: 1rem; height: 1rem; margin-right: 0.5rem;"></i>
                    Download CV
                </a>
            </div>
        </div>
    </section>` : ''}

    ${templateSections.about || customSections?.about ? `
    <!-- About Section -->
    <section class="section" id="about">
        <div class="container">
            <h2 class="section-title">About Me</h2>
            <div class="section-subtitle"></div>
            <div class="about-grid">
                <div>
                    <p class="about-text">
    ${processContent(websiteData.bio) || getDefaultBio(template.title)}

</p>
<div class="contact-info">
    ${websiteData.email ? `
    <div class="contact-item">
        <div class="contact-icon">
            <i data-lucide="mail" style="width: 1.25rem; height: 1.25rem; color: white;"></i>
        </div>
        <span>${processContent(websiteData.email)}</span>

    </div>` : ''}
    ${websiteData.location ? `
    <div class="contact-item">
        <div class="contact-icon">
            <i data-lucide="map-pin" style="width: 1.25rem; height: 1.25rem; color: white;"></i>
        </div>
        <span>${processContent(websiteData.location)}</span>

    </div>` : ''}
    ${websiteData.phone ? `
    <div class="contact-item">
        <div class="contact-icon">
            <i data-lucide="phone" style="width: 1.25rem; height: 1.25rem; color: white;"></i>
        </div>

                            <span>${processContent(websiteData.phone)}</span>

                        </div>` : ''}
                    </div>
                </div>
                <div class="about-visual">
                    <div class="about-card">
  ${
    websiteData.aboutImage?.trim()
      ? `<img src="${websiteData.aboutImage}" alt="About" style="width: 100%; height: 100%; object-fit: cover; border-radius: 2rem;" />`
      : `<i data-lucide="users" style="width: 5rem; height: 5rem; color: white;"></i>`
  }
</div>



                </div>
            </div>
        </div>
    </section>` : ''}


    ${templateSections.skills || customSections['skills'] ? `

    <!-- Skills Section -->
    <section class="section" id="skills">
        <div class="container">
            <h2 class="section-title">Skills & Technologies</h2>
            <div class="section-subtitle"></div>
            <div class="skills-list">
                ${skills.slice(0, 20).map(skill => `
                    <div class="skill-badge">
                        <span>${skill}</span>
                        <div class="skill-progress">
                            <div class="skill-progress-bar" style="width: 70%"></div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    </section>` : ''}


    ${templateSections.projects || customSections['projects'] ? `

    <!-- Projects Section -->
    <section class="section" id="projects">
        <div class="container">
            <h2 class="section-title">Featured Projects</h2>
            <div class="section-subtitle"></div>
            <div class="projects-grid">
                ${[1, 2, 3].map(i => `
                <div class="project-card hover-effect">
                    <div class="project-image">
                        ${(() => {
                            const projectImages = [
                                websiteData.project1Image,
                                websiteData.project2Image,
                                websiteData.project3Image
                            ];
                            const currentImage = projectImages[i - 1];
                            return currentImage
                                ? `<img src="${currentImage}" alt="Project Image" style="width: 100%; height: 12rem; object-fit: cover; border-radius: 0.75rem 0.75rem 0 0;" />`
                                : `<div style="width: 100%; height: 12rem; display: flex; align-items: center; justify-content: center; color: #94a3b8;">No Image</div>`;
                        })()}
                    </div>

                    <div class="project-content">
                        <h3 class="project-title">
  ${processContent([websiteData.project1, websiteData.project2, websiteData.project3][i-1] || `Project ${i}`)}
</h3>


                       ${(() => {
  const contributors = [
    websiteData.project1Contributors,
    websiteData.project2Contributors,
    websiteData.project3Contributors
  ][i - 1];
  return contributors
    ? `<p class="project-description">Contributors: ${processContent(contributors)}</p>`
    : '';
})()}

${(() => {
  const startDate = [
    websiteData.project1StartDate,
    websiteData.project2StartDate,
    websiteData.project3StartDate
  ][i - 1];
  const endDate = [
    websiteData.project1EndDate,
    websiteData.project2EndDate,
    websiteData.project3EndDate
  ][i - 1];
  return (startDate || endDate)
    ? `<p class="project-description">Duration: ${processContent(startDate || '')} ${
        startDate && endDate ? ' - ' : ''
      } ${processContent(endDate || '')}</p>`
    : '';
})()}

${(() => {
  const institution = [
    websiteData.project1Institution,
    websiteData.project2Institution,
    websiteData.project3Institution
  ][i - 1];
  return institution
    ? `<p class="project-description">Institution: ${processContent(institution)}</p>`
    : '';
})()}


                        <div class="project-tech">
                            ${getProjectTech(selectedStack).map(tech => `<span class="tech-badge">${tech}</span>`).join('')}
                        </div>
                    </div>
                </div>
                `).join('')}
            </div>
        </div>
    </section>` : ''}


   ${templateSections.contact || customSections['contact'] ? `

    <!-- Contact Section -->
    <section class="contact-section section" id="contact">
        <div class="contact-content container">
            <h2 class="section-title" style="color: white;">Let's Work Together</h2>
            <p style="font-size: 1.25rem; margin-bottom: 2rem; max-width: 600px; margin-left: auto; margin-right: auto;">
                Ready to bring your next project to life? Let's discuss how we can create something amazing together.
            </p>
            <div>
                <a href="mailto:${websiteData.email || 'contact@example.com'}" class="btn btn-secondary" style="margin-right: 1rem;">
                    <i data-lucide="mail" style="width: 1rem; height: 1rem; margin-right: 0.5rem;"></i>
                    Send Message
                </a>
                <button
                  onClick={() => setShowContactModal(true)}
                  className="btn btn-secondary"
                >
                  <i className="w-4 h-4 mr-2" data-lucide="calendar"></i>
                  Contact Us
                </button>
            </div>
            <div class="social-links">
    ${websiteData.github
      ? `<a href="${websiteData.github.startsWith('http') ? websiteData.github : `https://github.com/${websiteData.github}`}" target="_blank" rel="noopener noreferrer" class="social-link"><i data-lucide="github" style="width: 1.5rem; height: 1.5rem;"></i></a>`
      : ''}
    ${websiteData.linkedin
      ? `<a href="${websiteData.linkedin.startsWith('http') ? websiteData.linkedin : `https://linkedin.com/in/${websiteData.linkedin}`}" target="_blank" rel="noopener noreferrer" class="social-link"><i data-lucide="linkedin" style="width: 1.5rem; height: 1.5rem;"></i></a>`
      : ''}
    ${websiteData.email
      ? `<a href="mailto:${websiteData.email}" class="social-link"><i data-lucide="mail" style="width: 1.5rem; height: 1.5rem;"></i></a>`
      : ''}
</div>

        </div>
    </section>` : ''}


    ${templateSections.experience || customSections['experience'] ? `

<!-- Work Experience Section -->
<section class="section" id="experience">
  <div class="container">
    <h2 class="section-title">Work Experience</h2>
    <div class="section-subtitle"></div>
    <p>${processContent(websiteData.experience) || "Add your work experience details here."}</p>
  </div>
</section>` : ''}



${templateSections.education || customSections['education'] ? `

<!-- Education Section -->
<section class="section" id="education">
  <div class="container">
    <h2 class="section-title">Education</h2>
    <div class="section-subtitle"></div>
    <p>${processContent(websiteData.education) || "Add your education details here."}</p>
  </div>
</section>` : ''}



${templateSections.certifications || customSections['certifications'] ? `

<!-- Certifications Section -->
<section class="section" id="certifications">
  <div class="container">
    <h2 class="section-title">Certifications</h2>
    <div class="section-subtitle"></div>
    <p>${processContent(websiteData.certifications) || "Add your certifications here."}</p>
  </div>
</section>` : ''}



${templateSections.blog || customSections['blog'] ? `

<!-- Blog Section -->
<section class="section" id="blog">
  <div class="container">
    <h2 class="section-title">Blog Posts</h2>
    <div class="section-subtitle"></div>
    <p>${processContent(websiteData.blog) || "Add your blog post links or content here."}</p>
  </div>
</section>` : ''}



${templateSections.testimonials || customSections['testimonials'] ? `

<!-- Testimonials Section -->
<section class="section" id="testimonials">
  <div class="container">
    <h2 class="section-title">Testimonials</h2>
    <div class="section-subtitle"></div>
    <p>${processContent(websiteData.testimonials) || "Add testimonials here."}</p>
  </div>
</section>` : ''}



${templateSections.github || customSections['github'] ? `

<!-- GitHub Stats Section -->
<section class="section" id="github">
  <div class="container">
    <h2 class="section-title">GitHub Stats</h2>
    <div class="section-subtitle"></div>
    <p>${processContent(websiteData.github) || "Showcase your GitHub stats or link here."}</p>
  </div>
</section>` : ''}




${templateSections.achievements || customSections['achievements'] ? `

<!-- Achievements Section -->
<section class="section" id="achievements">
  <div class="container">
    <h2 class="section-title">Achievements</h2>
    <div class="section-subtitle"></div>
    <p>${processContent(websiteData.achievements) || "List your achievements here."}</p>
  </div>
</section>` : ''}



    

    <script>
        // Initialize Lucide icons
        lucide.createIcons();

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Add scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fadeInUp');
                }
            });
        }, observerOptions);

        // Observe all sections
        document.querySelectorAll('.section, .skill-card, .project-card').forEach(el => {
            observer.observe(el);
        });
    </script>
</body>
</html>`;

    return htmlContent;
  };

  const downloadStaticWebsite = async () => {
    try {
      setIsDownloading(true);

      // Generate the HTML content
      const htmlContent = generateStaticWebsite();

      

      // Create a Blob with the HTML content
      const blob = new Blob([htmlContent], { type: 'text/html' });

      // Create download link
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${websiteData.name || 'portfolio'}-website.html`;

      // Trigger download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Clean up
      URL.revokeObjectURL(url);

      // Show success message (you could add a toast notification here)
      console.log('Website downloaded successfully!');

    } catch (error) {
      console.error('Error downloading website:', error);
      // You could add error handling/notification here
    } finally {
      setIsDownloading(false);
    }
  };
//   const handlePublish = async () => {
//   try {
//     const owner = prompt("Enter your GitHub username:");
//     const repo = prompt("Enter your repo name (must already exist):");
//     const token = prompt("Enter your GitHub Personal Access Token:");
//     if (!owner || !repo || !token) return;

//     setIsPublishing(true);
//     setPublishStatus("Preparing…");

//     const htmlContent = generateStaticWebsite();
//     const contentB64 = btoa(unescape(encodeURIComponent(htmlContent)));
//     const headers = {
//       Accept: "application/vnd.github+json",
//       "X-GitHub-Api-Version": "2022-11-28",
//       Authorization: `Bearer ${token}`,
//       "Content-Type": "application/json",
//     };

//     // 0) Detect default branch
//     let defaultBranch = "main";
//     const repoRes = await fetch(`https://api.github.com/repos/${owner}/${repo}`, { headers });
//     if (repoRes.ok) {
//       const repoJson = await repoRes.json();
//       defaultBranch = repoJson.default_branch || "main";
//     }

//     // 1) Upload (create or update) index.html
//     setPublishStatus("Uploading index.html…");

//     // If file exists, get its sha first
//     let sha: string | undefined;
//     const head = await fetch(
//       `https://api.github.com/repos/${owner}/${repo}/contents/index.html?ref=${defaultBranch}`,
//       { headers }
//     );
//     if (head.ok) {
//       const fileJson = await head.json();
//       if (fileJson && fileJson.sha) sha = fileJson.sha;
//     }

//     let res = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/index.html`, {
//       method: "PUT",
//       headers,
//       body: JSON.stringify({
//         message: "Publish from Website Builder",
//         content: contentB64,
//         branch: defaultBranch,
//         ...(sha ? { sha } : {}), // include sha only if file already exists
//       }),
//     });

//     if (!res.ok) {
//       const errText = await res.text();
//       throw new Error(`Upload failed: ${errText}`);
//     }

//     // 2) Enable GitHub Pages (idempotent)
//     setPublishStatus("Enabling GitHub Pages…");
//     res = await fetch(`https://api.github.com/repos/${owner}/${repo}/pages`, {
//       method: "POST",
//       headers,
//       body: JSON.stringify({ source: { branch: defaultBranch, path: "/" } }),
//     });
//     if (!(res.status === 201 || res.status === 409)) {
//       const errText = await res.text();
//       throw new Error(`Pages enable failed: ${errText}`);
//     }

//     // 3) Poll for Pages URL
//     setPublishStatus("Waiting for build…");
//     let siteUrl = "";
//     for (let i = 0; i < 10; i++) {
//       const pageRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/pages`, { headers });
//       if (pageRes.ok) {
//         const data = await pageRes.json();
//         siteUrl = data.html_url || siteUrl;
//         if (data.status === "built") break;
//       }
//       await new Promise(r => setTimeout(r, 2000));
//     }
//     if (!siteUrl) siteUrl = `https://${owner}.github.io/${repo}/`;

//     setPublishStatus("Opening site…");
//     window.open(siteUrl, "_blank");
//   } catch (err) {
//     console.error(err);
//     alert("Publish failed — check console for details.");
//   } finally {
//     setIsPublishing(false);
//     setPublishStatus(null);
//   }
// };


if (isInitializing) {
  return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-lg font-medium">Loading...</p>
    </div>
  );
}
  if (!selectedStack) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-blue-900 dark:to-purple-900 relative overflow-hidden">
        {/* Enhanced Animated Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <svg
            className="absolute w-full h-full opacity-30"
            viewBox="0 0 1440 800"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="wave-gradient-1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.1" />
                <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.1" />
              </linearGradient>
              <linearGradient id="wave-gradient-2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.08" />
                <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.12" />
                <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.08" />
              </linearGradient>
              <radialGradient id="templateBubble1" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(139, 92, 246, 0.12)" />
                <stop offset="100%" stopColor="rgba(139, 92, 246, 0)" />
              </radialGradient>
              <radialGradient id="templateBubble2" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(6, 182, 212, 0.12)" />
                <stop offset="100%" stopColor="rgba(6, 182, 212, 0)" />
              </radialGradient>
            </defs>

            {/* Wave Layers */}
            <path
              fill="url(#wave-gradient-1)"
              d="M0,200 C320,300 420,50 720,150 C1020,250 1200,100 1440,200 L1440,800 L0,800 Z"
            >
              <animateTransform
                attributeName="transform"
                type="translate"
                values="0,0;50,20;0,0"
                dur="20s"
                repeatCount="indefinite"
              />
            </path>

            <path
              fill="url(#wave-gradient-2)"
              d="M0,400 C360,300 520,450 720,350 C920,250 1080,400 1440,350 L1440,800 L0,800 Z"
            >
              <animateTransform
                attributeName="transform"
                type="translate"
                values="0,0;-30,15;0,0"
                dur="15s"
                repeatCount="indefinite"
              />
            </path>

            <path
              fill="url(#wave-gradient-1)"
              d="M0,600 C240,550 360,650 720,600 C1080,550 1200,650 1440,600 L1440,800 L0,800 Z"
              opacity="0.6"
            >
              <animateTransform
                attributeName="transform"
                type="translate"
                values="0,0;25,-10;0,0"
                dur="25s"
                repeatCount="indefinite"
              />
            </path>

            {/* Floating SVG bubbles */}
            <circle cx="15%" cy="25%" r="50" fill="url(#templateBubble1)">
              <animate attributeName="cy" values="25%;75%;25%" dur="16s" repeatCount="indefinite" />
              <animate attributeName="r" values="50;70;50" dur="8s" repeatCount="indefinite" />
            </circle>

            <circle cx="85%" cy="60%" r="40" fill="url(#templateBubble2)">
              <animate attributeName="cy" values="60%;20%;60%" dur="22s" repeatCount="indefinite" />
              <animate attributeName="r" values="40;55;40" dur="10s" repeatCount="indefinite" />
            </circle>

            <circle cx="45%" cy="80%" r="35" fill="url(#templateBubble1)">
              <animate attributeName="cy" values="80%;15%;80%" dur="18s" repeatCount="indefinite" />
              <animate attributeName="cx" values="45%;55%;45%" dur="12s" repeatCount="indefinite" />
            </circle>

            <circle cx="70%" cy="30%" r="45" fill="url(#templateBubble2)">
              <animate attributeName="cy" values="30%;85%;30%" dur="20s" repeatCount="indefinite" />
              <animate attributeName="cx" values="70%;65%;70%" dur="14s" repeatCount="indefinite" />
            </circle>
          </svg>

          {/* Enhanced Floating Elements */}
          <div className="absolute top-20 left-10 w-64 h-64 bg-purple-300/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-60 right-20 w-96 h-96 bg-blue-300/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-40 left-1/3 w-80 h-80 bg-cyan-300/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>

          {/* Additional bubble layers */}
          <div className="absolute top-32 right-1/3 w-48 h-48 bg-pink-300/8 rounded-full blur-2xl animate-bounce" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-60 left-16 w-56 h-56 bg-indigo-300/8 rounded-full blur-2xl animate-bounce" style={{animationDelay: '3s'}}></div>
          <div className="absolute top-1/2 right-12 w-40 h-40 bg-emerald-300/8 rounded-full blur-2xl animate-bounce" style={{animationDelay: '5s'}}></div>

          {/* Sparkle effects */}
          <div className="absolute top-24 left-1/2 w-20 h-20 bg-purple-400/12 rounded-full blur-lg animate-ping" style={{animationDelay: '1.5s'}}></div>
          <div className="absolute bottom-32 right-1/2 w-24 h-24 bg-blue-400/12 rounded-full blur-lg animate-ping" style={{animationDelay: '3.5s'}}></div>
          <div className="absolute top-2/3 left-1/4 w-16 h-16 bg-cyan-400/12 rounded-full blur-lg animate-ping" style={{animationDelay: '2.5s'}}></div>
        </div>

        {/* Header */}
        <header className="border-b bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50 shadow-sm relative">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2 group">
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="text-lg font-semibold">Back to Home</span> 
            </Link>
            <div className="flex items-center space-x-2">
              {/* <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center shadow-lg">
                <Code className="w-5 h-5 text-white" />
              </div> */}
              <img src="Airtel_logo.png" alt="Airtel Logo" />
              <span className="text-xl font-bold text-black">
                Airtel website builder
              </span>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto text-center">
            <div className="mb-16">
              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                Choose Your{" "}
                <span className="text-[#d91b2a]">
                  Template
                </span>
              </h1>
              <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
                Select a professionally designed template that matches your
                developer specialty. Each template is crafted with industry best
                practices and modern design principles.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8 max-w-7xl mx-auto items-stretch">

              {techStacks.map((stack, index) => (
                <Card
                  key={stack.id}
                  className={`group h-full flex flex-col hover:shadow-2xl transition-all duration-500 cursor-pointer border-2 hover:border-purple-200 dark:hover:border-purple-700 hover:-translate-y-2 ${stack.bgGradient} backdrop-blur-sm`}
                  onClick={() => selectTemplate(stack.id)}
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-start space-x-4">
                      <div
                        className={`w-16 h-16 bg-gradient-to-br ${stack.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg`}
                      >
                        <div className="text-white">{stack.icon}</div>
                      </div>
                      <div className="flex-1 text-left">
                        <CardTitle className="text-2xl mb-2 group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors">
                          {stack.title} 
                        </CardTitle>
                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                          {stack.description}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0 flex flex-col justify-between h-full">
  <div className="space-y-4 flex-1">
    <div>
      {/* <p className="font-semibold text-sm text-slate-700 dark:text-slate-200 mb-3">
        Template Features:
      </p> */}
      <div className="grid grid-cols-2 gap-2">
        {stack.features.map((feature, idx) => (
          <div key={idx} className="flex items-center space-x-2">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span className="text-sm text-slate-600 dark:text-slate-300">
              {feature}
            </span>
          </div>
        ))}
      </div>
    </div>
  </div>

  {/* Button pinned at bottom */}
  <Button
    className={`mt-auto w-full bg-gradient-to-r ${stack.color} hover:opacity-90 transition-all text-white font-semibold py-3 shadow-lg group-hover:shadow-xl`}
  >
    Select Template
    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
  </Button>
</CardContent>

                </Card>
              ))}
            </div>
          </div>
        </section>
      </div>
    );
  }

  const selectedTemplate = techStacks.find(
    (stack) => stack.id === selectedStack,
  )!;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-blue-900 dark:to-purple-900 relative overflow-hidden">
      {/* Builder Page Bubble Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {/* Large gradient bubbles */}
        <div className="absolute top-20 left-20 w-64 h-64 bg-purple-300/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-32 w-96 h-96 bg-blue-300/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-40 left-1/3 w-80 h-80 bg-cyan-300/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-pink-300/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>

        {/* Medium floating bubbles */}
        <div className="absolute top-32 right-1/4 w-32 h-32 bg-purple-400/15 rounded-full blur-2xl animate-bounce" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute bottom-1/3 left-16 w-40 h-40 bg-blue-400/15 rounded-full blur-2xl animate-bounce" style={{animationDelay: '1.5s'}}></div>
        <div className="absolute top-2/3 right-12 w-36 h-36 bg-cyan-400/15 rounded-full blur-2xl animate-bounce" style={{animationDelay: '2.5s'}}></div>

        {/* Small floating bubbles */}
        <div className="absolute top-16 left-1/2 w-16 h-16 bg-pink-500/20 rounded-full blur-xl animate-ping" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-32 right-1/3 w-20 h-20 bg-purple-500/20 rounded-full blur-xl animate-ping" style={{animationDelay: '3s'}}></div>
        <div className="absolute top-1/4 left-1/4 w-12 h-12 bg-blue-500/20 rounded-full blur-xl animate-ping" style={{animationDelay: '2s'}}></div>

        {/* Animated SVG bubbles */}
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="builderBubble1" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(139, 92, 246, 0.08)" />
              <stop offset="100%" stopColor="rgba(139, 92, 246, 0)" />
            </radialGradient>
            <radialGradient id="builderBubble2" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(6, 182, 212, 0.08)" />
              <stop offset="100%" stopColor="rgba(6, 182, 212, 0)" />
            </radialGradient>
          </defs>

          <circle cx="15%" cy="25%" r="30" fill="url(#builderBubble1)">
            <animate attributeName="cy" values="25%;75%;25%" dur="12s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.3;0.7;0.3" dur="12s" repeatCount="indefinite" />
          </circle>

          <circle cx="85%" cy="60%" r="25" fill="url(#builderBubble2)">
            <animate attributeName="cy" values="60%;20%;60%" dur="15s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.2;0.6;0.2" dur="15s" repeatCount="indefinite" />
          </circle>

          <circle cx="40%" cy="80%" r="20" fill="url(#builderBubble1)">
            <animate attributeName="cy" values="80%;15%;80%" dur="18s" repeatCount="indefinite" />
            <animate attributeName="cx" values="40%;50%;40%" dur="18s" repeatCount="indefinite" />
          </circle>
        </svg>
      </div>

      {/* Header */}
      <header className="border-b bg-white/95 dark:bg-slate-900/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50 shadow-sm relative">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedStack(null)}
                className="hover:bg-purple-100 dark:hover:bg-purple-900"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Change Template
              </Button>
              <div className="flex items-center space-x-2">
                <div
                  className={`w-6 h-6 bg-gradient-to-r ${selectedTemplate.color} rounded-md flex items-center justify-center`}
                >
                  <div className="text-white scale-75">
                    {selectedTemplate.icon}
                  </div>
                </div>
                <span className="font-semibold">{selectedTemplate.title}</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {/* <Button
                variant="outline"
                size="sm"
                className="hover:bg-blue-50 dark:hover:bg-blue-900"
              >
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </Button> */}
              {/* <Button
                variant="outline"
                size="sm"
                className="hover:bg-green-50 dark:hover:bg-green-900"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Draft
              </Button> */}
              <Button
                size="sm"
                onClick={downloadStaticWebsite}
                disabled={isDownloading}
                className={`bg-black hover:bg-gray-900 text-white hover:text-white shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 transition-all duration-300`}
              >
                <Download className={`w-4 h-4 mr-2 ${isDownloading ? 'animate-bounce' : ''}`} />
                {isDownloading ? 'Generating...' : 'Download Static'}
              </Button>
              {/* <Button
  size="sm"
  onClick={handlePublish}
  disabled={isPublishing}
  className="bg-black hover:bg-gray-900 text-white shadow-lg ml-3 disabled:opacity-50 transform hover:scale-105 transition-transform duration-200"
>
  <ArrowUpTrayIcon className="w-4 h-4 mr-2" />
  {isPublishing ? (publishStatus || "Publishing…") : "Publish Now"}
</Button> */}

{/* Opens your repo’s Actions to watch the deploy run */}
<Button
  size="sm"
  asChild
  className="bg-black hover:bg-gray-900 text-white shadow-lg ml-3 transform hover:scale-105 transition-transform duration-200"
>
  <a
    href="https://github.com/<OWNER>/<REPO>/actions"
    target="_blank"
    rel="noreferrer"
    title="Open CI to see deploy status"
  >
    <ArrowUpTrayIcon className="w-4 h-4 mr-2" />
    Deploy (CI)
  </a>
</Button>

<Button
  size="sm"
  asChild
  className="ml-2 bg-black text-white hover:bg-gray-900 transform hover:scale-105 transition-transform duration-200"
>
  <a
    href="https://<OWNER>.github.io/<REPO>/"
    target="_blank"
    rel="noreferrer"
  >
    Open Live Site
  </a>
</Button>




                            
            </div>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-73px)]">
        {/* Sidebar */}
        <div className="w-96 border-r bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg overflow-y-auto shadow-lg relative">
          {/* Sidebar bubble effects */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 right-4 w-24 h-24 bg-purple-200/20 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute top-60 left-4 w-32 h-32 bg-blue-200/20 rounded-full blur-xl animate-pulse" style={{animationDelay: '2s'}}></div>
            <div className="absolute bottom-40 right-8 w-20 h-20 bg-cyan-200/20 rounded-full blur-xl animate-pulse" style={{animationDelay: '4s'}}></div>
            <div className="absolute bottom-20 left-8 w-28 h-28 bg-pink-200/20 rounded-full blur-xl animate-pulse" style={{animationDelay: '1s'}}></div>
          </div>

          <div className="p-6 space-y-6 relative z-10">
            <div>
              <h2 className="text-xl font-bold mb-2 text-black">
                Customize Your Website
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Personalize your {selectedTemplate.title.toLowerCase()}{" "}
                portfolio
              </p>
            </div>

            {/* Section Manager */}
            <Card className="border-purple-200 dark:border-purple-800">
              <CardHeader>
                <CardTitle className="text-base flex items-center">
                  <Layout className="w-4 h-4 mr-2" />
                  Page Sections
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {availableSections.map((section) => (
                  <div
                    key={section.id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-2">
                      {section.icon}
                      <span className="text-sm font-medium">
                        {section.name}
                      </span>
                      {section.required && (
                        <Badge variant="secondary" className="text-xs">
                          Required
                        </Badge>
                      )}
                    </div>
                    <Switch
                      checked={
                        templateSections[section.id as keyof TemplateSection]
                      }
                      onCheckedChange={() =>
                        !section.required &&
                        toggleSection(section.id as keyof TemplateSection)
                      }
                      disabled={section.required}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Custom Template Options */}
            {selectedStack === 'custom' && (
              <>
                {/* Theme Switcher */}
                <Card className="border-indigo-200 dark:border-indigo-800">
                  <CardHeader>
                    <CardTitle className="text-base flex items-center">
                      <Palette className="w-4 h-4 mr-2" />
                      Theme Selection
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-1 gap-3">
                      {Object.entries(themes).map(([key, theme]) => (
                        <div
                          key={key}
                          onClick={() => setSelectedTheme(key)}
                          className={`p-3 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                            selectedTheme === key
                              ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
                              : 'border-gray-200 dark:border-gray-700 hover:border-indigo-300'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{theme.name}</span>
                            <div className="flex space-x-1">
                              <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${theme.colors.primary}`}></div>
                              <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${theme.colors.accent}`}></div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Content Placeholders */}
                <Card className="border-purple-200 dark:border-purple-800">
                  <CardHeader>
                    <CardTitle className="text-base flex items-center">
                      <Type className="w-4 h-4 mr-2" />
                      Content
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {Object.entries(contentPlaceholders).map(([key, value]) => (
                      <div key={key}>
                        <Label htmlFor={key} className="text-sm font-medium capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </Label>
                        <Input
                          id={key}
                          value={value}
                          onChange={(e) => updateContentPlaceholder(key, e.target.value)}
                          className="mt-1 font-mono text-sm"
                          placeholder={`{{${key}}}`}
                        />
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Markdown Support */}
                {/* <Card className="border-green-200 dark:border-green-800">
                  <CardHeader>
                    <CardTitle className="text-base flex items-center">
                      <BookOpen className="w-4 h-4 mr-2" />
                      Markdown Content
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="markdown-content" className="text-sm font-medium">
                        About Section (Markdown)
                      </Label>
                      <Textarea
                        id="markdown-content"
                        placeholder="# Your Professional Journey&#10;&#10;Write your story in **markdown**:&#10;&#10;- Bullet points&#10;- *Italic text*&#10;- **Bold text**&#10;- [Links](https://example.com)"
                        value={websiteData.bio}
                        onChange={(e) => handleInputChange("bio", e.target.value)}
                        className="mt-1 font-mono text-sm"
                        rows={6}
                      />
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      Supports Markdown syntax for rich formatting
                    </div>
                  </CardContent>
                </Card> */}
              </>
            )}

            {/* Basic Information */}
            <Card className="border-blue-200 dark:border-blue-800">
              <CardHeader>
                <CardTitle className="text-base flex items-center">
                  <Type className="w-4 h-4 mr-2" />
                  Basic Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-sm font-medium">
                    Your Name
                  </Label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    value={websiteData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="tagline" className="text-sm font-medium">
                    Professional Tagline
                  </Label>
                  <Input
                    id="tagline"
                    placeholder="Senior Frontend Developer"
                    value={websiteData.tagline}
                    onChange={(e) =>
                      handleInputChange("tagline", e.target.value)
                    }
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="bio" className="text-sm font-medium">
                    About You
                  </Label>
                  <Textarea
                    id="bio"
                    placeholder="Brief description about yourself and your expertise..."
                    value={websiteData.bio}
                    onChange={(e) => handleInputChange("bio", e.target.value)}
                    className="mt-1"
                    rows={3}
                  />
                  <Label htmlFor="aboutImage" className="text-sm font-medium mt-4">
  About Section Image URL
</Label>
<Input
  type="text"
  id="aboutImage"
  name="aboutImage"
  placeholder="Paste image URL here..."
  value={websiteData.aboutImage || ""}
  onChange={(e) => handleInputChange("aboutImage", e.target.value)}
  className="mt-1"
/>
<div className="text-xs text-slate-500 break-all">{websiteData.aboutImage}</div>

                </div>
              </CardContent>
            </Card>

            {templateSections.experience && (
  <Card className="border-purple-200 dark:border-purple-800">
    <CardHeader>
      <CardTitle className="text-base flex items-center">
        <Briefcase className="w-4 h-4 mr-2" />
        Work Experience
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      <div>
        <Label className="text-sm font-medium">Company Name</Label>
        <Input
          value={websiteData.experience}
          onChange={(e) => handleInputChange("experience", e.target.value)}
          placeholder="Enter your work experience details"
        />
      </div>
    </CardContent>
  </Card>
)}

{templateSections.education && (
  <Card className="border-green-200 dark:border-green-800">
    <CardHeader>
      <CardTitle className="text-base flex items-center">
        <GraduationCap className="w-4 h-4 mr-2" />
        Education
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      <div>
        <Label className="text-sm font-medium">Education Details</Label>
        <Input
          value={websiteData.education}
          onChange={(e) => handleInputChange("education", e.target.value)}
          placeholder="Enter your education details"
        />
      </div>
    </CardContent>
  </Card>
)}

{templateSections.certifications && (
  <Card className="border-yellow-200 dark:border-yellow-800">
    <CardHeader>
      <CardTitle className="text-base flex items-center">
        <Award className="w-4 h-4 mr-2" />
        Certifications
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      <div>
        <Label className="text-sm font-medium">Certification Details</Label>
        <Input
          value={websiteData.certifications}
          onChange={(e) => handleInputChange("certifications", e.target.value)}
          placeholder="Enter your certifications"
        />
      </div>
    </CardContent>
  </Card>
)}

{templateSections.blog && (
  <Card className="border-pink-200 dark:border-pink-800">
    <CardHeader>
      <CardTitle className="text-base flex items-center">
        <BookOpen className="w-4 h-4 mr-2" />
        Blog Posts
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      <div>
        <Label className="text-sm font-medium">Blog Details</Label>
        <Input
          value={websiteData.blog}
          onChange={(e) => handleInputChange("blog", e.target.value)}
          placeholder="Enter blog post link or details"
        />
      </div>
    </CardContent>
  </Card>
)}

{templateSections.testimonials && (
  <Card className="border-indigo-200 dark:border-indigo-800">
    <CardHeader>
      <CardTitle className="text-base flex items-center">
        <MessageSquare className="w-4 h-4 mr-2" />
        Testimonials
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      <div>
        <Label className="text-sm font-medium">Testimonial Details</Label>
        <Input
          value={websiteData.testimonials}
          onChange={(e) => handleInputChange("testimonials", e.target.value)}
          placeholder="Enter testimonial details"
        />
      </div>
    </CardContent>
  </Card>
)}

{/* {templateSections.githubStats && (
  <Card className="border-gray-200 dark:border-gray-800">
    <CardHeader>
      <CardTitle className="text-base flex items-center">
        <Github className="w-4 h-4 mr-2" />
        GitHub Stats
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      <div>
        <Label className="text-sm font-medium">GitHub Details</Label>
        <Input
          value={websiteData.github}
          onChange={(e) => handleInputChange("github", e.target.value)}
          placeholder="Enter GitHub stats or profile link"
        />
      </div>
    </CardContent>
  </Card>
)} */}

{templateSections.achievements && (
  <Card className="border-orange-200 dark:border-orange-800">
    <CardHeader>
      <CardTitle className="text-base flex items-center">
        <Trophy className="w-4 h-4 mr-2" />
        Achievements
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      <div>
        <Label className="text-sm font-medium">Achievement Details</Label>
        <Input
          value={websiteData.achievements}
          onChange={(e) => handleInputChange("achievements", e.target.value)}
          placeholder="Enter your achievements"
        />
      </div>
    </CardContent>
  </Card>
)}


            {/* Contact Information */}
            <Card className="border-green-200 dark:border-green-800">
              <CardHeader>
                <CardTitle className="text-base flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    value={websiteData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-sm font-medium">
                    Phone
                  </Label>
                  <Input
                    id="phone"
                    placeholder="+1 (555) 123-4567"
                    value={websiteData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="location" className="text-sm font-medium">
                    Location
                  </Label>
                  <Input
                    id="location"
                    placeholder="San Francisco, CA"
                    value={websiteData.location}
                    onChange={(e) =>
                      handleInputChange("location", e.target.value)
                    }
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="github" className="text-sm font-medium">
                    GitHub
                  </Label>
                  <Input
                    id="github"
                    placeholder="github.com/username"
                    value={websiteData.github}
                    onChange={(e) =>
                      handleInputChange("github", e.target.value)
                    }
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="linkedin" className="text-sm font-medium">
                    LinkedIn
                  </Label>
                  <Input
                    id="linkedin"
                    placeholder="linkedin.com/in/username"
                    value={websiteData.linkedin}
                    onChange={(e) =>
                      handleInputChange("linkedin", e.target.value)
                    }
                    className="mt-1"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Skills & Technologies */}
            <Card className="border-indigo-200 dark:border-indigo-800">
              <CardHeader>
                <CardTitle className="text-base flex items-center">
                  <Settings className="w-4 h-4 mr-2" />
                  Skills & Technologies
                </CardTitle>
              </CardHeader>
              <CardContent>
  <div className="flex flex-wrap gap-3">
    {skillsList.slice(0, 20).map((skill, index) => (
      <div
        key={index}
        className="relative flex flex-col items-center px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full text-white font-medium text-sm shadow-md transition-transform hover:-translate-y-1"
      >
        {/* Skill name */}
        <span>{skill}</span>

        {/* Progress bar (example: static 70%) */}
        <div className="mt-1 w-full bg-white/20 h-1 rounded-full">
          <div className="bg-white h-1 rounded-full" style={{ width: '70%' }}></div>
        </div>

        {/* Delete button */}
        <button
          onClick={() => removeSkill(skill)}
          className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center text-xs shadow hover:scale-110 transition"
          title="Remove skill"
        >
          ×
        </button>
      </div>
    ))}

    {/* Add Skill Button */}
    <button
      onClick={() => setShowSkillModal(true)}
      className="px-4 py-2 rounded-full bg-slate-200 dark:bg-slate-600 text-slate-700 dark:text-slate-200 font-medium text-sm border border-dashed border-slate-400 hover:border-purple-400 hover:text-purple-600 transition"
    >
      + Add Skill
    </button>
  </div>
</CardContent>

            </Card>

            {/* Projects */}
            <Card className="border-pink-200 dark:border-pink-800">
              <CardHeader>
                <CardTitle className="text-base flex items-center">
                  <Briefcase className="w-4 h-4 mr-2" />
                  Featured Projects
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
  <Label className="text-sm font-medium">Project 1 Title</Label>
  <Input
    value={websiteData.project1}
    onChange={(e) => handleInputChange("project1", e.target.value)}
    placeholder="Enter project title"
  />

  <Label className="text-sm font-medium mt-2">Image URL</Label>
  <Input
    value={websiteData.project1Image}
    onChange={(e) => handleInputChange("project1Image", e.target.value)}
    placeholder="Paste image link"
  />

  <Label className="text-sm font-medium mt-2">Contributors</Label>
  <Input
    value={websiteData.project1Contributors}
    onChange={(e) => handleInputChange("project1Contributors", e.target.value)}
    placeholder="e.g., John, Alice"
  />

  <div className="flex gap-2 mt-2">
    <div className="flex-1">
      <Label className="text-sm font-medium">Start Date</Label>
      <Input
        type="date"
        value={websiteData.project1StartDate}
        onChange={(e) => handleInputChange("project1StartDate", e.target.value)}
      />
    </div>
    <div className="flex-1">
      <Label className="text-sm font-medium">End Date</Label>
      <Input
        type="date"
        value={websiteData.project1EndDate}
        onChange={(e) => handleInputChange("project1EndDate", e.target.value)}
      />
    </div>
  </div>

  <Label className="text-sm font-medium mt-2">Institution</Label>
  <Input
    value={websiteData.project1Institution}
    onChange={(e) => handleInputChange("project1Institution", e.target.value)}
    placeholder="Company or College Name"
  />
</div>

                <div>
  <Label className="text-sm font-medium">Project 2 Title</Label>
  <Input
    value={websiteData.project2}
    onChange={(e) => handleInputChange("project2", e.target.value)}
    placeholder="Enter project title"
  />

  <Label className="text-sm font-medium mt-2">Image URL</Label>
  <Input
    value={websiteData.project2Image}
    onChange={(e) => handleInputChange("project2Image", e.target.value)}
    placeholder="Paste image link"
  />

  <Label className="text-sm font-medium mt-2">Contributors</Label>
  <Input
    value={websiteData.project2Contributors}
    onChange={(e) => handleInputChange("project2Contributors", e.target.value)}
    placeholder="e.g., John, Alice"
  />

  <div className="flex gap-2 mt-2">
    <div className="flex-1">
      <Label className="text-sm font-medium">Start Date</Label>
      <Input
        type="date"
        value={websiteData.project2StartDate}
        onChange={(e) => handleInputChange("project2StartDate", e.target.value)}
      />
    </div>
    <div className="flex-1">
      <Label className="text-sm font-medium">End Date</Label>
      <Input
        type="date"
        value={websiteData.project2EndDate}
        onChange={(e) => handleInputChange("project2EndDate", e.target.value)}
      />
    </div>
  </div>

  <Label className="text-sm font-medium mt-2">Institution</Label>
  <Input
    value={websiteData.project2Institution}
    onChange={(e) => handleInputChange("project2Institution", e.target.value)}
    placeholder="Company or College Name"
  />
</div>

                <div>
  <Label className="text-sm font-medium">Project 3 Title</Label>
  <Input
    value={websiteData.project3}
    onChange={(e) => handleInputChange("project3", e.target.value)}
    placeholder="Enter project title"
  />

  <Label className="text-sm font-medium mt-2">Image URL</Label>
  <Input
    value={websiteData.project3Image}
    onChange={(e) => handleInputChange("project3Image", e.target.value)}
    placeholder="Paste image link"
  />

  <Label className="text-sm font-medium mt-2">Contributors</Label>
  <Input
    value={websiteData.project3Contributors}
    onChange={(e) => handleInputChange("project3Contributors", e.target.value)}
    placeholder="e.g., John, Alice"
  />

  <div className="flex gap-2 mt-2">
    <div className="flex-1">
      <Label className="text-sm font-medium">Start Date</Label>
      <Input
        type="date"
        value={websiteData.project3StartDate}
        onChange={(e) => handleInputChange("project3StartDate", e.target.value)}
      />
    </div>
    <div className="flex-1">
      <Label className="text-sm font-medium">End Date</Label>
      <Input
        type="date"
        value={websiteData.project3EndDate}
        onChange={(e) => handleInputChange("project3EndDate", e.target.value)}
      />
    </div>
  </div>

  <Label className="text-sm font-medium mt-2">Institution</Label>
  <Input
    value={websiteData.project3Institution}
    onChange={(e) => handleInputChange("project3Institution", e.target.value)}
    placeholder="Company or College Name"
  />
</div>

              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Preview Area */}
        <div className="flex-1 overflow-y-auto bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-800 dark:to-blue-900 relative">
          {/* Preview Area Background Waves */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <svg
              className="absolute w-full h-full opacity-20"
              viewBox="0 0 1440 1200"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="preview-wave" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.05" />
                  <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.08" />
                  <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.05" />
                </linearGradient>
              </defs>

              <path
                fill="url(#preview-wave)"
                d="M0,300 C480,400 960,200 1440,350 L1440,1200 L0,1200 Z"
              >
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0,0;60,30;0,0"
                  dur="25s"
                  repeatCount="indefinite"
                />
              </path>

              <path
                fill="url(#preview-wave)"
                d="M0,600 C360,500 720,700 1080,600 C1260,550 1350,650 1440,600 L1440,1200 L0,1200 Z"
                opacity="0.7"
              >
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0,0;-45,25;0,0"
                  dur="30s"
                  repeatCount="indefinite"
                />
              </path>

              <path
                fill="url(#preview-wave)"
                d="M0,900 C240,800 480,950 720,850 C960,750 1200,900 1440,850 L1440,1200 L0,1200 Z"
                opacity="0.4"
              >
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0,0;35,15;0,0"
                  dur="20s"
                  repeatCount="indefinite"
                />
              </path>
            </svg>

            {/* Subtle floating orbs */}
            <div className="absolute top-40 right-32 w-48 h-48 bg-purple-300/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-60 left-20 w-64 h-64 bg-blue-300/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '3s'}}></div>
          </div>

          <div className="p-8 relative z-10">
            <div className="max-w-6xl mx-auto">
              {/* Preview Header */}
              <div className="text-center mb-8">
                <Badge variant="secondary" className="mb-2 bg-white shadow-sm">
                  <Eye className="w-3 h-3 mr-1" />
                  Live Preview
                </Badge>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  This is how your website will look to visitors
                </p>
              </div>

              {/* Website Preview */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-700">
                {/* Hero Section */}
                {templateSections.hero && (
                  <section
                    className={`relative py-20 px-8 bg-gradient-to-br ${selectedStack === 'custom' ? themes[selectedTheme].colors.primary : selectedTemplate.color} text-white overflow-hidden`}
                  >
                    {/* Enhanced Hero Background Effects */}
                    <div className="absolute inset-0 overflow-hidden">
                      {/* Animated waves */}
                      <svg
                        className="absolute w-full h-full opacity-20"
                        viewBox="0 0 1440 600"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <defs>
                          <linearGradient id="hero-wave-1" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.1" />
                            <stop offset="50%" stopColor="#ffffff" stopOpacity="0.2" />
                            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.1" />
                          </linearGradient>
                          <radialGradient id="heroBubble1" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="rgba(255, 255, 255, 0.15)" />
                            <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
                          </radialGradient>
                        </defs>

                        <path
                          fill="url(#hero-wave-1)"
                          d="M0,100 C320,200 520,50 720,150 C920,250 1120,100 1440,200 L1440,600 L0,600 Z"
                        >
                          <animateTransform
                            attributeName="transform"
                            type="translate"
                            values="0,0;30,10;0,0"
                            dur="18s"
                            repeatCount="indefinite"
                          />
                        </path>

                        <path
                          fill="url(#hero-wave-1)"
                          d="M0,300 C360,200 520,350 720,250 C920,150 1080,300 1440,250 L1440,600 L0,600 Z"
                          opacity="0.5"
                        >
                          <animateTransform
                            attributeName="transform"
                            type="translate"
                            values="0,0;-25,15;0,0"
                            dur="22s"
                            repeatCount="indefinite"
                          />
                        </path>

                        {/* Floating SVG bubbles */}
                        <circle cx="20%" cy="30%" r="40" fill="url(#heroBubble1)">
                          <animate attributeName="cy" values="30%;70%;30%" dur="15s" repeatCount="indefinite" />
                          <animate attributeName="r" values="40;60;40" dur="8s" repeatCount="indefinite" />
                        </circle>

                        <circle cx="80%" cy="60%" r="30" fill="url(#heroBubble1)">
                          <animate attributeName="cy" values="60%;20%;60%" dur="20s" repeatCount="indefinite" />
                          <animate attributeName="r" values="30;45;30" dur="10s" repeatCount="indefinite" />
                        </circle>

                        <circle cx="60%" cy="80%" r="25" fill="url(#heroBubble1)">
                          <animate attributeName="cy" values="80%;10%;80%" dur="18s" repeatCount="indefinite" />
                          <animate attributeName="cx" values="60%;70%;60%" dur="12s" repeatCount="indefinite" />
                        </circle>
                      </svg>

                      {/* Enhanced floating particles */}
                      <div className="absolute top-16 left-24 w-16 h-16 bg-white/8 rounded-full blur-lg animate-bounce" style={{animationDelay: '1s'}}></div>
                      <div className="absolute top-32 right-32 w-20 h-20 bg-white/8 rounded-full blur-lg animate-bounce" style={{animationDelay: '3s'}}></div>
                      <div className="absolute bottom-24 left-1/4 w-24 h-24 bg-white/8 rounded-full blur-lg animate-bounce" style={{animationDelay: '5s'}}></div>
                      <div className="absolute top-1/2 right-1/4 w-12 h-12 bg-white/8 rounded-full blur-lg animate-bounce" style={{animationDelay: '2s'}}></div>
                      <div className="absolute bottom-40 right-16 w-18 h-18 bg-white/8 rounded-full blur-lg animate-bounce" style={{animationDelay: '4s'}}></div>

                      {/* Sparkle effects */}
                      <div className="absolute top-20 left-1/2 w-8 h-8 bg-white/10 rounded-full blur-md animate-ping" style={{animationDelay: '1s'}}></div>
                      <div className="absolute bottom-32 right-1/2 w-10 h-10 bg-white/10 rounded-full blur-md animate-ping" style={{animationDelay: '3s'}}></div>
                      <div className="absolute top-1/3 left-1/3 w-6 h-6 bg-white/10 rounded-full blur-md animate-ping" style={{animationDelay: '5s'}}></div>
                    </div>

                    <div className="absolute inset-0 bg-black/10"></div>
                    <div className="relative z-10 max-w-4xl mx-auto text-center">
                      <div className="mb-8">
                        {/* <div className="w-32 h-32 bg-white/20 rounded-full mx-auto mb-6 flex items-center justify-center backdrop-blur-sm border border-white/30"> */}
                          {/* <div className="w-20 h-20 bg-white/30 rounded-full flex items-center justify-center">
                            {selectedTemplate.icon}
                          </div> */}
                        {/* </div> */}
                        <h1 className="text-5xl md:text-6xl font-bold mb-4">
                          {selectedStack === 'custom'
                            ? processContent(contentPlaceholders.title || websiteData.name || "Your Name")
                            : (websiteData.name || "Your Name")
                          }
                        </h1>
                        <p className="text-xl md:text-2xl opacity-90 mb-6">
                          {selectedStack === 'custom'
                            ? processContent(contentPlaceholders.subtitle || websiteData.tagline || "Your Professional Title")
                            : (websiteData.tagline || selectedTemplate.title)
                          }
                        </p>
                        <p className="text-lg opacity-80 max-w-2xl mx-auto leading-relaxed">
                          {selectedStack === 'custom'
                            ? processContent(contentPlaceholders.description || websiteData.bio || "Your professional story")
                            : (websiteData.bio || `Passionate ${selectedTemplate.title.toLowerCase()} with expertise in modern technologies and best practices. Building exceptional digital experiences that make a difference.`)
                          }
                        </p>
                      </div>
                      <div className="flex flex-wrap justify-center gap-4">
                        {/* <Button
                          size="lg"
                          variant="secondary"
                          className="bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm"
                        >
                          <Mail className="w-4 h-4 mr-2" />
                          Contact Me
                        </Button> */}
                        {/* <Button
                          size="lg"
                          variant="outline"
                          className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Download CV
                        </Button> */}
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white dark:from-slate-900 to-transparent"></div>
                  </section>
                )}

                {/* About Section */}
                {templateSections.about && (
                  <section className={`py-16 px-8 relative overflow-hidden ${selectedStack === 'custom' ? `bg-gradient-to-br ${themes[selectedTheme].colors.secondary}` : 'bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-indigo-900/20 dark:via-purple-900/20 dark:to-pink-900/20'}`}>
                    {/* About Section Waves */}
                    <div className="absolute inset-0 overflow-hidden">
                      <svg
                        className="absolute w-full h-full opacity-15"
                        viewBox="0 0 1440 600"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <defs>
                          <linearGradient id="about-wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.1" />
                            <stop offset="33%" stopColor="#06b6d4" stopOpacity="0.15" />
                            <stop offset="66%" stopColor="#ec4899" stopOpacity="0.12" />
                            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.1" />
                          </linearGradient>
                          <linearGradient id="about-wave-gradient-2" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.08" />
                            <stop offset="50%" stopColor="#10b981" stopOpacity="0.1" />
                            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.08" />
                          </linearGradient>
                        </defs>

                        {/* Primary Wave */}
                        <path
                          fill="url(#about-wave-gradient)"
                          d="M0,100 C360,50 720,200 1080,100 C1260,50 1350,150 1440,100 L1440,600 L0,600 Z"
                        >
                          <animateTransform
                            attributeName="transform"
                            type="translate"
                            values="0,0;50,25;0,0"
                            dur="18s"
                            repeatCount="indefinite"
                          />
                        </path>

                        {/* Secondary Wave */}
                        <path
                          fill="url(#about-wave-gradient-2)"
                          d="M0,300 C240,250 480,400 720,300 C960,200 1200,350 1440,300 L1440,600 L0,600 Z"
                          opacity="0.7"
                        >
                          <animateTransform
                            attributeName="transform"
                            type="translate"
                            values="0,0;-35,20;0,0"
                            dur="22s"
                            repeatCount="indefinite"
                          />
                        </path>

                        {/* Tertiary Wave */}
                        <path
                          fill="url(#about-wave-gradient)"
                          d="M0,450 C320,400 640,500 960,450 C1120,425 1280,475 1440,450 L1440,600 L0,600 Z"
                          opacity="0.5"
                        >
                          <animateTransform
                            attributeName="transform"
                            type="translate"
                            values="0,0;25,15;0,0"
                            dur="26s"
                            repeatCount="indefinite"
                          />
                        </path>
                      </svg>

                      {/* Enhanced floating elements for About section */}
                      <div className="absolute top-20 right-16 w-32 h-32 bg-purple-200/20 rounded-full blur-2xl animate-pulse"></div>
                      <div className="absolute bottom-32 left-20 w-40 h-40 bg-blue-200/20 rounded-full blur-2xl animate-pulse" style={{animationDelay: '2s'}}></div>
                      <div className="absolute top-1/2 right-1/3 w-24 h-24 bg-pink-200/20 rounded-full blur-2xl animate-pulse" style={{animationDelay: '4s'}}></div>

                      {/* Additional bubble effects */}
                      <div className="absolute top-40 left-12 w-20 h-20 bg-cyan-200/15 rounded-full blur-xl animate-bounce" style={{animationDelay: '1s'}}></div>
                      <div className="absolute bottom-16 right-24 w-28 h-28 bg-indigo-200/15 rounded-full blur-xl animate-bounce" style={{animationDelay: '3s'}}></div>
                      <div className="absolute top-1/4 left-1/2 w-16 h-16 bg-purple-300/15 rounded-full blur-xl animate-bounce" style={{animationDelay: '5s'}}></div>

                      {/* Sparkle bubbles */}
                      <div className="absolute top-16 left-1/4 w-8 h-8 bg-purple-400/20 rounded-full blur-md animate-ping" style={{animationDelay: '2s'}}></div>
                      <div className="absolute bottom-20 right-1/4 w-10 h-10 bg-blue-400/20 rounded-full blur-md animate-ping" style={{animationDelay: '4s'}}></div>
                    </div>

                    <div className="max-w-4xl mx-auto relative z-10">
                      
                      <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4 text-slate-800 dark:text-slate-100">
                          About Me
                        </h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto rounded-full"></div>
                      </div>
                      <div className="grid md:grid-cols-2 gap-12 items-center">
                        
                        <div>
                          <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                            {websiteData.bio ||
                              `I'm a dedicated ${selectedTemplate.title.toLowerCase()} with a passion for creating innovative solutions. With years of experience in the field, I bring both technical expertise and creative problem-solving to every project.`}
                          </p>
                          <div className="space-y-4">
                            {websiteData.email && (
                              <div className="flex items-center space-x-4 p-3 bg-white/60 dark:bg-slate-800/60 rounded-xl backdrop-blur-sm border border-purple-100 dark:border-purple-800/30 hover:shadow-lg transition-all duration-300">
                                <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-blue-500 rounded-lg flex items-center justify-center shadow-md">
                                  <Mail className="w-5 h-5 text-white" />
                                </div>
                                <span className="text-slate-700 dark:text-slate-300 font-medium">
                                  {websiteData.email}
                                </span>
                              </div>
                            )}
                            {websiteData.location && (
                              <div className="flex items-center space-x-4 p-3 bg-white/60 dark:bg-slate-800/60 rounded-xl backdrop-blur-sm border border-purple-100 dark:border-purple-800/30 hover:shadow-lg transition-all duration-300">
                                <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center shadow-md">
                                  <MapPin className="w-5 h-5 text-white" />
                                </div>
                                <span className="text-slate-700 dark:text-slate-300 font-medium">
                                  {websiteData.location}
                                </span>
                              </div>
                            )}
                            {websiteData.phone && (
                              <div className="flex items-center space-x-4 p-3 bg-white/60 dark:bg-slate-800/60 rounded-xl backdrop-blur-sm border border-purple-100 dark:border-purple-800/30 hover:shadow-lg transition-all duration-300">
                                <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-lg flex items-center justify-center shadow-md">
                                  <Phone className="w-5 h-5 text-white" />
                                </div>
                                <span className="text-slate-700 dark:text-slate-300 font-medium">
                                  {websiteData.phone}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="relative w-64 h-64 mx-auto">
                            {/* Main gradient background */}
                            <div className="w-full h-full bg-gradient-to-br from-purple-400 via-blue-500 to-cyan-400 rounded-3xl flex items-center justify-center shadow-2xl relative overflow-hidden">
                              {/* Animated background elements */}
                              <div className="absolute inset-0">
                                <div className="absolute top-4 right-4 w-12 h-12 bg-white/20 rounded-full animate-bounce"></div>
                                <div className="absolute bottom-6 left-6 w-8 h-8 bg-white/20 rounded-full animate-bounce" style={{animationDelay: '1s'}}></div>
                                <div className="absolute top-1/2 left-4 w-6 h-6 bg-white/20 rounded-full animate-bounce" style={{animationDelay: '2s'}}></div>
                              </div>

                              {/* Profile icon */}
                              <div className="relative z-10 bg-white/20 rounded-full p-8 backdrop-blur-sm">
  {websiteData.aboutImage?.trim() ? (
    <img
      src={websiteData.aboutImage}
      alt="About"
      className="w-24 h-24 object-cover rounded-full drop-shadow-lg"
    />
  ) : (
    <Users className="w-24 h-24 text-white drop-shadow-lg" />
  )}
</div>

                              {/* Glowing border effect */}
                              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-400/50 via-transparent to-cyan-400/50 animate-pulse"></div>
                            </div>

                            {/* Floating elements around the main card */}
                            <div className="absolute -top-2 -left-2 w-8 h-8 bg-purple-300 rounded-full opacity-60 animate-pulse"></div>
                            <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-blue-300 rounded-full opacity-60 animate-pulse" style={{animationDelay: '1s'}}></div>
                            <div className="absolute top-1/2 -right-4 w-4 h-4 bg-cyan-300 rounded-full opacity-60 animate-pulse" style={{animationDelay: '2s'}}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                )}

                {/* Skills Section */}
                {templateSections.skills && (
                  <section className={`py-16 px-8 relative overflow-hidden ${selectedStack === 'custom' ? `bg-gradient-to-br ${themes[selectedTheme].colors.secondary}` : 'bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-emerald-900/20 dark:via-teal-900/20 dark:to-cyan-900/20'}`}>
                    {/* Skills Section Enhanced Waves */}
                    <div className="absolute inset-0 overflow-hidden">
                      <svg
                        className="absolute w-full h-full opacity-15"
                        viewBox="0 0 1440 500"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <defs>
                          <linearGradient id="skills-wave-1" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.12" />
                            <stop offset="25%" stopColor="#06b6d4" stopOpacity="0.18" />
                            <stop offset="50%" stopColor="#10b981" stopOpacity="0.15" />
                            <stop offset="75%" stopColor="#f59e0b" stopOpacity="0.12" />
                            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.12" />
                          </linearGradient>
                          <linearGradient id="skills-wave-2" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#ec4899" stopOpacity="0.1" />
                            <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.14" />
                            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.1" />
                          </linearGradient>
                        </defs>

                        {/* Top flowing wave */}
                        <path
                          fill="url(#skills-wave-1)"
                          d="M0,80 C320,30 640,180 960,80 C1120,30 1280,130 1440,80 L1440,500 L0,500 Z"
                        >
                          <animateTransform
                            attributeName="transform"
                            type="translate"
                            values="0,0;60,30;0,0"
                            dur="20s"
                            repeatCount="indefinite"
                          />
                        </path>

                        {/* Middle wave */}
                        <path
                          fill="url(#skills-wave-2)"
                          d="M0,220 C240,170 480,320 720,220 C960,120 1200,270 1440,220 L1440,500 L0,500 Z"
                          opacity="0.8"
                        >
                          <animateTransform
                            attributeName="transform"
                            type="translate"
                            values="0,0;-45,25;0,0"
                            dur="16s"
                            repeatCount="indefinite"
                          />
                        </path>

                        {/* Bottom wave */}
                        <path
                          fill="url(#skills-wave-1)"
                          d="M0,350 C360,300 720,420 1080,350 C1260,300 1350,400 1440,350 L1440,500 L0,500 Z"
                          opacity="0.6"
                        >
                          <animateTransform
                            attributeName="transform"
                            type="translate"
                            values="0,0;30,18;0,0"
                            dur="24s"
                            repeatCount="indefinite"
                          />
                        </path>
                      </svg>

                      {/* Enhanced tech-themed floating elements */}
                      <div className="absolute top-16 left-12 w-28 h-28 bg-blue-300/15 rounded-full blur-2xl animate-pulse"></div>
                      <div className="absolute bottom-20 right-16 w-36 h-36 bg-green-300/15 rounded-full blur-2xl animate-pulse" style={{animationDelay: '1.5s'}}></div>
                      <div className="absolute top-1/3 right-1/4 w-20 h-20 bg-purple-300/15 rounded-full blur-2xl animate-pulse" style={{animationDelay: '3s'}}></div>
                      <div className="absolute bottom-1/3 left-1/4 w-32 h-32 bg-yellow-300/15 rounded-full blur-2xl animate-pulse" style={{animationDelay: '4.5s'}}></div>

                      {/* Additional bouncing bubbles */}
                      <div className="absolute top-32 right-8 w-24 h-24 bg-cyan-300/12 rounded-full blur-xl animate-bounce" style={{animationDelay: '0.5s'}}></div>
                      <div className="absolute bottom-40 left-8 w-20 h-20 bg-pink-300/12 rounded-full blur-xl animate-bounce" style={{animationDelay: '2s'}}></div>
                      <div className="absolute top-2/3 left-1/2 w-16 h-16 bg-indigo-300/12 rounded-full blur-xl animate-bounce" style={{animationDelay: '3.5s'}}></div>

                      {/* Floating tech icons effect */}
                      <div className="absolute top-24 left-1/3 w-12 h-12 bg-orange-300/15 rounded-full blur-lg animate-ping" style={{animationDelay: '1s'}}></div>
                      <div className="absolute bottom-32 right-1/3 w-14 h-14 bg-red-300/15 rounded-full blur-lg animate-ping" style={{animationDelay: '3s'}}></div>
                      <div className="absolute top-1/2 left-8 w-10 h-10 bg-emerald-300/15 rounded-full blur-lg animate-ping" style={{animationDelay: '5s'}}></div>
                    </div>

                    <div className="max-w-4xl mx-auto relative z-10">
                      <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4 text-slate-800 dark:text-slate-100">
                          Skills & Technologies
                        </h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-blue-500 mx-auto rounded-full"></div>
                      </div>
                     <div className="flex flex-wrap justify-center gap-3">
  {skillsList.slice(0, 20).map((skill, index) => (
    <span
      key={index}
      className="relative px-4 py-2 rounded-full text-white font-medium text-sm shadow-md transition-transform transform hover:-translate-y-1 bg-gradient-to-r from-purple-500 to-blue-500"
    >
      {skill}
      {/* Delete button */}
      <button
        onClick={() => removeSkill(skill)}
        className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center text-xs shadow hover:scale-110 transition"
        title="Remove skill"
      >
        ×
      </button>
    </span>
  ))}

  {/* Add new skill button */}
  <button
    onClick={() => setShowSkillModal(true)}
    className="px-4 py-2 rounded-full bg-slate-200 dark:bg-slate-600 text-slate-700 dark:text-slate-200 font-medium text-sm border border-dashed border-slate-400 hover:border-purple-400 hover:text-purple-600 transition"
  >
    + Add Skill
  </button>
</div>

                    </div>
                  </section>
                )}

                {/* Projects Section */}
                {templateSections.projects && (
  <section
    id="projects"
    className="py-20 px-6 relative overflow-hidden bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900"
  >
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-extrabold mb-4 text-slate-800 dark:text-white">
          Featured Projects
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full"></div>
      </div>

      {/* Modern Project Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3].map((i) => {
          const title = websiteData[`project${i}` as keyof typeof websiteData] as string;
          const image = websiteData[`project${i}Image` as keyof typeof websiteData] as string;
          const contributors = websiteData[`project${i}Contributors` as keyof typeof websiteData] as string;
          const startDate = websiteData[`project${i}StartDate` as keyof typeof websiteData] as string;
          const endDate = websiteData[`project${i}EndDate` as keyof typeof websiteData] as string;
          const institution = websiteData[`project${i}Institution` as keyof typeof websiteData] as string;

          return (
            <div
              key={i}
              className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden group"
            >
              {/* Project Image */}
              <div className="h-48 w-full bg-gray-200 dark:bg-slate-700 relative">
                {image ? (
                  <img
                    src={image}
                    alt={title || `Project ${i}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400 text-sm">
                    No Image
                  </div>
                )}
              </div>

              {/* Project Content */}
              <div className="p-5">
                <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">
                  {title || `Project ${i}`}
                </h3>

                {/* Contributors */}
                {contributors && (
                  <p className="text-xs text-slate-600 dark:text-slate-300 mb-2">
                    Contributors: {contributors}
                  </p>
                )}

                {/* Date Range */}
                {(startDate || endDate) && (
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">
                    {startDate} {startDate && endDate && " - "} {endDate}
                  </p>
                )}

                {/* Institution */}
                {institution && (
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
                    {institution}
                  </p>
                )}

                {/* Hover action */}
                <button
  className="text-purple-600 font-semibold text-sm hover:underline"
  onClick={() => setActiveProjectIndex(i - 1)}
>
  View Details
</button>

              </div>
            </div>
          );
        })}
      </div>
    </div>
  </section>
)}
{/* Project Detail Modal */}
{activeProjectIndex !== null && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div className="bg-white dark:bg-slate-900 rounded-xl shadow-2xl max-w-2xl w-full p-6 relative">
      {/* Close Button */}
      <button
        onClick={() => setActiveProjectIndex(null)}
        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center shadow-md"
      >
        ×
      </button>

      {/* Project Content */}
      <div className="space-y-4">
        <img
          src={
            activeProjectIndex === 0
              ? websiteData.project1Image
              : activeProjectIndex === 1
              ? websiteData.project2Image
              : websiteData.project3Image
          }
          alt="Project Thumbnail"
          className="w-full h-48 object-cover rounded-lg"
        />

        <h2 className="text-2xl font-bold">
          {activeProjectIndex === 0
            ? websiteData.project1
            : activeProjectIndex === 1
            ? websiteData.project2
            : websiteData.project3}
        </h2>

        <p className="text-sm text-slate-600">
          Contributors:{" "}
          {activeProjectIndex === 0
            ? websiteData.project1Contributors
            : activeProjectIndex === 1
            ? websiteData.project2Contributors
            : websiteData.project3Contributors}
        </p>

        <p className="text-sm text-slate-600">
          Duration:{" "}
          {activeProjectIndex === 0
            ? `${websiteData.project1StartDate} - ${websiteData.project1EndDate}`
            : activeProjectIndex === 1
            ? `${websiteData.project2StartDate} - ${websiteData.project2EndDate}`
            : `${websiteData.project3StartDate} - ${websiteData.project3EndDate}`}
        </p>

        <p className="text-sm text-slate-600">
          Institution:{" "}
          {activeProjectIndex === 0
            ? websiteData.project1Institution
            : activeProjectIndex === 1
            ? websiteData.project2Institution
            : websiteData.project3Institution}
        </p>
      </div>
    </div>
  </div>
)}

{templateSections.experience && (
  <section className="py-16 px-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-2xl shadow-md">
    <h2 className="text-3xl font-bold text-center mb-8">Work Experience</h2>
    <p className="text-center text-slate-600 dark:text-slate-300">
      {websiteData.experience || "Add your work experience details here."}
    </p>
  </section>
)}

{templateSections.education && (
  <section className="py-16 px-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-2xl shadow-md">
    <h2 className="text-3xl font-bold text-center mb-8">Education</h2>
    <p className="text-center text-slate-600 dark:text-slate-300">
      {websiteData.education || "Add your education details here."}
    </p>
  </section>
)}

{templateSections.certifications && (
  <section className="py-16 px-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-2xl shadow-md">
    <h2 className="text-3xl font-bold text-center mb-8">Certifications</h2>
    <p className="text-center text-slate-600 dark:text-slate-300">
      {websiteData.certifications || "Add your certifications here."}
    </p>
  </section>
)}

{templateSections.blog && (
  <section className="py-16 px-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-2xl shadow-md">
    <h2 className="text-3xl font-bold text-center mb-8">Blog Posts</h2>
    <p className="text-center text-slate-600 dark:text-slate-300">
      {websiteData.blog || "Add your blog posts or links here."}
    </p>
  </section>
)}

{templateSections.testimonials && (
  <section className="py-16 px-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-2xl shadow-md">
    <h2 className="text-3xl font-bold text-center mb-8">Testimonials</h2>
    <p className="text-center text-slate-600 dark:text-slate-300">
      {websiteData.testimonials || "Add testimonials here."}
    </p>
  </section>
)}

{/* {templateSections.githubStats && (
  <section className="py-16 px-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-2xl shadow-md">
    <h2 className="text-3xl font-bold text-center mb-8">GitHub Stats</h2>
    <p className="text-center text-slate-600 dark:text-slate-300">
      {websiteData.github || "Add your GitHub stats or profile link here."}
    </p>
  </section>
)} */}

{templateSections.achievements && (
  <section className="py-16 px-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-2xl shadow-md">
    <h2 className="text-3xl font-bold text-center mb-8">Achievements</h2>
    <p className="text-center text-slate-600 dark:text-slate-300">
      {websiteData.achievements || "Add your achievements here."}
    </p>
  </section>
)}


                {/* Contact Section */}
                {templateSections.contact && (
  <>
    <section
      className={`py-20 px-8 bg-gradient-to-br ${selectedTemplate.color} text-white relative overflow-hidden`}
    >
      {/* Contact Section Enhanced Waves */}
      <div className="absolute inset-0 overflow-hidden">
        {/* ... your SVG wave code remains same ... */}
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h2 className="text-4xl font-bold mb-4">Let's Work Together</h2>
        <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
          Ready to bring your next project to life? Let's discuss how we can create something amazing together.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button
            size="lg"
            variant="secondary"
            className="bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm"
            onClick={() => setShowContactModal(true)} // IMPORTANT FIX
          >
            <svg
  xmlns="http://www.w3.org/2000/svg"
  className="w-5 h-5 mr-2 text-white"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  strokeWidth={2}
  strokeLinecap="round"
  strokeLinejoin="round"
>
  <path d="M4 4h16v16H4V4z" />
  <polyline points="4 4 12 13 20 4" />
</svg>

            Contact Us
          </Button>
        </div>

        <div className="flex justify-center space-x-6 mt-8">
  {websiteData.github && (
    <a
      href={
        websiteData.github.startsWith("http")
          ? websiteData.github
          : `https://github.com/${websiteData.github}`
      }
      target="_blank"
      rel="noopener noreferrer"
    >
      <Github className="w-6 h-6 hover:scale-110 transition-transform cursor-pointer" />
    </a>
  )}
  {websiteData.linkedin && (
    <a
      href={
        websiteData.linkedin.startsWith("http")
          ? websiteData.linkedin
          : `https://linkedin.com/in/${websiteData.linkedin}`
      }
      target="_blank"
      rel="noopener noreferrer"
    >
      <Linkedin className="w-6 h-6 hover:scale-110 transition-transform cursor-pointer" />
    </a>
  )}
  {websiteData.email && (
    <a href={`mailto:${websiteData.email}`}>
      <Mail className="w-6 h-6 hover:scale-110 transition-transform cursor-pointer" />
    </a>
  )}
</div>

      </div>
    </section>

    {/* Contact Modal */}
    {showContactModal && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
          <h3 className="text-xl font-bold mb-4">Contact Us</h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="contactName" className="text-sm font-medium">
                Enter Your Name
              </Label>
              <Input
                id="contactName"
                value={contactDetails.name || ""}
                onChange={(e) => setContactDetails({ ...contactDetails, name: e.target.value })}
                placeholder="Your Name"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="contactNumber" className="text-sm font-medium">
                Enter Your Number
              </Label>
              <Input
                id="contactNumber"
  type="tel"
  value={contactDetails.number}
  onChange={(e) => {
    const onlyNums = e.target.value.replace(/\D/g, "");
    setContactDetails({ ...contactDetails, number: onlyNums });
  }}
  placeholder="Your Number"
  className="mt-1"
              />
            </div>
            <Button
              className="w-full bg-purple-600 hover:bg-purple-700 text-white"
  onClick={() => {
    if (!contactDetails.name.trim() || !contactDetails.number.trim()) {
      alert("Please fill all the details carefully.");
      return;
    }

    // Optional: Ensure only numbers are allowed
    if (!/^\d+$/.test(contactDetails.number)) {
      alert("Please enter only numerical values for the phone number.");
      return;
    }

    setShowThankYouMessage(true);
    setTimeout(() => {
      setShowThankYouMessage(false);
      setShowContactModal(false);
      setContactDetails({ name: "", number: "" }); // reset after submission
    }, 2000);
  }}
>
  Submit
            </Button>
            {showThankYouMessage && (
              <p className="text-green-600 mt-3 text-center">
                Thank you, we will contact you shortly.
              </p>
            )}
          </div>
          <button
            onClick={() => setShowContactModal(false)}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
      </div>
    )}
  </>
)}

                
                                                                        
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Beautiful Add Skill Modal */}
      {showSkillModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl max-w-md w-full mx-4 overflow-hidden transform transition-all duration-300 animate-in zoom-in-95">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 p-6 text-center relative overflow-hidden">
              {/* Background pattern */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-2 left-4 w-8 h-8 bg-white/20 rounded-full animate-pulse"></div>
                <div className="absolute bottom-3 right-6 w-6 h-6 bg-white/20 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
                <div className="absolute top-1/2 right-4 w-4 h-4 bg-white/20 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
              </div>

              <div className="relative z-10">
                <div className="w-16 h-16 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center backdrop-blur-sm">
                  <Plus className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Add New Skill</h3>
                <p className="text-white/90 text-sm">Expand your expertise by adding a new technology or skill</p>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                  Skill Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={newSkillInput}
                    onChange={(e) => setNewSkillInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleAddSkillSubmit();
                      if (e.key === 'Escape') handleSkillModalClose();
                    }}
                    placeholder="e.g., React, Python, AWS..."
                    className="w-full px-4 py-3 border-2 border-purple-200 dark:border-purple-700 rounded-xl focus:border-purple-500 dark:focus:border-purple-400 focus:ring-4 focus:ring-purple-100 dark:focus:ring-purple-900/30 transition-all duration-300 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500"
                    autoFocus
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
              </div>

              {/* Skill suggestions */}
              <div className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-xl p-4">
                <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-2">Popular suggestions:</p>
                <div className="flex flex-wrap gap-2">
                  {(() => {
                    const suggestions = {
                      techops: ['Linux', 'Ansible', 'Nagios', 'VMware', 'PowerShell', 'ITIL'],
                      devops: ['Jenkins', 'Terraform', 'Kubernetes', 'Prometheus', 'GitLab CI', 'Helm'],
                      custom: ['JavaScript', 'Python', 'Communication', 'Project Management', 'Adobe Creative Suite', 'Figma'],
                      default: ['TypeScript', 'GraphQL', 'Docker', 'Kubernetes', 'TailwindCSS', 'Next.js']
                    };
                    return (suggestions[selectedStack as keyof typeof suggestions] || suggestions.default);
                  })().map((suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => setNewSkillInput(suggestion)}
                      className="px-3 py-1 bg-white dark:bg-slate-700 text-xs font-medium text-slate-600 dark:text-slate-300 rounded-lg border border-purple-200 dark:border-purple-700 hover:border-purple-400 dark:hover:border-purple-500 hover:bg-purple-50 dark:hover:bg-purple-900/30 transition-all duration-200"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 pt-0 flex space-x-3">
              <button
                onClick={handleSkillModalClose}
                className="flex-1 px-4 py-3 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl font-semibold hover:bg-slate-200 dark:hover:bg-slate-600 transition-all duration-300 border border-slate-200 dark:border-slate-600"
              >
                Cancel
              </button>
              <button
                onClick={handleAddSkillSubmit}
                disabled={!newSkillInput.trim()}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-blue-600 disabled:from-slate-300 disabled:to-slate-400 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl disabled:shadow-none transform hover:scale-105 disabled:scale-100"
              >
                <span className="flex items-center justify-center space-x-2">
                  <Plus className="w-4 h-4" />
                  <span>Add Skill</span>
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Helper functions for default content
function getDefaultSkills(stack: TechStack): string {
  const skillSets = {
    frontend:
      "React,TypeScript,Next.js,Tailwind CSS,JavaScript,HTML5,CSS3,Vue.js,Angular,SASS,Webpack,Vite,Figma,Adobe XD,Git,Redux,GraphQL,REST APIs",
    backend:
      "Node.js,Python,Express.js,MongoDB,PostgreSQL,MySQL,Redis,Docker,Kubernetes,AWS,Google Cloud,REST APIs,GraphQL,Microservices,Linux,Git,CI/CD,TypeScript",
    fullstack:
      "React,Node.js,TypeScript,MongoDB,PostgreSQL,AWS,Docker,Next.js,Express.js,Python,GraphQL,REST APIs,Git,CI/CD,Tailwind CSS,Redux,Kubernetes,Redis",
    cloud:
      "AWS,Azure,Google Cloud,Docker,Kubernetes,Terraform,Jenkins,CI/CD,Linux,Python,Bash,Monitoring,Security,Networking,Serverless,Infrastructure as Code,DevOps,Git",
    techops:
      "Linux,Windows Server,VMware,Nagios,Zabbix,Splunk,ITIL,Active Directory,Network Security,Firewall Management,System Monitoring,Incident Response,PowerShell,Bash,Ansible,Puppet",
    devops:
      "Jenkins,GitLab CI,Docker,Kubernetes,Terraform,Ansible,AWS,Azure,Prometheus,Grafana,ELK Stack,Git,Python,Bash,Helm,ArgoCD,SonarQube,Vault",
    custom:
      "JavaScript,Python,React,Node.js,HTML,CSS,Git,MongoDB,SQL,Docker,AWS,Figma,Adobe Creative Suite,Project Management,Communication,Problem Solving",
  };
  return skillSets[stack || "frontend"];
}

function getProjectTech(stack: TechStack): string[] {
  const techSets = {
    frontend: ["React", "TypeScript", "Tailwind"],
    backend: ["Node.js", "MongoDB", "Express"],
    fullstack: ["React", "Node.js", "PostgreSQL"],
    cloud: ["AWS", "Docker", "Kubernetes"],
    techops: ["Linux", "Ansible", "Monitoring"],
    devops: ["Jenkins", "Docker", "Terraform"],
    custom: ["JavaScript", "HTML", "CSS"],
  };
  return techSets[stack || "frontend"];
}

function Trophy({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M7 4V2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v2h2a1 1 0 0 1 1 1v6a3 3 0 0 1-3 3h-1a3 3 0 0 1-3 3v2h2a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1v-1a1 1 0 0 1 1-1h2v-2a3 3 0 0 1-3-3H7a3 3 0 0 1-3-3V5a1 1 0 0 1 1-1h2zm-2 7V6h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H5zm14 0h-1a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h1v5z" />
    </svg>
  );
}


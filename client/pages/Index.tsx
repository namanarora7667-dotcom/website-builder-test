import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Code,
  Zap,
  Palette,
  Rocket,
  ArrowRight,
  CheckCircle,
  Star,
  Sparkles,
  Monitor,
  Database,
  Cloud,
  Layers,
  Settings,
  Terminal,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Index() {
  const techStacks = [
    {
      title: "Frontend Developer",
      description: "Beautiful, responsive websites with modern frameworks.",
      icon: <Palette className="w-8 h-8" />,
      gradientFrom: "from-blue-500",
      gradientTo: "to-purple-600",
      bgGradient: "from-blue-50 to-purple-50",
      darkBgGradient: "dark:from-blue-900/20 dark:to-purple-900/20",
      features: [
        
      ],
    },
    {
      title: "Backend Developer",
      description: "Robust server-side solutions",
      icon: <Database className="w-8 h-8" />,
      gradientFrom: "from-green-500",
      gradientTo: "to-emerald-600",
      bgGradient: "from-green-50 to-emerald-50",
      darkBgGradient: "dark:from-green-900/20 dark:to-emerald-900/20",
      features: [
        
      ],
    },
    {
      title: "Full-stack Developer",
      description: "Complete end-to-end web applications",
      icon: <Layers className="w-8 h-8" />,
      gradientFrom: "from-purple-500",
      gradientTo: "to-pink-600",
      bgGradient: "from-purple-50 to-pink-50",
      darkBgGradient: "dark:from-purple-900/20 dark:to-pink-900/20",
      features: [
        // "Frontend + Backend",
        // "Database Integration",
        // "Real-time Features",
        // "DevOps Ready",
      ],
    },
    {
      title: "Cloud Engineer",
      description: "Scalable cloud-native applications",
      icon: <Cloud className="w-8 h-8" />,
      gradientFrom: "from-orange-500",
      gradientTo: "to-red-600",
      bgGradient: "from-orange-50 to-red-50",
      darkBgGradient: "dark:from-orange-900/20 dark:to-red-900/20",
      features: [
        // "AWS/Azure/GCP",
        // "Containerization",
        // "CI/CD Pipelines",
        // "Monitoring & Scaling",
      ],
    },
    {
      title: "TechOps Engineer",
      description: "Infrastructure management and system operations",
      icon: <Monitor className="w-8 h-8" />,
      gradientFrom: "from-slate-500",
      gradientTo: "to-gray-600",
      bgGradient: "from-slate-50 to-gray-50",
      darkBgGradient: "dark:from-slate-900/20 dark:to-gray-900/20",
      features: [
        // "System Administration",
        // "Network Operations",
        // "Security & Compliance",
        // "Infrastructure Automation",
      ],
    },
    {
      title: "DevOps Engineer",
      description: "Automated deployment and operational excellence",
      icon: <Rocket className="w-8 h-8" />,
      gradientFrom: "from-teal-500",
      gradientTo: "to-cyan-600",
      bgGradient: "from-teal-50 to-cyan-50",
      darkBgGradient: "dark:from-teal-900/20 dark:to-cyan-900/20",
      features: [
        // "CI/CD Automation",
        // "Container Orchestration",
        // "Infrastructure as Code",
        // "Monitoring & Observability",
      ],
    },
    {
      title: "Custom Builder",
      description: "Fully customizable template for any domain or profession",
      icon: <Settings className="w-8 h-8" />,
      gradientFrom: "from-indigo-500",
      gradientTo: "to-purple-600",
      bgGradient: "from-indigo-50 to-purple-50",
      darkBgGradient: "dark:from-indigo-900/20 dark:to-purple-900/20",
      features: [
        // "Drag & Drop Sections",
        // "5 Premium Themes",
        // "Markdown Support",
        // "Content Placeholders",
        // "Form-to-Website",
        // "Complete Customization",
      ],
    },
  ];

  const benefits = [
    "Professionally designed Templates",
    "No coding required - visual builder",
    "Mobile-responsive by default",
    "SEO optimized structure",
    "One-click deployment",
    // "Custom domain support",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-blue-900 dark:to-purple-900 relative overflow-hidden">
      {/* Animated Bubble Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Large floating bubbles */}
        <div className="absolute top-20 left-20 w-64 h-64 bg-purple-300/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-32 w-96 h-96 bg-blue-300/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-40 left-1/3 w-80 h-80 bg-cyan-300/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-pink-300/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 w-56 h-56 bg-indigo-300/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '3s'}}></div>

        {/* Medium bubbles */}
        <div className="absolute top-32 right-1/4 w-32 h-32 bg-purple-400/15 rounded-full blur-2xl animate-bounce" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute bottom-1/3 left-16 w-40 h-40 bg-blue-400/15 rounded-full blur-2xl animate-bounce" style={{animationDelay: '1.5s'}}></div>
        <div className="absolute top-2/3 right-12 w-36 h-36 bg-cyan-400/15 rounded-full blur-2xl animate-bounce" style={{animationDelay: '2.5s'}}></div>

        {/* Small floating bubbles */}
        <div className="absolute top-16 left-1/2 w-16 h-16 bg-pink-500/20 rounded-full blur-xl animate-ping" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-32 right-1/3 w-20 h-20 bg-purple-500/20 rounded-full blur-xl animate-ping" style={{animationDelay: '3s'}}></div>
        <div className="absolute top-1/4 left-1/4 w-12 h-12 bg-blue-500/20 rounded-full blur-xl animate-ping" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-1/4 left-2/3 w-14 h-14 bg-cyan-500/20 rounded-full blur-xl animate-ping" style={{animationDelay: '4s'}}></div>

        {/* Animated SVG bubbles */}
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="bubble1" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(139, 92, 246, 0.1)" />
              <stop offset="100%" stopColor="rgba(139, 92, 246, 0)" />
            </radialGradient>
            <radialGradient id="bubble2" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(6, 182, 212, 0.1)" />
              <stop offset="100%" stopColor="rgba(6, 182, 212, 0)" />
            </radialGradient>
          </defs>
          
          <circle cx="10%" cy="20%" r="40" fill="url(#bubble1)">
            <animate attributeName="cy" values="20%;80%;20%" dur="15s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.3;0.8;0.3" dur="15s" repeatCount="indefinite" />
          </circle>
          
          <circle cx="90%" cy="70%" r="30" fill="url(#bubble2)">
            <animate attributeName="cy" values="70%;20%;70%" dur="20s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.2;0.6;0.2" dur="20s" repeatCount="indefinite" />
          </circle>
          
          <circle cx="30%" cy="80%" r="25" fill="url(#bubble1)">
            <animate attributeName="cy" values="80%;10%;80%" dur="18s" repeatCount="indefinite" />
            <animate attributeName="cx" values="30%;40%;30%" dur="18s" repeatCount="indefinite" />
          </circle>
          
          <circle cx="70%" cy="30%" r="35" fill="url(#bubble2)">
            <animate attributeName="cy" values="30%;90%;30%" dur="25s" repeatCount="indefinite" />
            <animate attributeName="cx" values="70%;60%;70%" dur="25s" repeatCount="indefinite" />
          </circle>
        </svg>
      </div>

      {/* Header */}
      <header className="border-b bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {/* <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center shadow-lg">
              <Code className="w-5 h-5 text-white" />
            </div> */}
            <img src="Airtel_logo.png" alt="Airtel Logo" />
            <span className="text-xl font-bold text-black">
              Airtel Website builder
            </span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <a
              href="#features"
              className="text-slate-600 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors font-medium"
            >
              Features
            </a>
            <a
              href="#templates"
              className="text-slate-600 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors font-medium"
            >
              Templates
            </a>
            {/* <a
              href="#pricing"
              className="text-slate-600 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors font-medium"
            >
              Pricing
            </a> */}
            {/* <Button variant="outline" size="sm" className="border-purple-200 hover:border-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20">
              Sign In
            </Button> */}
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 lg:py-32 relative overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10">
          <Badge variant="secondary" className="mb-4 animate-fade-in bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-purple-200 dark:border-purple-700">
            <Sparkles className="w-4 h-4 mr-2" />
            ✨ Launch your developer portfolio in minutes
          </Badge>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-slide-up">
            Build Stunning{" "}
            <span className="text-[#d91b2a]">
              Developer Websites
            </span>{" "}
            Without Code
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto animate-slide-up leading-relaxed">
            Choose from professionally designed templates tailored for different
            tech stacks. Create your perfect developer portfolio, agency site,
            or personal brand in minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
            <Link to="/builder">
              <Button
                size="lg"
                className="text-lg px-8 py-6 bg-black hover:bg-black text-white transition-all shadow-xl hover:shadow-2xl transform hover:scale-105"
              >
                Start Building Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            {/* <Button variant="outline" size="lg" className="text-lg px-8 py-6 border-purple-200 hover:border-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 backdrop-blur-sm">
              View Templates
            </Button> */}
          </div>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-slate-600 dark:text-slate-300">
            {/* <div className="flex items-center gap-2 bg-white/60 dark:bg-slate-800/60 px-4 py-2 rounded-full backdrop-blur-sm">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span>4.3/5 rating</span>
            </div> */}
            {/* <div className="flex items-center gap-2 bg-white/60 dark:bg-slate-800/60 px-4 py-2 rounded-full backdrop-blur-sm">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>10,000+ sites created</span>
            </div> */}
            <div className="flex items-center gap-2 bg-white/60 dark:bg-slate-800/60 px-4 py-2 rounded-full backdrop-blur-sm">
              <Zap className="w-4 h-4 text-blue-500" />
              <span>Dowload your website as a static page</span>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Templates */}
      <section id="templates" className="py-20 relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Choose Your{" "}
              <span className="text-[#d91b2a]">
                Tech Stack
              </span>
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Each template is specifically designed for different developer
              roles and includes relevant sections, layouts, and content
              structures.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {techStacks.map((stack, index) => (
              <Link to={`/builder?template=${stack.title.toLowerCase().split(" ")[0]}`} key={index}>
                <Card
                  className={`group h-full flex flex-col hover:shadow-2xl hover:-translate-y-6 transition-all duration-500 cursor-pointer border-2 border-white/50 dark:border-slate-700/50 hover:border-purple-300 dark:hover:border-purple-600 animate-slide-up backdrop-blur-sm bg-gradient-to-br ${stack.bgGradient} ${stack.darkBgGradient} relative overflow-hidden`}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  {/* Hover glow effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${stack.gradientFrom} ${stack.gradientTo} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                  
                  {/* Floating elements on hover */}
                  <div className="absolute top-4 right-4 w-8 h-8 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-bounce transition-all duration-500" style={{animationDelay: '0.2s'}}></div>
                  <div className="absolute bottom-6 left-6 w-6 h-6 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-bounce transition-all duration-500" style={{animationDelay: '0.4s'}}></div>
                  
                  <CardContent className="p-6 relative z-10 flex flex-col justify-between h-full">
  <div>
    <div
      className={`w-16 h-16 bg-gradient-to-br ${stack.gradientFrom} ${stack.gradientTo} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 shadow-lg group-hover:shadow-2xl`}
    >
      <div className="text-white">
        {stack.icon}
      </div>
    </div>
    <h3 className="text-xl font-bold mb-2 group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors">
      {stack.title}
    </h3>
    <p className="text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
      {stack.description}
    </p>
    <ul className="space-y-2 mb-4">
      {stack.features.map((feature, featureIndex) => (
        <li
          key={featureIndex}
          className="flex items-center text-sm group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors"
        >
          <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 group-hover:scale-110 transition-transform" />
          {feature}
        </li>
      ))}
    </ul>
  </div>

  {/* Button stays aligned at bottom */}
  <Button
    className={`mt-auto w-full bg-gradient-to-r ${stack.gradientFrom} ${stack.gradientTo} hover:shadow-xl transform group-hover:scale-105 transition-all duration-300 text-white border-0`}
  >
    Use This Template
    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
  </Button>
</CardContent>

                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 relative z-10 bg-white/30 dark:bg-slate-900/30 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose{" "}
              <span className="text-[#d91b2a]">
                Airtel website builder
              </span>
              ?
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Everything you need to create a professional developer website
              that stands out.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex items-start space-x-3 animate-slide-up p-4 bg-white/50 dark:bg-slate-800/50 rounded-xl backdrop-blur-sm hover:bg-white/70 dark:hover:bg-slate-800/70 transition-all duration-300 hover:scale-105"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <p className="text-lg font-medium text-slate-700 dark:text-slate-200">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-4 left-1/4 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute bottom-8 right-1/3 w-40 h-40 bg-white/10 rounded-full blur-2xl animate-pulse" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-white/10 rounded-full blur-2xl animate-pulse" style={{animationDelay: '4s'}}></div>
        </div>
        <div className="container mx-auto px-4 text-center relative text-white z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Build Your Dream Website?
          </h2>
          {/* <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto leading-relaxed">
            Join thousands of developers who have already created stunning
            websites with our platform.
          </p> */}
          <Link to="/builder">
            <Button 
              size="lg" 
              variant="secondary" 
              className="text-lg px-8 py-6 bg-black text-white hover:bg-gray-900 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              Get Started for Free
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-t border-white/20 dark:border-slate-700/20 py-12 relative z-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              {/* <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center shadow-lg">
                <Code className="w-5 h-5 text-white" />
              </div> */}
              <img src="Airtel_logo.png" alt="Airtel logo" />
              <span className="text-xl font-bold text-black">
                Airtel website builder
              </span>
            </div>
            <p className="text-slate-600 dark:text-slate-300">
              © 2025 Airtel website builder. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

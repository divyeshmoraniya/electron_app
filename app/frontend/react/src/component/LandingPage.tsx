import { useState, useEffect } from 'react';
import { MessageCircle, Users, Shield, Zap, Menu, X, ArrowRight, Star, Globe, Lock, Smartphone } from 'lucide-react';
import { useAuth, UserButton, SignInButton, SignUpButton ,useUser } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const LandingPage = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [currentTestimonial, setCurrentTestimonial] = useState(0);
    const { isSignedIn } = useAuth();
    const {user} = useUser();

    console.log(user);

    useEffect(() => {

        try {
            const responce = axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/user/me`,{
                userName : user?.fullName,
                Email : user?.primaryEmailAddress?.emailAddress,
                clerkId : user?.id,
                profileImg : user?.imageUrl
            })

            console.log(responce.data);
        } catch (error) {
            console.log(error)
        }

    },[isSignedIn])



    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Testimonials rotation
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    const testimonials = [
        {
            name: "Sarah Chen",
            role: "Product Designer",
            content: "The most intuitive messaging platform I've ever used. Love the smooth animations!",
            avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
        },
        {
            name: "Marcus Rodriguez",
            role: "Startup Founder",
            content: "Talkify transformed how our team communicates. Simple yet powerful.",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
        },
        {
            name: "Emma Thompson",
            role: "Marketing Manager",
            content: "Security and ease of use in perfect harmony. Exactly what we needed.",
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
        }
    ];

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
        setIsMenuOpen(false);
    };

    const openChat = () => {
        // This would open your chat application
        console.log('Opening chat application...');
        // You can replace this with your actual chat opening logic
        window.open('/chat', '_blank'); // Example
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-x-hidden">
            
            {/* Animated Background Elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-4 -right-4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
                <div className="absolute -bottom-8 -left-4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
            </div>

            {/* Header */}
            <header className={`fixed top-0 w-full z-50 transition-all duration-500 ${
                isScrolled 
                    ? 'bg-slate-900/95 backdrop-blur-xl shadow-2xl border-b border-purple-500/20' 
                    : 'bg-transparent'
                }`}>
                <div className="max-w-7xl  mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        {/* Logo */}
                        <div className="flex -ml-12 items-center space-x-3 group cursor-pointer">
                            <div className="relative w-10 h-10 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 rounded-xl flex items-center justify-center transform group-hover:rotate-12 transition-all duration-300">
                                <MessageCircle className="w-6 h-6 text-white" />
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 rounded-xl blur opacity-75 group-hover:opacity-100 transition-opacity"></div>
                            </div>
                            <span className="text-2xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                                Talkify
                            </span>
                        </div>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-center space-x-8">
                            <button 
                                onClick={() => scrollToSection('features')}
                                className="text-slate-300 hover:text-white transition-all duration-300 relative group"
                            >
                                Features
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-full transition-all duration-300"></span>
                            </button>
                            <button 
                                onClick={() => scrollToSection('testimonials')}
                                className="text-slate-300 hover:text-white transition-all duration-300 relative group"
                            >
                                Reviews
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-full transition-all duration-300"></span>
                            </button>
                            <button 
                                onClick={() => scrollToSection('contact')}
                                className="text-slate-300 hover:text-white transition-all duration-300 relative group"
                            >
                                Contact
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-full transition-all duration-300"></span>
                            </button>
                        </nav>

                        {/* Auth Buttons - Desktop */}
                        <div className="hidden md:flex items-center space-x-4">
                            {isSignedIn ? (
                                <div className="flex items-center space-x-4">
                                    <span className="text-slate-300 font-medium">
                                        Welcome, {user?.firstName || 'User'}!
                                    </span>
                                    <div className="scale-110 ">
                                        <UserButton 
                                            appearance={{
                                                elements: {
                                                    avatarBox: "w-10 h-10 rounded-full border-2 border-purple-500/50 hover:border-purple-400 transition-colors"
                                                }
                                            }}
                                        />
                                    </div>
                                    <Link to="/chat">

                                    <button 
                                        
                                        className="px-8 -mr-24 ml-12 py-3 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 text-white rounded-full font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25 relative overflow-hidden group"
                                    >
                                        <span className="relative z-10 flex items-center space-x-2">
                                            <MessageCircle className="w-4 h-4" />
                                            <span>Open Chat</span>
                                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </span>
                                        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    </button>
                                </Link>
                                </div>
                            ) : (
                                <>
                                    <SignInButton mode="modal">
                                        <button className="px-6 py-2 text-slate-300 hover:text-white font-medium transition-all duration-300 relative overflow-hidden group">
                                            <span className="relative z-10">Sign In</span>
                                        </button>
                                    </SignInButton>
                                    <SignUpButton mode="modal">
                                        <button className="px-8 py-3 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 text-white rounded-full font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25 relative overflow-hidden group">
                                            <span className="relative z-10 flex items-center space-x-2">
                                                <span>Get Started</span>
                                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                            </span>
                                            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                        </button>
                                    </SignUpButton>
                                </>
                            )}
                        </div>

                        {/* Mobile menu button */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="md:hidden p-2 rounded-lg hover:bg-slate-800 text-white transition-all duration-300"
                        >
                            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>

                    {/* Mobile Menu */}
                    {isMenuOpen && (
                        <div className="md:hidden py-6 border-t border-slate-700/50 bg-slate-900/95 backdrop-blur-xl animate-fadeIn">
                            <nav className="flex flex-col space-y-4">
                                <button 
                                    onClick={() => scrollToSection('features')}
                                    className="text-slate-300 hover:text-white transition-colors text-left py-2"
                                >
                                    Features
                                </button>
                                <button 
                                    onClick={() => scrollToSection('testimonials')}
                                    className="text-slate-300 hover:text-white transition-colors text-left py-2"
                                >
                                    Reviews
                                </button>
                                <button 
                                    onClick={() => scrollToSection('contact')}
                                    className="text-slate-300 hover:text-white transition-colors text-left py-2"
                                >
                                    Contact
                                </button>
                                <div className="pt-4 border-t border-slate-700/50 space-y-3">
                                    {isSignedIn ? (
                                        <div className="space-y-3">
                                            <div className="flex items-center space-x-3 py-2">
                                                <UserButton 
                                                    appearance={{
                                                        elements: {
                                                            avatarBox: "w-8 h-8 rounded-full border-2 border-purple-500/50"
                                                        }
                                                    }}
                                                />
                                                <span className="text-slate-300">
                                                    {user?.firstName || 'User'}
                                                </span>
                                            </div>
                                            <button 
                                                onClick={openChat}
                                                className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-semibold transition-all duration-300 flex items-center justify-center space-x-2"
                                            >
                                                <MessageCircle className="w-4 h-4" />
                                                <span>Open Chat</span>
                                            </button>
                                        </div>
                                    ) : (
                                        <>
                                            <SignInButton mode="modal">
                                                <button className="w-full text-left py-2 text-slate-300 hover:text-white transition-colors">
                                                    Sign In
                                                </button>
                                            </SignInButton>
                                            <SignUpButton mode="modal">
                                                <button className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-semibold transition-all duration-300">
                                                    Get Started
                                                </button>
                                            </SignUpButton>
                                        </>
                                    )}
                                </div>
                            </nav>
                        </div>
                    )}
                </div>
            </header>

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        {/* Left Column - Content */}
                        <div className="space-y-8 animate-slideInLeft">
                            <div className="space-y-6">
                                <div className="inline-flex items-center space-x-2 bg-slate-800/50 backdrop-blur-sm rounded-full px-4 py-2 border border-purple-500/30">
                                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                    <span className="text-sm text-slate-300">Now Available Worldwide</span>
                                </div>
                                
                                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                                    <span className="text-white">Connect with</span>
                                    <br />
                                    <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent animate-gradient">
                                        Everyone
                                    </span>
                                    <br />
                                    <span className="text-white">Instantly</span>
                                </h1>
                                
                                <p className="text-xl text-slate-300 leading-relaxed max-w-lg">
                                    Experience the future of communication with our revolutionary messaging platform. 
                                    Simple, secure, and stunning.
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                {isSignedIn ? (
                                    <Link to="/chat">
                                    <button 
                                        onClick={openChat}
                                        className="group px-10 py-4 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 text-white rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25 relative overflow-hidden"
                                    >
                                        <span className="relative z-10 flex items-center justify-center space-x-2">
                                            <MessageCircle className="w-5 h-5" />
                                            <span>Start Chatting</span>
                                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                        </span>
                                        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    </button>
                                    </Link>
                                ) : (
                                    <SignUpButton mode="modal">
                                        <button className="group px-10 py-4 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 text-white rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25 relative overflow-hidden">
                                            <span className="relative z-10 flex items-center justify-center space-x-2">
                                                <span>Start Chatting</span>
                                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                            </span>
                                            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                        </button>
                                    </SignUpButton>
                                )}
                                
                                <button className="group px-10 py-4 border-2 border-slate-600 text-slate-300 rounded-full font-bold text-lg hover:border-purple-500 hover:text-white transition-all duration-300 relative overflow-hidden">
                                    <span className="relative z-10">Watch Demo</span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                </button>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-3 gap-8 pt-12">
                                {[
                                    { number: "2.5B+", label: "Active Users" },
                                    { number: "190+", label: "Countries" },
                                    { number: "500B+", label: "Messages Daily" }
                                ].map((stat, index) => (
                                    <div key={index} className="text-center group">
                                        <div className="text-3xl font-bold text-white mb-1 group-hover:scale-110 transition-transform">
                                            {stat.number}
                                        </div>
                                        <div className="text-sm text-slate-400">{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right Column - Hero Visual */}
                        <div className="relative animate-slideInRight">
                            <div className="relative z-10">
                                {/* Main Chat Interface */}
                                <div className="bg-slate-800/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-slate-700/50 transform hover:scale-105 transition-all duration-500">
                                    {/* Chat Header */}
                                    <div className="flex items-center space-x-4 mb-8">
                                        <div className="relative">
                                            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                                                <span className="text-white font-semibold">SJ</span>
                                            </div>
                                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-slate-800"></div>
                                        </div>
                                        <div>
                                            <div className="font-semibold text-white">Sarah Johnson</div>
                                            <div className="text-sm text-green-400 flex items-center">
                                                <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                                                Online
                                            </div>
                                        </div>
                                    </div>

                                    {/* Chat Messages */}
                                    <div className="space-y-4">
                                        <div className="flex justify-end animate-messageSlideIn">
                                            <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-2xl rounded-br-sm max-w-xs shadow-lg">
                                                <p>Hey! How's the new design coming along? 🎨</p>
                                                <div className="text-xs opacity-75 mt-1">2:34 PM</div>
                                            </div>
                                        </div>
                                        
                                        <div className="flex justify-start animate-messageSlideIn" style={{animationDelay: '0.5s'}}>
                                            <div className="bg-slate-700 text-white px-6 py-3 rounded-2xl rounded-bl-sm max-w-xs shadow-lg">
                                                <p>Absolutely love it! The animations are so smooth ✨</p>
                                                <div className="text-xs opacity-75 mt-1">2:35 PM</div>
                                            </div>
                                        </div>
                                        
                                        <div className="flex justify-end animate-messageSlideIn" style={{animationDelay: '1s'}}>
                                            <div className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-6 py-3 rounded-2xl rounded-br-sm max-w-xs shadow-lg">
                                                <p>Can't wait to show the team! 🚀</p>
                                                <div className="text-xs opacity-75 mt-1">2:36 PM</div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Typing Indicator */}
                                    <div className="flex items-center space-x-2 mt-6 text-slate-400">
                                        <div className="flex space-x-1">
                                            <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce"></div>
                                            <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                                            <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                                        </div>
                                        <span className="text-sm">Sarah is typing...</span>
                                    </div>
                                </div>
                            </div>

                            {/* Floating Elements */}
                            <div className="absolute -top-8 -right-8 w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-60 animate-float"></div>
                            <div className="absolute -bottom-8 -left-8 w-16 h-16 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full opacity-40 animate-float" style={{animationDelay: '1s'}}></div>
                            <div className="absolute top-1/2 -right-4 w-12 h-12 bg-gradient-to-r from-pink-500 to-cyan-500 rounded-full opacity-50 animate-float" style={{animationDelay: '2s'}}></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-20 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-20 animate-fadeInUp">
                        <div className="inline-block bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full px-6 py-2 border border-purple-500/30 mb-6">
                            <span className="text-purple-300 font-medium">✨ Features</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Why Choose 
                            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> Talkify?</span>
                        </h2>
                        <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                            Experience next-generation communication with features designed for the modern world
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            {
                                icon: MessageCircle,
                                title: "Lightning Fast",
                                description: "Messages delivered instantly with zero lag",
                                gradient: "from-purple-500 to-pink-500",
                                bgGradient: "from-purple-500/10 to-pink-500/10"
                            },
                            {
                                icon: Shield,
                                title: "Bank-Grade Security",
                                description: "End-to-end encryption keeps your chats private",
                                gradient: "from-cyan-500 to-blue-500",
                                bgGradient: "from-cyan-500/10 to-blue-500/10"
                            },
                            {
                                icon: Users,
                                title: "Smart Groups",
                                description: "Create unlimited groups with advanced controls",
                                gradient: "from-pink-500 to-red-500",
                                bgGradient: "from-pink-500/10 to-red-500/10"
                            },
                            {
                                icon: Smartphone,
                                title: "Cross-Platform",
                                description: "Seamless experience across all your devices",
                                gradient: "from-green-500 to-cyan-500",
                                bgGradient: "from-green-500/10 to-cyan-500/10"
                            }
                        ].map((feature, index) => (
                            <div 
                                key={index} 
                                className={`group p-8 rounded-2xl bg-gradient-to-br ${feature.bgGradient} border border-slate-700/50 backdrop-blur-sm hover:border-purple-500/50 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl animate-fadeInUp`}
                                style={{animationDelay: `${index * 0.1}s`}}
                            >
                                <div className={`w-14 h-14 bg-gradient-to-r ${feature.gradient} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                                    <feature.icon className="w-7 h-7 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                                <p className="text-slate-300 leading-relaxed">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section id="testimonials" className="py-20 relative">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16 animate-fadeInUp">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            What Our Users Say
                        </h2>
                        <p className="text-xl text-slate-300">
                            Join millions who love our platform
                        </p>
                    </div>

                    <div className="relative max-w-4xl mx-auto">
                        <div className="bg-slate-800/50 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-slate-700/50 shadow-2xl">
                            <div className="text-center">
                                <div className="flex justify-center mb-6">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                                    ))}
                                </div>
                                
                                <blockquote className="text-2xl md:text-3xl font-medium text-white mb-8 leading-relaxed">
                                    "{testimonials[currentTestimonial].content}"
                                </blockquote>
                                
                                <div className="flex items-center justify-center space-x-4">
                                    <img 
                                        src={testimonials[currentTestimonial].avatar}
                                        alt={testimonials[currentTestimonial].name}
                                        className="w-12 h-12 rounded-full object-cover"
                                    />
                                    <div className="text-left">
                                        <div className="font-semibold text-white">
                                            {testimonials[currentTestimonial].name}
                                        </div>
                                        <div className="text-slate-400">
                                            {testimonials[currentTestimonial].role}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Testimonial dots */}
                        <div className="flex justify-center space-x-3 mt-8">
                            {testimonials.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentTestimonial(index)}
                                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                        index === currentTestimonial 
                                            ? 'bg-purple-500 scale-125' 
                                            : 'bg-slate-600 hover:bg-slate-500'
                                    }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 relative">
                <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
                    <div className="bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-cyan-500/20 rounded-3xl p-12 border border-purple-500/30 backdrop-blur-xl animate-fadeInUp">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Ready to Transform Your
                            <span className="block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                                Communication?
                            </span>
                        </h2>
                        <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
                            Join millions of users who've already discovered the future of messaging
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            {isSignedIn ? (
                                <button 
                                    onClick={openChat}
                                    className="group px-12 py-4 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 text-white rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25 relative overflow-hidden"
                                >
                                    <span className="relative z-10 flex items-center space-x-2">
                                        <MessageCircle className="w-5 h-5" />
                                        <span>Start Chatting Now</span>
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                </button>
                            ) : (
                                <SignUpButton mode="modal">
                                    <button className="group px-12 py-4 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 text-white rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25 relative overflow-hidden">
                                        <span className="relative z-10 flex items-center space-x-2">
                                            <span>Start Free Today</span>
                                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                        </span>
                                        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    </button>
                                </SignUpButton>
                            )}
                            
                            <div className="text-slate-400 text-sm">
                                ✓ No credit card required  ✓ Setup in 30 seconds
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer id="contact" className="bg-slate-900/50 backdrop-blur-xl border-t border-slate-700/50 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-4 gap-12">
                        <div className="col-span-2">
                            <div className="flex items-center space-x-3 mb-6">
                                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                                    <MessageCircle className="w-6 h-6 text-white" />
                                </div>
                                <span className="text-2xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                                    Talkify
                                </span>
                            </div>
                            <p className="text-slate-400 max-w-md mb-6 leading-relaxed">
                                Revolutionizing communication with cutting-edge technology, 
                                beautiful design, and uncompromising security.
                            </p>
                            <div className="flex space-x-4">
                                {[Globe, Lock, Zap].map((Icon, index) => (
                                    <div key={index} className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-purple-500 transition-colors cursor-pointer">
                                        <Icon className="w-5 h-5 text-slate-400 hover:text-white" />
                                    </div>
                                ))}
                            </div>
                        </div>
                        
                        <div>
                            <h4 className="font-bold text-white mb-4">Product</h4>
                            <div className="space-y-3 text-slate-400">
                                <div className="hover:text-white transition-colors cursor-pointer">Features</div>
                                <div className="hover:text-white transition-colors cursor-pointer">Security</div>
                                <div className="hover:text-white transition-colors cursor-pointer">Pricing</div>
                                <div className="hover:text-white transition-colors cursor-pointer">Download</div>
                            </div>
                        </div>
                        
                        <div>
                            <h4 className="font-bold text-white mb-4">Company</h4>
                            <div className="space-y-3 text-slate-400">
                                <div className="hover:text-white transition-colors cursor-pointer">About</div>
                                <div className="hover:text-white transition-colors cursor-pointer">Careers</div>
                                <div className="hover:text-white transition-colors cursor-pointer">Blog</div>
                                <div className="hover:text-white transition-colors cursor-pointer">Contact</div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="border-t border-slate-700/50 mt-12 pt-8 text-center">
                        <p className="text-slate-400">
                            &copy; 2025 Talkify. All rights reserved. Made with ❤️ for better communication.
                        </p>
                    </div>
                </div>
            </footer>

            {/* Custom Styles */}
            <style jsx>{`
                @keyframes blob {
                    0% {
                        transform: translate(0px, 0px) scale(1);
                    }
                    33% {
                        transform: translate(30px, -50px) scale(1.1);
                    }
                    66% {
                        transform: translate(-20px, 20px) scale(0.9);
                    }
                    100% {
                        transform: translate(0px, 0px) scale(1);
                    }
                }
                
                @keyframes float {
                    0%, 100% {
                        transform: translateY(0px);
                    }
                    50% {
                        transform: translateY(-20px);
                    }
                }
                
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                }
                
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
                
                @keyframes slideInLeft {
                    from {
                        opacity: 0;
                        transform: translateX(-50px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }
                
                @keyframes slideInRight {
                    from {
                        opacity: 0;
                        transform: translateX(50px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }
                
                @keyframes messageSlideIn {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                @keyframes gradient {
                    0%, 100% {
                        background-size: 200% 200%;
                        background-position: left center;
                    }
                    50% {
                        background-size: 200% 200%;
                        background-position: right center;
                    }
                }
                
                .animate-blob {
                    animation: blob 7s infinite;
                }
                
                .animate-float {
                    animation: float 6s ease-in-out infinite;
                }
                
                .animate-fadeIn {
                    animation: fadeIn 0.5s ease-out;
                }
                
                .animate-fadeInUp {
                    animation: fadeInUp 0.8s ease-out;
                }
                
                .animate-slideInLeft {
                    animation: slideInLeft 1s ease-out;
                }
                
                .animate-slideInRight {
                    animation: slideInRight 1s ease-out;
                }
                
                .animate-messageSlideIn {
                    animation: messageSlideIn 0.6s ease-out both;
                }
                
                .animate-gradient {
                    animation: gradient 3s ease infinite;
                }
                
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
                
                .animation-delay-4000 {
                    animation-delay: 4s;
                }
            `}</style>
        </div>
    );
};

export default LandingPage;
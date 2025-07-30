// Career Sarthi Application JavaScript
class CareerSarthi {
    constructor() {
        this.currentSection = 'home';
        this.assessmentData = {};
        this.isAssessmentStarted = false;
        this.selectedPackage = null;
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.setupNavigation();
        this.setupMobileMenu();
        this.setupForms();
        this.setupModals();
        this.loadInitialContent();
        
        console.log('Career Sarthi application initialized');
    }
    
    setupEventListeners() {
        // Page load events
        document.addEventListener('DOMContentLoaded', () => {
            this.showSection('home');
            this.animateOnLoad();
        });
        
        // Window resize events
        window.addEventListener('resize', () => {
            this.handleResize();
        });
        
        // Smooth scrolling for anchor links
        document.addEventListener('click', (e) => {
            if (e.target.matches('a[href^="#"]')) {
                e.preventDefault();
                const targetId = e.target.getAttribute('href').substring(1);
                this.navigateToSection(targetId);
            }
        });
    }
    
    setupNavigation() {
        console.log('Setting up navigation...');
        
        // Setup navigation links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const section = link.dataset.section;
                console.log('Nav link clicked:', section);
                if (section) {
                    this.navigateToSection(section);
                    this.closeMobileMenu();
                }
            });
        });
        
        // Setup hero buttons
        setTimeout(() => {
            const takeAssessmentBtn = document.querySelector('.hero-actions .btn--primary');
            if (takeAssessmentBtn) {
                takeAssessmentBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    console.log('Take assessment button clicked');
                    this.navigateToSection('psychometric');
                });
            }
            
            const bookCounselingBtn = document.querySelector('.hero-actions .btn--outline');
            if (bookCounselingBtn) {
                bookCounselingBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    console.log('Book counseling button clicked');
                    this.navigateToSection('counseling');
                });
            }
            
            // Setup service buttons
            document.querySelectorAll('.service-card .btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    const serviceText = btn.closest('.service-card').querySelector('.service-title').textContent;
                    console.log('Service button clicked:', serviceText);
                    if (serviceText.includes('Psychometric')) {
                        this.navigateToSection('psychometric');
                    } else if (serviceText.includes('Counseling') || serviceText.includes('College')) {
                        this.navigateToSection('counseling');
                    }
                });
            });
            
            console.log('Navigation setup completed');
        }, 100);
    }
    
    setupMobileMenu() {
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const navbarMenu = document.getElementById('navbarMenu');
        
        if (mobileMenuBtn && navbarMenu) {
            mobileMenuBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.toggleMobileMenu();
            });
            
            // Close mobile menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!mobileMenuBtn.contains(e.target) && !navbarMenu.contains(e.target)) {
                    this.closeMobileMenu();
                }
            });
        }
    }
    
    setupForms() {
        setTimeout(() => {
            // Contact form
            const contactForm = document.getElementById('contactForm');
            if (contactForm) {
                contactForm.addEventListener('submit', (e) => {
                    e.preventDefault();
                    this.handleContactForm(contactForm);
                });
            }
            
            // Counseling booking form
            const bookingForm = document.getElementById('counselingBookingForm');
            if (bookingForm) {
                bookingForm.addEventListener('submit', (e) => {
                    e.preventDefault();
                    this.handleBookingForm(bookingForm);
                });
            }
            
            // Setup package selection buttons
            document.querySelectorAll('.package-card .btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    const packageName = btn.closest('.package-card').querySelector('.package-name').textContent.toLowerCase();
                    this.selectPackage(packageName);
                });
            });
            
            console.log('Forms setup completed');
        }, 200);
    }
    
    setupModals() {
        // Close modals when clicking outside
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                this.closeModal(e.target.id);
            }
        });
        
        // Close modals with escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                const openModal = document.querySelector('.modal:not(.hidden)');
                if (openModal) {
                    this.closeModal(openModal.id);
                }
            }
        });
    }
    
    loadInitialContent() {
        // Add smooth entrance animations
        setTimeout(() => {
            this.addEntranceAnimations();
        }, 200);
    }
    
    // Navigation Methods
    navigateToSection(sectionId) {
        console.log('Navigating to section:', sectionId);
        
        // Remove any loading states
        document.body.classList.remove('loading');
        
        if (sectionId === this.currentSection) {
            console.log('Already on section:', sectionId);
            return;
        }
        
        // Hide current section
        const currentSection = document.getElementById(this.currentSection);
        if (currentSection) {
            currentSection.classList.remove('active');
        }
        
        // Show new section
        const newSection = document.getElementById(sectionId);
        if (newSection) {
            newSection.classList.add('active');
            this.currentSection = sectionId;
            
            // Update navigation
            this.updateNavigation(sectionId);
            
            // Scroll to top smoothly
            window.scrollTo({ top: 0, behavior: 'smooth' });
            
            // Add entrance animation
            setTimeout(() => {
                this.animateSection(newSection);
            }, 100);
            
            // Track navigation
            this.trackNavigation(sectionId);
            
            console.log('Successfully navigated to:', sectionId);
        } else {
            console.warn('Section not found:', sectionId);
        }
    }
    
    updateNavigation(activeSection) {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            if (link.dataset.section === activeSection) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
    
    showSection(sectionId) {
        this.navigateToSection(sectionId);
    }
    
    // Mobile Menu Methods
    toggleMobileMenu() {
        const navbarMenu = document.getElementById('navbarMenu');
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        
        if (navbarMenu && mobileMenuBtn) {
            const isActive = navbarMenu.classList.contains('active');
            if (isActive) {
                navbarMenu.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            } else {
                navbarMenu.classList.add('active');
                mobileMenuBtn.classList.add('active');
            }
        }
    }
    
    closeMobileMenu() {
        const navbarMenu = document.getElementById('navbarMenu');
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        
        if (navbarMenu && mobileMenuBtn) {
            navbarMenu.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
        }
    }
    
    // Assessment Methods
    startAssessment() {
        console.log('Starting assessment...');
        this.showModal('assessmentModal');
    }
    
    startFullAssessment() {
        this.closeModal('assessmentModal');
        this.isAssessmentStarted = true;
        
        // Create assessment interface
        this.createAssessmentInterface();
        this.navigateToSection('psychometric');
        
        // Show success message
        this.showNotification('Assessment started! Answer all questions honestly for best results.', 'success');
    }
    
    createAssessmentInterface() {
        const psychometricSection = document.getElementById('psychometric');
        if (!psychometricSection) return;
        
        // Create full assessment form
        const assessmentContainer = document.createElement('div');
        assessmentContainer.className = 'full-assessment-container';
        assessmentContainer.innerHTML = `
            <div class="assessment-progress">
                <div class="progress-bar">
                    <div class="progress-fill" id="assessmentProgress"></div>
                </div>
                <p class="progress-text">Question <span id="currentQuestion">1</span> of <span id="totalQuestions">8</span></p>
            </div>
            <div class="assessment-questions" id="assessmentQuestions">
                <!-- Questions will be loaded here -->
            </div>
            <div class="assessment-controls">
                <button class="btn btn--outline" id="prevQuestion" disabled>Previous</button>
                <button class="btn btn--primary" id="nextQuestion">Next</button>
                <button class="btn btn--primary" id="submitAssessment" style="display: none;">Get Results</button>
            </div>
        `;
        
        // Replace the sample questions with full assessment
        const testContent = psychometricSection.querySelector('.test-content');
        if (testContent) {
            testContent.innerHTML = '';
            testContent.appendChild(assessmentContainer);
        }
        
        this.loadAssessmentQuestions();
        this.setupAssessmentControls();
    }
    
    loadAssessmentQuestions() {
        const questions = this.getAssessmentQuestions();
        this.assessmentData.questions = questions;
        this.assessmentData.currentQuestion = 0;
        this.assessmentData.answers = {};
        
        this.renderCurrentQuestion();
        this.updateAssessmentProgress();
    }
    
    getAssessmentQuestions() {
        return [
            {
                id: 1,
                question: "Which activity interests you most?",
                options: [
                    { value: "analytical", text: "Analyzing data and solving problems" },
                    { value: "helper", text: "Helping others with their challenges" },
                    { value: "creative", text: "Creating art or writing" },
                    { value: "leader", text: "Leading team projects" }
                ]
            },
            {
                id: 2,
                question: "In group projects, you usually:",
                options: [
                    { value: "analytical", text: "Focus on research and analysis" },
                    { value: "helper", text: "Help coordinate team members" },
                    { value: "creative", text: "Come up with creative ideas" },
                    { value: "leader", text: "Take charge and organize tasks" }
                ]
            },
            {
                id: 3,
                question: "Your ideal work environment is:",
                options: [
                    { value: "analytical", text: "Quiet office with technical tools" },
                    { value: "helper", text: "Interactive space with people" },
                    { value: "creative", text: "Creative studio or flexible space" },
                    { value: "leader", text: "Meeting rooms and leadership settings" }
                ]
            },
            {
                id: 4,
                question: "Which subject interested you most in school?",
                options: [
                    { value: "analytical", text: "Mathematics and Science" },
                    { value: "helper", text: "Social Studies and Biology" },
                    { value: "creative", text: "Arts and Literature" },
                    { value: "leader", text: "Economics and Business Studies" }
                ]
            },
            {
                id: 5,
                question: "How do you prefer to solve problems?",
                options: [
                    { value: "analytical", text: "Break it down logically step by step" },
                    { value: "helper", text: "Discuss with others and get different perspectives" },
                    { value: "creative", text: "Trust your instincts and creative solutions" },
                    { value: "leader", text: "Follow established procedures and delegate tasks" }
                ]
            },
            {
                id: 6,
                question: "What motivates you most at work?",
                options: [
                    { value: "analytical", text: "Solving complex technical challenges" },
                    { value: "helper", text: "Making a positive impact on people's lives" },
                    { value: "creative", text: "Expressing creativity and bringing new ideas" },
                    { value: "leader", text: "Achieving targets and leading successful teams" }
                ]
            },
            {
                id: 7,
                question: "In your free time, you prefer:",
                options: [
                    { value: "analytical", text: "Reading about new technologies" },
                    { value: "helper", text: "Volunteering or helping friends" },
                    { value: "creative", text: "Artistic hobbies or creative writing" },
                    { value: "leader", text: "Organizing events or sports activities" }
                ]
            },
            {
                id: 8,
                question: "What type of recognition do you value most?",
                options: [
                    { value: "analytical", text: "Being acknowledged as an expert" },
                    { value: "helper", text: "Being thanked for helping others" },
                    { value: "creative", text: "Having your creative work appreciated" },
                    { value: "leader", text: "Being recognized as a strong leader" }
                ]
            }
        ];
    }
    
    renderCurrentQuestion() {
        const questionsContainer = document.getElementById('assessmentQuestions');
        const currentQuestionIndex = this.assessmentData.currentQuestion;
        const question = this.assessmentData.questions[currentQuestionIndex];
        
        if (questionsContainer && question) {
            questionsContainer.innerHTML = `
                <div class="assessment-question">
                    <h3>Question ${currentQuestionIndex + 1}</h3>
                    <p class="question-text">${question.question}</p>
                    <div class="question-options">
                        ${question.options.map(option => `
                            <label class="assessment-option">
                                <input type="radio" name="question${question.id}" value="${option.value}" 
                                       ${this.assessmentData.answers[question.id] === option.value ? 'checked' : ''}>
                                <span class="option-text">${option.text}</span>
                            </label>
                        `).join('')}
                    </div>
                </div>
            `;
            
            // Add event listeners for option selection
            const options = questionsContainer.querySelectorAll('input[type="radio"]');
            options.forEach(option => {
                option.addEventListener('change', (e) => {
                    this.assessmentData.answers[question.id] = e.target.value;
                    this.updateNextButton();
                });
            });
        }
    }
    
    setupAssessmentControls() {
        setTimeout(() => {
            const prevButton = document.getElementById('prevQuestion');
            const nextButton = document.getElementById('nextQuestion');
            const submitButton = document.getElementById('submitAssessment');
            
            if (prevButton) {
                prevButton.addEventListener('click', () => {
                    this.previousQuestion();
                });
            }
            
            if (nextButton) {
                nextButton.addEventListener('click', () => {
                    this.nextQuestion();
                });
            }
            
            if (submitButton) {
                submitButton.addEventListener('click', () => {
                    this.submitAssessment();
                });
            }
        }, 100);
    }
    
    previousQuestion() {
        if (this.assessmentData.currentQuestion > 0) {
            this.assessmentData.currentQuestion--;
            this.renderCurrentQuestion();
            this.updateAssessmentProgress();
            this.updateAssessmentControls();
        }
    }
    
    nextQuestion() {
        const currentQuestion = this.assessmentData.questions[this.assessmentData.currentQuestion];
        
        // Check if current question is answered
        if (!this.assessmentData.answers[currentQuestion.id]) {
            this.showNotification('Please select an answer before proceeding.', 'warning');
            return;
        }
        
        if (this.assessmentData.currentQuestion < this.assessmentData.questions.length - 1) {
            this.assessmentData.currentQuestion++;
            this.renderCurrentQuestion();
            this.updateAssessmentProgress();
            this.updateAssessmentControls();
        }
    }
    
    updateAssessmentProgress() {
        const progressFill = document.getElementById('assessmentProgress');
        const currentQuestionSpan = document.getElementById('currentQuestion');
        const totalQuestionsSpan = document.getElementById('totalQuestions');
        
        const progress = ((this.assessmentData.currentQuestion + 1) / this.assessmentData.questions.length) * 100;
        
        if (progressFill) {
            progressFill.style.width = `${progress}%`;
        }
        
        if (currentQuestionSpan) {
            currentQuestionSpan.textContent = this.assessmentData.currentQuestion + 1;
        }
        
        if (totalQuestionsSpan) {
            totalQuestionsSpan.textContent = this.assessmentData.questions.length;
        }
    }
    
    updateAssessmentControls() {
        const prevButton = document.getElementById('prevQuestion');
        const nextButton = document.getElementById('nextButton');
        const submitButton = document.getElementById('submitAssessment');
        
        if (prevButton) {
            prevButton.disabled = this.assessmentData.currentQuestion === 0;
        }
        
        const isLastQuestion = this.assessmentData.currentQuestion === this.assessmentData.questions.length - 1;
        
        if (nextButton && submitButton) {
            if (isLastQuestion) {
                nextButton.style.display = 'none';
                submitButton.style.display = 'inline-block';
            } else {
                nextButton.style.display = 'inline-block';
                submitButton.style.display = 'none';
            }
        }
    }
    
    updateNextButton() {
        this.updateAssessmentControls();
    }
    
    submitAssessment() {
        // Check if all questions are answered
        const unansweredQuestions = this.assessmentData.questions.filter(q => 
            !this.assessmentData.answers[q.id]
        );
        
        if (unansweredQuestions.length > 0) {
            this.showNotification('Please answer all questions before submitting.', 'warning');
            return;
        }
        
        // Calculate results
        const results = this.calculateAssessmentResults();
        this.assessmentData.results = results;
        
        // Show results
        this.navigateToSection('results');
        this.displayResults(results);
        
        this.showNotification('Assessment completed! View your personalized results below.', 'success');
    }
    
    calculateAssessmentResults() {
        const answers = this.assessmentData.answers;
        const scores = {
            analytical: 0,
            helper: 0,  
            creative: 0,
            leader: 0
        };
        
        // Count scores for each personality type
        Object.values(answers).forEach(answer => {
            if (scores[answer] !== undefined) {
                scores[answer]++;
            }
        });
        
        // Determine primary personality type
        const maxScore = Math.max(...Object.values(scores));
        const primaryType = Object.keys(scores).find(key => scores[key] === maxScore);
        
        return {
            scores,
            primaryType,
            percentage: Math.round((maxScore / this.assessmentData.questions.length) * 100)
        };
    }
    
    displayResults(results) {
        const personalityTypes = document.querySelectorAll('.personality-type');
        
        personalityTypes.forEach(typeElement => {
            const type = typeElement.dataset.type;
            if (type === results.primaryType) {
                typeElement.classList.add('highlighted-result');
                typeElement.style.borderColor = 'var(--color-primary)';
                typeElement.style.backgroundColor = 'var(--color-saffron-light)';
                
                // Add badge
                const badge = document.createElement('div');
                badge.className = 'result-badge';
                badge.textContent = `${results.percentage}% Match`;
                badge.style.cssText = `
                    position: absolute;
                    top: -10px;
                    right: -10px;
                    background: var(--color-primary);
                    color: var(--color-btn-primary-text);
                    padding: 4px 12px;
                    border-radius: 20px;
                    font-size: 12px;
                    font-weight: bold;
                `;
                typeElement.style.position = 'relative';
                typeElement.appendChild(badge);
            }
        });
        
        // Setup personality detail buttons
        setTimeout(() => {
            const detailButtons = document.querySelectorAll('.personality-type .btn');
            detailButtons.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    const type = btn.closest('.personality-type').dataset.type;
                    this.showPersonalityDetails(type);
                });
            });
        }, 100);
    }
    
    // Package selection
    selectPackage(packageType) {
        console.log('Package selected:', packageType);
        this.selectedPackage = packageType;
        this.showBookingForm();
    }
    
    showBookingForm() {
        const bookingForm = document.getElementById('bookingForm');
        if (bookingForm) {
            bookingForm.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }
    }
    
    hideBookingForm() {
        const bookingForm = document.getElementById('bookingForm');
        if (bookingForm) {
            bookingForm.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }
    
    // Form handling
    handleContactForm(form) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        // Validate required fields
        if (!data.name || !data.message) {
            this.showNotification('Please fill in all required fields.', 'warning');
            return;
        }
        
        // Simulate form submission
        this.showNotification('Thank you for your message! We will contact you on 6200989340 within 24 hours.', 'success');
        
        // Reset form
        form.reset();
        
        // Track form submission
        console.log('Contact form submitted:', data);
    }
    
    handleBookingForm(form) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        data.package = this.selectedPackage;
        
        // Validate required fields
        if (!data.fullName || !data.phone || !data.service) {
            this.showNotification('Please fill in all required fields.', 'warning');
            return;
        }
        
        // Simulate booking submission
        this.showNotification(`Booking confirmed for ${data.service} service! We will contact you on ${data.phone} soon to schedule your session.`, 'success');
        
        // Hide form and reset
        this.hideBookingForm();
        form.reset();
        
        // Track booking
        console.log('Booking form submitted:', data);
    }
    
    // Modal methods
    showModal(modalId, content = null) {
        const modal = document.getElementById(modalId);
        if (modal) {
            if (content) {
                this.populateModal(modal, content);
            }
            modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        }
    }
    
    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }
        
        // Remove dynamically created modals
        if (modalId === 'personalityModal') {
            const modalElement = document.getElementById(modalId);
            if (modalElement && modalElement.parentNode) {
                modalElement.parentNode.removeChild(modalElement);
            }
        }
    }
    
    // Personality details
    showPersonalityDetails(type) {
        const details = this.getPersonalityDetails(type);
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.id = 'personalityModal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>${details.title}</h3>
                    <button class="modal-close" onclick="careerSarthi.closeModal('personalityModal')">&times;</button>
                </div>
                <div class="modal-body">
                    <p>${details.description}</p>
                    <div class="modal-section">
                        <h5>Key Strengths:</h5>
                        <ul>
                            ${details.strengths?.map(strength => `<li>${strength}</li>`).join('') || ''}
                        </ul>
                    </div>
                    <div class="modal-section">
                        <h5>Recommended Careers:</h5>
                        <div class="career-tags">
                            ${details.careers?.map(career => `<span class="career-tag">${career}</span>`).join('') || ''}
                        </div>
                    </div>
                    <div class="modal-section">
                        <h5>Top Colleges:</h5>
                        <p>${details.colleges?.join(', ') || ''}</p>
                    </div>
                    <div class="modal-section">
                        <h5>Entrance Exams:</h5>
                        <p>${details.exams?.join(', ') || ''}</p>
                    </div>
                    <div class="modal-actions">
                        <button class="btn btn--primary" onclick="careerSarthi.navigateToSection('counseling')">Book Counseling</button>
                        <button class="btn btn--outline" onclick="careerSarthi.closeModal('personalityModal')">Close</button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        this.showModal('personalityModal');
    }
    
    getPersonalityDetails(type) {
        const details = {
            analytical: {
                title: "Analytical Thinker",
                description: "You excel at problem-solving, logical reasoning, and working with data. You enjoy understanding how things work and finding efficient solutions.",
                strengths: ["Logical thinking", "Problem-solving", "Attention to detail", "Research skills"],
                careers: ["Data Scientist", "Software Engineer", "Research Analyst", "Financial Analyst", "Systems Analyst"],
                colleges: ["IIT", "NIT", "IIIT", "ISI Kolkata"],
                exams: ["JEE Main/Advanced", "GATE", "CAT"]
            },
            helper: {
                title: "Helper & Caregiver",
                description: "You thrive when helping others and making a difference. You're passionate about supporting people and contributing to society.",
                strengths: ["Empathy", "Communication", "Patience", "Teamwork"],
                careers: ["Teacher", "Counselor", "Social Worker", "Healthcare Worker", "Psychologist"],
                colleges: ["AIIMS", "CMC", "JNU", "DU", "BHU"],
                exams: ["NEET", "CTET", "NET", "SET"]
            },
            creative: {
                title: "Creative Innovator",
                description: "You bring fresh ideas and creative solutions. You have strong artistic abilities and enjoy expressing yourself through various mediums.",
                strengths: ["Creativity", "Innovation", "Visual thinking", "Artistic skills"],
                careers: ["Graphic Designer", "Content Creator", "Marketing Specialist", "Architect", "Fashion Designer"],
                colleges: ["NID", "NIFT", "JJ School of Art", "Srishti", "FTII"],
                exams: ["NID Entrance", "NIFT Entrance", "JEE Architecture"]
            },
            leader: {
                title: "Leader & Organizer",
                description: "You excel at managing people and projects. You have natural leadership skills and business acumen that drive teams toward success.",
                strengths: ["Leadership", "Organization", "Decision-making", "Strategic thinking"],
                careers: ["Project Manager", "Business Analyst", "Entrepreneur", "Sales Manager", "Operations Manager"],
                colleges: ["IIM", "ISB", "FMS", "XLRI", "MDI"],
                exams: ["CAT", "XAT", "GMAT", "CMAT"]
            }
        };
        
        return details[type] || {};
    }
    
    // Utility methods
    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: var(--color-surface);
            border: 1px solid var(--color-border);
            border-radius: var(--radius-lg);
            padding: var(--space-16);
            max-width: 300px;
            box-shadow: var(--shadow-lg);
            z-index: 3000;
            transform: translateX(100%);
            transition: transform var(--duration-normal) var(--ease-standard);
        `;
        
        // Add type-specific styling
        if (type === 'success') {
            notification.style.borderColor = 'var(--color-success)';
            notification.style.backgroundColor = 'var(--color-green-light)';
        } else if (type === 'warning') {
            notification.style.borderColor = 'var(--color-warning)';
            notification.style.backgroundColor = 'var(--color-yellow-light)';
        } else if (type === 'error') {
            notification.style.borderColor = 'var(--color-error)';
            notification.style.backgroundColor = 'var(--color-red-light)';
        }
        
        notification.innerHTML = `
            <div style="display: flex; align-items: center; gap: 8px;">
                <span style="font-size: 18px;">
                    ${type === 'success' ? '✅' : type === 'warning' ? '⚠️' : type === 'error' ? '❌' : 'ℹ️'}
                </span>
                <p style="margin: 0; color: var(--color-text);">${message}</p>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 5000);
    }
    
    animateOnLoad() {
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.opacity = '0';
            heroContent.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                heroContent.style.transition = 'all 1s ease-out';
                heroContent.style.opacity = '1';
                heroContent.style.transform = 'translateY(0)';
            }, 300);
        }
    }
    
    animateSection(section) {
        const elements = section.querySelectorAll('.service-card, .testimonial-card, .personality-type, .package-card');
        
        elements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                el.style.transition = 'all 0.6s ease-out';
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }
    
    addEntranceAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);
        
        const animateElements = document.querySelectorAll('.service-card, .testimonial-card');
        animateElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.8s ease-out';
            observer.observe(el);
        });
        
        // Add CSS for animation
        const style = document.createElement('style');
        style.textContent = `
            .animate-in {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
        `;
        document.head.appendChild(style);
    }
    
    handleResize() {
        // Close mobile menu on resize to larger screen
        if (window.innerWidth > 768) {
            this.closeMobileMenu();
        }
    }
    
    trackNavigation(section) {
        console.log(`Navigated to: ${section}`);
        // Here you would typically send analytics data
    }
    
    // Additional utility methods
    downloadResults() {
        if (!this.assessmentData.results) {
            this.showNotification('Please complete the assessment first.', 'warning');
            return;
        }
        
        const results = this.assessmentData.results;
        const personalityDetails = this.getPersonalityDetails(results.primaryType);
        
        const reportContent = `
CAREER SARTHI - ASSESSMENT RESULTS
================================

Your Primary Personality Type: ${personalityDetails.title}
Match Percentage: ${results.percentage}%

Description:
${personalityDetails.description}

Key Strengths:
${personalityDetails.strengths?.map(s => `• ${s}`).join('\n') || ''}

Recommended Careers:
${personalityDetails.careers?.map(c => `• ${c}`).join('\n') || ''}

Top Colleges:
${personalityDetails.colleges?.join(', ') || ''}

Entrance Exams:
${personalityDetails.exams?.join(', ') || ''}

Next Steps:
1. Book a counseling session for detailed guidance
2. Research the recommended careers and colleges
3. Start preparing for relevant entrance exams
4. Develop the key skills mentioned above

Contact Career Sarthi:
Phone: 6200989340
Address: Career Sarthi Consultant, Bhootnath Road, Patna

Generated on: ${new Date().toLocaleDateString()}
        `;
        
        const blob = new Blob([reportContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Career_Sarthi_Assessment_Results.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        this.showNotification('Results downloaded successfully!', 'success');
    }
    
    openMaps() {
        const address = "Career Sarthi Consultant, Bhootnath Road, Patna";
        const encodedAddress = encodeURIComponent(address);
        const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
        window.open(mapsUrl, '_blank');
    }
}

// Global functions for HTML onclick events
function navigateToSection(sectionId) {
    if (window.careerSarthi) {
        window.careerSarthi.navigateToSection(sectionId);
    }
}

function startAssessment() {
    if (window.careerSarthi) {
        window.careerSarthi.startAssessment();
    }
}

function startFullAssessment() {
    if (window.careerSarthi) {
        window.careerSarthi.startFullAssessment();
    }
}

function selectPackage(packageType) {
    if (window.careerSarthi) {
        window.careerSarthi.selectPackage(packageType);
    }
}

function hideBookingForm() {
    if (window.careerSarthi) {
        window.careerSarthi.hideBookingForm();
    }
}

function showPersonalityDetails(type) {
    if (window.careerSarthi) {
        window.careerSarthi.showPersonalityDetails(type);
    }
}

function downloadResults() {
    if (window.careerSarthi) {
        window.careerSarthi.downloadResults();
    }
}

function closeModal(modalId) {
    if (window.careerSarthi) {
        window.careerSarthi.closeModal(modalId);
    }
}

function openMaps() {
    if (window.careerSarthi) {
        window.careerSarthi.openMaps();
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.careerSarthi = new CareerSarthi();
});
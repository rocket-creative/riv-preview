/**
 * Unified Contact Form Handler
 * Riviera Waterfront Mansion
 * Handles form submission and validation across all pages
 */

// Form validation helper
function validateForm(form) {
    let valid = true;
    // Remove existing error messages
    form.querySelectorAll('.error-message').forEach(e => e.remove());
    form.querySelectorAll('.error').forEach(e => e.classList.remove('error'));
    
    // Validate required fields
    form.querySelectorAll('[required]').forEach(field => {
        if (!field.value.trim()) {
            showError(field, 'This field is required');
            valid = false;
        } else if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)) {
            showError(field, 'Please enter a valid email address');
            valid = false;
        } else if (field.type === 'tel' && !/^[\d\s\-\(\)\+]{10,}$/.test(field.value)) {
            showError(field, 'Please enter a valid phone number');
            valid = false;
        }
    });
    
    return valid;
}

// Show error message for a field
function showError(field, message) {
    field.classList.add('error');
    const error = document.createElement('span');
    error.className = 'error-message';
    error.textContent = message;
    error.style.cssText = 'color: #C62828; font-size: 0.75rem; display: block; margin-top: 0.25rem;';
    field.parentNode.appendChild(error);
}

// Unified contact form submission handler
function submitUnifiedContactForm(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn ? submitBtn.innerHTML : 'Send Message';
    
    // Validate form
    if (!validateForm(form)) {
        return;
    }
    
    // Show loading state
    if (submitBtn) {
        submitBtn.innerHTML = '<span class="spinner" style="display:inline-block;width:16px;height:16px;border:2px solid #fff;border-top-color:transparent;border-radius:50%;animation:spin 1s linear infinite;margin-right:8px;"></span>Sending...';
        submitBtn.disabled = true;
    }
    
    // Collect form data
    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });
    
    // Simulate form submission (replace with actual API endpoint in production)
    // In production, you would send this to your backend or a service like Formspree, Netlify Forms, etc.
    setTimeout(() => {
        // Show success message
        const formWrapper = form.closest('.contact-form-wrapper') || form.parentNode;
        formWrapper.innerHTML = `
            <div class="form-success" style="text-align: center; padding: 2rem;">
                <div class="form-success-icon" style="margin-bottom: 1rem;">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#2E7D32" stroke-width="2">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                        <polyline points="22 4 12 14.01 9 11.01"/>
                    </svg>
                </div>
                <h3 style="font-family: 'Cormorant Garamond', Georgia, serif; font-size: 1.75rem; margin-bottom: 0.5rem; color: #2C2C2C;">Thank You!</h3>
                <p style="color: #4A4A4A; font-size: 1rem;">We've received your message and will contact you within 24 hours.</p>
            </div>
        `;
        
        // Scroll to success message
        formWrapper.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 1500);
}

// Add spinner animation if not already present
if (!document.getElementById('spinner-styles')) {
    const style = document.createElement('style');
    style.id = 'spinner-styles';
    style.textContent = `
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
        .spinner {
            display: inline-block;
            width: 16px;
            height: 16px;
            border: 2px solid #fff;
            border-top-color: transparent;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin-right: 8px;
            vertical-align: middle;
        }
    `;
    document.head.appendChild(style);
}

// Export functions for use in other scripts
if (typeof window !== 'undefined') {
    window.submitUnifiedContactForm = submitUnifiedContactForm;
    window.validateForm = validateForm;
    window.showError = showError;
}


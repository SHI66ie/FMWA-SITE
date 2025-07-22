// Cookie Consent Banner
function createCookieBanner() {
    // Check if consent was already given
    if (document.cookie.includes('cookie_consent=accepted')) {
        return;
    }

    // Create banner
    const banner = document.createElement('div');
    banner.id = 'cookie-consent-banner';
    banner.style.cssText = `
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0, 0, 0, 0.9);
        color: #fff;
        padding: 15px 20px;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
        z-index: 9999;
        box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.2);
    `;

    // Add message
    const message = document.createElement('div');
    message.style.flex = '1';
    message.style.minWidth = '250px';
    message.style.marginRight = '20px';
    message.style.marginBottom = '10px';
    message.textContent = 'We use YouTube to display video content. By accepting, you consent to the use of cookies and similar technologies from YouTube.';
    
    // Add buttons container
    const buttons = document.createElement('div');
    buttons.style.display = 'flex';
    buttons.style.gap = '10px';

    // Add Accept button
    const acceptBtn = document.createElement('button');
    acceptBtn.textContent = 'Accept';
    acceptBtn.style.padding = '8px 20px';
    acceptBtn.style.background = '#4CAF50';
    acceptBtn.style.color = 'white';
    acceptBtn.style.border = 'none';
    acceptBtn.style.borderRadius = '4px';
    acceptBtn.style.cursor = 'pointer';
    acceptBtn.onclick = function() {
        // Set cookie for 1 year
        const date = new Date();
        date.setFullYear(date.getFullYear() + 1);
        document.cookie = `cookie_consent=accepted; expires=${date.toUTCString()}; path=/; SameSite=Lax`;
        banner.style.display = 'none';
        
        // Dispatch event that consent was given
        const event = new CustomEvent('cookieConsentChanged', {
            detail: { consentGiven: true }
        });
        document.dispatchEvent(event);
        
        // Show success message
        const message = document.createElement('div');
        message.textContent = 'Cookie preferences saved. You can now view video content.';
        message.style.position = 'fixed';
        message.style.bottom = '20px';
        message.style.left = '50%';
        message.style.transform = 'translateX(-50%)';
        message.style.backgroundColor = '#4CAF50';
        message.style.color = 'white';
        message.style.padding = '10px 20px';
        message.style.borderRadius = '4px';
        message.style.zIndex = '10000';
        message.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
        message.style.animation = 'fadeInUp 0.5s ease-out';
        
        document.body.appendChild(message);
        
        // Remove message after 5 seconds
        setTimeout(() => {
            message.style.animation = 'fadeOutDown 0.5s ease-out';
            setTimeout(() => {
                message.remove();
            }, 500);
        }, 5000);
        
        // Add CSS for animations
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeInUp {
                from { opacity: 0; transform: translate(-50%, 20px); }
                to { opacity: 1; transform: translate(-50%, 0); }
            }
            @keyframes fadeOutDown {
                from { opacity: 1; transform: translate(-50%, 0); }
                to { opacity: 0; transform: translate(-50%, 20px); }
            }
        `;
        document.head.appendChild(style);
        
        // Reload YouTube iframes
        document.querySelectorAll('.youtube-video').forEach(iframe => {
            const src = iframe.src;
            iframe.src = '';
            setTimeout(() => { iframe.src = src; }, 100);
        });
    };

    // Add Reject button
    const rejectBtn = document.createElement('button');
    rejectBtn.textContent = 'Reject';
    rejectBtn.style.padding = '8px 20px';
    rejectBtn.style.background = 'transparent';
    rejectBtn.style.border = '1px solid #fff';
    rejectBtn.style.color = '#fff';
    rejectBtn.style.borderRadius = '4px';
    rejectBtn.style.cursor = 'pointer';
    rejectBtn.onclick = function() {
        banner.style.display = 'none';
        
        // Mark placeholders as blocked
        document.querySelectorAll('.video-placeholder').forEach(placeholder => {
            placeholder.setAttribute('data-blocked', 'true');
        });
        
        // Show message that videos are disabled
        const message = document.createElement('div');
        message.textContent = 'YouTube videos are disabled. You can enable them in the cookie settings.';
        message.style.position = 'fixed';
        message.style.bottom = '20px';
        message.style.left = '50%';
        message.style.transform = 'translateX(-50%)';
        message.style.backgroundColor = '#f44336';
        message.style.color = 'white';
        message.style.padding = '10px 20px';
        message.style.borderRadius = '4px';
        message.style.zIndex = '10000';
        message.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
        message.style.animation = 'fadeInUp 0.5s ease-out';
        
        document.body.appendChild(message);
        
        // Add CSS for animations if not already added
        if (!document.querySelector('style[data-cookie-animations]')) {
            const style = document.createElement('style');
            style.setAttribute('data-cookie-animations', 'true');
            style.textContent = `
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translate(-50%, 20px); }
                    to { opacity: 1; transform: translate(-50%, 0); }
                }
                @keyframes fadeOutDown {
                    from { opacity: 1; transform: translate(-50%, 0); }
                    to { opacity: 0; transform: translate(-50%, 20px); }
                }
            `;
            document.head.appendChild(style);
        }
        
        // Remove message after 5 seconds
        setTimeout(() => {
            message.style.animation = 'fadeOutDown 0.5s ease-out';
            setTimeout(() => {
                message.remove();
            }, 500);
        }, 5000);
        
        // Dispatch event that consent was declined
        const event = new CustomEvent('cookieConsentChanged', {
            detail: { consentGiven: false }
        });
        document.dispatchEvent(event);
    };

    // Assemble the banner
    buttons.appendChild(acceptBtn);
    buttons.appendChild(rejectBtn);
    banner.appendChild(message);
    banner.appendChild(buttons);
    
    // Add to body
    document.body.appendChild(banner);
}

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createCookieBanner);
} else {
    createCookieBanner();
}

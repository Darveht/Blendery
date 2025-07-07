
// Screen Management
function showWelcomeScreen() {
    hideAllScreens();
    document.getElementById('welcomeScreen').classList.add('active');
}

function showLoginScreen() {
    hideAllScreens();
    document.getElementById('loginScreen').classList.add('active');
}

function showRegisterScreen() {
    hideAllScreens();
    document.getElementById('registerScreen').classList.add('active');
}

function showForgotPasswordScreen() {
    hideAllScreens();
    document.getElementById('forgotPasswordScreen').classList.add('active');
}

function showVerificationScreen() {
    hideAllScreens();
    document.getElementById('verificationScreen').classList.add('active');
    
    // Set the email in verification screen
    const email = document.getElementById('recoveryEmail').value || 'tu@email.com';
    document.getElementById('sentEmail').textContent = email;
}

function showResetPasswordScreen() {
    hideAllScreens();
    document.getElementById('resetPasswordScreen').classList.add('active');
}

function showSuccessScreen() {
    hideAllScreens();
    document.getElementById('successScreen').classList.add('active');
}

function showProfilePhotoScreen() {
    hideAllScreens();
    document.getElementById('profilePhotoScreen').classList.add('active');
}

function showUsernameScreen() {
    hideAllScreens();
    document.getElementById('usernameScreen').classList.add('active');
}

function showMainScreen() {
    hideAllScreens();
    document.getElementById('mainScreen').classList.add('active');
}

function hideAllScreens() {
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => screen.classList.remove('active'));
}

// Photo Upload
document.getElementById('photoPreview').addEventListener('click', function() {
    document.getElementById('photoInput').click();
});

document.getElementById('photoInput').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const preview = document.getElementById('photoPreview');
            preview.style.backgroundImage = `url(${e.target.result})`;
            preview.style.backgroundSize = 'cover';
            preview.style.backgroundPosition = 'center';
            preview.innerHTML = '';
            preview.style.border = '3px solid #4ecdc4';
        };
        reader.readAsDataURL(file);
    }
});

// Username functionality
function setUsername(username) {
    document.getElementById('username').value = username;
    checkUsername();
}

function checkUsername() {
    const usernameInput = document.getElementById('username');
    const checkIcon = document.getElementById('usernameCheck');
    
    if (usernameInput.value.length > 3) {
        checkIcon.style.display = 'block';
        checkIcon.style.color = '#4ecdc4';
    } else {
        checkIcon.style.display = 'none';
    }
}

document.getElementById('username').addEventListener('input', checkUsername);

// Loading functions
function showLoadingSpinner(text = 'Cargando...') {
    const spinner = document.getElementById('loadingSpinner');
    const loadingText = spinner.querySelector('.loading-text');
    loadingText.textContent = text;
    spinner.classList.add('show');
}

function hideLoadingSpinner() {
    const spinner = document.getElementById('loadingSpinner');
    spinner.classList.remove('show');
}

// Modified screen transitions with loading
function showMainScreen() {
    showLoadingSpinner('Iniciando Blendery...');
    setTimeout(() => {
        hideAllScreens();
        document.getElementById('mainScreen').classList.add('active');
        hideLoadingSpinner();
    }, 4000);
}

function showProfilePhotoScreen() {
    showLoadingSpinner('Preparando tu perfil...');
    setTimeout(() => {
        hideAllScreens();
        document.getElementById('profilePhotoScreen').classList.add('active');
        hideLoadingSpinner();
    }, 3000);
}

function showUsernameScreen() {
    showLoadingSpinner('Casi listo...');
    setTimeout(() => {
        hideAllScreens();
        document.getElementById('usernameScreen').classList.add('active');
        hideLoadingSpinner();
    }, 2500);
}

function showVerificationScreen() {
    showLoadingSpinner('Enviando código...');
    setTimeout(() => {
        hideAllScreens();
        document.getElementById('verificationScreen').classList.add('active');
        
        // Set the email in verification screen
        const email = document.getElementById('recoveryEmail').value || 'tu@email.com';
        document.getElementById('sentEmail').textContent = email;
        hideLoadingSpinner();
    }, 3000);
}

function showResetPasswordScreen() {
    showLoadingSpinner('Verificando código...');
    setTimeout(() => {
        hideAllScreens();
        document.getElementById('resetPasswordScreen').classList.add('active');
        hideLoadingSpinner();
    }, 2000);
}

function showSuccessScreen() {
    showLoadingSpinner('Actualizando contraseña...');
    setTimeout(() => {
        hideAllScreens();
        document.getElementById('successScreen').classList.add('active');
        hideLoadingSpinner();
    }, 3000);
}

// Tab Navigation
function switchTab(tabName) {
    // Remove active class from all nav items
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => item.classList.remove('active'));
    
    // Remove active class from all tab contents
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => content.classList.remove('active'));
    
    // Add active class to clicked nav item
    event.currentTarget.classList.add('active');
    
    // Show corresponding tab content
    const contentMap = {
        'home': 'homeContent',
        'search': 'searchContent',
        'moments': 'momentsContent',
        'settings': 'settingsContent'
    };
    
    document.getElementById(contentMap[tabName]).classList.add('active');
}

// Password Recovery Functions
function resendCode() {
    // Simulate resending code
    alert('Código reenviado a tu email');
}

function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const icon = input.parentElement.querySelector('.password-toggle');
    
    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        input.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}

// Code Input Management
function setupCodeInputs() {
    const codeInputs = document.querySelectorAll('.code-input');
    
    codeInputs.forEach((input, index) => {
        input.addEventListener('input', function() {
            if (this.value.length === 1 && index < codeInputs.length - 1) {
                codeInputs[index + 1].focus();
            }
        });
        
        input.addEventListener('keydown', function(e) {
            if (e.key === 'Backspace' && this.value === '' && index > 0) {
                codeInputs[index - 1].focus();
            }
        });
    });
}

// Password Requirements Validation
function validatePassword() {
    const password = document.getElementById('newPassword').value;
    const requirements = {
        'req-length': password.length >= 8,
        'req-uppercase': /[A-Z]/.test(password),
        'req-number': /\d/.test(password)
    };
    
    Object.keys(requirements).forEach(reqId => {
        const element = document.getElementById(reqId);
        if (requirements[reqId]) {
            element.classList.add('valid');
        } else {
            element.classList.remove('valid');
        }
    });
}

// Search functionality
function setupSearchFunctionality() {
    const searchInput = document.getElementById('searchInput');
    const searchClear = document.getElementById('searchClear');
    const filterTabs = document.querySelectorAll('.filter-tab');
    
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            if (this.value.length > 0) {
                searchClear.classList.add('show');
            } else {
                searchClear.classList.remove('show');
            }
            performSearch(this.value);
        });
    }
    
    if (searchClear) {
        searchClear.addEventListener('click', function() {
            searchInput.value = '';
            this.classList.remove('show');
            clearSearchResults();
        });
    }
    
    filterTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            filterTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            const filter = this.getAttribute('data-filter');
            filterSearchResults(filter);
        });
    });
}

function performSearch(query) {
    console.log('Searching for:', query);
    // Aquí iría la lógica de búsqueda real
}

function clearSearchResults() {
    console.log('Clearing search results');
    // Aquí iría la lógica para limpiar resultados
}

function filterSearchResults(filter) {
    console.log('Filtering by:', filter);
    // Aquí iría la lógica de filtrado
}

function followUser(element) {
    const btn = element;
    if (btn.classList.contains('following')) {
        btn.textContent = 'Seguir';
        btn.classList.remove('following');
    } else {
        btn.textContent = 'Siguiendo';
        btn.classList.add('following');
    }
}

function viewHashtag(hashtag) {
    console.log('Viewing hashtag:', hashtag);
    // Aquí iría la lógica para ver el hashtag
}

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    // Start with welcome screen
    showWelcomeScreen();
    
    // Setup code inputs for verification
    setupCodeInputs();
    
    // Setup search functionality
    setupSearchFunctionality();
    
    // Setup password validation
    const newPasswordInput = document.getElementById('newPassword');
    if (newPasswordInput) {
        newPasswordInput.addEventListener('input', validatePassword);
    }
    
    // Setup character counter for text posts
    const textPostInput = document.getElementById('textPostDescription');
    if (textPostInput) {
        textPostInput.addEventListener('input', function() {
            const charCount = this.value.length;
            const charCountElement = document.getElementById('charCount');
            charCountElement.textContent = charCount;
            
            if (charCount < 200) {
                charCountElement.parentElement.classList.add('warning');
            } else {
                charCountElement.parentElement.classList.remove('warning');
            }
        });
    }
    
    // Add input focus animations
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.02)';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'scale(1)';
        });
    });
    
    // Add button click animations
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
});

// Post interactions
function likePost(element) {
    const heartIcon = element.querySelector('i');
    const countSpan = element.querySelector('span');
    let count = parseInt(countSpan.textContent) || 0;
    
    if (element.classList.contains('liked')) {
        element.classList.remove('liked');
        heartIcon.classList.remove('fas');
        heartIcon.classList.add('far');
        count--;
    } else {
        element.classList.add('liked');
        heartIcon.classList.remove('far');
        heartIcon.classList.add('fas');
        count++;
    }
    
    countSpan.textContent = count;
}

function sharePost(element) {
    // Simular compartir
    if (navigator.share) {
        navigator.share({
            title: 'Publicación de Blendery',
            text: 'Mira esta publicación en Blendery',
            url: window.location.href
        });
    } else {
        // Fallback para navegadores que no soportan Web Share API
        alert('¡Publicación compartida!');
    }
}

// Story functionality
function viewStory(username) {
    alert(`Viendo historia de ${username}`);
}

// Create post functionality
function showCreatePostScreen() {
    hideAllScreens();
    document.getElementById('createPostScreen').classList.add('active');
    
    // Reset form
    document.getElementById('textPostDescription').value = '';
    document.getElementById('charCount').textContent = '0';
    document.getElementById('textLocationText').textContent = 'Agregar ubicación';
}

function publishTextPost() {
    const description = document.getElementById('textPostDescription').value;
    
    if (description.length < 200) {
        alert('La descripción debe tener al menos 200 caracteres.');
        return;
    }
    
    showLoadingSpinner('Publicando...');
    
    setTimeout(() => {
        hideLoadingSpinner();
        showMainScreen();
        
        // Agregar la nueva publicación al feed
        addTextPostToFeed(description);
        
        // Limpiar formulario
        document.getElementById('textPostDescription').value = '';
        document.getElementById('charCount').textContent = '0';
    }, 2000);
}

function addTextPostToFeed(description) {
    const postSection = document.querySelector('.post-section');
    const newPost = document.createElement('div');
    newPost.className = 'post';
    newPost.innerHTML = `
        <div class="post-header">
            <div class="user-info">
                <div class="user-avatar" style="background: linear-gradient(45deg, #667eea, #764ba2);"></div>
                <div class="user-details">
                    <h4>Tú</h4>
                    <span>Ahora</span>
                </div>
            </div>
            <i class="fas fa-ellipsis-h"></i>
        </div>
        <div class="post-content">
            <p>${description}</p>
        </div>
        <div class="post-actions">
            <button onclick="likePost(this)"><i class="far fa-heart"></i> <span>0</span></button>
            <button onclick="sharePost(this)"><i class="fas fa-share"></i> <span>0</span></button>
        </div>
    `;
    
    // Insertar después del create-post
    const createPost = document.querySelector('.create-post');
    createPost.parentNode.insertBefore(newPost, createPost.nextSibling);
}

function addHashtagsToText() {
    const textarea = document.getElementById('textPostDescription');
    const currentText = textarea.value;
    
    if (!currentText.includes('#')) {
        textarea.value = currentText + ' #';
        textarea.focus();
        textarea.setSelectionRange(textarea.value.length, textarea.value.length);
    }
}

function addLocationToText() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function(position) {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                document.getElementById('textLocationText').textContent = `${lat.toFixed(4)}, ${lon.toFixed(4)}`;
            },
            function(error) {
                console.error('Error getting location:', error);
                document.getElementById('textLocationText').textContent = 'Ubicación no disponible';
            }
        );
    }
}

// Settings functionality
function openSetting(settingName) {
    alert(`Abriendo configuración: ${settingName}`);
}

// Camera functionality
let currentStream = null;
let currentFilter = 'none';
let flashEnabled = false;
let facingMode = 'environment'; // 'user' for front camera, 'environment' for back camera
let currentDraft = null;

function openCamera() {
    hideAllScreens();
    document.getElementById('cameraScreen').classList.add('active');
    startCamera();
}

function closeCameraScreen() {
    stopCamera();
    showMainScreen();
}

async function startCamera() {
    try {
        if (currentStream) {
            stopCamera();
        }

        const constraints = {
            video: {
                facingMode: facingMode,
                width: { ideal: 1920 },
                height: { ideal: 1080 }
            },
            audio: false
        };

        currentStream = await navigator.mediaDevices.getUserMedia(constraints);
        const video = document.getElementById('cameraVideo');
        video.srcObject = currentStream;
    } catch (error) {
        console.error('Error accessing camera:', error);
        alert('No se pudo acceder a la cámara');
    }
}

function stopCamera() {
    if (currentStream) {
        currentStream.getTracks().forEach(track => track.stop());
        currentStream = null;
    }
}

function flipCamera() {
    facingMode = facingMode === 'user' ? 'environment' : 'user';
    startCamera();
    
    // Enable flash when switching to back camera
    if (facingMode === 'environment') {
        document.getElementById('flashButton').style.display = 'flex';
    } else {
        document.getElementById('flashButton').style.display = 'none';
        flashEnabled = false;
        document.getElementById('flashButton').classList.remove('active');
    }
}

function toggleFlash() {
    if (facingMode === 'environment') {
        flashEnabled = !flashEnabled;
        const flashButton = document.getElementById('flashButton');
        
        if (flashEnabled) {
            flashButton.classList.add('active');
        } else {
            flashButton.classList.remove('active');
        }
    }
}

function openFilters() {
    document.getElementById('filtersPanel').classList.add('active');
}

function closeFilters() {
    document.getElementById('filtersPanel').classList.remove('active');
}

function applyFilter(filter) {
    currentFilter = filter;
    const video = document.getElementById('cameraVideo');
    
    // Remove all filter classes
    video.classList.remove('sepia', 'grayscale', 'vintage', 'bright', 'contrast');
    
    // Apply new filter
    if (filter !== 'none') {
        video.classList.add(filter);
    }
    
    // Update filter selection
    document.querySelectorAll('.filter-item').forEach(item => {
        item.classList.remove('active');
    });
    document.querySelector(`[data-filter="${filter}"]`).classList.add('active');
}

function capturePhoto() {
    const video = document.getElementById('cameraVideo');
    const canvas = document.getElementById('cameraCanvas');
    const context = canvas.getContext('2d');
    
    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    // Draw video frame to canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    // Apply filter to canvas if needed
    if (currentFilter !== 'none') {
        context.filter = getCanvasFilter(currentFilter);
        context.drawImage(canvas, 0, 0);
        context.filter = 'none';
    }
    
    // Flash effect
    if (flashEnabled) {
        showFlashEffect();
    }
    
    // Convert to data URL
    const imageDataUrl = canvas.toDataURL('image/jpeg', 0.9);
    
    // Stop camera and go to post creation
    stopCamera();
    showPostCreationScreen(imageDataUrl);
}

function getCanvasFilter(filter) {
    switch (filter) {
        case 'sepia': return 'sepia(100%)';
        case 'grayscale': return 'grayscale(100%)';
        case 'vintage': return 'sepia(50%) contrast(1.2) brightness(0.8)';
        case 'bright': return 'brightness(1.3)';
        case 'contrast': return 'contrast(1.5)';
        default: return 'none';
    }
}

function showFlashEffect() {
    const flash = document.createElement('div');
    flash.style.position = 'fixed';
    flash.style.top = '0';
    flash.style.left = '0';
    flash.style.width = '100%';
    flash.style.height = '100%';
    flash.style.background = '#ffffff';
    flash.style.zIndex = '9999';
    flash.style.opacity = '0.8';
    flash.style.transition = 'opacity 0.1s ease';
    
    document.body.appendChild(flash);
    
    setTimeout(() => {
        flash.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(flash);
        }, 100);
    }, 50);
}

function showPostCreationScreen(imageDataUrl) {
    hideAllScreens();
    document.getElementById('postCreationScreen').classList.add('active');
    document.getElementById('capturedImage').src = imageDataUrl;
    
    // Get user location
    getCurrentLocation();
}

function getCurrentLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function(position) {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                
                // Simulate getting location name (in real app, use reverse geocoding)
                document.getElementById('locationText').textContent = `${lat.toFixed(4)}, ${lon.toFixed(4)}`;
            },
            function(error) {
                console.error('Error getting location:', error);
            }
        );
    }
}

function addHashtags() {
    const description = document.getElementById('postDescription');
    const currentText = description.value;
    
    if (!currentText.includes('#')) {
        description.value = currentText + ' #';
        description.focus();
        description.setSelectionRange(description.value.length, description.value.length);
    }
}

function addMusic() {
    alert('Función de música próximamente...');
}

function addLocation() {
    getCurrentLocation();
}

function publishPost() {
    showLoadingSpinner('Publicando...');
    
    setTimeout(() => {
        hideLoadingSpinner();
        showMainScreen();
        
        // Add the new post to the feed (simulate)
        addNewPostToFeed();
        
        // Clear post creation form
        document.getElementById('postDescription').value = '';
        document.getElementById('capturedImage').src = '';
    }, 3000);
}

function addNewPostToFeed() {
    const postSection = document.querySelector('.post-section');
    const newPost = document.createElement('div');
    newPost.className = 'post';
    newPost.innerHTML = `
        <div class="post-header">
            <div class="user-info">
                <div class="user-avatar" style="background: linear-gradient(45deg, #667eea, #764ba2);"></div>
                <div class="user-details">
                    <h4>Tú</h4>
                    <span>Ahora</span>
                </div>
            </div>
            <i class="fas fa-ellipsis-h"></i>
        </div>
        <div class="post-content">
            <p>${document.getElementById('postDescription').value || '¡Nueva foto!'}</p>
            <img src="${document.getElementById('capturedImage').src}" style="width: 100%; border-radius: 12px; margin-bottom: 16px;">
        </div>
        <div class="post-actions">
            <button onclick="likePost(this)"><i class="far fa-heart"></i> <span>0</span></button>
            <button onclick="sharePost(this)"><i class="fas fa-share"></i> <span>0</span></button>
        </div>
    `;
    
    // Insert after create-post section
    const createPost = document.querySelector('.create-post');
    createPost.parentNode.insertBefore(newPost, createPost.nextSibling);
}

function saveToDrafts() {
    const imageData = document.getElementById('capturedImage').src;
    const description = document.getElementById('postDescription').value;
    const timestamp = new Date().toLocaleString();
    
    const draft = {
        id: Date.now(),
        image: imageData,
        description: description,
        timestamp: timestamp
    };
    
    // Save to localStorage
    let drafts = JSON.parse(localStorage.getItem('blendery_drafts') || '[]');
    drafts.unshift(draft);
    localStorage.setItem('blendery_drafts', JSON.stringify(drafts));
    
    showDraftsScreen();
}

function showDraftsScreen() {
    hideAllScreens();
    document.getElementById('draftsScreen').classList.add('active');
    loadDrafts();
}

function loadDrafts() {
    const draftsContent = document.getElementById('draftsContent');
    const drafts = JSON.parse(localStorage.getItem('blendery_drafts') || '[]');
    
    if (drafts.length === 0) {
        draftsContent.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-draft2digital"></i>
                <h3>Sin borradores</h3>
                <p>Tus publicaciones guardadas aparecerán aquí</p>
            </div>
        `;
    } else {
        draftsContent.innerHTML = '';
        drafts.forEach(draft => {
            const draftElement = document.createElement('div');
            draftElement.className = 'draft-item';
            draftElement.onclick = () => editDraft(draft);
            draftElement.innerHTML = `
                <img src="${draft.image}" class="draft-preview" alt="Draft preview">
                <div class="draft-info">
                    <h4>${draft.description || 'Sin descripción'}</h4>
                    <span>${draft.timestamp}</span>
                </div>
            `;
            draftsContent.appendChild(draftElement);
        });
    }
}

function editDraft(draft) {
    currentDraft = draft;
    hideAllScreens();
    document.getElementById('postCreationScreen').classList.add('active');
    document.getElementById('capturedImage').src = draft.image;
    document.getElementById('postDescription').value = draft.description;
}

// Update filter item click handlers
document.addEventListener('DOMContentLoaded', function() {
    // Existing initialization...
    
    // Add filter click handlers
    document.querySelectorAll('.filter-item').forEach(item => {
        item.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            applyFilter(filter);
        });
    });
});

// Search functionality
function openSearch() {
    alert('Función de búsqueda próximamente...');
}

// Notifications
function openNotifications() {
    alert('Notificaciones próximamente...');
}

// Messages
function openMessages() {
    alert('Mensajes próximamente...');
}

// Add smooth scrolling for story section
document.addEventListener('DOMContentLoaded', function() {
    const storySection = document.querySelector('.story-section');
    if (storySection) {
        storySection.style.scrollBehavior = 'smooth';
    }
});

// Add pull-to-refresh functionality (basic simulation)
let startY = 0;
let pullToRefresh = false;

document.addEventListener('touchstart', function(e) {
    startY = e.touches[0].pageY;
});

document.addEventListener('touchmove', function(e) {
    const currentY = e.touches[0].pageY;
    const mainContent = document.querySelector('.main-content');
    
    if (mainContent && mainContent.scrollTop === 0 && currentY > startY + 50) {
        pullToRefresh = true;
        // Add visual feedback here
    }
});

document.addEventListener('touchend', function() {
    if (pullToRefresh) {
        // Simulate refresh
        setTimeout(() => {
            pullToRefresh = false;
            // Reset visual feedback
        }, 1000);
    }
});

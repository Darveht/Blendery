
// Intro Screen Functions
function showIntroScreen() {
    const introScreen = document.getElementById('introScreen');
    introScreen.classList.add('active');
    
    // Start the intro sequence
    setTimeout(() => {
        completeIntroAnimation();
    }, 4000); // 4 seconds total intro duration
}

function completeIntroAnimation() {
    const introScreen = document.getElementById('introScreen');
    
    // Add completion animation
    introScreen.classList.add('completing');
    
    // After expansion animation completes, hide intro and show welcome
    setTimeout(() => {
        introScreen.classList.add('hide');
        setTimeout(() => {
            introScreen.style.display = 'none';
            showWelcomeScreen();
        }, 800);
    }, 500);
}


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
    // Start with intro screen
    showIntroScreen();
    
    // Setup code inputs for verification
    setupCodeInputs();
    
    // Setup search functionality
    setupSearchFunctionality();
    
    // Initialize notifications
    updateNotificationCounts();
    
    // Cargar historias guardadas
    const savedStories = localStorage.getItem('blendery_stories');
    if (savedStories) {
        stories = JSON.parse(savedStories);
    }
    
    // Limpiar historias expiradas
    cleanExpiredStories();
    
    // Actualizar vista de historias
    setTimeout(() => {
        updateStoriesView();
    }, 1000);
    
    // Start simulating real-time notifications after app loads
    setTimeout(() => {
        simulateRealTimeNotifications();
    }, 5000);
    
    // Prevenir que el panel de filtros interfiera con el scroll
    const cameraScreen = document.getElementById('cameraScreen');
    if (cameraScreen) {
        cameraScreen.addEventListener('touchmove', function(e) {
            const filtersPanel = document.getElementById('filtersPanel');
            if (!filtersPanel.classList.contains('active')) {
                // Solo permitir scroll vertical normal si no hay panel activo
                e.stopPropagation();
            }
        });
    }
    
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

// Variables para múltiples fotos
let capturedImages = [];
let maxImages = 3;
let minImages = 3;

// Variables para historias
let currentStoryMode = false; // false = publicación, true = historia
let stories = [
    {
        id: 1,
        username: 'Tú',
        userAvatar: 'linear-gradient(45deg, #FE2C55, #FF7A96)',
        images: [],
        timestamp: Date.now(),
        views: []
    }
];
let currentStoryIndex = 0;
let currentImageIndex = 0;

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

// Navegación de imágenes en posts
function navigateImages(direction, postElement) {
    const container = postElement.querySelector('.images-container');
    const images = postElement.querySelectorAll('.post-image');
    const indicators = postElement.querySelectorAll('.indicator');
    
    let currentIndex = parseInt(postElement.dataset.currentImage || '0');
    
    if (direction === 'next') {
        currentIndex = (currentIndex + 1) % images.length;
    } else {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
    }
    
    container.style.transform = `translateX(-${currentIndex * 100}%)`;
    postElement.dataset.currentImage = currentIndex;
    
    // Actualizar indicadores
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentIndex);
    });
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
    // Obtener ubicación si está disponible
    let locationHTML = '';
    if (currentLocationData.address) {
        locationHTML = `<div class="post-location">
            <i class="fas fa-map-marker-alt"></i>
            <span>${currentLocationData.address}</span>
        </div>`;
    }
    
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
            ${locationHTML}
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
    const locationElement = document.getElementById('textLocationText');
    
    if (navigator.geolocation) {
        locationElement.textContent = 'Obteniendo ubicación...';
        
        navigator.geolocation.getCurrentPosition(
            async function(position) {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                
                try {
                    const locationName = await reverseGeocode(lat, lon);
                    locationElement.textContent = locationName.display;
                    
                    // Guardar datos de ubicación para la publicación
                    currentLocationData = {
                        coordinates: { lat, lon },
                        address: locationName.address,
                        city: locationName.city,
                        country: locationName.country
                    };
                } catch (error) {
                    console.error('Error getting location name:', error);
                    locationElement.textContent = `📍 ${lat.toFixed(3)}, ${lon.toFixed(3)}`;
                }
            },
            function(error) {
                console.error('Error getting location:', error);
                handleLocationError(error, locationElement);
            },
            {
                enableHighAccuracy: true,
                timeout: 8000,
                maximumAge: 300000
            }
        );
    } else {
        getLocationByIP().then(() => {
            if (currentLocationData.address) {
                locationElement.textContent = `📍 ${currentLocationData.address}`;
            }
        });
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

function openCamera(isStory = false) {
    currentStoryMode = isStory;
    hideAllScreens();
    document.getElementById('cameraScreen').classList.add('active');
    // Resetear imágenes capturadas
    capturedImages = [];
    // Ocultar galería de fotos si existe
    const gallery = document.querySelector('.photo-gallery');
    if (gallery) {
        gallery.classList.remove('show');
    }
    
    // Mostrar mensaje según el tipo
    if (isStory) {
        alert('Creando una historia - Toma 1 foto que durará 24 horas');
        maxImages = 1;
        minImages = 1;
    } else {
        alert('Debes tomar exactamente 3 fotos para crear tu publicación');
        maxImages = 3;
        minImages = 3;
    }
    
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
    document.getElementById('filtersOverlay').classList.add('active');
    // Prevenir scroll del body cuando el panel esté abierto
    document.body.style.overflow = 'hidden';
}

function closeFilters() {
    document.getElementById('filtersPanel').classList.remove('active');
    document.getElementById('filtersOverlay').classList.remove('active');
    // Restaurar scroll del body
    document.body.style.overflow = '';
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
    // Deshabilitar temporalmente el botón para evitar múltiples capturas
    const captureBtn = document.querySelector('.capture-btn');
    captureBtn.style.pointerEvents = 'none';
    captureBtn.style.opacity = '0.7';
    
    // Mostrar animación de carga
    const photoLoading = document.getElementById('photoLoading');
    photoLoading.classList.add('show');
    
    const video = document.getElementById('cameraVideo');
    const canvas = document.getElementById('cameraCanvas');
    const context = canvas.getContext('2d');
    
    // Flash effect
    if (flashEnabled) {
        showFlashEffect();
    }
    
    // Simular procesamiento con delay
    setTimeout(() => {
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
        
        // Convert to data URL
        const imageDataUrl = canvas.toDataURL('image/jpeg', 0.9);
        
        // Ocultar animación de carga
        photoLoading.classList.remove('show');
        
        // Rehabilitar el botón
        captureBtn.style.pointerEvents = 'auto';
        captureBtn.style.opacity = '1';
        
        // Agregar a la colección de imágenes capturadas
        if (capturedImages.length < maxImages) {
            capturedImages.push(imageDataUrl);
            updatePhotoGallery();
            
            // Solo ir a post creation cuando tenga exactamente 3 fotos
            if (capturedImages.length === maxImages) {
                setTimeout(() => {
                    stopCamera();
                    showPostCreationScreen(capturedImages);
                }, 800);
            }
        }
    }, 600); // Delay para mostrar la animación de carga
}

function updatePhotoGallery() {
    const gallery = document.querySelector('.photo-gallery') || createPhotoGallery();
    gallery.innerHTML = '';
    
    // Agregar botón de cerrar
    const closeBtn = document.createElement('button');
    closeBtn.className = 'gallery-close';
    closeBtn.innerHTML = '<i class="fas fa-times"></i>';
    closeBtn.onclick = () => gallery.classList.remove('show');
    gallery.appendChild(closeBtn);
    
    // Agregar indicador de progreso
    const progress = document.createElement('div');
    progress.className = `photos-progress ${capturedImages.length === maxImages ? 'complete' : ''}`;
    progress.textContent = `${capturedImages.length}/${maxImages} fotos tomadas`;
    gallery.appendChild(progress);
    
    // Contenedor de fotos
    const photosContainer = document.createElement('div');
    photosContainer.className = 'gallery-photos-container';
    
    // Crear espacios para las 3 fotos
    for (let i = 0; i < maxImages; i++) {
        const photoDiv = document.createElement('div');
        photoDiv.className = 'gallery-photo';
        
        if (i < capturedImages.length) {
            // Foto tomada
            photoDiv.classList.add('selected');
            photoDiv.innerHTML = `
                <img src="${capturedImages[i]}" alt="Foto ${i + 1}">
                <div class="photo-counter">${i + 1}</div>
                <button class="remove-photo" onclick="removePhoto(${i})" title="Eliminar foto">×</button>
            `;
        } else {
            // Espacio vacío
            photoDiv.classList.add('empty');
            photoDiv.innerHTML = `<i class="fas fa-camera"></i>`;
        }
        
        photosContainer.appendChild(photoDiv);
    }
    
    gallery.appendChild(photosContainer);
    gallery.classList.add('show');
}

function createPhotoGallery() {
    const gallery = document.createElement('div');
    gallery.className = 'photo-gallery';
    document.getElementById('cameraScreen').appendChild(gallery);
    return gallery;
}

function removePhoto(index) {
    capturedImages.splice(index, 1);
    updatePhotoGallery();
    
    // Si no hay fotos, ocultar galería
    if (capturedImages.length === 0) {
        document.querySelector('.photo-gallery').classList.remove('show');
    }
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

function showPostCreationScreen(images) {
    if (currentStoryMode) {
        // Si es historia, publicar directamente
        publishStory(images[0]);
        return;
    }
    
    hideAllScreens();
    document.getElementById('postCreationScreen').classList.add('active');
    
    // Si es un array de imágenes, mostrar la primera
    if (Array.isArray(images)) {
        document.getElementById('capturedImage').src = images[0];
        // Guardar todas las imágenes para usar en publishPost
        document.getElementById('capturedImage').dataset.allImages = JSON.stringify(images);
    } else {
        // Compatibilidad con imagen única
        document.getElementById('capturedImage').src = images;
        document.getElementById('capturedImage').dataset.allImages = JSON.stringify([images]);
    }
    
    // Get user location
    getCurrentLocation();
}

// Variables globales para ubicación
let currentLocationData = {
    coordinates: null,
    address: null,
    city: null,
    country: null
};

function getCurrentLocation() {
    const locationElement = document.getElementById('locationText');
    
    if (navigator.geolocation) {
        locationElement.textContent = 'Obteniendo ubicación...';
        
        navigator.geolocation.getCurrentPosition(
            async function(position) {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                
                currentLocationData.coordinates = { lat, lon };
                
                try {
                    // Usar API gratuita de geocodificación inversa
                    const locationName = await reverseGeocode(lat, lon);
                    currentLocationData.address = locationName.address;
                    currentLocationData.city = locationName.city;
                    currentLocationData.country = locationName.country;
                    
                    locationElement.textContent = locationName.display;
                } catch (error) {
                    console.error('Error getting location name:', error);
                    locationElement.textContent = `📍 ${lat.toFixed(3)}, ${lon.toFixed(3)}`;
                }
            },
            function(error) {
                console.error('Error getting location:', error);
                handleLocationError(error, locationElement);
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 300000 // 5 minutos
            }
        );
    } else {
        locationElement.textContent = 'Geolocalización no disponible';
        // Fallback: usar IP para obtener ubicación aproximada
        getLocationByIP();
    }
}

// Geocodificación inversa usando API gratuita
async function reverseGeocode(lat, lon) {
    try {
        // Usar Nominatim (OpenStreetMap) - API gratuita
        const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=16&addressdetails=1`,
            {
                headers: {
                    'User-Agent': 'Blendery-App/1.0'
                }
            }
        );
        
        if (!response.ok) {
            throw new Error('Error en la API de geocodificación');
        }
        
        const data = await response.json();
        
        if (data && data.address) {
            const addr = data.address;
            let displayName = '';
            let city = '';
            let country = addr.country || '';
            
            // Construir nombre de ubicación legible
            if (addr.road || addr.pedestrian) {
                displayName = addr.road || addr.pedestrian;
            } else if (addr.neighbourhood) {
                displayName = addr.neighbourhood;
            } else if (addr.suburb) {
                displayName = addr.suburb;
            }
            
            if (addr.city) {
                city = addr.city;
                if (displayName) {
                    displayName += `, ${city}`;
                } else {
                    displayName = city;
                }
            } else if (addr.town) {
                city = addr.town;
                if (displayName) {
                    displayName += `, ${city}`;
                } else {
                    displayName = city;
                }
            } else if (addr.village) {
                city = addr.village;
                if (displayName) {
                    displayName += `, ${city}`;
                } else {
                    displayName = city;
                }
            }
            
            if (addr.country && displayName.indexOf(addr.country) === -1) {
                displayName += `, ${addr.country}`;
            }
            
            return {
                display: `📍 ${displayName || 'Ubicación detectada'}`,
                address: displayName,
                city: city,
                country: country,
                full: data.display_name
            };
        }
        
        return {
            display: `📍 ${lat.toFixed(3)}, ${lon.toFixed(3)}`,
            address: `${lat.toFixed(3)}, ${lon.toFixed(3)}`,
            city: '',
            country: ''
        };
        
    } catch (error) {
        console.error('Error en geocodificación:', error);
        return {
            display: `📍 ${lat.toFixed(3)}, ${lon.toFixed(3)}`,
            address: `${lat.toFixed(3)}, ${lon.toFixed(3)}`,
            city: '',
            country: ''
        };
    }
}

// Obtener ubicación por IP como fallback
async function getLocationByIP() {
    try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        
        if (data && data.city) {
            const locationText = `📍 ${data.city}, ${data.country_name}`;
            document.getElementById('locationText').textContent = locationText;
            
            currentLocationData = {
                coordinates: { lat: data.latitude, lon: data.longitude },
                address: `${data.city}, ${data.country_name}`,
                city: data.city,
                country: data.country_name
            };
        }
    } catch (error) {
        console.error('Error getting location by IP:', error);
        document.getElementById('locationText').textContent = 'Ubicación no disponible';
    }
}

function handleLocationError(error, element) {
    let message = 'Error obteniendo ubicación';
    
    switch(error.code) {
        case error.PERMISSION_DENIED:
            message = 'Permiso de ubicación denegado';
            element.textContent = message;
            // Mostrar modal para explicar cómo habilitar ubicación
            setTimeout(() => {
                showLocationPermissionHelp();
            }, 500);
            break;
        case error.POSITION_UNAVAILABLE:
            message = 'Ubicación no disponible';
            element.textContent = message;
            // Intentar fallback por IP inmediatamente
            useApproximateLocation();
            break;
        case error.TIMEOUT:
            message = 'Tiempo agotado obteniendo ubicación';
            element.textContent = message;
            // Mostrar opción de reintentar
            showLocationRetryOption(element);
            break;
    }
}

function showLocationPermissionHelp() {
    const modal = document.createElement('div');
    modal.className = 'location-help-modal';
    modal.innerHTML = `
        <div class="modal-overlay" onclick="closeLocationHelp()"></div>
        <div class="modal-content">
            <div class="modal-header">
                <h3>📍 Habilitar Ubicación</h3>
                <button onclick="closeLocationHelp()"><i class="fas fa-times"></i></button>
            </div>
            <div class="modal-body">
                <div class="help-icon">
                    <i class="fas fa-map-marker-alt"></i>
                </div>
                <div class="help-content">
                    <h4>¿Por qué necesitamos tu ubicación?</h4>
                    <p>Blendery usa tu ubicación para:</p>
                    <ul>
                        <li>📍 Mostrar donde tomaste tus fotos</li>
                        <li>🌍 Conectarte con personas cercanas</li>
                        <li>📱 Mejorar tu experiencia en la app</li>
                    </ul>
                    
                    <div class="help-steps">
                        <h4>Cómo habilitar la ubicación:</h4>
                        <div class="step-item">
                            <div class="step-number">1</div>
                            <div class="step-content">
                                <strong>En tu navegador:</strong><br>
                                Busca el ícono de candado o ubicación en la barra de direcciones
                            </div>
                        </div>
                        <div class="step-item">
                            <div class="step-number">2</div>
                            <div class="step-content">
                                <strong>Haz clic en "Permitir"</strong><br>
                                Selecciona la opción para compartir tu ubicación
                            </div>
                        </div>
                        <div class="step-item">
                            <div class="step-number">3</div>
                            <div class="step-content">
                                <strong>Recarga si es necesario</strong><br>
                                Actualiza la página para aplicar los cambios
                            </div>
                        </div>
                    </div>
                    
                    <div class="privacy-note">
                        <i class="fas fa-shield-alt"></i>
                        <span>Tu privacidad está protegida. Solo compartiremos la ubicación que elijas y puedes desactivarla en cualquier momento.</span>
                    </div>
                </div>
            </div>
            <div class="modal-actions">
                <button class="btn-primary" onclick="closeLocationHelp(); retryLocationAccess();">
                    <i class="fas fa-sync-alt"></i> Intentar de nuevo
                </button>
                <button class="btn-secondary" onclick="closeLocationHelp(); useApproximateLocation();">
                    <i class="fas fa-globe"></i> Usar ubicación aproximada
                </button>
                <button class="btn-tertiary" onclick="closeLocationHelp(); skipLocation();">
                    <i class="fas fa-times"></i> Saltar por ahora
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('show'), 10);
}

function closeLocationHelp() {
    const modal = document.querySelector('.location-help-modal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            if (document.body.contains(modal)) {
                document.body.removeChild(modal);
            }
        }, 300);
    }
}

function retryLocationAccess() {
    // Reintentar obtener ubicación con configuración más permisiva
    if (navigator.geolocation) {
        const locationElement = document.getElementById('locationText') || document.getElementById('textLocationText');
        if (locationElement) {
            locationElement.textContent = 'Reintentando ubicación...';
            getCurrentLocation();
        }
    } else {
        useApproximateLocation();
    }
}

function useApproximateLocation() {
    const locationElement = document.getElementById('locationText') || document.getElementById('textLocationText');
    if (locationElement) {
        locationElement.textContent = 'Obteniendo ubicación aproximada...';
    }
    getLocationByIP();
}

function skipLocation() {
    const locationElement = document.getElementById('locationText') || document.getElementById('textLocationText');
    if (locationElement) {
        locationElement.textContent = 'Ubicación omitida';
    }
    // Limpiar datos de ubicación
    currentLocationData = {
        coordinates: null,
        address: null,
        city: null,
        country: null
    };
}

function showLocationRetryOption(element) {
    const retryBtn = document.createElement('button');
    retryBtn.textContent = '🔄 Reintentar';
    retryBtn.className = 'location-retry-btn';
    retryBtn.onclick = () => {
        retryBtn.remove();
        getCurrentLocation();
    };
    
    retryBtn.style.cssText = `
        background: #FE2C55;
        color: white;
        border: none;
        padding: 8px 16px;
        border-radius: 16px;
        font-size: 0.8rem;
        font-weight: 600;
        cursor: pointer;
        margin-left: 12px;
        transition: all 0.2s ease;
    `;
    
    element.parentNode.appendChild(retryBtn);
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
    newPost.dataset.currentImage = '0';
    
    // Obtener todas las imágenes
    const allImagesData = document.getElementById('capturedImage').dataset.allImages;
    const images = JSON.parse(allImagesData || '[]');
    
    // Crear HTML para múltiples imágenes
    let imagesHTML = '';
    if (images.length > 1) {
        imagesHTML = `
            <div class="post-images">
                <div class="images-container">
                    ${images.map(img => `<img src="${img}" class="post-image" alt="Foto">`).join('')}
                </div>
                <button class="image-nav prev" onclick="navigateImages('prev', this.closest('.post'))">
                    <i class="fas fa-chevron-left"></i>
                </button>
                <button class="image-nav next" onclick="navigateImages('next', this.closest('.post'))">
                    <i class="fas fa-chevron-right"></i>
                </button>
                <div class="image-indicators">
                    ${images.map((_, index) => `<div class="indicator ${index === 0 ? 'active' : ''}"></div>`).join('')}
                </div>
            </div>
        `;
    } else {
        imagesHTML = `<img src="${images[0]}" class="post-image" alt="Foto">`;
    }
    
    // Obtener ubicación si está disponible
    let locationHTML = '';
    if (currentLocationData.address) {
        locationHTML = `<div class="post-location">
            <i class="fas fa-map-marker-alt"></i>
            <span>${currentLocationData.address}</span>
        </div>`;
    }
    
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
            ${imagesHTML}
            ${locationHTML}
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
    const allImagesData = document.getElementById('capturedImage').dataset.allImages;
    const description = document.getElementById('postDescription').value;
    const timestamp = new Date().toLocaleString();
    
    const draft = {
        id: Date.now(),
        image: imageData,
        allImages: allImagesData,
        description: description,
        timestamp: timestamp
    };
    
    // Save to localStorage
    let drafts = JSON.parse(localStorage.getItem('blendery_drafts') || '[]');
    drafts.unshift(draft);
    localStorage.setItem('blendery_drafts', JSON.stringify(drafts));
    
    showNotificationFeedback('Borrador guardado');
    showDraftsScreen();
}

// Variables para selección de borradores
let selectionMode = false;
let selectedDrafts = new Set();

function showDraftsScreen() {
    hideAllScreens();
    document.getElementById('draftsScreen').classList.add('active');
    loadDrafts();
    resetSelection();
}

function loadDrafts() {
    const draftsContent = document.getElementById('draftsContent');
    const draftsCount = document.getElementById('draftsCount');
    const drafts = JSON.parse(localStorage.getItem('blendery_drafts') || '[]');
    
    // Actualizar contador
    if (drafts.length > 0) {
        draftsCount.textContent = drafts.length;
        draftsCount.style.display = 'block';
    } else {
        draftsCount.style.display = 'none';
    }
    
    if (drafts.length === 0) {
        draftsContent.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-draft2digital"></i>
                <h3>Sin borradores</h3>
                <p>Tus publicaciones guardadas aparecerán aquí</p>
            </div>
        `;
    } else {
        draftsContent.innerHTML = `<div class="drafts-grid" id="draftsGrid"></div>`;
        const draftsGrid = document.getElementById('draftsGrid');
        
        drafts.forEach((draft, index) => {
            const draftElement = document.createElement('div');
            draftElement.className = 'draft-item';
            draftElement.dataset.draftId = draft.id;
            draftElement.onclick = (e) => handleDraftClick(e, draft, draftElement);
            
            // Obtener todas las imágenes si es un array
            const images = draft.allImages ? JSON.parse(draft.allImages) : [draft.image];
            const previewImage = images[0];
            
            draftElement.innerHTML = `
                <img src="${previewImage}" class="draft-preview" alt="Draft preview">
                <div class="draft-selection-checkbox" ${selectionMode ? 'style="display: flex;"' : ''}>
                    <i class="fas fa-check" style="display: none;"></i>
                </div>
                <div class="draft-info">
                    <h4>${draft.description || 'Sin descripción'}</h4>
                    <span>${draft.timestamp}</span>
                </div>
            `;
            draftsGrid.appendChild(draftElement);
        });
    }
}

function handleDraftClick(e, draft, element) {
    if (selectionMode) {
        e.stopPropagation();
        toggleDraftSelection(draft.id, element);
    } else {
        editDraft(draft);
    }
}

function toggleSelectionMode() {
    selectionMode = !selectionMode;
    const selectBtn = document.getElementById('selectModeBtn');
    const checkboxes = document.querySelectorAll('.draft-selection-checkbox');
    
    if (selectionMode) {
        selectBtn.classList.add('active');
        selectBtn.innerHTML = '<i class="fas fa-times"></i> Cancelar';
        checkboxes.forEach(checkbox => {
            checkbox.classList.add('show');
        });
    } else {
        resetSelection();
    }
}

function resetSelection() {
    selectionMode = false;
    selectedDrafts.clear();
    
    const selectBtn = document.getElementById('selectModeBtn');
    const toolbar = document.getElementById('selectionToolbar');
    const checkboxes = document.querySelectorAll('.draft-selection-checkbox');
    const draftItems = document.querySelectorAll('.draft-item');
    
    selectBtn.classList.remove('active');
    selectBtn.innerHTML = '<i class="fas fa-check-square"></i> Seleccionar';
    toolbar.classList.remove('show');
    
    checkboxes.forEach(checkbox => {
        checkbox.classList.remove('show', 'checked');
        checkbox.querySelector('i').style.display = 'none';
    });
    
    draftItems.forEach(item => {
        item.classList.remove('selected');
    });
    
    updateSelectionToolbar();
}

function toggleDraftSelection(draftId, element) {
    const checkbox = element.querySelector('.draft-selection-checkbox');
    const checkIcon = checkbox.querySelector('i');
    
    if (selectedDrafts.has(draftId)) {
        selectedDrafts.delete(draftId);
        element.classList.remove('selected');
        checkbox.classList.remove('checked');
        checkIcon.style.display = 'none';
    } else {
        selectedDrafts.add(draftId);
        element.classList.add('selected');
        checkbox.classList.add('checked');
        checkIcon.style.display = 'block';
    }
    
    updateSelectionToolbar();
}

function updateSelectionToolbar() {
    const toolbar = document.getElementById('selectionToolbar');
    const selectedCount = document.getElementById('selectedCount');
    
    selectedCount.textContent = selectedDrafts.size;
    
    if (selectedDrafts.size > 0) {
        toolbar.classList.add('show');
    } else {
        toolbar.classList.remove('show');
    }
}

function cancelSelection() {
    resetSelection();
}

function deleteSelectedDrafts() {
    if (selectedDrafts.size === 0) return;
    
    const confirmation = confirm(`¿Estás seguro de que quieres eliminar ${selectedDrafts.size} borrador${selectedDrafts.size > 1 ? 'es' : ''}?`);
    
    if (confirmation) {
        let drafts = JSON.parse(localStorage.getItem('blendery_drafts') || '[]');
        
        // Filtrar los borradores que no están seleccionados
        drafts = drafts.filter(draft => !selectedDrafts.has(draft.id));
        
        // Guardar la lista actualizada
        localStorage.setItem('blendery_drafts', JSON.stringify(drafts));
        
        // Mostrar feedback
        showNotificationFeedback(`${selectedDrafts.size} borrador${selectedDrafts.size > 1 ? 'es eliminados' : ' eliminado'}`);
        
        // Recargar la vista
        loadDrafts();
        resetSelection();
    }
}

function editDraft(draft) {
    if (selectionMode) return;
    
    currentDraft = draft;
    hideAllScreens();
    document.getElementById('postCreationScreen').classList.add('active');
    
    // Si tiene múltiples imágenes, usar la primera
    if (draft.allImages) {
        const images = JSON.parse(draft.allImages);
        document.getElementById('capturedImage').src = images[0];
        document.getElementById('capturedImage').dataset.allImages = draft.allImages;
    } else {
        document.getElementById('capturedImage').src = draft.image;
        document.getElementById('capturedImage').dataset.allImages = JSON.stringify([draft.image]);
    }
    
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
    
    // Add notification item click handlers
    document.addEventListener('click', function(e) {
        const notificationItem = e.target.closest('.notification-item');
        if (notificationItem) {
            markNotificationAsRead(notificationItem);
        }
        
        const followBtn = e.target.closest('.follow-back-btn');
        if (followBtn) {
            e.stopPropagation();
            const username = followBtn.closest('.notification-item').querySelector('strong').textContent;
            followBackUser(followBtn, username);
        }
    });
    
    // Close notifications when clicking outside
    document.addEventListener('click', function(e) {
        const panel = document.getElementById('notificationsPanel');
        const overlay = document.getElementById('notificationsOverlay');
        const notificationIcon = document.querySelector('.notification-icon');
        
        if (panel.classList.contains('active') && 
            !panel.contains(e.target) && 
            !notificationIcon.contains(e.target)) {
            closeNotifications();
        }
    });
    
    // Handle swipe down to close notifications (mobile)
    let startY = 0;
    let currentY = 0;
    
    document.getElementById('notificationsPanel').addEventListener('touchstart', function(e) {
        startY = e.touches[0].clientY;
    });
    
    document.getElementById('notificationsPanel').addEventListener('touchmove', function(e) {
        currentY = e.touches[0].clientY;
        const diff = currentY - startY;
        
        if (diff > 0 && diff < 100) {
            this.style.transform = `translateY(${diff}px)`;
        }
    });
    
    document.getElementById('notificationsPanel').addEventListener('touchend', function(e) {
        const diff = currentY - startY;
        
        if (diff > 50) {
            closeNotifications();
        } else {
            this.style.transform = 'translateY(0)';
        }
    });
});

// Search functionality
function openSearch() {
    alert('Función de búsqueda próximamente...');
}

// Notifications System
let notifications = [
    {
        id: 1,
        type: 'follows',
        user: 'María González',
        avatar: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)',
        text: 'comenzó a seguirte',
        time: 'hace 2 min',
        unread: true,
        action: 'follow'
    },
    {
        id: 2,
        type: 'likes',
        user: 'Carlos Ruiz',
        avatar: 'linear-gradient(45deg, #667eea, #764ba2)',
        text: 'le gustó tu publicación',
        time: 'hace 5 min',
        unread: true,
        hasPreview: true
    },
    {
        id: 3,
        type: 'follows',
        user: 'Ana Martínez',
        avatar: 'linear-gradient(45deg, #f093fb, #f5576c)',
        text: 'comenzó a seguirte',
        time: 'hace 15 min',
        unread: true,
        action: 'follow'
    }
];

function openNotifications() {
    const overlay = document.getElementById('notificationsOverlay');
    const panel = document.getElementById('notificationsPanel');
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    
    // Show overlay and panel
    overlay.classList.add('active');
    panel.classList.add('active');
    
    // Update notification badge
    updateNotificationCounts();
}

function closeNotifications() {
    const overlay = document.getElementById('notificationsOverlay');
    const panel = document.getElementById('notificationsPanel');
    
    // Restore body scroll
    document.body.style.overflow = '';
    
    // Hide overlay and panel
    overlay.classList.remove('active');
    panel.classList.remove('active');
}

function filterNotifications(filter) {
    // Remove active class from all filters
    const filterChips = document.querySelectorAll('.filter-chip');
    filterChips.forEach(chip => chip.classList.remove('active'));
    
    // Add active class to clicked filter
    const activeFilter = document.querySelector(`[data-filter="${filter}"]`);
    activeFilter.classList.add('active');
    
    // Update content data attribute for CSS filtering
    const content = document.getElementById('notificationsContent');
    content.setAttribute('data-filter', filter);
    
    // Update filter counts dynamically
    updateFilterCounts(filter);
}

function updateFilterCounts(activeFilter = 'all') {
    const notificationItems = document.querySelectorAll('.notification-item');
    const filterChips = document.querySelectorAll('.filter-chip');
    
    let counts = {
        all: notificationItems.length,
        unread: document.querySelectorAll('.notification-item.unread').length,
        follows: document.querySelectorAll('.notification-item[data-type="follows"]').length,
        likes: document.querySelectorAll('.notification-item[data-type="likes"]').length
    };
    
    filterChips.forEach(chip => {
        const filter = chip.getAttribute('data-filter');
        const countElement = chip.querySelector('.filter-count');
        if (countElement && counts[filter] !== undefined) {
            countElement.textContent = counts[filter];
        }
    });
}

function updateNotificationCounts() {
    const unreadCount = document.querySelectorAll('.notification-item.unread').length;
    const badge = document.getElementById('notificationBadge');
    
    if (unreadCount > 0) {
        badge.textContent = unreadCount;
        badge.style.display = 'flex';
    } else {
        badge.style.display = 'none';
    }
    
    updateFilterCounts();
}

function markAllAsRead() {
    const unreadItems = document.querySelectorAll('.notification-item.unread');
    
    unreadItems.forEach(item => {
        item.classList.remove('unread');
        
        // Add fade animation
        item.style.opacity = '0.7';
        setTimeout(() => {
            item.style.opacity = '1';
        }, 300);
    });
    
    // Update counts
    setTimeout(() => {
        updateNotificationCounts();
    }, 300);
    
    // Show feedback
    showNotificationFeedback('Todas las notificaciones marcadas como leídas');
}

function markNotificationAsRead(notificationElement) {
    if (notificationElement.classList.contains('unread')) {
        notificationElement.classList.remove('unread');
        updateNotificationCounts();
    }
}

function followBackUser(button, username) {
    if (button.classList.contains('following')) {
        button.textContent = 'Seguir';
        button.classList.remove('following');
        showNotificationFeedback(`Dejaste de seguir a ${username}`);
    } else {
        button.textContent = 'Siguiendo';
        button.classList.add('following');
        showNotificationFeedback(`Ahora sigues a ${username}`);
    }
}

function showNotificationFeedback(message) {
    // Create feedback element
    const feedback = document.createElement('div');
    feedback.className = 'notification-feedback';
    feedback.textContent = message;
    feedback.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(22, 24, 35, 0.9);
        color: #FFFFFF;
        padding: 12px 20px;
        border-radius: 8px;
        font-size: 0.9rem;
        font-weight: 500;
        z-index: 300;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    document.body.appendChild(feedback);
    
    // Animate in
    setTimeout(() => {
        feedback.style.opacity = '1';
    }, 10);
    
    // Animate out and remove
    setTimeout(() => {
        feedback.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(feedback);
        }, 300);
    }, 2000);
}

// Simulate real-time notifications
function simulateRealTimeNotifications() {
    setInterval(() => {
        if (Math.random() < 0.3) { // 30% chance every interval
            addNewNotification();
        }
    }, 15000); // Check every 15 seconds
}

function addNewNotification() {
    const newNotifications = [
        {
            type: 'likes',
            user: 'Usuario Nuevo',
            avatar: 'linear-gradient(45deg, #ff9a9e, #fecfef)',
            text: 'le gustó tu publicación',
            time: 'ahora',
            unread: true,
            hasPreview: true
        },
        {
            type: 'follows',
            user: 'Nuevo Seguidor',
            avatar: 'linear-gradient(45deg, #a8edea, #fed6e3)',
            text: 'comenzó a seguirte',
            time: 'ahora',
            unread: true,
            action: 'follow'
        }
    ];
    
    const randomNotification = newNotifications[Math.floor(Math.random() * newNotifications.length)];
    
    // Add to notifications array
    notifications.unshift({
        id: Date.now(),
        ...randomNotification
    });
    
    // Update badge with animation
    const badge = document.getElementById('notificationBadge');
    const currentCount = parseInt(badge.textContent) || 0;
    badge.textContent = currentCount + 1;
    badge.style.display = 'flex';
    
    // Animate badge
    badge.style.transform = 'scale(1.3)';
    setTimeout(() => {
        badge.style.transform = 'scale(1)';
    }, 200);
    
    // Show brief notification popup if panel is not open
    if (!document.getElementById('notificationsPanel').classList.contains('active')) {
        showBriefNotification(randomNotification);
    }
}

function showBriefNotification(notification) {
    const briefNotif = document.createElement('div');
    briefNotif.className = 'brief-notification';
    briefNotif.innerHTML = `
        <div class="brief-notification-content">
            <div class="brief-avatar" style="background: ${notification.avatar};">
                <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24'%3E%3Ctext y='18' font-size='16'%3E👤%3C/text%3E%3C/svg%3E" alt="Usuario">
            </div>
            <div class="brief-text">
                <strong>${notification.user}</strong> ${notification.text}
            </div>
        </div>
    `;
    
    briefNotif.style.cssText = `
        position: fixed;
        top: 80px;
        left: 20px;
        right: 20px;
        background: #FFFFFF;
        border: 1px solid #E5E5E5;
        border-radius: 12px;
        padding: 12px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        z-index: 150;
        transform: translateY(-100px);
        opacity: 0;
        transition: all 0.3s ease;
        cursor: pointer;
    `;
    
    briefNotif.querySelector('.brief-notification-content').style.cssText = `
        display: flex;
        align-items: center;
        gap: 12px;
    `;
    
    briefNotif.querySelector('.brief-avatar').style.cssText = `
        width: 36px;
        height: 36px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    briefNotif.querySelector('.brief-text').style.cssText = `
        flex: 1;
        font-size: 0.9rem;
        color: #161823;
    `;
    
    document.body.appendChild(briefNotif);
    
    // Animate in
    setTimeout(() => {
        briefNotif.style.transform = 'translateY(0)';
        briefNotif.style.opacity = '1';
    }, 10);
    
    // Auto remove after 4 seconds
    setTimeout(() => {
        briefNotif.style.transform = 'translateY(-100px)';
        briefNotif.style.opacity = '0';
        setTimeout(() => {
            if (document.body.contains(briefNotif)) {
                document.body.removeChild(briefNotif);
            }
        }, 300);
    }, 4000);
    
    // Click to open notifications
    briefNotif.onclick = () => {
        briefNotif.style.transform = 'translateY(-100px)';
        briefNotif.style.opacity = '0';
        setTimeout(() => {
            if (document.body.contains(briefNotif)) {
                document.body.removeChild(briefNotif);
            }
            openNotifications();
        }, 300);
    };
}

// Messages
function openMessages() {
    alert('Mensajes próximamente...');
}

// Historias Functions
function publishStory(imageData) {
    showLoadingSpinner('Publicando historia...');
    
    setTimeout(() => {
        // Agregar nueva historia
        const newStory = {
            id: Date.now(),
            username: 'Tú',
            userAvatar: 'linear-gradient(45deg, #FE2C55, #FF7A96)',
            images: [imageData],
            timestamp: Date.now(),
            views: []
        };
        
        // Si ya existe una historia del usuario, agregar imagen, sino crear nueva
        const userStoryIndex = stories.findIndex(story => story.username === 'Tú');
        if (userStoryIndex !== -1) {
            stories[userStoryIndex].images.push(imageData);
            stories[userStoryIndex].timestamp = Date.now();
        } else {
            stories.unshift(newStory);
        }
        
        // Guardar en localStorage
        localStorage.setItem('blendery_stories', JSON.stringify(stories));
        
        hideLoadingSpinner();
        showMainScreen();
        
        // Actualizar vista de historias
        updateStoriesView();
        
        showNotificationFeedback('¡Historia publicada! Visible por 24 horas');
    }, 2000);
}

function viewStory(username) {
    const story = stories.find(s => s.username === username);
    if (!story || story.images.length === 0) {
        alert('Esta historia no está disponible');
        return;
    }
    
    // Marcar como vista si no es tuya
    if (username !== 'Tú' && !story.views.includes('Tú')) {
        story.views.push('Tú');
        localStorage.setItem('blendery_stories', JSON.stringify(stories));
    }
    
    currentStoryIndex = stories.indexOf(story);
    currentImageIndex = 0;
    showStoryViewer();
}

function showStoryViewer() {
    hideAllScreens();
    document.getElementById('storyViewerScreen').classList.add('active');
    updateStoryViewer();
    startStoryTimer();
}

function updateStoryViewer() {
    const story = stories[currentStoryIndex];
    const image = story.images[currentImageIndex];
    
    document.getElementById('storyImage').src = image;
    document.getElementById('storyUsername').textContent = story.username;
    document.getElementById('storyUserAvatar').style.background = story.userAvatar;
    document.getElementById('storyTime').textContent = getTimeAgo(story.timestamp);
    
    // Actualizar barras de progreso
    updateStoryProgress();
    
    // Mostrar/ocultar botón de visualizaciones solo para historias propias
    const viewsBtn = document.getElementById('storyViewsBtn');
    if (story.username === 'Tú') {
        viewsBtn.style.display = 'flex';
        document.getElementById('viewsCount').textContent = story.views.length;
    } else {
        viewsBtn.style.display = 'none';
    }
}

function updateStoryProgress() {
    const story = stories[currentStoryIndex];
    const progressContainer = document.getElementById('storyProgress');
    progressContainer.innerHTML = '';
    
    story.images.forEach((_, index) => {
        const progressBar = document.createElement('div');
        progressBar.className = 'progress-bar';
        
        const progress = document.createElement('div');
        progress.className = 'progress-fill';
        
        if (index < currentImageIndex) {
            progress.style.width = '100%';
        } else if (index === currentImageIndex) {
            progress.style.width = '0%';
            progress.style.animation = 'storyProgress 5s linear forwards';
        }
        
        progressBar.appendChild(progress);
        progressContainer.appendChild(progressBar);
    });
}

function nextStoryImage() {
    const story = stories[currentStoryIndex];
    
    if (currentImageIndex < story.images.length - 1) {
        currentImageIndex++;
        updateStoryViewer();
    } else {
        nextStory();
    }
}

function prevStoryImage() {
    if (currentImageIndex > 0) {
        currentImageIndex--;
        updateStoryViewer();
    } else {
        prevStory();
    }
}

function nextStory() {
    if (currentStoryIndex < stories.length - 1) {
        currentStoryIndex++;
        currentImageIndex = 0;
        updateStoryViewer();
    } else {
        closeStoryViewer();
    }
}

function prevStory() {
    if (currentStoryIndex > 0) {
        currentStoryIndex--;
        currentImageIndex = 0;
        updateStoryViewer();
    }
}

function closeStoryViewer() {
    hideAllScreens();
    document.getElementById('mainScreen').classList.add('active');
    clearStoryTimer();
}

let storyTimer;
function startStoryTimer() {
    clearStoryTimer();
    storyTimer = setTimeout(() => {
        nextStoryImage();
    }, 5000);
}

function clearStoryTimer() {
    if (storyTimer) {
        clearTimeout(storyTimer);
        storyTimer = null;
    }
}

function updateStoriesView() {
    const storySection = document.querySelector('.story-section');
    const storyItems = storySection.querySelectorAll('.story-item:not(.add-story)');
    
    // Limpiar historias existentes excepto el botón de agregar
    storyItems.forEach(item => item.remove());
    
    // Agregar historias actuales
    stories.forEach(story => {
        if (story.images.length > 0) {
            const storyItem = document.createElement('div');
            storyItem.className = 'story-item';
            storyItem.onclick = () => viewStory(story.username);
            
            // Verificar si la historia tiene menos de 24 horas
            const isExpired = (Date.now() - story.timestamp) > (24 * 60 * 60 * 1000);
            if (isExpired) return; // No mostrar historias expiradas
            
            storyItem.innerHTML = `
                <div class="story-image" style="background: ${story.userAvatar}; ${story.views.includes('Tú') && story.username !== 'Tú' ? 'opacity: 0.6;' : ''}">
                    <img src="${story.images[story.images.length - 1]}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">
                </div>
                <span>${story.username}</span>
            `;
            
            // Insertar después del botón de agregar
            const addStory = storySection.querySelector('.add-story');
            addStory.parentNode.insertBefore(storyItem, addStory.nextSibling);
        }
    });
}

function showStoryViews() {
    const story = stories[currentStoryIndex];
    if (story.username !== 'Tú') return;
    
    let viewsList = story.views.length > 0 ? story.views.join('\n') : 'Nadie ha visto tu historia aún';
    alert(`Visto por:\n${viewsList}`);
}

function getTimeAgo(timestamp) {
    const now = Date.now();
    const diff = now - timestamp;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor(diff / (1000 * 60));
    
    if (hours > 0) {
        return `hace ${hours}h`;
    } else if (minutes > 0) {
        return `hace ${minutes}m`;
    } else {
        return 'ahora';
    }
}

// Limpiar historias expiradas al cargar
function cleanExpiredStories() {
    const now = Date.now();
    stories = stories.filter(story => {
        return (now - story.timestamp) < (24 * 60 * 60 * 1000); // 24 horas
    });
    localStorage.setItem('blendery_stories', JSON.stringify(stories));
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

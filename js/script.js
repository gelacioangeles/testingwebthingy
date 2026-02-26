/* ── script.js ── Shared JavaScript for CookedIn ── */

// Highlight active nav link based on current page
document.addEventListener('DOMContentLoaded', function() {
  var page = window.location.pathname.split('/').pop();
  var links = document.querySelectorAll('.nav-links a');
  for (var i = 0; i < links.length; i++) {
    var href = links[i].getAttribute('href');
    if (href === page) links[i].classList.add('active');
  }
});

// ── Filter tabs (landing page) ──
function setTab(el) {
  var tabs = document.querySelectorAll('.tab');
  for (var i = 0; i < tabs.length; i++) {
    tabs[i].classList.remove('active');
  }
  el.classList.add('active');
}

// ── Sign Up validation ──
function handleSignUp(e) {
  e.preventDefault();
  var firstNameEl = document.getElementById('firstName');
  var lastNameEl  = document.getElementById('lastName');
  var usernameEl  = document.getElementById('username');
  var emailEl     = document.getElementById('email');
  var passwordEl  = document.getElementById('password');
  var confirmEl   = document.getElementById('confirmPassword');

  var firstName = firstNameEl ? firstNameEl.value.trim() : '';
  var lastName  = lastNameEl ? lastNameEl.value.trim() : '';
  var username  = usernameEl ? usernameEl.value.trim() : '';
  var email     = emailEl ? emailEl.value.trim() : '';
  var password  = passwordEl ? passwordEl.value : '';
  var confirm   = confirmEl ? confirmEl.value : '';

  if (!firstName || !lastName || !username || !email || !password || !confirm) {
    showError('Please fill in all required fields.');
    return;
  }
  if (!isValidEmail(email)) {
    showError('Please enter a valid email address.');
    return;
  }
  if (password.length < 6) {
    showError('Password must be at least 6 characters.');
    return;
  }
  if (password !== confirm) {
    showError('Passwords do not match.');
    return;
  }
  window.location.href = 'login.html';
}

// ── Login validation ──
function handleLogin(e) {
  e.preventDefault();
  var emailEl    = document.getElementById('email');
  var passwordEl = document.getElementById('password');

  var email    = emailEl ? emailEl.value.trim() : '';
  var password = passwordEl ? passwordEl.value : '';

  if (!email || !password) {
    showError('Please enter your email and password.');
    return;
  }
  if (!isValidEmail(email)) {
    showError('Please enter a valid email address.');
    return;
  }
  window.location.href = 'index.html';
}

// ── Reset Password (send email) ──
function handleResetRequest(e) {
  e.preventDefault();
  var emailEl = document.getElementById('email');
  var email = emailEl ? emailEl.value.trim() : '';

  if (!email) {
    showError('Please enter your email address.');
    return;
  }
  if (!isValidEmail(email)) {
    showError('Please enter a valid email address.');
    return;
  }
  window.location.href = 'confirmation.html';
}

// ── New Password ──
function handleNewPassword(e) {
  e.preventDefault();
  var passwordEl = document.getElementById('newPassword');
  var confirmEl  = document.getElementById('confirmPassword');

  var password = passwordEl ? passwordEl.value : '';
  var confirm  = confirmEl ? confirmEl.value : '';

  if (!password || !confirm) {
    showError('Please fill in both fields.');
    return;
  }
  if (password.length < 6) {
    showError('Password must be at least 6 characters.');
    return;
  }
  if (password !== confirm) {
    showError('Passwords do not match.');
    return;
  }
  window.location.href = 'login.html';
}

// ── Helpers ──
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showError(msg) {
  var el = document.getElementById('error-msg');
  if (!el) {
    el = document.createElement('p');
    el.id = 'error-msg';
    el.style.cssText = 'color:#c0392b; font-size:0.9rem; text-align:center; margin-top:10px; font-weight:700;';
    var card = document.querySelector('.card');
    if (card) card.appendChild(el);
  }
  el.textContent = msg;
  setTimeout(function() { el.textContent = ''; }, 4000);
}

// Google SVG helper — reusable
var GOOGLE_SVG = '<svg width="22" height="22" viewBox="0 0 48 48">' +
  '<path fill="#EA4335" d="M24 9.5c3.1 0 5.6 1.1 7.5 2.8l5.6-5.6C33.5 3.5 29.1 1.5 24 1.5 14.9 1.5 7.2 7 3.8 14.8l6.6 5.1C12.1 13.5 17.5 9.5 24 9.5z"/>' +
  '<path fill="#4285F4" d="M46.5 24c0-1.6-.1-3.1-.4-4.5H24v8.5h12.7c-.6 3-2.3 5.5-4.8 7.2l7.5 5.8C43.6 36.8 46.5 30.8 46.5 24z"/>' +
  '<path fill="#FBBC05" d="M10.4 28.7A14.5 14.5 0 0 1 9.5 24c0-1.6.3-3.2.8-4.7l-6.6-5.1A22.4 22.4 0 0 0 1.5 24c0 3.6.9 7 2.3 10l6.6-5.3z"/>' +
  '<path fill="#34A853" d="M24 46.5c5.1 0 9.4-1.7 12.5-4.6l-7.5-5.8c-2 1.3-4.5 2.1-7 2.1-6.5 0-12-4-14-9.4l-6.6 5.1C7.2 41 14.9 46.5 24 46.5z"/>' +
'</svg>';

export function showLoading(show) {
  const loader = document.getElementById("loading");
  if (show) {
    loader.classList.remove("hidden");
  } else {
    loader.classList.add("hidden");
  }
}

export function showError(message) {
  const errorEl = document.getElementById("error");
  errorEl.textContent = message;
  errorEl.classList.remove("hidden");
}

export function clearError() {
  const errorEl = document.getElementById("error");
  errorEl.textContent = "";
  errorEl.classList.add("hidden");
}

export function displayUserData(user) {
  const container = document.getElementById("results");
  container.innerHTML = "";

  const card = document.createElement("div");
  card.className = "card";

  let html = `<div class="card-header">`;
  
  if (user.picture?.data?.url) {
    html += `<img src="${user.picture.data.url}" alt="Profile Photo">`;
  }
  
  html += `<div class="card-info">
    <h2>${user.name || "User"}</h2>`;
    
  if (user.link) {
    html += `<a href="${user.link}" target="_blank" class="view-profile-link">View on Facebook →</a>`;
  }
  
  html += `</div></div>`;

  // Personal Information Section
  let personalInfo = '';
  if (user.email) personalInfo += `<div class="info-row"><span class="info-label">📧 Email</span><span class="info-value">${user.email}</span></div>`;
  if (user.gender) personalInfo += `<div class="info-row"><span class="info-label">👤 Gender</span><span class="info-value">${capitalizeFirst(user.gender)}</span></div>`;
  if (user.birthday) personalInfo += `<div class="info-row"><span class="info-label">🎂 Birthday</span><span class="info-value">${user.birthday}</span></div>`;
  if (user.age_range) personalInfo += `<div class="info-row"><span class="info-label">📅 Age Range</span><span class="info-value">${user.age_range.min}-${user.age_range.max || '+'}</span></div>`;

  if (personalInfo) {
    html += `<div class="info-section">
      <h3 class="section-title">👤 Personal Information</h3>
      <div class="info-grid">${personalInfo}</div>
    </div>`;
  }

  // Location Information Section
  let locationInfo = '';
  if (user.hometown) locationInfo += `<div class="info-row"><span class="info-label">🏠 Hometown</span><span class="info-value">${user.hometown.name}</span></div>`;
  if (user.location) locationInfo += `<div class="info-row"><span class="info-label">📍 Location</span><span class="info-value">${user.location.name}</span></div>`;

  if (locationInfo) {
    html += `<div class="info-section">
      <h3 class="section-title">📍 Location</h3>
      <div class="info-grid">${locationInfo}</div>
    </div>`;
  }

  // Activity & Content Section
  let activityInfo = '';
  if (user.likes?.data) activityInfo += `<div class="stat-item"><span class="stat-icon">❤️</span><span class="stat-value">${user.likes.data.length}</span><span class="stat-label">Likes</span></div>`;
  if (user.posts?.data) activityInfo += `<div class="stat-item"><span class="stat-icon">📝</span><span class="stat-value">${user.posts.data.length}</span><span class="stat-label">Posts</span></div>`;
  if (user.photos?.data) activityInfo += `<div class="stat-item"><span class="stat-icon">🖼️</span><span class="stat-value">${user.photos.data.length}</span><span class="stat-label">Photos</span></div>`;
  if (user.videos?.data) activityInfo += `<div class="stat-item"><span class="stat-icon">🎥</span><span class="stat-value">${user.videos.data.length}</span><span class="stat-label">Videos</span></div>`;
  if (user.events?.data) activityInfo += `<div class="stat-item"><span class="stat-icon">📅</span><span class="stat-value">${user.events.data.length}</span><span class="stat-label">Events</span></div>`;
  if (user.friends?.data) activityInfo += `<div class="stat-item"><span class="stat-icon">👥</span><span class="stat-value">${user.friends.data.length}</span><span class="stat-label">Friends</span></div>`;

  if (activityInfo) {
    html += `<div class="info-section">
      <h3 class="section-title">📊 Activity & Content</h3>
      <div class="stats-grid">${activityInfo}</div>
    </div>`;
  }

  card.innerHTML = html;
  container.appendChild(card);
}

function capitalizeFirst(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

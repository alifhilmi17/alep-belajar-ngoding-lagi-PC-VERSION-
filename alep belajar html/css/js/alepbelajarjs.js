function goToProfile() {
  alert("🔧 Fitur Edit Profil akan datang!");
}

function toggleSidebarMenu() {
  const submenu = document.getElementById("appSubmenu");
  submenu.classList.toggle("open");
  const arrow = document.getElementById("arrow");
  arrow.style.transform = submenu.classList.contains("open") ? "rotate(180deg)" : "rotate(0deg)";
}

// Gamification Logic
let points = 120;
let level = 2;

function updateGamification() {
  document.getElementById("userPoints").textContent = points;
  document.getElementById("userLevel").textContent = level;

  const progress = (points % 100);
  document.getElementById("progressFill").style.width = progress + "%";
}

function completeTask(button) {
  points += 10;
  if (points >= level * 100) {
    level++;
    alert("🎉 Level Up! Selamat ke Level " + level);
  }
  updateGamification();
  button.parentElement.style.textDecoration = "line-through";
  button.disabled = true;
}

updateGamification();

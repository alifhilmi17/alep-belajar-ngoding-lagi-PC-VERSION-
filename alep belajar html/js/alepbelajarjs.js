/* ===============================
   GLOBAL VARIABLES
=============================== */
let points = 120; // Poin awal
let level  = 2;   // Level awal


/* ===============================
   SIDEBAR & PROFILE
=============================== */

/**
 * Menampilkan pesan placeholder saat klik profil
 */
function goToProfile() {
  alert("🔧 Fitur Edit Profil akan datang!");
}

/**
 * Toggle submenu pada sidebar
 */
function toggleSidebarMenu() {
  const submenu = document.getElementById("appSubmenu");
  const arrow   = document.getElementById("arrow");
  const isOpen  = submenu.classList.toggle("open");

  // Update atribut aksesibilitas
  document.querySelector(".has-submenu").setAttribute("aria-expanded", isOpen);
  submenu.setAttribute("aria-hidden", !isOpen);

  // Animasi rotasi panah
  arrow.style.transform = isOpen ? "rotate(90deg)" : "rotate(0deg)";
}


/* ===============================
   GAMIFICATION LOGIC
=============================== */

/**
 * Perbarui tampilan poin, level, dan progress bar
 */
function updateGamification() {
  document.getElementById("userPoints").textContent = points;
  document.getElementById("userLevel").textContent  = level;

  // Hitung progress ke level berikutnya (0–100%)
  const progress = points % 100;
  document.getElementById("progressFill").style.width = progress + "%";
}

/**
 * Menandai task selesai dan menambah poin
 * @param {HTMLElement} button - Elemen tombol/trigger dari task
 */
function completeTask(button) {
  points += 10;

  // Cek apakah naik level
  if (points >= level * 100) {
    level++;
    alert(`🎉 Level Up! Selamat ke Level ${level}`);
  }

  updateGamification();

  // Tandai task selesai
  button.parentElement.style.textDecoration = "line-through";
  button.disabled = true;
}


/* ===============================
   INITIALIZE
=============================== */

document.addEventListener("DOMContentLoaded", () => {
  // Jalankan pertama kali saat halaman dimuat
  updateGamification();

  const form      = document.getElementById("addScheduleForm");
  const tableBody = document.querySelector("#scheduleTable tbody");

  // ✅ Tambah jadwal rapat
  form.addEventListener("submit", (e) => {
    e.preventDefault(); // Mencegah reload halaman

    // Ambil nilai input
    const tanggal = document.getElementById("tanggal").value.trim();
    const waktu   = document.getElementById("waktu").value.trim();
    const agenda  = document.getElementById("agenda").value.trim();
    const ruangan = document.getElementById("ruangan").value.trim();

    // Buat baris baru
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
      <td>${tanggal}</td>
      <td>${waktu}</td>
      <td>${agenda}</td>
      <td>${ruangan}</td>
      <td>
        <button class="delete-btn">🗑 Hapus</button>
      </td>
    `;

    // Tambahkan ke tabel
    tableBody.appendChild(newRow);

    // Reset form setelah submit
    form.reset();
  });

  // ✅ Hapus jadwal rapat (event delegation)
  tableBody.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-btn")) {
      e.target.closest("tr").remove();
    }
  });
});

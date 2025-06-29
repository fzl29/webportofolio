const el = document.getElementById("scramble-text");
const phrases = [
  "Explore My Creations",
  "Portofolio Faisal 2K25"
];

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*";
let phraseIndex = 0;
let iteration = 0;

function scramble() {
  const finalText = phrases[phraseIndex];
  let output = "";

  for (let i = 0; i < finalText.length; i++) {
    if (i < iteration) {
      output += finalText[i];
    } else if (finalText[i] === " ") {
      output += " ";
    } else {
      output += chars[Math.floor(Math.random() * chars.length)];
    }
  }

  el.textContent = output;

  if (iteration <= finalText.length) {
    iteration += 1 / 2;
    requestAnimationFrame(scramble);
  } else {
    // Pause before next phrase
    setTimeout(() => {
      iteration = 0;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      requestAnimationFrame(scramble);
    }, 2000);
  }
}

window.addEventListener("DOMContentLoaded", () => {
  requestAnimationFrame(scramble);
});
// =================navbar aktif 

document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link'); // Ambil semua elemen dengan kelas nav-link
    const sections = document.querySelectorAll('section[id]'); // Ambil semua section yang punya ID

    // --- Fungsi untuk menandai link aktif ---
    function setActiveLink(currentHash) {
        // Hapus kelas 'active' dari semua link terlebih dahulu
        navLinks.forEach(link => {
            link.classList.remove('active');
        });

        // Tambahkan kelas 'active' ke link yang sesuai
        // Cari link yang href-nya cocok dengan currentHash atau kosong (untuk Home)
        navLinks.forEach(link => {
            if (link.getAttribute('href') === currentHash || (currentHash === '#home-section' && link.getAttribute('href') === '#')) {
                link.classList.add('active');
            }
        });
    }

    // --- 1. Event Listener untuk Klik pada Nav Link ---
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Jangan preventDefault() jika Anda ingin smooth scroll bawaan browser
            // atau jika Anda menggunakan library smooth scroll.
            // Jika Anda mengimplementasikan smooth scroll sendiri, mungkin perlu preventDefault().

            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#')) { // Pastikan ini adalah link ke section di halaman yang sama
                // Update status aktif segera setelah klik
                setActiveLink(targetId);
            }
        });
    });

    // --- 2. Event Listener untuk Scroll (untuk mendeteksi posisi saat ini) ---
    window.addEventListener('scroll', function() {
        let current = '';

        // Loop melalui setiap bagian (section) di halaman
        sections.forEach(section => {
            // Dapatkan posisi atas dan tinggi section
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            // Cek apakah bagian ini berada di viewport atau mendekati bagian atas viewport
            // Atur offset (misalnya -100) untuk menyesuaikan kapan link harus aktif
            // Ini penting karena navbar biasanya ada di atas dan menutupi sedikit bagian awal section
            if (pageYOffset >= sectionTop - 100) {
                current = '#' + section.getAttribute('id');
            }
        });

        // Setel link aktif berdasarkan bagian yang terdeteksi
        // Tambahkan kondisi untuk home jika scroll berada di paling atas
        if (current === '' && pageYOffset < 100) { // Jika belum ada section yang aktif dan di bagian atas
             setActiveLink('#'); // Atau '#home-section' jika Anda pakai ID itu
        } else if (current !== '') {
            setActiveLink(current);
        }
    });

    // --- Inisialisasi awal saat halaman dimuat ---
    // Pastikan link aktif saat halaman dimuat, terutama jika ada hash di URL
    if (window.location.hash) {
        setActiveLink(window.location.hash);
    } else {
        // Jika tidak ada hash, asumsikan di bagian home
        setActiveLink('#'); // Atau '#home-section'
    }
});






// === STAR PARTICLE MOUSE EFFECT (HANYA DI HERO) ===
// const canvas = document.getElementById("star-canvas");
// const ctx = canvas.getContext("2d");
// let stars = [];

// function resizeCanvas() {
//   canvas.width = window.innerWidth;
//   canvas.height = document.getElementById("hero").offsetHeight;
// }
// resizeCanvas();

// function randomStar(x, y) {
//   return {
//     x: x,
//     y: y,
//     size: Math.random() * 2 + 1,
//     alpha: 1,
//     dx: (Math.random() - 0.5) * 2,
//     dy: (Math.random() - 0.5) * 2,
//   };
// }

// function drawStars() {
//   ctx.clearRect(0, 0, canvas.width, canvas.height);
//   stars.forEach((star, i) => {
//     star.x += star.dx;
//     star.y += star.dy;
//     star.alpha -= 0.01;

//     if (star.alpha <= 0) {
//       stars.splice(i, 1);
//     }

//     ctx.beginPath();
//     ctx.arc(star.x, star.y, star.size, 0, 2 * Math.PI);
//     ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
//     ctx.fill();
//   });

//   requestAnimationFrame(drawStars);
// }

// document.getElementById("hero").addEventListener("mousemove", (e) => {
//   const rect = canvas.getBoundingClientRect();
//   const x = e.clientX - rect.left;
//   const y = e.clientY - rect.top;
//   for (let i = 0; i < 3; i++) {
//     stars.push(randomStar(x, y));
//   }
// });

// window.addEventListener("resize", resizeCanvas);

// drawStars();



// Carousel Sponsor
  const track = document.getElementById('sponsorTrack');
  const wrapper = document.getElementById('carouselWrapper');

  // Duplikasi isi track (hanya sekali)
  track.innerHTML += track.innerHTML;

  let offset = 0;
  const speed = 0.5; // lebih kecil = lebih halus

  function scrollLoop() {
    offset -= speed;
    if (Math.abs(offset) >= track.scrollWidth / 2) {
      offset = 0; // reset ke awal (karena kita duplikat)
    }
    track.style.transform = `translateX(${offset}px)`;
    requestAnimationFrame(scrollLoop);
  }

  scrollLoop();

  // carousel prjek

  // script.js
const swiper = new Swiper('.my-projects-carousel', {
    effect: 'slide',
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    loop: true,

    // ===== TAMBAHAN: Opsi untuk autoplay =====
    autoplay: {
        delay: 2500, // Waktu jeda antar slide dalam milidetik (2.5 detik)
        disableOnInteraction: false, // Autoplay tidak akan berhenti setelah interaksi user (misal: klik)
        pauseOnMouseEnter: true, // Autoplay akan berhenti saat kursor mouse di atas carousel
    },
    // ===========================================

    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});


// carousel melingkar




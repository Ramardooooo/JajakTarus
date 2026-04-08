// =============================================
// DATA - Members, Trips, Gallery
// =============================================

const members = [
    {
        id: 1,
        name: "Rizky Pratama",
        role: "Founder & Lead Climber",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
        bio: "Pendaki veteran dengan pengalaman 50+ pendakian. Spesialis gunung berapi.",
        social: { instagram: "@rizkypratama", whatsapp: "+6281234567890" }
    },
    {
        id: 2,
        name: "Ahmad Fauzi",
        role: "Trip Coordinator",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
        bio: "Ahli logistik dan perencanaan trip. Pastikan semuanya terorganisir dengan sempurna.",
        social: { instagram: "@ahmadfauzi", whatsapp: "+6281234567891" }
    },
    {
        id: 3,
        name: "Siti Nurhaliza",
        role: "Medical Officer",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
        bio: "Dokter dan pendaki. Selalu siap menangani keadaan darurat di gunung.",
        social: { instagram: "@sitinurhaliza", whatsapp: "+6281234567892" }
    },
    {
        id: 4,
        name: "Budi Santoso",
        role: "Navigator & Scout",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
        bio: "Master navigasi dan pembaca alam. Tidak pernah tersesat.",
        social: { instagram: "@budisantoso", whatsapp: "+6281234567893" }
    },
    {
        id: 5,
        name: "Dewi Lestari",
        role: "Equipment Specialist",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
        bio: "Ahli perlengkapan mountaineering. Gear terbaik untuk setiap kondisi.",
        social: { instagram: "@dewilestari", whatsapp: "+6281234567894" }
    },
    {
        id: 6,
        name: "Agus Setiawan",
        role: "Photographer",
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
        bio: "Dokumenter dan fotografer. Abadikan setiap momen di puncak.",
        social: { instagram: "@agusfoto", whatsapp: "+6281234567895" }
    },
    {
        id: 7,
        name: "Maya Putri",
        role: "Environment Officer",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop",
        bio: "Pechampion lingkungan. Pastikan gunung tetap bersih setiap pendakian.",
        social: { instagram: "@mayaputri", whatsapp: "+6281234567896" }
    },
    {
        id: 8,
        name: "Dimas Rahman",
        role: "Camp Master",
        image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&h=400&fit=crop",
        bio: "Spesialis kemah dan survival. Buat basecamp yang nyaman di segala cuaca.",
        social: { instagram: "@dimasrahman", whatsapp: "+6281234567897" }
    }
];

const trips = [
    {
        id: 1,
        name: "Gunung Bromo",
        location: "Taman Nasional Bromo Tengger Semeru, Jawa Timur",
        height: 2329,
        difficulty: "easy",
        duration: 2,
        distance: 120,
        price: 350000,
        image: "https://images.unsplash.com/photo-1537979268529-3a3d3a5e9b0f?w=600&h=400&fit=crop",
        description: "Nikmati keindahan matahari terbit di atas lautan pasir Bromo. Cocok untuk pemula yang ingin merasakan sensasi mendaki gunung berapi aktif.",
        itinerary: [
            { day: 1, activities: "Berangkat dari Jakarta → Tiba di Cemoro Lawang → Check in homestay → Briefing perjalanan" },
            { day: 2, activities: "03.00 Berangkat ke Penanjakan → Sunrise viewing → Trekking ke kawah Bromo → Explore savana → Kembali" }
        ],
        gear: ["Sepatu hiking", "Jaket tebal", "Senter/Headlamp", "Masker", "Kamera", "Air minum", "Sarung tangan"]
    },
    {
        id: 2,
        name: "Gunung Merbabu",
        location: "Boyolali, Jawa Tengah",
        height: 3145,
        difficulty: "easy",
        duration: 2,
        distance: 150,
        price: 450000,
        image: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=600&h=400&fit=crop",
        description: "Gunung populer dengan padang savana yang luas di puncaknya. View spektakuler Merapi dan Merbabu dari pos Wekas.",
        itinerary: [
            { day: 1, activities: "Berangkat dari Jakarta → Tiba di basecamp Kopeng → Briefing → Pendakian malam menuju Kopeng" },
            { day: 2, activities: "Lanjutkan pendakian → Savana Wekas → Puncak Merbabu → Turun ke basecamp → Pulang" }
        ],
        gear: ["Sepatu hiking", "Jaket windbreaker", "Senter/Headlamp", "Tongkat hiking", "Air minum 2L", "Snack", "P3K"]
    },
    {
        id: 3,
        name: "Gunung Sindoro",
        location: "Wonosobo, Jawa Tengah",
        height: 3150,
        difficulty: "medium",
        duration: 2,
        distance: 180,
        price: 400000,
        image: "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=600&h=400&fit=crop",
        description: "Twin mountain dengan Sumbing. Dijuluki alsummit karena padang savana yang indah. Pendakian menantang tapi worth it.",
        itinerary: [
            { day: 1, activities: "Berangkat dari Jakarta → Tiba di basecamp Kledung → Registrasi → Start pendakian sore" },
            { day: 2, activities: "2.00 reach summit → Sunrise viewing → Turun via jalur yang sama → Pulang" }
        ],
        gear: ["Sepatu hiking", "Jaket waterproof", "Senter/Headlamp", "Tongkat hiking", "Air minum 2L", "Snack高能量", "P3K lengkap"]
    },
    {
        id: 4,
        name: "Gunung Lawu",
        location: "Karanganyar, Jawa Tengah",
        height: 3265,
        difficulty: "medium",
        duration: 3,
        distance: 200,
        price: 500000,
        image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&h=400&fit=crop",
        description: "Gunung misterius dengan kawah indah di puncaknya. View sunrise dari sini sangat spektakuler dengan pemandangan laut awan.",
        itinerary: [
            { day: 1, activities: "Berangkat dari Jakarta → Tiba di basecamp Cempero → Briefing & pembagian logistic" },
            { day: 2, activities: "Start pendakian pagi → Camping di summit → Persiapan sunrise" },
            { day: 3, activities: "Sunrise viewing → Eksplorasi kawah → Turun → Pulang" }
        ],
        gear: ["Sepatu hiking", "Sleeping bag", "Matras", "Jaket tebal", "Senter/Headlamp", "Tongkat hiking", "Air minum", "P3K"]
    },
    {
        id: 5,
        name: "Gunung Semeru",
        location: "Taman Nasional Bromo Tengger Semeru, Jawa Timur",
        height: 3676,
        difficulty: "hard",
        duration: 4,
        distance: 250,
        price: 750000,
        image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&h=400&fit=crop",
        description: "Gunung tertinggi di Jawa! Pendakian challenging melewati Ranu Kumbolo yang indah. Butuh fisik dan mental yang kuat.",
        itinerary: [
            { day: 1, activities: "Berangkat dari Jakarta → Tiba di Ranu Pani → Start pendakian sore → Camping di Ranu Pani" },
            { day: 2, activities: "Menuju Oro-oro Ombo → climb Arcopodo → Camping di summit" },
            { day: 3, activities: "3.00 Summit attempt → Sunrise dari Mahameru → Turun ke Ranu Kumbolo" },
            { day: 4, activities: "Explore Ranu Kumbolo → Turun ke basecamp → Pulang" }
        ],
        gear: ["Sepatu hiking", "Sleeping bag", "Matras", "Jaket alpine", "Senter/Headlamp", "Tongkat hiking", "Air minum 3L", "P3K lengkap", "Oksigen portable"]
    },
    {
        id: 6,
        name: "Gunung Rinjani",
        location: "Taman Nasional Rinjani, Lombok, NTB",
        height: 3726,
        difficulty: "hard",
        duration: 4,
        distance: 450,
        price: 850000,
        image: "https://images.unsplash.com/photo-1580502304784-8985b7eb7260?w=600&h=400&fit=crop",
        description: "Gunung favorit Indonesia dengan Danau Segara Anak di kalderanya. Pemandangan spektakuler dari puncak.",
        itinerary: [
            { day: 1, activities: "Penerbangan Jakarta → Lombok → Tiba di Sembalun → Briefing → Start pendakian" },
            { day: 2, activities: "Menuju crater rim → Camping dengan view danau dan gunung" },
            { day: 3, activities: "Sunrise dari crater rim → Turun ke Danau Segara Anak → Hot spring" },
            { day: 4, activities: "Climb summit → Turun via Senaru → Pulang" }
        ],
        gear: ["Sepatu hiking", "Sleeping bag", "Matras", "Jaket alpine", "Senter/Headlamp", "Tongkat hiking", "Air minum 3L", "P3K lengkap", "Kacamata hitam"]
    },
    {
        id: 7,
        name: "Gunung Smeru",
        location: "Taman Nasional Bromo Tengger Semeru, Jawa Timur",
        height: 3676,
        difficulty: "hard",
        duration: 3,
        distance: 260,
        price: 550000,
        image: "https://images.unsplash.com/photo-1501555088652-021faa106b9b?w=600&h=400&fit=crop",
        description: "Twin peak dengan Semeru. Pendakian lebih sepi dan challenging. view yang tidak kalah indahnya.",
        itinerary: [
            { day: 1, activities: "Berangkat dari Jakarta → Tiba di Ranu Pani → Start pendakian sore" },
            { day: 2, activities: "Continue climb → Summit attempt → Sunrise viewing" },
            { day: 3, activities: "Turun ke basecamp → Pulang" }
        ],
        gear: ["Sepatu hiking", "Sleeping bag", "Matras", "Jaket alpine", "Senter/Headlamp", "Tongkat hiking", "Air minum 2L", "P3K lengkap"]
    },
    {
        id: 8,
        name: "Gunung Kelimutu",
        location: "K Flores, NTT",
        height: 1639,
        difficulty: "easy",
        duration: 4,
        distance: 800,
        price: 1200000,
        image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600&h=400&fit=crop",
        description: "Tiga danau dengan warna berbeda di satu puncak! Perjalanan jauh tapi worth it. Experience unik di Indonesia.",
        itinerary: [
            { day: 1, activities: "Penerbangan Jakarta → Ende → Tiba di Moni → Check in hotel" },
            { day: 2, activities: "Pagi-pagi naik ke viewpoint → Sunrise di Kelimutu → Eksplorasi ketiga danau" },
            { day: 3, activities: "Kunjungi waterfalls sekitar → Explore desa tradisional → Kembali ke Moni" },
            { day: 4, activities: "Pagi santai → Transfer ke bandara → Pulang" }
        ],
        gear: ["Sepatu tracking", "Jaket ringan", "Kacamata hitam", "Kamera", "Sunscreen", "Topi", "Air minum"]
    }
];

const galleryImages = [
    { src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&h=400&fit=crop", category: "Pendakian" },
    { src: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=600&h=600&fit=crop", category: "Puncak" },
    { src: "https://images.unsplash.com/photo-1537979268529-3a3d3a5e9b0f?w=600&h=400&fit=crop", category: "Basecamp" },
    { src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&h=400&fit=crop", category: "Sunrise" },
    { src: "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=600&h=600&fit=crop", category: "Pendakian" },
    { src: "https://images.unsplash.com/photo-1501555088652-021faa106b9b?w=600&h=400&fit=crop", category: "Tim" },
    { src: "https://images.unsplash.com/photo-1580502304784-8985b7eb7260?w=600&h=400&fit=crop", category: "Puncak" },
    { src: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600&h=600&fit=crop", category: "Basecamp" },
    { src: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=600&h=400&fit=crop", category: "Tim" },
    { src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&h=600&fit=crop", category: "Pendakian" },
    { src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&h=400&fit=crop", category: "Komunitas" },
    { src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop", category: "Komunitas" }
];

// =============================================
// UTILITY FUNCTIONS
// =============================================

function formatRupiah(number) {
    return 'Rp ' + number.toLocaleString('id-ID');
}

function getDifficultyLabel(level) {
    const labels = {
        easy: 'Pemula',
        medium: 'Menengah',
        hard: 'Lanjutan'
    };
    return labels[level] || level;
}

function getDifficultyClass(level) {
    const classes = {
        easy: 'difficulty-easy',
        medium: 'difficulty-medium',
        hard: 'difficulty-hard'
    };
    return classes[level] || 'difficulty-easy';
}

// =============================================
// RENDER FUNCTIONS
// =============================================

function renderMembers() {
    const grid = document.getElementById('members-grid');
    if (!grid) return;
    
    grid.innerHTML = members.map(member => `
        <div class="member-card group relative overflow-hidden rounded-2xl cursor-pointer animate-fade-up" data-id="${member.id}">
            <div class="aspect-square overflow-hidden">
                <img src="${member.image}" alt="${member.name}" class="w-full h-full object-cover transition-transform duration-500">
            </div>
            <div class="absolute inset-0 bg-gradient-to-t from-forest via-forest/80 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-4">
                <h4 class="font-poppins font-bold text-lg text-white">${member.name}</h4>
                <p class="text-sunset text-sm mb-2">${member.role}</p>
                <p class="text-white/80 text-xs mb-3 line-clamp-2">${member.bio}</p>
                <div class="flex gap-2">
                    <a href="https://instagram.com/${member.social.instagram.replace('@', '')}" target="_blank" class="w-8 h-8 bg-white/20 hover:bg-sunset rounded-full flex items-center justify-center transition-colors">
                        <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                    </a>
                    <a href="https://wa.me/${member.social.whatsapp}" target="_blank" class="w-8 h-8 bg-white/20 hover:bg-sunset rounded-full flex items-center justify-center transition-colors">
                        <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                        </svg>
                    </a>
                </div>
            </div>
            <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-forest to-transparent p-4 md:hidden group-hover:hidden">
                <h4 class="font-poppins font-bold text-white">${member.name}</h4>
                <p class="text-sunset text-sm">${member.role}</p>
            </div>
        </div>
    `).join('');
}

function renderTrips(filter = 'all') {
    const grid = document.getElementById('trips-grid');
    const emptyState = document.getElementById('empty-state');
    if (!grid) return;
    
    const filteredTrips = filter === 'all' ? trips : trips.filter(trip => trip.difficulty === filter);
    
    if (filteredTrips.length === 0) {
        grid.innerHTML = '';
        emptyState.classList.remove('hidden');
        return;
    }
    
    emptyState.classList.add('hidden');
    
    grid.innerHTML = filteredTrips.map(trip => `
        <div class="trip-card bg-white rounded-2xl overflow-hidden shadow-lg transition-all duration-300 cursor-pointer animate-fade-up" data-id="${trip.id}">
            <div class="relative h-48">
                <img src="${trip.image}" alt="${trip.name}" class="w-full h-full object-cover">
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <span class="absolute top-4 left-4 px-3 py-1 rounded-full text-white text-xs font-medium ${getDifficultyClass(trip.difficulty)}">
                    ${getDifficultyLabel(trip.difficulty)}
                </span>
            </div>
            <div class="p-5">
                <h3 class="font-poppins font-bold text-xl text-forest mb-1">${trip.name}</h3>
                <p class="text-textgreen/70 text-sm mb-4 flex items-center gap-1">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    </svg>
                    ${trip.location.split(',')[0]}
                </p>
                <div class="flex justify-between items-center mb-4 text-sm">
                    <span class="text-textgreen"><span class="font-bold">${trip.height}</span> mdpl</span>
                    <span class="text-textgreen"><span class="font-bold">${trip.distance}</span> km</span>
                    <span class="text-textgreen"><span class="font-bold">${trip.duration}</span> hari</span>
                </div>
                <div class="flex justify-between items-center">
                    <div>
                        <p class="text-textgreen/60 text-xs">Mulai dari</p>
                        <p class="font-poppins font-bold text-xl text-sunset">${formatRupiah(trip.price)}</p>
                    </div>
                    <button class="btn-primary px-4 py-2 rounded-lg text-white font-medium text-sm">
                        Detail
                    </button>
                </div>
            </div>
        </div>
    `).join('');
    
    // Add click handlers
    document.querySelectorAll('.trip-card').forEach(card => {
        card.addEventListener('click', () => {
            const tripId = parseInt(card.dataset.id);
            openTripModal(tripId);
        });
    });
}

function renderGallery() {
    const grid = document.getElementById('gallery-grid');
    if (!grid) return;
    
    grid.innerHTML = galleryImages.map((image, index) => `
        <div class="gallery-item relative overflow-hidden rounded-xl cursor-pointer animate-fade-up" data-index="${index}">
            <img src="${image.src}" alt="Gallery ${index + 1}" class="w-full h-48 object-cover transition-transform duration-500">
            <div class="gallery-overlay absolute inset-0 bg-black/50 opacity-0 transition-opacity duration-300 flex items-center justify-center">
                <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"/>
                </svg>
            </div>
        </div>
    `).join('');
    
    // Add click handlers
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', () => {
            const index = parseInt(item.dataset.index);
            openLightbox(index);
        });
    });
}

// =============================================
// MODAL FUNCTIONS
// =============================================

let currentTripId = null;
let currentLightboxIndex = 0;

function openTripModal(tripId) {
    const trip = trips.find(t => t.id === tripId);
    if (!trip) return;
    
    currentTripId = tripId;
    
    document.getElementById('modal-image').src = trip.image;
    document.getElementById('modal-difficulty').textContent = getDifficultyLabel(trip.difficulty);
    document.getElementById('modal-difficulty').className = `absolute top-4 left-4 px-4 py-2 rounded-full text-white font-medium text-sm ${getDifficultyClass(trip.difficulty)}`;
    document.getElementById('modal-title').textContent = trip.name;
    document.getElementById('modal-location').textContent = trip.location;
    document.getElementById('modal-height').textContent = trip.height;
    document.getElementById('modal-duration').textContent = trip.duration;
    document.getElementById('modal-distance').textContent = trip.distance;
    document.getElementById('modal-description').textContent = trip.description;
    document.getElementById('modal-price').textContent = formatRupiah(trip.price);
    
    document.getElementById('modal-itinerary').innerHTML = trip.itinerary.map(day => `
        <div class="flex gap-3">
            <div class="w-20 flex-shrink-0">
                <span class="inline-block px-3 py-1 bg-sage/20 text-sage rounded-full text-sm font-medium">Hari ${day.day}</span>
            </div>
            <p class="text-textgreen text-sm">${day.activities}</p>
        </div>
    `).join('');
    
    document.getElementById('modal-gear').innerHTML = trip.gear.map(item => `
        <li class="flex items-center gap-2 text-sm text-textgreen">
            <svg class="w-4 h-4 text-sunset flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
            </svg>
            ${item}
        </li>
    `).join('');
    
    document.getElementById('trip-modal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeTripModal() {
    document.getElementById('trip-modal').classList.remove('active');
    document.body.style.overflow = '';
}

function openRegisterModal() {
    if (!currentTripId) return;
    
    const trip = trips.find(t => t.id === currentTripId);
    if (!trip) return;
    
    document.getElementById('trip-id').value = trip.id;
    updateTotalPrice(trip.price);
    document.getElementById('register-modal').classList.add('active');
}

function closeRegisterModal() {
    document.getElementById('register-modal').classList.remove('active');
    document.getElementById('registration-form').reset();
}

function updateTotalPrice(basePrice) {
    const participants = parseInt(document.querySelector('select[name="participants"]').value) || 1;
    const total = basePrice * participants;
    document.getElementById('total-price').textContent = formatRupiah(total);
}

function showSuccessModal() {
    document.getElementById('success-modal').classList.add('active');
}

function closeSuccessModal() {
    document.getElementById('success-modal').classList.remove('active');
    closeRegisterModal();
    closeTripModal();
}

// =============================================
// LIGHTBOX FUNCTIONS
// =============================================

function openLightbox(index) {
    currentLightboxIndex = index;
    updateLightboxImage();
    document.getElementById('lightbox').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    document.getElementById('lightbox').classList.remove('active');
    document.body.style.overflow = '';
}

function updateLightboxImage() {
    const image = galleryImages[currentLightboxIndex];
    document.getElementById('lightbox-image').src = image.src;
}

function nextImage() {
    currentLightboxIndex = (currentLightboxIndex + 1) % galleryImages.length;
    updateLightboxImage();
}

function prevImage() {
    currentLightboxIndex = (currentLightboxIndex - 1 + galleryImages.length) % galleryImages.length;
    updateLightboxImage();
}

// =============================================
// ANIMATIONS
// =============================================

function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const target = parseInt(counter.dataset.target);
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    });
}

function setupScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.animate-fade-up').forEach(el => {
        observer.observe(el);
    });
}

// =============================================
// NAVIGATION
// =============================================

function setupNavigation() {
    const navbar = document.getElementById('navbar');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    
    // Scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('nav-scrolled');
        } else {
            navbar.classList.remove('nav-scrolled');
        }
    });
    
    // Mobile menu toggle
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        if (mobileMenu.classList.contains('hidden')) {
            menuIcon.setAttribute('d', 'M4 6h16M4 12h16M4 18h16');
        } else {
            menuIcon.setAttribute('d', 'M6 18L18 6M6 6l12 12');
        }
    });
    
    // Close mobile menu on link click
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            menuIcon.setAttribute('d', 'M4 6h16M4 12h16M4 18h16');
        });
    });
}

// =============================================
// FILTER
// =============================================

function setupFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => {
                b.classList.remove('bg-sunset', 'text-white');
                b.classList.add('bg-white', 'text-textgreen');
            });
            btn.classList.remove('bg-white', 'text-textgreen');
            btn.classList.add('bg-sunset', 'text-white');
            
            const filter = btn.dataset.filter;
            renderTrips(filter);
        });
    });
}

// =============================================
// FORM HANDLERS
// =============================================

function setupForms() {
    // Contact form
    document.getElementById('contact-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);
        
        // Save to localStorage
        const messages = JSON.parse(localStorage.getItem('jajakTarus_messages') || '[]');
        messages.push({ ...data, timestamp: new Date().toISOString() });
        localStorage.setItem('jajakTarus_messages', JSON.stringify(messages));
        
        alert('Terima kasih! Pesan kamu sudah terkirim.');
        e.target.reset();
    });
    
    // Registration form
    document.getElementById('registration-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);
        data.tripId = currentTripId;
        
        // Save to localStorage
        const registrations = JSON.parse(localStorage.getItem('jajakTarus_registrations') || '[]');
        registrations.push({ ...data, timestamp: new Date().toISOString() });
        localStorage.setItem('jajakTarus_registrations', JSON.stringify(registrations));
        
        showSuccessModal();
    });
    
    // Participant change
    document.querySelector('select[name="participants"]').addEventListener('change', () => {
        if (currentTripId) {
            const trip = trips.find(t => t.id === currentTripId);
            if (trip) updateTotalPrice(trip.price);
        }
    });
}

// =============================================
// EVENT LISTENERS
// =============================================

function setupEventListeners() {
    // Modal close buttons
    document.getElementById('close-modal').addEventListener('click', closeTripModal);
    document.getElementById('close-register').addEventListener('click', closeRegisterModal);
    document.getElementById('close-success').addEventListener('click', closeSuccessModal);
    
    // Register button
    document.getElementById('register-trip').addEventListener('click', openRegisterModal);
    
    // Lightbox
    document.getElementById('close-lightbox').addEventListener('click', closeLightbox);
    document.getElementById('prev-image').addEventListener('click', prevImage);
    document.getElementById('next-image').addEventListener('click', nextImage);
    
    // Close modals on backdrop click
    document.getElementById('trip-modal').addEventListener('click', (e) => {
        if (e.target.id === 'trip-modal') closeTripModal();
    });
    
    document.getElementById('register-modal').addEventListener('click', (e) => {
        if (e.target.id === 'register-modal') closeRegisterModal();
    });
    
    document.getElementById('lightbox').addEventListener('click', (e) => {
        if (e.target.id === 'lightbox') closeLightbox();
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (document.getElementById('lightbox').classList.contains('active')) {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') prevImage();
            if (e.key === 'ArrowRight') nextImage();
        }
    });
}

// =============================================
// INITIALIZATION
// =============================================

document.addEventListener('DOMContentLoaded', () => {
    renderMembers();
    renderTrips();
    renderGallery();
    setupNavigation();
    setupFilter();
    setupForms();
    setupEventListeners();
    
    // Delay animations slightly
    setTimeout(() => {
        setupScrollAnimations();
        animateCounters();
    }, 100);
});

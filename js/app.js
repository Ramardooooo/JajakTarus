// =============================================
// DATA - Members, Trips, Gallery, Blog, Weather, Forum
// =============================================

// Safe localStorage wrapper for file:// protocol
const safeStorage = {
    getItem: (key) => {
        try { return localStorage.getItem(key); } 
        catch(e) { return null; }
    },
    setItem: (key, value) => {
        try { localStorage.setItem(key, value); } 
        catch(e) { console.log('Storage not available'); }
    }
};

const members = [
    { id: 1, name: "Rizky Pratama", role: "Founder & Lead Climber", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop", bio: "Pendaki veteran dengan pengalaman 50+ pendakian. Spesialis gunung berapi.", social: { instagram: "@rizkypratama", whatsapp: "+6281234567890" } },
    { id: 2, name: "Ahmad Fauzi", role: "Trip Coordinator", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop", bio: "Ahli logistik dan perencanaan trip. Pastikan semuanya terorganisir dengan sempurna.", social: { instagram: "@ahmadfauzi", whatsapp: "+6281234567891" } },
    { id: 3, name: "Siti Nurhaliza", role: "Medical Officer", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop", bio: "Dokter dan pendaki. Selalu siap menangani keadaan darurat di gunung.", social: { instagram: "@sitinurhaliza", whatsapp: "+6281234567892" } },
    { id: 4, name: "Budi Santoso", role: "Navigator & Scout", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop", bio: "Master navigasi dan pembaca alam. Tidak pernah tersesat.", social: { instagram: "@budisantoso", whatsapp: "+6281234567893" } },
    { id: 5, name: "Dewi Lestari", role: "Equipment Specialist", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop", bio: "Ahli perlengkapan mountaineering. Gear terbaik untuk setiap kondisi.", social: { instagram: "@dewilestari", whatsapp: "+6281234567894" } },
    { id: 6, name: "Agus Setiawan", role: "Photographer", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop", bio: "Dokumenter dan fotografer. Abadikan setiap momen di puncak.", social: { instagram: "@agusfoto", whatsapp: "+6281234567895" } },
    { id: 7, name: "Maya Putri", role: "Environment Officer", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop", bio: "Champion lingkungan. Pastikan gunung tetap bersih setiap pendakian.", social: { instagram: "@mayaputri", whatsapp: "+6281234567896" } },
    { id: 8, name: "Dimas Rahman", role: "Camp Master", image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&h=400&fit=crop", bio: "Spesialis kemah dan survival. Buat basecamp yang nyaman di segala cuaca.", social: { instagram: "@dimasrahman", whatsapp: "+6281234567897" } }
];

const trips = [
    { id: 1, name: "Gunung Bromo", location: "Taman Nasional Bromo Tengger Semeru, Jawa Timur", height: 2329, difficulty: "easy", duration: 2, distance: 120, price: 350000, image: "https://images.unsplash.com/photo-1537979268529-3a3d3a5e9b0f?w=600&h=400&fit=crop", description: "Nikmati keindahan matahari terbit di atas lautan pasir Bromo. Cocok untuk pemula.", itinerary: [{ day: 1, activities: "Berangkat dari Jakarta → Tiba di Cemoro Lawang → Check in homestay → Briefing" }, { day: 2, activities: "03.00 Berangkat ke Penanjakan → Sunrise viewing → Trekking ke kawah Bromo" }], gear: ["Sepatu hiking", "Jaket tebal", "Senter", "Masker"], schedules: [{ date: "2026-04-18", slots: 12, booked: 5 }, { date: "2026-05-02", slots: 12, booked: 8 }] },
    { id: 2, name: "Gunung Merbabu", location: "Boyolali, Jawa Tengah", height: 3145, difficulty: "easy", duration: 2, distance: 150, price: 450000, image: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=600&h=400&fit=crop", description: "Gunung populer dengan padang savana yang luas di puncaknya.", itinerary: [{ day: 1, activities: "Berangkat dari Jakarta → Tiba di basecamp Kopeng → Briefing" }, { day: 2, activities: "Lanjutkan pendakian → Savana Wekas → Puncak Merbabu → Pulang" }], gear: ["Sepatu hiking", "Jaket windbreaker", "Senter", "Tongkat hiking"], schedules: [{ date: "2026-04-25", slots: 10, booked: 7 }, { date: "2026-05-09", slots: 10, booked: 3 }] },
    { id: 3, name: "Gunung Sindoro", location: "Wonosobo, Jawa Tengah", height: 3150, difficulty: "medium", duration: 2, distance: 180, price: 400000, image: "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=600&h=400&fit=crop", description: "Twin mountain dengan Sumbing. Dijuluki alsummit karena padang savana yang indah.", itinerary: [{ day: 1, activities: "Berangkat dari Jakarta → Tiba di basecamp Kledung → Start pendakian sore" }, { day: 2, activities: "2.00 reach summit → Sunrise viewing → Turun" }], gear: ["Sepatu hiking", "Jaket waterproof", "Senter", "Tongkat hiking"], schedules: [{ date: "2026-05-03", slots: 8, booked: 6 }, { date: "2026-05-17", slots: 8, booked: 1 }] },
    { id: 4, name: "Gunung Lawu", location: "Karanganyar, Jawa Tengah", height: 3265, difficulty: "medium", duration: 3, distance: 200, price: 500000, image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&h=400&fit=crop", description: "Gunung misterius dengan kawah indah di puncaknya.", itinerary: [{ day: 1, activities: "Berangkat dari Jakarta → Tiba di basecamp Cempero → Briefing" }, { day: 2, activities: "Start pendakian pagi → Camping di summit" }, { day: 3, activities: "Sunrise viewing → Eksplorasi kawah → Pulang" }], gear: ["Sepatu hiking", "Sleeping bag", "Matras", "Jaket tebal"], schedules: [{ date: "2026-05-07", slots: 8, booked: 4 }, { date: "2026-05-21", slots: 8, booked: 0 }] },
    { id: 5, name: "Gunung Semeru", location: "Taman Nasional Bromo Tengger Semeru, Jawa Timur", height: 3676, difficulty: "hard", duration: 4, distance: 250, price: 750000, image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&h=400&fit=crop", description: "Gunung tertinggi di Jawa! Pendakian challenging melewati Ranu Kumbolo.", itinerary: [{ day: 1, activities: "Berangkat → Tiba di Ranu Pani → Start pendakian sore" }, { day: 2, activities: "Menuju Oro-oro Ombo → climb Arcopodo" }, { day: 3, activities: "3.00 Summit attempt → Sunrise" }, { day: 4, activities: "Explore Ranu Kumbolo → Pulang" }], gear: ["Sepatu hiking", "Sleeping bag", "Jacket alpine", "P3K lengkap"], schedules: [{ date: "2026-05-14", slots: 6, booked: 6 }, { date: "2026-06-04", slots: 6, booked: 2 }] },
    { id: 6, name: "Gunung Rinjani", location: "Taman Nasional Rinjani, Lombok, NTB", height: 3726, difficulty: "hard", duration: 4, distance: 450, price: 850000, image: "https://images.unsplash.com/photo-1580502304784-8985b7eb7260?w=600&h=400&fit=crop", description: "Gunung favorit dengan Danau Segara Anak di kalderanya.", itinerary: [{ day: 1, activities: "Penerbangan → Lombok → Tiba di Sembalun → Start" }, { day: 2, activities: "Menuju crater rim → Camping" }, { day: 3, activities: "Sunrise dari crater rim → Danau Segara Anak" }, { day: 4, activities: "Climb summit → Pulang" }], gear: ["Sepatu hiking", "Sleeping bag", "Jacket alpine", "P3K"], schedules: [{ date: "2026-05-20", slots: 6, booked: 3 }, { date: "2026-06-10", slots: 6, booked: 0 }] },
    { id: 7, name: "Gunung Smeru", location: "Taman Nasional Bromo Tengger Semeru, Jawa Timur", height: 3676, difficulty: "hard", duration: 3, distance: 260, price: 550000, image: "https://images.unsplash.com/photo-1501555088652-021faa106b9b?w=600&h=400&fit=crop", description: "Twin peak dengan Semeru. Pendakian lebih sepi dan challenging.", itinerary: [{ day: 1, activities: "Berangkat → Tiba di Ranu Pani → Start pendakian" }, { day: 2, activities: "Continue climb → Summit attempt" }, { day: 3, activities: "Turun → Pulang" }], gear: ["Sepatu hiking", "Sleeping bag", "Jacket alpine"], schedules: [{ date: "2026-05-28", slots: 6, booked: 1 }, { date: "2026-06-18", slots: 6, booked: 0 }] },
    { id: 8, name: "Gunung Kelimutu", location: "K Flores, NTT", height: 1639, difficulty: "easy", duration: 4, distance: 800, price: 1200000, image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600&h=400&fit=crop", description: "Tiga danau dengan warna berbeda di satu puncak!", itinerary: [{ day: 1, activities: "Penerbangan → Ende → Tiba di Moni → Check in" }, { day: 2, activities: "Pagi naik ke viewpoint → Sunrise di Kelimutu" }, { day: 3, activities: "Kunjungi waterfalls → Explore desa" }, { day: 4, activities: "Pagi santai → Pulang" }], gear: ["Sepatu tracking", "Jaket ringan", "Kamera"], schedules: [{ date: "2026-06-01", slots: 8, booked: 2 }, { date: "2026-06-22", slots: 8, booked: 0 }] }
];

// Indonesian cities coordinates for weather search
const cityLocations = {
    "jakarta": { name: "Jakarta", lat: -6.2088, lon: 106.8456 },
    "bandung": { name: "Bandung", lat: -6.9175, lon: 107.6191 },
    "yogyakarta": { name: "Yogyakarta", lat: -7.7956, lon: 110.3695 },
    "surabaya": { name: "Surabaya", lat: -7.2575, lon: 112.7521 },
    "malang": { name: "Malang", lat: -7.9778, lon: 112.6334 },
    "semarang": { name: "Semarang", lat: -6.9667, lon: 110.4205 },
    "denpasar": { name: "Denpasar", lat: -8.6705, lon: 115.2126 },
    "makassar": { name: "Makassar", lat: -5.1421, lon: 119.4128 },
    "medan": { name: "Medan", lat: 3.5952, lon: 98.6722 },
    "palembang": { name: "Palembang", lat: -2.9911, lon: 104.7558 },
    "jogja": { name: "Yogyakarta", lat: -7.7956, lon: 110.3695 },
    "bogor": { name: "Bogor", lat: -6.5950, lon: 106.8161 },
    "depok": { name: "Depok", lat: -6.4025, lon: 106.7942 },
    "tangerang": { name: "Tangerang", lat: -6.1783, lon: 106.6300 },
    "bekasi": { name: "Bekasi", lat: -6.2419, lon: 106.9926 },
    "solo": { name: "Solo", lat: -7.5755, lon: 110.8243 },
    "jember": { name: "Jember", lat: -8.1696, lon: 113.7024 },
    "kediri": { name: "Kediri", lat: -7.8481, lon: 112.0187 },
    "sleman": { name: "Sleman", lat: -7.7167, lon: 110.3561 },
    "banyumas": { name: "Banyumas", lat: -7.5167, lon: 109.2833 },
    "garut": { name: "Garut", lat: -7.2076, lon: 107.9047 },
    "cianjur": { name: "Cianjur", lat: -6.8188, lon: 107.1456 },
    "subang": { name: "Subang", lat: -6.5700, lon: 107.7600 },
    "purwokerto": { name: "Purwokerto", lat: -7.4200, lon: 109.2300 },
    "pekalongan": { name: "Pekalongan", lat: -6.8883, lon: 109.6753 },
    "banjarmasin": { name: "Banjarmasin", lat: -3.3194, lon: 114.8944 },
    "balikpapan": { name: "Balikpapan", lat: -1.2675, lon: 116.8389 },
    "samarinda": { name: "Samarinda", lat: -0.5017, lon: 117.1466 },
    "pontianak": { name: "Pontianak", lat: -0.0263, lon: 109.3350 },
    "manado": { name: "Manado", lat: 1.4741, lon: 124.8421 },
    "padang": { name: "Padang", lat: -0.9480, lon: 100.3613 },
    "pekanbaru": { name: "Pekanbaru", lat: 0.5071, lon: 101.4478 },
    "batam": { name: "Batam", lat: 1.0456, lon: 104.0300 },
    "lombok": { name: "Lombok", lat: -8.6500, lon: 116.3247 },
    "bali": { name: "Bali", lat: -8.4095, lon: 115.1889 },
    "jambi": { name: "Jambi", lat: -1.6101, lon: 103.6131 },
    "lampung": { name: "Lampung", lat: -5.4292, lon: 105.2621 },
    "surakarta": { name: "Surakarta", lat: -7.5755, lon: 110.8243 }
};

let currentWeather = null;

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

// Forum Data
let forumTopics = JSON.parse(localStorage.getItem('jajakTarus_forum') || '[]');

// Initialize with default data if empty or invalid
if (forumTopics.length === 0) {
    forumTopics = [
        { id: 1, title: "Tips Mendaki Gunung untuk Pemula", category: "tips", author: "Rizky Pratama", authorId: 1, content: "Hai semua! Buat kalian yang baru pertama kali mendaki gunung, berikut tips dari saya:\n\n1. Latihan fisik minimal 2 minggu sebelum pendakian\n2. Pastikan perlengkapan lengkap\n3. Jangan malu bertanya pada guide\n4. Bawa air yang cukup\n5. Jangan mendaki sendirian\n\nSemoga bermanfaat!", createdAt: "2026-04-08T10:30:00Z", likes: 15, replies: 8, isSticky: true },
        { id: 2, title: "Rekomendasi Sleeping Bag untuk Pendakian 2 Hari", category: "gear", author: "Dewi Lestari", authorId: 5, content: "Mau tanya rekomendasi sleeping bag yang cocok untuk pendakian 2 hari di gunung medium? Budget sekitar 500rb-1jt. Terima kasih!", createdAt: "2026-04-07T15:20:00Z", likes: 8, replies: 12, isSticky: false },
        { id: 3, title: "Cerita Pendakian Saya ke Semeru Bulan Lalu", category: "story", author: "Agus Setiawan", authorId: 6, content: "Seneng banget finally bisa summit Semeru! Perjalanan 4 hari 3 malam emang nggak gampang, tapi view di atas sana bikin lupa capek. Ranu Kumbolo nya cantik banget, airnya biru kehijauan. Highly recommend untuk yang mau challenge diri!", createdAt: "2026-04-06T08:45:00Z", likes: 23, replies: 15, isSticky: false },
        { id: 4, title: "Berapa Liter Air yang Dibawa untuk Pendakian 3 Hari?", category: "question", author: "Maya Putri", authorId: 7, content: "Halo semuanya! Saya mau tanya, untuk pendakian 3 hari biasanya bawa berapa liter air ya? Apakah perlu bawa filter air juga? Terima kasih sebelumnya!", createdAt: "2026-04-05T20:15:00Z", likes: 5, replies: 6, isSticky: false },
        { id: 5, title: "10 Kesalahan Fatal Pendaki Pemula yang Harus Dihindari", category: "tips", author: "Budi Santoso", authorId: 8, content: "Sebagai pendaki yang udah banyak pengalaman, saya mau bagi 10 kesalahan fatal yang sering dilakukan pemula:\n\n1. недооценивают kondisi fisik\n2. Bawa terlalu banyak barang\n3. Nggak cek cuaca\n4. Nggak bawa backup makanan\n5. Mendaki sendirian\n\nStay safe di gunung ya!", createdAt: "2026-04-04T14:00:00Z", likes: 32, replies: 20, isSticky: false }
    ];
    localStorage.setItem('jajakTarus_forum', JSON.stringify(forumTopics));
}

let forumReplies = JSON.parse(localStorage.getItem('jajakTarus_forum_replies') || '[]');

if (forumReplies.length === 0) {
    forumReplies = [
        { id: 1, topicId: 1, author: "Ahmad Fauzi", content: "Bagus banget tipsnya! Saya tambahkan: selalu bawa obat pribadi dan P3K.", createdAt: "2026-04-08T11:00:00Z", likes: 3 },
        { id: 2, topicId: 1, author: "Budi Santoso", content: "Jangan lupa juga untuk selalu patuhi aturan di Gunung ya!", createdAt: "2026-04-08T11:30:00Z", likes: 5 },
        { id: 3, topicId: 2, author: "Dewi Lestari", content: "Kalau budget 500rb-1jt, saya recommend Decathlon Forclaz MT500. Sudah cukup hangat!", createdAt: "2026-04-07T16:00:00Z", likes: 7 },
        { id: 4, topicId: 2, author: "Dimas Rahman", content: "Saya pake Forclaz MT500, udah 2 tahun masih awet!", createdAt: "2026-04-07T16:30:00Z", likes: 4 }
    ];
    localStorage.setItem('jajakTarus_forum_replies', JSON.stringify(forumReplies));
}

// Reset forum data function
function resetForumData() {
    forumTopics = [
        { id: 1, title: "Tips Mendaki Gunung untuk Pemula", category: "tips", author: "Rizky Pratama", authorId: 1, content: "Hai semua! Buat kalian yang baru pertama kali mendaki gunung, berikut tips dari saya:\n\n1. Latihan fisik minimal 2 minggu sebelum pendakian\n2. Pastikan perlengkapan lengkap\n3. Jangan malu bertanya pada guide\n4. Bawa air yang cukup\n5. Jangan mendaki sendirian\n\nSemoga bermanfaat!", createdAt: "2026-04-08T10:30:00Z", likes: 15, replies: 8, isSticky: true },
        { id: 2, title: "Rekomendasi Sleeping Bag untuk Pendakian 2 Hari", category: "gear", author: "Dewi Lestari", authorId: 5, content: "Mau tanya rekomendasi sleeping bag yang cocok untuk pendakian 2 hari di gunung medium? Budget sekitar 500rb-1jt. Terima kasih!", createdAt: "2026-04-07T15:20:00Z", likes: 8, replies: 12, isSticky: false },
        { id: 3, title: "Cerita Pendakian Saya ke Semeru Bulan Lalu", category: "story", author: "Agus Setiawan", authorId: 6, content: "Seneng banget finally bisa summit Semeru! Perjalanan 4 hari 3 malam emang nggak gampang, tapi view di atas sana bikin lupa capek. Ranu Kumbolo nya cantik banget!", createdAt: "2026-04-06T08:45:00Z", likes: 23, replies: 15, isSticky: false },
        { id: 4, title: "Berapa Liter Air yang Dibawa untuk Pendakian 3 Hari?", category: "question", author: "Maya Putri", authorId: 7, content: "Halo semuanya! Saya mau tanya, untuk pendakian 3 hari biasanya bawa berapa liter air ya? Terima kasih sebelumnya!", createdAt: "2026-04-05T20:15:00Z", likes: 5, replies: 6, isSticky: false },
        { id: 5, title: "10 Kesalahan Fatal Pendaki Pemula", category: "tips", author: "Budi Santoso", authorId: 8, content: "Saya mau bagi 10 kesalahan fatal yang sering dilakukan pemula:\n\n1. Nggak latihan fisik\n2. Bawa terlalu banyak barang\n3. Nggak cek cuaca\n4. Nggak bawa backup makanan\n\nStay safe di gunung ya!", createdAt: "2026-04-04T14:00:00Z", likes: 32, replies: 20, isSticky: false }
    ];
    forumReplies = [
        { id: 1, topicId: 1, author: "Ahmad Fauzi", content: "Bagus banget tipsnya!", createdAt: "2026-04-08T11:00:00Z", likes: 3 },
        { id: 2, topicId: 1, author: "Budi Santoso", content: "Jangan lupa juga untuk selalu patuhi aturan!", createdAt: "2026-04-08T11:30:00Z", likes: 5 }
    ];
    try {
        localStorage.setItem('jajakTarus_forum', JSON.stringify(forumTopics));
        localStorage.setItem('jajakTarus_forum_replies', JSON.stringify(forumReplies));
        localStorage.setItem('jajakTarus_forum_reset', Date.now().toString());
    } catch(e) {
        console.log('LocalStorage not available (file:// protocol)');
    }
}

// =============================================
// STATE
// =============================================

let currentUser = JSON.parse(localStorage.getItem('jajakTarus_currentUser')) || null;
let currentCalendarDate = new Date();
let selectedTripDate = null;
let selectedTripForBooking = null;
let currentForumCategory = 'all';
let selectedTopicId = null;
let isAdmin = false;
let currentAdminTab = 'overview';

// Admin credentials
const ADMIN_EMAIL = 'admin@jakaktarus.id';
const ADMIN_PASSWORD = 'admin123';

// =============================================
// UTILITY FUNCTIONS
// =============================================

function formatRupiah(number) {
    return 'Rp ' + number.toLocaleString('id-ID');
}

function getDifficultyLabel(level) {
    const labels = { easy: 'Pemula', medium: 'Menengah', hard: 'Lanjutan' };
    return labels[level] || level;
}

function getDifficultyClass(level) {
    const classes = { easy: 'difficulty-easy', medium: 'difficulty-medium', hard: 'difficulty-hard' };
    return classes[level] || 'difficulty-easy';
}

function getCategoryLabel(category) {
    const labels = { tips: 'Tips', story: 'Cerita', gear: 'Gear', question: 'Pertanyaan' };
    return labels[category] || category;
}

function getCategoryClass(category) {
    const classes = { tips: 'bg-sage', story: 'bg-sunset', gear: 'bg-purple-500', question: 'bg-blue-500' };
    return classes[category] || 'bg-sage';
}

function getCategoryBgClass(category) {
    const classes = { tips: 'bg-sage/10 text-sage', story: 'bg-sunset/10 text-sunset', gear: 'bg-purple-500/10 text-purple-500', question: 'bg-blue-500/10 text-blue-500' };
    return classes[category] || 'bg-sage/10 text-sage';
}

function getWeatherIcon(icon) {
    const icons = {
        sunny: '<svg class="w-12 h-12 text-yellow-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0z"/></svg>',
        cloudy: '<svg class="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M4.5 9.75a6 6 0 0111.573-2.226 3.75 3.75 0 014.133 4.303A4.5 4.5 0 018.25 19.5H5.25a3 3 0 01-.8-5.939 6 6 0 01-.025-1.311z"/></svg>',
        rainy: '<svg class="w-12 h-12 text-blue-400" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M10.5 3.75a6 6 0 100 12 6 6 0 000-12zM4.5 9.75a6 6 0 117.32 5.34 4.5 4.5 0 10-7.32-5.34z"/></svg>',
        stormy: '<svg class="w-12 h-12 text-gray-600" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M2.625 6.75a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zm4.875 0A.75.75 0 018.25 6h12a.75.75 0 010 1.5h-12a.75.75 0 01-.75-.75z"/></svg>'
    };
    return icons[icon] || icons.cloudy;
}

function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
}

function formatDateTime(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}

function formatRelativeTime(dateStr) {
    const date = new Date(dateStr);
    const now = new Date();
    const diff = now - date;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    
    if (hours < 1) return 'Baru saja';
    if (hours < 24) return hours + ' jam lalu';
    if (days < 7) return days + ' hari lalu';
    return formatDate(dateStr);
}

function generateBookingCode() {
    return 'JT-' + Date.now().toString(36).toUpperCase() + Math.random().toString(36).substring(2, 6).toUpperCase();
}

// =============================================
// AUTH FUNCTIONS
// =============================================

function checkAuth() {
    if (currentUser) {
        document.getElementById('auth-buttons').classList.add('hidden');
        document.getElementById('user-menu').classList.remove('hidden');
        document.getElementById('user-name').textContent = currentUser.name;
        document.getElementById('user-initial').textContent = currentUser.name.charAt(0).toUpperCase();
        document.getElementById('mobile-auth').classList.add('hidden');
        
        // Check if admin
        isAdmin = currentUser.email === ADMIN_EMAIL;
        updateAdminVisibility();
    } else {
        document.getElementById('auth-buttons').classList.remove('hidden');
        document.getElementById('user-menu').classList.add('hidden');
        document.getElementById('mobile-auth').classList.remove('hidden');
        isAdmin = false;
        updateAdminVisibility();
    }
}

function updateAdminVisibility() {
    const adminSection = document.getElementById('admin');
    if (isAdmin) {
        adminSection.classList.remove('hidden');
        // Add admin link to nav
        const navLinks = document.querySelector('.nav-link[href="#kontak"]');
        if (navLinks && !document.querySelector('.nav-link[href="#admin"]')) {
            const adminLink = document.createElement('a');
            adminLink.href = '#admin';
            adminLink.className = 'nav-link text-white hover:text-sunset transition-colors font-medium';
            adminLink.textContent = 'Dashboard';
            navLinks.parentNode.insertBefore(adminLink, navLinks.nextSibling);
        }
    } else {
        adminSection.classList.add('hidden');
        const adminLink = document.querySelector('.nav-link[href="#admin"]');
        if (adminLink) adminLink.remove();
    }
}

function login(email, password) {
    if (!db.isInitialized) {
        showToast('Database belum terbuka. Buka admin dashboard dulu.');
        return false;
    }
    
    const result = db.loginUser(email, password);
    
    if (result.success) {
        currentUser = result.user;
        currentUser.isAdmin = result.user.role === 'admin';
        localStorage.setItem('jajakTarus_currentUser', JSON.stringify(currentUser));
        checkAuth();
        closeModal('login-modal');
        showToast('Login berhasil! Selamat datang, ' + result.user.name);
        return true;
    }
    
    showToast(result.message);
    return false;
}

function register(name, email, whatsapp, password) {
    if (!db.isInitialized) {
        showToast('Database belum terbuka. Buka admin dashboard dulu.');
        return false;
    }
    
    const result = db.registerUser(name, email, whatsapp, password);
    
    if (result.success) {
        const newUser = db.getUserById(result.userId);
        currentUser = newUser;
        currentUser.isAdmin = false;
        localStorage.setItem('jajakTarus_currentUser', JSON.stringify(currentUser));
        checkAuth();
        closeModal('register-modal');
        showToast('Registrasi berhasil! Selamat bergabung, ' + name);
        return true;
    }
    
    showToast(result.message);
    return false;
}

function logout() {
    currentUser = null;
    localStorage.removeItem('jajakTarus_currentUser');
    checkAuth();
    showToast('Anda telah keluar dari akun');
    window.location.href = '#beranda';
}

function requireAuth(callback) {
    if (currentUser) {
        callback();
    } else {
        openModal('login-modal');
    }
}

// =============================================
// MODAL FUNCTIONS
// =============================================

function openModal(modalId) {
    document.getElementById(modalId).classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
    if (!document.querySelector('.modal.active')) {
        document.body.style.overflow = '';
    }
}

function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'fixed bottom-4 right-4 bg-sage text-white px-6 py-3 rounded-xl shadow-lg z-[100] animate-fade-up';
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

// =============================================
// RENDER FUNCTIONS
// =============================================

function renderMembers() {
    const grid = document.getElementById('members-grid');
    if (!grid) return;
    
    grid.innerHTML = members.map(member => `
        <div class="member-card group relative overflow-hidden rounded-2xl cursor-pointer animate-fade-up">
            <div class="aspect-square overflow-hidden">
                <img src="${member.image}" alt="${member.name}" class="w-full h-full object-cover transition-transform duration-500">
            </div>
            <div class="absolute inset-0 bg-gradient-to-t from-forest via-forest/80 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-4">
                <h4 class="font-poppins font-bold text-lg text-white">${member.name}</h4>
                <p class="text-sunset text-sm mb-2">${member.role}</p>
                <p class="text-white/80 text-xs mb-3 line-clamp-2">${member.bio}</p>
                <div class="flex gap-2">
                    <a href="https://instagram.com/${member.social.instagram.replace('@', '')}" target="_blank" class="w-8 h-8 bg-white/20 hover:bg-sunset rounded-full flex items-center justify-center transition-colors">
                        <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069z"/></svg>
                    </a>
                    <a href="https://wa.me/${member.social.whatsapp}" target="_blank" class="w-8 h-8 bg-white/20 hover:bg-sunset rounded-full flex items-center justify-center transition-colors">
                        <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/></svg>
                    </a>
                </div>
            </div>
            <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-forest to-transparent p-4 md:hidden">
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
    
    grid.innerHTML = filteredTrips.map(trip => {
        const availableSlots = trip.schedules.reduce((sum, s) => sum + (s.slots - s.booked), 0);
        return `
        <div class="trip-card bg-white rounded-2xl overflow-hidden shadow-lg transition-all duration-300 cursor-pointer animate-fade-up" data-id="${trip.id}">
            <div class="relative h-48">
                <img src="${trip.image}" alt="${trip.name}" class="w-full h-full object-cover">
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <span class="absolute top-4 left-4 px-3 py-1 rounded-full text-white text-xs font-medium ${getDifficultyClass(trip.difficulty)}">${getDifficultyLabel(trip.difficulty)}</span>
                ${availableSlots > 0 ? `<span class="absolute top-4 right-4 px-3 py-1 rounded-full bg-sage text-white text-xs font-medium">${availableSlots} slot</span>` : '<span class="absolute top-4 right-4 px-3 py-1 rounded-full bg-red-500 text-white text-xs font-medium">Penuh</span>'}
            </div>
            <div class="p-5">
                <h3 class="font-poppins font-bold text-xl text-forest mb-1">${trip.name}</h3>
                <p class="text-textgreen/70 text-sm mb-4 flex items-center gap-1">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/></svg>
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
                    <button class="btn-primary px-4 py-2 rounded-lg text-white font-medium text-sm">Detail</button>
                </div>
            </div>
        </div>
    `}).join('');
    
    document.querySelectorAll('.trip-card').forEach(card => {
        card.addEventListener('click', () => {
            const tripId = parseInt(card.dataset.id);
            openTripModal(tripId);
        });
    });
}

// Search weather by location
async function searchWeather(query) {
    const loadingEl = document.getElementById('weather-loading');
    const resultEl = document.getElementById('weather-result');
    const noResultEl = document.getElementById('weather-no-result');
    
    if (!query) {
        query = document.getElementById('weather-search-input')?.value || '';
    }
    
    if (!query.trim()) return;
    
    // Show loading
    if (loadingEl) loadingEl.classList.remove('hidden');
    if (resultEl) resultEl.classList.add('hidden');
    if (noResultEl) noResultEl.classList.add('hidden');
    
    const normalizedQuery = query.toLowerCase().trim();
    const location = cityLocations[normalizedQuery];
    
    if (!location) {
        // Try partial match
        const keys = Object.keys(cityLocations);
        const match = keys.find(k => k.includes(normalizedQuery) || normalizedQuery.includes(k));
        
        if (match) {
            searchWeather(match);
            return;
        }
        
        // No match found
        if (loadingEl) loadingEl.classList.add('hidden');
        if (noResultEl) noResultEl.classList.remove('hidden');
        return;
    }
    
    try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${location.lat}&longitude=${location.lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m,precipitation,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=auto`;
        
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.current) {
            const weatherCode = data.current.weather_code;
            const condition = getWeatherCondition(weatherCode);
            const icon = getWeatherIconType(weatherCode);
            const isGood = weatherCode < 50 && data.current.precipitation === 0;
            
            currentWeather = {
                location: location.name,
                temp: Math.round(data.current.temperature_2m),
                feelsLike: Math.round(data.current.apparent_temperature),
                humidity: data.current.relative_humidity_2m,
                wind: Math.round(data.current.wind_speed_10m),
                rain: data.current.precipitation,
                condition: condition,
                icon: icon,
                forecast: data.daily ? {
                    today: {
                        high: Math.round(data.daily.temperature_2m_max[0]),
                        low: Math.round(data.daily.temperature_2m_min[0]),
                        rainProb: data.daily.precipitation_probability_max[0]
                    },
                    tomorrow: {
                        high: Math.round(data.daily.temperature_2m_max[1]),
                        low: Math.round(data.daily.temperature_2m_min[1]),
                        rainProb: data.daily.precipitation_probability_max[1]
                    }
                } : null
            };
            
            renderWeatherResult();
        }
        
    } catch (error) {
        console.error('Error searching weather:', error);
        if (noResultEl) noResultEl.classList.remove('hidden');
        if (noResultEl) noResultEl.querySelector('p').textContent = 'Gagal mengambil data cuaca. Coba lagi.';
    } finally {
        if (loadingEl) loadingEl.classList.add('hidden');
    }
}

function renderWeatherResult() {
    const resultEl = document.getElementById('weather-result');
    if (!resultEl || !currentWeather) return;
    
    const w = currentWeather;
    const isGood = w.condition.includes("Cerah") || w.condition.includes("Sebagian");
    
    resultEl.innerHTML = `
        <div class="bg-white rounded-2xl overflow-hidden shadow-2xl">
            <div class="bg-gradient-to-br ${isGood ? 'from-green-500 to-green-600' : 'from-sunset to-orange-500'} p-8 text-white">
                <div class="flex items-center justify-between">
                    <div>
                        <h3 class="font-poppins font-bold text-3xl mb-1">${w.location}</h3>
                        <p class="text-white/80">${new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</p>
                    </div>
                    <div class="text-right">
                        <div class="text-7xl font-bold">${w.temp}°</div>
                        <p class="text-white/80">Feels like ${w.feelsLike}°</p>
                    </div>
                </div>
            </div>
            
            <div class="p-6">
                <div class="flex items-center gap-4 mb-6">
                    <div class="text-6xl">${getWeatherEmoji(w.icon)}</div>
                    <div>
                        <p class="font-poppins font-bold text-2xl text-forest">${w.condition}</p>
                        <p class="text-textgreen/70">${isGood ? '☀️ Cuaca bagus untuk aktivitas outdoor!' : '🌧️ Hati-hati saat beraktivitas di luar.'}</p>
                    </div>
                </div>
                
                <div class="grid grid-cols-3 gap-4 mb-6">
                    <div class="bg-cream/50 rounded-xl p-4 text-center">
                        <svg class="w-8 h-8 mx-auto mb-2 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"/>
                        </svg>
                        <p class="text-2xl font-bold text-forest">${w.humidity}%</p>
                        <p class="text-textgreen/60 text-sm">Kelembapan</p>
                    </div>
                    <div class="bg-cream/50 rounded-xl p-4 text-center">
                        <svg class="w-8 h-8 mx-auto mb-2 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                        </svg>
                        <p class="text-2xl font-bold text-forest">${w.wind} km/j</p>
                        <p class="text-textgreen/60 text-sm">Kecepatan Angin</p>
                    </div>
                    <div class="bg-cream/50 rounded-xl p-4 text-center">
                        <svg class="w-8 h-8 mx-auto mb-2 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
                        </svg>
                        <p class="text-2xl font-bold text-forest">${w.rain} mm</p>
                        <p class="text-textgreen/60 text-sm">Curah Hujan</p>
                    </div>
                </div>
                
                ${w.forecast ? `
                <div class="border-t border-sage/20 pt-6">
                    <h4 class="font-poppins font-bold text-forest mb-4">Ramalan Cuaca</h4>
                    <div class="grid grid-cols-2 gap-4">
                        <div class="bg-green-50 rounded-xl p-4">
                            <p class="text-textgreen/60 text-sm mb-2">Hari Ini</p>
                            <p class="font-bold text-forest">${w.forecast.today.high}° / ${w.forecast.today.low}°</p>
                            <p class="text-sm text-textgreen/70">Kemungkinan hujan: ${w.forecast.today.rainProb}%</p>
                        </div>
                        <div class="bg-blue-50 rounded-xl p-4">
                            <p class="text-textgreen/60 text-sm mb-2">Besok</p>
                            <p class="font-bold text-forest">${w.forecast.tomorrow.high}° / ${w.forecast.tomorrow.low}°</p>
                            <p class="text-sm text-textgreen/70">Kemungkinan hujan: ${w.forecast.tomorrow.rainProb}%</p>
                        </div>
                    </div>
                </div>
                ` : ''}
                
                <div class="mt-6 p-4 rounded-xl ${isGood ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}">
                    <p class="font-medium flex items-center gap-2">
                        ${isGood ? '✅' : '⚠️'} 
                        ${isGood ? 'Kondisi cuaca bagus untuk mendaki!' : 'Sebaiknya tunda pendakian karena cuaca kurang mendukung.'}
                    </p>
                </div>
            </div>
        </div>
    `;
    
    resultEl.classList.remove('hidden');
}

function quickSearch(city) {
    document.getElementById('weather-search-input').value = city;
    searchWeather(city);
}

function getWeatherCondition(code) {
    const conditions = {
        0: "Cerah",
        1: "Sebagian Cerah",
        2: "Berawan",
        3: "Mendung",
        45: "Berkabut",
        48: "Kabut Beku",
        51: "Gerimis Ringan",
        53: "Gerimis",
        55: "Gerimis Lebat",
        61: "Hujan Ringan",
        63: "Hujan Sedang",
        65: "Hujan Lebat",
        71: "Salju Ringan",
        73: "Salju Sedang",
        75: "Salju Lebat",
        77: "Butir Salju",
        80: "Hujan Petir Ringan",
        81: "Hujan Petir Sedang",
        82: "Hujan Petir Lebat",
        85: "Hujan Salju Ringan",
        86: "Hujan Salju Lebat",
        95: "Badai Petir",
        96: "Badai Petir + Hail",
        99: "Badai Petir + Hail Lebat"
    };
    return conditions[code] || "Tidak Diketahui";
}

function getWeatherIconType(code) {
    if (code === 0) return "sunny";
    if (code <= 3) return "cloudy";
    if (code <= 48) return "foggy";
    if (code <= 67) return "rainy";
    if (code <= 77) return "snowy";
    if (code >= 95) return "stormy";
    return "cloudy";
}

function getWeatherEmoji(type) {
    const emojis = {
        sunny: "☀️",
        cloudy: "⛅",
        foggy: "🌫️",
        rainy: "🌧️",
        snowy: "❄️",
        stormy: "⛈️"
    };
    return emojis[type] || "🌤️";
}

// Enter key to search
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('weather-search-input');
    if (searchInput) {
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                searchWeather();
            }
        });
    }
});

function renderGallery() {
    const grid = document.getElementById('gallery-grid');
    if (!grid) return;
    
    grid.innerHTML = galleryImages.map((image, index) => `
        <div class="gallery-item relative overflow-hidden rounded-xl cursor-pointer animate-fade-up" data-index="${index}">
            <img src="${image.src}" alt="Gallery ${index + 1}" class="w-full h-48 object-cover transition-transform duration-500">
            <div class="gallery-overlay absolute inset-0 bg-black/50 opacity-0 transition-opacity duration-300 flex items-center justify-center">
                <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"/></svg>
            </div>
        </div>
    `).join('');
    
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', () => {
            const index = parseInt(item.dataset.index);
            openLightbox(index);
        });
    });
}

function renderCalendar() {
    const grid = document.getElementById('calendar-grid');
    const title = document.getElementById('calendar-title');
    if (!grid) return;
    
    const year = currentCalendarDate.getFullYear();
    const month = currentCalendarDate.getMonth();
    
    title.textContent = currentCalendarDate.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' });
    
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();
    
    let html = '';
    
    for (let i = firstDay - 1; i >= 0; i--) {
        html += `<div class="calendar-day empty text-textgreen/30 p-2 text-center">${daysInPrevMonth - i}</div>`;
    }
    
    const today = new Date();
    const tripDates = trips.flatMap(t => t.schedules.map(s => s.date));
    
    for (let day = 1; day <= daysInMonth; day++) {
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const isToday = today.getDate() === day && today.getMonth() === month && today.getFullYear() === year;
        const hasTrip = tripDates.includes(dateStr);
        const isSelected = selectedTripDate === dateStr;
        
        html += `<div class="calendar-day ${hasTrip ? 'has-trip' : ''} ${isSelected ? 'selected' : ''} ${isToday ? 'ring-2 ring-sunset' : ''} bg-white text-textgreen p-2 text-center rounded-lg cursor-pointer" data-date="${dateStr}">${day}</div>`;
    }
    
    const totalCells = Math.ceil((firstDay + daysInMonth) / 7) * 7;
    for (let i = 1; i <= totalCells - firstDay - daysInMonth; i++) {
        html += `<div class="calendar-day empty other-month text-textgreen/30 p-2 text-center">${i}</div>`;
    }
    
    grid.innerHTML = html;
    
    document.querySelectorAll('.calendar-day:not(.empty):not(.other-month)').forEach(day => {
        day.addEventListener('click', () => {
            const date = day.dataset.date;
            selectCalendarDate(date);
        });
    });
}

function selectCalendarDate(date) {
    selectedTripDate = date;
    
    document.querySelectorAll('.calendar-day').forEach(d => d.classList.remove('selected'));
    document.querySelector(`[data-date="${date}"]`)?.classList.add('selected');
    
    const tripsOnDate = trips.filter(t => t.schedules.some(s => s.date === date));
    const infoContainer = document.getElementById('selected-trip-info');
    const listContainer = document.getElementById('selected-trips-list');
    
    if (tripsOnDate.length > 0) {
        infoContainer.classList.remove('hidden');
        listContainer.innerHTML = tripsOnDate.map(trip => {
            const schedule = trip.schedules.find(s => s.date === date);
            return `
                <div class="flex items-center justify-between bg-white rounded-lg p-3 cursor-pointer hover:bg-sage/10 transition-colors" onclick="openTripModal(${trip.id})">
                    <div>
                        <p class="font-medium text-forest">${trip.name}</p>
                        <p class="text-sm text-textgreen/60">${schedule.slots - schedule.booked} slot tersisa</p>
                    </div>
                    <span class="text-sunset font-bold">${formatRupiah(trip.price)}</span>
                </div>
            `;
        }).join('');
    } else {
        infoContainer.classList.add('hidden');
    }
}

// =============================================
// FORUM FUNCTIONS
// =============================================

function filterForum(category) {
    // Update global state
    currentForumCategory = category;
    
    // Update button styles
    const categories = ['all', 'tips', 'gear', 'story', 'question'];
    categories.forEach(cat => {
        const btn = document.getElementById('btn-' + cat);
        const countEl = document.getElementById('count-' + cat);
        
        if (btn) {
            if (cat === category) {
                btn.classList.add('bg-cream', 'font-bold', 'text-sunset', 'active');
                btn.classList.remove('text-textgreen');
                if (countEl) {
                    countEl.classList.add('bg-sunset/20', 'text-sunset');
                    countEl.classList.remove('bg-sage/20', 'text-sage');
                }
            } else {
                btn.classList.remove('bg-cream', 'font-bold', 'text-sunset', 'active');
                btn.classList.add('text-textgreen');
                if (countEl) {
                    countEl.classList.remove('bg-sunset/20', 'text-sunset');
                    countEl.classList.add('bg-sage/20', 'text-sage');
                }
            }
        }
    });
    
    // Render the forum
    renderForumTopics();
}

function renderForumTopics() {
    const topicsList = document.getElementById('topics-list');
    const forumEmpty = document.getElementById('forum-empty');
    const popularSidebar = document.getElementById('popular-topics-sidebar');
    
    if (!topicsList) return;
    
    // Load data from localStorage
    const storedTopics = JSON.parse(localStorage.getItem('jajakTarus_forum') || '[]');
    if (storedTopics.length > 0) {
        forumTopics = storedTopics;
    }
    
    // Update all category counts
    const categories = ['all', 'tips', 'gear', 'story', 'question'];
    categories.forEach(cat => {
        const countEl = document.getElementById('count-' + cat);
        if (countEl) {
            const count = cat === 'all' ? forumTopics.length : forumTopics.filter(t => t.category === cat).length;
            countEl.textContent = count;
        }
    });
    
    // Filter topics
    let filteredTopics = currentForumCategory === 'all' 
        ? [...forumTopics] 
        : forumTopics.filter(t => t.category === currentForumCategory);
    
    // Show/hide empty state
    if (filteredTopics.length === 0) {
        topicsList.classList.add('hidden');
        topicsList.innerHTML = '';
        forumEmpty.classList.remove('hidden');
    } else {
        topicsList.classList.remove('hidden');
        forumEmpty.classList.add('hidden');
        
        // Sort with sticky first
        filteredTopics.sort((a, b) => {
            if (a.isSticky && !b.isSticky) return -1;
            if (!a.isSticky && b.isSticky) return 1;
            return new Date(b.createdAt) - new Date(a.createdAt);
        });
        
        topicsList.innerHTML = filteredTopics.map(topic => `
            <div onclick="openForumTopic(${topic.id})" class="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all cursor-pointer animate-fade-up ${topic.isSticky ? 'border-l-4 border-sunset' : ''}">
                <div class="flex items-start gap-4">
                    <div class="w-12 h-12 bg-sage/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <span class="font-poppins font-bold text-sage text-lg">${topic.author ? topic.author.charAt(0) : 'U'}</span>
                    </div>
                    <div class="flex-1">
                        <div class="flex items-center gap-2 mb-2 flex-wrap">
                            ${topic.isSticky ? '<span class="px-2 py-1 bg-sunset/10 text-sunset text-xs font-medium rounded-full">Sticky</span>' : ''}
                            <span class="px-2 py-1 ${getCategoryBgClass(topic.category)} text-xs font-medium rounded-full">${getCategoryLabel(topic.category)}</span>
                        </div>
                        <h4 class="font-poppins font-bold text-lg text-forest mb-1 hover:text-sunset transition-colors">${topic.title}</h4>
                        <p class="text-textgreen/70 text-sm line-clamp-2 mb-3">${topic.content ? topic.content.substring(0, 150) : ''}...</p>
                        <div class="flex items-center gap-4 text-textgreen/60 text-sm flex-wrap">
                            <span>by <strong>${topic.author || 'Unknown'}</strong></span>
                            <span>•</span>
                            <span>${formatRelativeTime(topic.createdAt)}</span>
                        </div>
                    </div>
                    <div class="flex flex-col items-center gap-4 text-textgreen/60">
                        <div class="flex flex-col items-center">
                            <svg class="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                            <span class="text-sm font-medium">${topic.likes || 0}</span>
                        </div>
                        <div class="flex flex-col items-center">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>
                            <span class="text-sm font-medium">${topic.replies || 0}</span>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    }
    
    // Render popular topics
    if (popularSidebar) {
        const popular = [...forumTopics].sort((a, b) => (b.likes || 0) - (a.likes || 0)).slice(0, 3);
        popularSidebar.innerHTML = popular.length > 0 ? popular.map(topic => `
            <div onclick="openForumTopic(${topic.id})" class="cursor-pointer hover:bg-cream p-2 rounded-lg transition-colors">
                <p class="text-forest font-medium text-sm line-clamp-2">${topic.title}</p>
                <p class="text-textgreen/60 text-xs">${topic.likes || 0} likes • ${topic.replies || 0} replies</p>
            </div>
        `).join('') : '<p class="text-textgreen/60 text-sm text-center py-4">Belum ada topik</p>';
    }
}

function renderForum() {
    renderForumTopics();
}

function openForumTopic(topicId) {
    selectedTopicId = topicId;
    const topic = forumTopics.find(t => t.id === topicId);
    if (!topic) return;
    
    const replies = forumReplies.filter(r => r.topicId === topicId);
    
    document.getElementById('forum-modal-title').textContent = topic.title;
    document.getElementById('forum-modal-content').innerHTML = `
        <div class="mb-6">
            <div class="flex items-center gap-3 mb-4">
                <span class="px-3 py-1 ${getCategoryBgClass(topic.category)} text-sm font-medium rounded-full">${getCategoryLabel(topic.category)}</span>
                ${topic.isSticky ? '<span class="px-3 py-1 bg-sunset/10 text-sunset text-sm font-medium rounded-full">Sticky</span>' : ''}
            </div>
            <div class="flex items-center gap-4 text-textgreen/60 text-sm mb-4">
                <div class="flex items-center gap-2">
                    <div class="w-8 h-8 bg-sage/20 rounded-full flex items-center justify-center">
                        <span class="font-poppins font-bold text-sage text-sm">${topic.author.charAt(0)}</span>
                    </div>
                    <span>${topic.author}</span>
                </div>
                <span>•</span>
                <span>${formatDateTime(topic.createdAt)}</span>
            </div>
            <div class="prose prose-green text-textgreen leading-relaxed mb-6">
                ${topic.content.split('\n').map(p => `<p class="mb-3">${p}</p>`).join('')}
            </div>
            <div class="flex items-center gap-4 border-t border-sage/20 pt-4">
                <button onclick="likeTopic(${topic.id})" class="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-red-50 transition-colors ${topic.liked ? 'text-red-400' : 'text-textgreen/60'}">
                    <svg class="w-5 h-5" fill="${topic.liked ? 'currentColor' : 'none'}" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
                    <span>${topic.likes}</span>
                </button>
                <span class="flex items-center gap-2 text-textgreen/60">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>
                    <span>${topic.replies}</span>
                </span>
            </div>
        </div>
        
        <div class="border-t border-sage/20 pt-6">
            <h4 class="font-poppins font-bold text-lg text-forest mb-4">Balasan (${replies.length})</h4>
            <div id="replies-list" class="space-y-4 mb-6">
                ${replies.map(reply => `
                    <div class="bg-cream/50 rounded-xl p-4">
                        <div class="flex items-center gap-2 mb-2">
                            <div class="w-8 h-8 bg-sage/20 rounded-full flex items-center justify-center">
                                <span class="font-poppins font-bold text-sage text-xs">${reply.author.charAt(0)}</span>
                            </div>
                            <span class="font-medium text-forest">${reply.author}</span>
                            <span class="text-textgreen/50 text-sm">•</span>
                            <span class="text-textgreen/50 text-sm">${formatRelativeTime(reply.createdAt)}</span>
                        </div>
                        <p class="text-textgreen ml-10">${reply.content}</p>
                        <div class="ml-10 mt-2">
                            <button onclick="likeReply(${reply.id})" class="flex items-center gap-1 text-textgreen/50 hover:text-red-400 transition-colors">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
                                <span class="text-xs">${reply.likes || 0}</span>
                            </button>
                        </div>
                    </div>
                `).join('')}
            </div>
            
            <form id="reply-form" class="space-y-4">
                <textarea id="reply-content" rows="3" class="w-full px-4 py-3 rounded-xl border-2 border-sage/30 bg-cream/50 text-textgreen resize-none" placeholder="Tulis balasan kamu..."></textarea>
                <button type="submit" class="btn-primary px-6 py-2 rounded-xl text-white font-medium">Kirim Balasan</button>
            </form>
        </div>
    `;
    
    document.getElementById('reply-form').addEventListener('submit', (e) => {
        e.preventDefault();
        submitReply();
    });
    
    openModal('forum-modal');
}

function submitReply() {
    const content = document.getElementById('reply-content').value.trim();
    if (!content) {
        showToast('Harap isi balasan kamu');
        return;
    }
    
    requireAuth(() => {
        const reply = {
            id: Date.now(),
            topicId: selectedTopicId,
            author: currentUser.name,
            content: content,
            createdAt: new Date().toISOString(),
            likes: 0
        };
        
        forumReplies.push(reply);
        localStorage.setItem('jajakTarus_forum_replies', JSON.stringify(forumReplies));
        
        // Update topic reply count
        const topicIndex = forumTopics.findIndex(t => t.id === selectedTopicId);
        if (topicIndex !== -1) {
            forumTopics[topicIndex].replies++;
            localStorage.setItem('jajakTarus_forum', JSON.stringify(forumTopics));
        }
        
        showToast('Balasan berhasil dikirim!');
        openForumTopic(selectedTopicId);
        renderForum();
    });
}

function likeTopic(topicId) {
    requireAuth(() => {
        const topicIndex = forumTopics.findIndex(t => t.id === topicId);
        if (topicIndex !== -1) {
            forumTopics[topicIndex].likes++;
            localStorage.setItem('jajakTarus_forum', JSON.stringify(forumTopics));
            openForumTopic(topicId);
            renderForum();
        }
    });
}

function likeReply(replyId) {
    requireAuth(() => {
        const replyIndex = forumReplies.findIndex(r => r.id === replyId);
        if (replyIndex !== -1) {
            forumReplies[replyIndex].likes = (forumReplies[replyIndex].likes || 0) + 1;
            localStorage.setItem('jajakTarus_forum_replies', JSON.stringify(forumReplies));
            openForumTopic(selectedTopicId);
        }
    });
}

function createNewTopic(title, category, content) {
    if (!currentUser) {
        openModal('login-modal');
        return false;
    }
    
    // Get latest data from localStorage first
    const storedTopics = JSON.parse(localStorage.getItem('jajakTarus_forum') || '[]');
    if (storedTopics.length > 0) {
        forumTopics = storedTopics;
    }
    
    const topic = {
        id: Date.now(),
        title: title.trim(),
        category: category,
        author: currentUser.name,
        authorId: currentUser.id,
        content: content.trim(),
        createdAt: new Date().toISOString(),
        likes: 0,
        replies: 0,
        isSticky: false
    };
    
    // Add to beginning of array
    forumTopics.unshift(topic);
    
    // Save to localStorage
    try {
        localStorage.setItem('jajakTarus_forum', JSON.stringify(forumTopics));
    } catch(e) {}
    
    return true;
}

// =============================================
// ADMIN DASHBOARD FUNCTIONS
// =============================================

function renderAdminDashboard() {
    if (!isAdmin) return;
    
    // Stats
    const users = JSON.parse(localStorage.getItem('jajakTarus_users') || '[]');
    const bookings = JSON.parse(localStorage.getItem('jajakTarus_bookings') || '[]');
    const messages = JSON.parse(localStorage.getItem('jajakTarus_messages') || '[]');
    
    document.getElementById('stat-users').textContent = users.length;
    document.getElementById('stat-bookings').textContent = bookings.length;
    document.getElementById('stat-topics').textContent = forumTopics.length;
    document.getElementById('stat-messages').textContent = messages.length;
    
    // Recent bookings
    const recentBookings = bookings.slice(-5).reverse();
    document.getElementById('recent-bookings-list').innerHTML = recentBookings.length > 0 ? recentBookings.map(b => `
        <div class="flex items-center justify-between p-3 bg-cream/50 rounded-lg">
            <div>
                <p class="font-medium text-forest">${b.name}</p>
                <p class="text-textgreen/60 text-sm">${b.tripName} - ${b.code}</p>
            </div>
            <span class="px-2 py-1 text-xs font-medium rounded-full ${getStatusClass(b.status)}">${b.status}</span>
        </div>
    `).join('') : '<p class="text-textgreen/60 text-center py-4">Belum ada booking</p>';
    
    // Recent forum posts
    const recentForum = forumTopics.slice(0, 5);
    document.getElementById('recent-forum-list').innerHTML = recentForum.map(t => `
        <div class="flex items-center justify-between p-3 bg-cream/50 rounded-lg cursor-pointer hover:bg-sage/10" onclick="openForumTopic(${t.id})">
            <div>
                <p class="font-medium text-forest line-clamp-1">${t.title}</p>
                <p class="text-textgreen/60 text-sm">by ${t.author}</p>
            </div>
            <span class="px-2 py-1 text-xs font-medium rounded-full ${getCategoryBgClass(t.category)}">${getCategoryLabel(t.category)}</span>
        </div>
    `).join('');
}

function getStatusClass(status) {
    const classes = { pending: 'bg-yellow-100 text-yellow-700', confirmed: 'bg-green-100 text-green-700', cancelled: 'bg-red-100 text-red-700' };
    return classes[status] || 'bg-gray-100 text-gray-700';
}

function renderAdminUsers(searchTerm = '') {
    const users = JSON.parse(localStorage.getItem('jajakTarus_users') || '[]');
    const filteredUsers = searchTerm ? users.filter(u => 
        u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        u.email.toLowerCase().includes(searchTerm.toLowerCase())
    ) : users;
    
    document.getElementById('users-table-body').innerHTML = filteredUsers.map(user => `
        <tr class="border-b border-sage/10">
            <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 bg-sage/20 rounded-full flex items-center justify-center">
                        <span class="font-poppins font-bold text-sage">${user.name.charAt(0)}</span>
                    </div>
                    <span class="font-medium text-forest">${user.name}</span>
                </div>
            </td>
            <td class="px-6 py-4 text-textgreen">${user.email}</td>
            <td class="px-6 py-4 text-textgreen">${user.whatsapp || '-'}</td>
            <td class="px-6 py-4 text-textgreen">${formatDate(user.createdAt)}</td>
            <td class="px-6 py-4">
                <button onclick="editUser(${user.id})" class="text-sunset hover:underline mr-2">Edit</button>
                <button onclick="deleteUser(${user.id})" class="text-red-500 hover:underline">Hapus</button>
            </td>
        </tr>
    `).join('');
}

function renderAdminBookings(filterStatus = 'all', searchTerm = '') {
    const bookings = JSON.parse(localStorage.getItem('jajakTarus_bookings') || '[]');
    let filteredBookings = bookings;
    
    if (filterStatus !== 'all') {
        filteredBookings = filteredBookings.filter(b => b.status === filterStatus);
    }
    
    if (searchTerm) {
        filteredBookings = filteredBookings.filter(b => 
            b.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
            b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            b.tripName.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }
    
    document.getElementById('bookings-table-body').innerHTML = filteredBookings.length > 0 ? filteredBookings.map(b => `
        <tr class="border-b border-sage/10">
            <td class="px-6 py-4 font-mono text-sm font-medium text-sunset">${b.code}</td>
            <td class="px-6 py-4 font-medium text-forest">${b.tripName}</td>
            <td class="px-6 py-4 text-textgreen">${b.name}</td>
            <td class="px-6 py-4 text-textgreen">${formatDate(b.date)}</td>
            <td class="px-6 py-4 font-bold text-forest">${formatRupiah(b.total)}</td>
            <td class="px-6 py-4">
                <span class="px-2 py-1 text-xs font-medium rounded-full ${getStatusClass(b.status)}">${b.status}</span>
            </td>
            <td class="px-6 py-4">
                ${b.status === 'pending' ? `
                    <button onclick="updateBookingStatus(${b.id}, 'confirmed')" class="text-green-500 hover:underline mr-2">Confirm</button>
                    <button onclick="updateBookingStatus(${b.id}, 'cancelled')" class="text-red-500 hover:underline">Cancel</button>
                ` : b.status === 'confirmed' ? `
                    <button onclick="updateBookingStatus(${b.id}, 'cancelled')" class="text-red-500 hover:underline">Cancel</button>
                ` : '-'}
            </td>
        </tr>
    `).join('') : '<tr><td colspan="7" class="px-6 py-8 text-center text-textgreen/60">Belum ada booking</td></tr>';
}

function renderAdminForum(searchTerm = '') {
    let filteredTopics = searchTerm ? forumTopics.filter(t => 
        t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.author.toLowerCase().includes(searchTerm.toLowerCase())
    ) : forumTopics;
    
    document.getElementById('forum-admin-list').innerHTML = filteredTopics.map(topic => `
        <div class="p-4 hover:bg-cream/50 transition-colors">
            <div class="flex items-start justify-between">
                <div class="flex-1">
                    <div class="flex items-center gap-2 mb-2">
                        ${topic.isSticky ? '<span class="px-2 py-1 bg-sunset/10 text-sunset text-xs font-medium rounded-full">Sticky</span>' : ''}
                        <span class="px-2 py-1 ${getCategoryBgClass(topic.category)} text-xs font-medium rounded-full">${getCategoryLabel(topic.category)}</span>
                    </div>
                    <h4 class="font-medium text-forest mb-1">${topic.title}</h4>
                    <p class="text-textgreen/60 text-sm">by ${topic.author} • ${formatRelativeTime(topic.createdAt)}</p>
                    <div class="flex items-center gap-4 mt-2 text-textgreen/50 text-sm">
                        <span>❤️ ${topic.likes}</span>
                        <span>💬 ${topic.replies}</span>
                    </div>
                </div>
                <div class="flex flex-col gap-2">
                    <button onclick="toggleSticky(${topic.id})" class="text-sm ${topic.isSticky ? 'text-sunset' : 'text-textgreen/60'} hover:underline">${topic.isSticky ? 'Unsticky' : 'Sticky'}</button>
                    <button onclick="deleteTopic(${topic.id})" class="text-sm text-red-500 hover:underline">Hapus</button>
                </div>
            </div>
        </div>
    `).join('');
}

function renderAdminMessages() {
    const messages = JSON.parse(localStorage.getItem('jajakTarus_messages') || '[]');
    
    document.getElementById('messages-list').innerHTML = messages.length > 0 ? messages.map((m, index) => `
        <div class="p-4 hover:bg-cream/50 transition-colors">
            <div class="flex items-start justify-between mb-2">
                <div>
                    <h4 class="font-medium text-forest">${m.name}</h4>
                    <p class="text-textgreen/60 text-sm">${m.email} ${m.whatsapp ? '• ' + m.whatsapp : ''}</p>
                </div>
                <span class="text-textgreen/50 text-sm">${formatDateTime(m.timestamp)}</span>
            </div>
            <p class="text-textgreen">${m.message}</p>
        </div>
    `).join('') : '<div class="p-8 text-center text-textgreen/60">Belum ada pesan</div>';
}

function renderAdminTrips() {
    document.getElementById('trips-admin-table-body').innerHTML = trips.map(trip => `
        <tr class="border-b border-sage/10">
            <td class="px-6 py-4 font-medium text-forest">${trip.name}</td>
            <td class="px-6 py-4 text-textgreen">${trip.location.split(',')[0]}</td>
            <td class="px-6 py-4 font-bold text-sunset">${formatRupiah(trip.price)}</td>
            <td class="px-6 py-4">
                <span class="px-2 py-1 text-xs font-medium rounded-full ${getDifficultyClass(trip.difficulty)} text-white">${getDifficultyLabel(trip.difficulty)}</span>
            </td>
            <td class="px-6 py-4">
                <button onclick="editTrip(${trip.id})" class="text-sunset hover:underline mr-2">Edit</button>
                <button onclick="deleteTrip(${trip.id})" class="text-red-500 hover:underline">Hapus</button>
            </td>
        </tr>
    `).join('');
}

// Admin Actions
function updateBookingStatus(bookingId, newStatus) {
    const bookings = JSON.parse(localStorage.getItem('jajakTarus_bookings') || '[]');
    const index = bookings.findIndex(b => b.id === bookingId);
    if (index !== -1) {
        bookings[index].status = newStatus;
        localStorage.setItem('jajakTarus_bookings', JSON.stringify(bookings));
        showToast(`Booking status updated to ${newStatus}`);
        renderAdminBookings();
        renderAdminDashboard();
    }
}

function toggleSticky(topicId) {
    const index = forumTopics.findIndex(t => t.id === topicId);
    if (index !== -1) {
        forumTopics[index].isSticky = !forumTopics[index].isSticky;
        localStorage.setItem('jajakTarus_forum', JSON.stringify(forumTopics));
        showToast(forumTopics[index].isSticky ? 'Topic set to sticky' : 'Topic unstickied');
        renderAdminForum();
        renderAdminDashboard();
    }
}

function deleteTopic(topicId) {
    if (confirm('Yakin ingin menghapus topik ini?')) {
        forumTopics = forumTopics.filter(t => t.id !== topicId);
        forumReplies = forumReplies.filter(r => r.topicId !== topicId);
        localStorage.setItem('jajakTarus_forum', JSON.stringify(forumTopics));
        localStorage.setItem('jajakTarus_forum_replies', JSON.stringify(forumReplies));
        showToast('Topik berhasil dihapus');
        renderAdminForum();
        renderAdminDashboard();
        renderForum();
    }
}

function editUser(userId) {
    const users = JSON.parse(localStorage.getItem('jajakTarus_users') || '[]');
    const user = users.find(u => u.id === userId);
    if (!user) return;
    
    document.querySelector('#edit-user-form input[name="userId"]').value = user.id;
    document.querySelector('#edit-user-form input[name="name"]').value = user.name;
    document.querySelector('#edit-user-form input[name="email"]').value = user.email;
    document.querySelector('#edit-user-form input[name="whatsapp"]').value = user.whatsapp || '';
    openModal('edit-user-modal');
}

function deleteUser(userId) {
    if (confirm('Yakin ingin menghapus user ini?')) {
        const users = JSON.parse(localStorage.getItem('jajakTarus_users') || '[]');
        const filtered = users.filter(u => u.id !== userId);
        localStorage.setItem('jajakTarus_users', JSON.stringify(filtered));
        showToast('User berhasil dihapus');
        renderAdminUsers();
        renderAdminDashboard();
    }
}

function editTrip(tripId) {
    const trip = trips.find(t => t.id === tripId);
    if (!trip) return;
    
    document.querySelector('#edit-trip-form input[name="tripId"]').value = trip.id;
    document.querySelector('#edit-trip-form input[name="name"]').value = trip.name;
    document.querySelector('#edit-trip-form input[name="location"]').value = trip.location;
    document.querySelector('#edit-trip-form input[name="height"]').value = trip.height;
    document.querySelector('#edit-trip-form input[name="price"]').value = trip.price;
    document.querySelector('#edit-trip-form input[name="duration"]').value = trip.duration;
    document.querySelector('#edit-trip-form input[name="distance"]').value = trip.distance;
    document.querySelector('#edit-trip-form select[name="difficulty"]').value = trip.difficulty;
    document.querySelector('#edit-trip-form textarea[name="description"]').value = trip.description;
    openModal('edit-trip-modal');
}

function deleteTrip(tripId) {
    if (confirm('Yakin ingin menghapus trip ini?')) {
        const index = trips.findIndex(t => t.id === tripId);
        if (index !== -1) {
            trips.splice(index, 1);
            showToast('Trip berhasil dihapus');
            renderAdminTrips();
            renderAdminDashboard();
            renderTrips();
        }
    }
}

// =============================================
// MODAL FUNCTIONS
// =============================================

function openTripModal(tripId) {
    const trip = trips.find(t => t.id === tripId);
    if (!trip) return;
    
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
            <div class="w-20 flex-shrink-0"><span class="inline-block px-3 py-1 bg-sage/20 text-sage rounded-full text-sm font-medium">Hari ${day.day}</span></div>
            <p class="text-textgreen text-sm">${day.activities}</p>
        </div>
    `).join('');
    
    document.getElementById('modal-gear').innerHTML = trip.gear.map(item => `
        <li class="flex items-center gap-2 text-sm text-textgreen">
            <svg class="w-4 h-4 text-sunset flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>
            ${item}
        </li>
    `).join('');
    
    const dateSelect = document.getElementById('trip-date-select');
    dateSelect.innerHTML = '<option value="">Pilih tanggal...</option>' + trip.schedules.map(s => 
        `<option value="${s.date}">${formatDate(s.date)} (${s.slots - s.booked} slot)</option>`
    ).join('');
    
    selectedTripForBooking = trip;
    openModal('trip-modal');
}

function openBookingModal() {
    if (!selectedTripForBooking) return;
    
    const trip = selectedTripForBooking;
    const selectedDate = document.getElementById('trip-date-select').value;
    
    if (!selectedDate) {
        alert('Silakan pilih tanggal keberangkatan');
        return;
    }
    
    requireAuth(() => {
        document.getElementById('booking-trip-id').value = trip.id;
        document.getElementById('booking-trip-image').src = trip.image;
        document.getElementById('booking-trip-name').textContent = trip.name;
        document.getElementById('booking-trip-date').textContent = formatDate(selectedDate);
        document.getElementById('booking-trip-price').textContent = formatRupiah(trip.price);
        document.getElementById('booking-price-per').textContent = formatRupiah(trip.price);
        
        if (currentUser) {
            document.querySelector('#booking-form input[name="name"]').value = currentUser.name;
            document.querySelector('#booking-form input[name="whatsapp"]').value = currentUser.whatsapp || '';
            document.querySelector('#booking-form input[name="email"]').value = currentUser.email;
        }
        
        updateBookingTotal();
        closeModal('trip-modal');
        openModal('booking-modal');
    });
}

function updateBookingTotal() {
    const trip = selectedTripForBooking;
    const participants = parseInt(document.querySelector('#booking-form select[name="participants"]').value) || 1;
    const total = trip.price * participants;
    
    document.getElementById('booking-participants-count').textContent = participants;
    document.getElementById('booking-total-price').textContent = formatRupiah(total);
}

let currentLightboxIndex = 0;

function openLightbox(index) {
    currentLightboxIndex = index;
    updateLightboxImage();
    openModal('lightbox');
}

function closeLightbox() {
    closeModal('lightbox');
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
    
    document.querySelectorAll('.animate-fade-up').forEach(el => observer.observe(el));
}

// =============================================
// NAVIGATION
// =============================================

function setupNavigation() {
    const navbar = document.getElementById('navbar');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('nav-scrolled', window.scrollY > 100);
    });
    
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        menuIcon.setAttribute('d', mobileMenu.classList.contains('hidden') ? 'M4 6h16M4 12h16M4 18h16' : 'M6 18L18 6M6 6l12 12');
    });
    
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            menuIcon.setAttribute('d', 'M4 6h16M4 12h16M4 18h16');
        });
    });
}

// =============================================
// EVENT LISTENERS
// =============================================

function setupEventListeners() {
    // Auth buttons
    document.getElementById('login-btn').addEventListener('click', () => openModal('login-modal'));
    document.getElementById('register-btn').addEventListener('click', () => openModal('register-modal'));
    document.getElementById('mobile-login-btn').addEventListener('click', () => openModal('login-modal'));
    document.getElementById('mobile-register-btn').addEventListener('click', () => openModal('register-modal'));
    document.getElementById('logout-btn').addEventListener('click', logout);
    
    // User dropdown
    document.getElementById('user-btn').addEventListener('click', () => {
        document.getElementById('user-dropdown').classList.toggle('active');
    });
    
    document.addEventListener('click', (e) => {
        if (!e.target.closest('#user-menu')) {
            document.getElementById('user-dropdown')?.classList.remove('active');
        }
    });
    
    // Switch between login/register
    document.querySelectorAll('.switch-to-register').forEach(btn => {
        btn.addEventListener('click', () => { closeModal('login-modal'); openModal('register-modal'); });
    });
    
    document.querySelectorAll('.switch-to-login').forEach(btn => {
        btn.addEventListener('click', () => { closeModal('register-modal'); openModal('login-modal'); });
    });
    
    // Close modal buttons
    document.querySelectorAll('.close-modal').forEach(btn => {
        btn.addEventListener('click', () => closeModal(btn.dataset.modal));
    });
    
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal(modal.id);
        });
    });
    
    // Login form
    document.getElementById('login-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const success = login(formData.get('email'), formData.get('password'));
        if (!success) alert('Email atau password salah!');
        e.target.reset();
    });
    
    // Register form
    document.getElementById('register-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        if (formData.get('password') !== formData.get('confirmPassword')) {
            alert('Password tidak cocok!');
            return;
        }
        const success = register(formData.get('name'), formData.get('email'), formData.get('whatsapp'), formData.get('password'));
        if (!success) alert('Email sudah terdaftar!');
        e.target.reset();
    });
    
    // Tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.tab-btn').forEach(b => {
                b.classList.remove('active');
                b.classList.add('bg-white', 'text-textgreen');
            });
            btn.classList.add('active');
            btn.classList.remove('bg-white', 'text-textgreen');
            
            document.getElementById('trip-list').classList.toggle('hidden', btn.dataset.tab !== 'list');
            document.getElementById('trip-calendar').classList.toggle('hidden', btn.dataset.tab !== 'calendar');
            
            if (btn.dataset.tab === 'calendar') renderCalendar();
        });
    });
    
    // Calendar navigation
    document.getElementById('prev-month').addEventListener('click', () => {
        currentCalendarDate.setMonth(currentCalendarDate.getMonth() - 1);
        renderCalendar();
    });
    
    document.getElementById('next-month').addEventListener('click', () => {
        currentCalendarDate.setMonth(currentCalendarDate.getMonth() + 1);
        renderCalendar();
    });
    
    // Book trip button
    document.getElementById('book-trip-btn').addEventListener('click', openBookingModal);
    
    // Participant change in booking
    document.querySelector('#booking-form select[name="participants"]').addEventListener('change', updateBookingTotal);
    
    // Booking form
    document.getElementById('booking-form').addEventListener('submit', (e) => {
        e.preventDefault();
        
        if (!currentUser) {
            openModal('login-modal');
            showToast('Login terlebih dahulu untuk booking trip!');
            return;
        }
        
        const formData = new FormData(e.target);
        const trip = selectedTripForBooking;
        const participants = parseInt(formData.get('participants'));
        const selectedDate = document.getElementById('trip-date-select').value;
        
        if (!selectedDate) {
            showToast('Silakan pilih tanggal keberangkatan!');
            return;
        }
        
        const bookingCode = 'JT-' + Date.now().toString().slice(-6);
        const booking = {
            id: Date.now(),
            code: bookingCode,
            tripId: trip.id,
            tripName: trip.name,
            date: selectedDate,
            name: formData.get('name'),
            whatsapp: formData.get('whatsapp'),
            email: formData.get('email'),
            participants: participants,
            bloodtype: formData.get('bloodtype'),
            notes: formData.get('notes'),
            total: trip.price * participants,
            status: 'pending',
            createdAt: new Date().toISOString()
        };
        
        // Save to database if initialized
        if (db.isInitialized) {
            db.addBooking({
                tripId: trip.id,
                tripName: trip.name,
                userId: currentUser.id,
                userName: currentUser.name,
                userEmail: currentUser.email,
                userWhatsapp: currentUser.whatsapp || formData.get('whatsapp'),
                scheduleDate: selectedDate,
                participants: participants,
                totalPrice: trip.price * participants
            });
        }
        
        // Also save to localStorage for backup
        const bookings = JSON.parse(localStorage.getItem('jajakTarus_bookings') || '[]');
        bookings.push(booking);
        localStorage.setItem('jajakTarus_bookings', JSON.stringify(bookings));
        
        // Update trip slots
        const tripIndex = trips.findIndex(t => t.id === trip.id);
        if (tripIndex !== -1 && trips[tripIndex].schedules) {
            const scheduleIndex = trips[tripIndex].schedules.findIndex(s => s.date === selectedDate);
            if (scheduleIndex !== -1) {
                trips[tripIndex].schedules[scheduleIndex].booked += participants;
                localStorage.setItem('jajakTarus_trips', JSON.stringify(trips));
            }
        }
        
        document.getElementById('booking-code').textContent = bookingCode;
        closeModal('booking-modal');
        openModal('success-modal');
        e.target.reset();
    });
    
    document.getElementById('close-success').addEventListener('click', () => closeModal('success-modal'));
    
    // Contact form
    document.getElementById('contact-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const messages = JSON.parse(localStorage.getItem('jajakTarus_messages') || '[]');
        messages.push({ ...Object.fromEntries(formData), timestamp: new Date().toISOString() });
        localStorage.setItem('jajakTarus_messages', JSON.stringify(messages));
        showToast('Pesan kamu sudah terkirim!');
        e.target.reset();
    });
    
    // Lightbox
    document.getElementById('close-lightbox').addEventListener('click', closeLightbox);
    document.getElementById('prev-image').addEventListener('click', prevImage);
    document.getElementById('next-image').addEventListener('click', nextImage);
    
    document.addEventListener('keydown', (e) => {
        if (document.getElementById('lightbox').classList.contains('active')) {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') prevImage();
            if (e.key === 'ArrowRight') nextImage();
        }
    });
    
    // New Topic buttons
    document.getElementById('new-topic-btn').addEventListener('click', () => {
        requireAuth(() => openModal('new-topic-modal'));
    });
    
    document.getElementById('empty-new-topic-btn').addEventListener('click', () => {
        requireAuth(() => openModal('new-topic-modal'));
    });
    
    // New Topic Form
    document.getElementById('new-topic-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const success = createNewTopic(formData.get('title'), formData.get('category'), formData.get('content'));
        if (success) {
            closeModal('new-topic-modal');
            showToast('Topik berhasil dibuat!');
            e.target.reset();
        }
    });
    
    // Admin Tabs
    document.querySelectorAll('.admin-tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.admin-tab-btn').forEach(b => {
                b.classList.remove('bg-sunset', 'text-white');
                b.classList.add('bg-white', 'text-textgreen');
            });
            btn.classList.remove('bg-white', 'text-textgreen');
            btn.classList.add('bg-sunset', 'text-white');
            
            document.querySelectorAll('.admin-content').forEach(c => c.classList.add('hidden'));
            document.getElementById(`admin-${btn.dataset.tab}`).classList.remove('hidden');
            
            currentAdminTab = btn.dataset.tab;
            if (btn.dataset.tab === 'overview') renderAdminDashboard();
            if (btn.dataset.tab === 'users') renderAdminUsers();
            if (btn.dataset.tab === 'bookings') renderAdminBookings();
            if (btn.dataset.tab === 'forum-admin') renderAdminForum();
            if (btn.dataset.tab === 'messages') renderAdminMessages();
            if (btn.dataset.tab === 'trips-admin') renderAdminTrips();
        });
    });
    
    // Admin Search inputs
    document.getElementById('user-search').addEventListener('input', (e) => renderAdminUsers(e.target.value));
    document.getElementById('booking-search').addEventListener('input', (e) => {
        const status = document.getElementById('booking-filter-status').value;
        renderAdminBookings(status, e.target.value);
    });
    document.getElementById('booking-filter-status').addEventListener('change', (e) => {
        const search = document.getElementById('booking-search').value;
        renderAdminBookings(e.target.value, search);
    });
    document.getElementById('forum-admin-search').addEventListener('input', (e) => renderAdminForum(e.target.value));
    
    // Edit User Form
    document.getElementById('edit-user-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const users = JSON.parse(localStorage.getItem('jajakTarus_users') || '[]');
        const index = users.findIndex(u => u.id === parseInt(formData.get('userId')));
        if (index !== -1) {
            users[index] = { ...users[index], name: formData.get('name'), email: formData.get('email'), whatsapp: formData.get('whatsapp') };
            localStorage.setItem('jajakTarus_users', JSON.stringify(users));
            showToast('User berhasil diupdate');
            closeModal('edit-user-modal');
            renderAdminUsers();
        }
    });
    
    // Edit Trip Form
    document.getElementById('edit-trip-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const tripId = parseInt(formData.get('tripId'));
        const index = trips.findIndex(t => t.id === tripId);
        if (index !== -1) {
            trips[index] = {
                ...trips[index],
                name: formData.get('name'),
                location: formData.get('location'),
                height: parseInt(formData.get('height')),
                price: parseInt(formData.get('price')),
                duration: parseInt(formData.get('duration')),
                distance: parseInt(formData.get('distance')),
                difficulty: formData.get('difficulty'),
                description: formData.get('description')
            };
            showToast('Trip berhasil diupdate');
            closeModal('edit-trip-modal');
            renderAdminTrips();
            renderTrips();
        }
    });
    
    // Add Trip Form
    document.getElementById('add-trip-btn').addEventListener('click', () => openModal('add-trip-modal'));
    
    document.getElementById('add-trip-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const newTrip = {
            id: Date.now(),
            name: formData.get('name'),
            location: formData.get('location'),
            height: parseInt(formData.get('height')),
            price: parseInt(formData.get('price')),
            duration: parseInt(formData.get('duration')),
            distance: parseInt(formData.get('distance')),
            difficulty: formData.get('difficulty'),
            image: formData.get('image') || 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&h=400&fit=crop',
            description: formData.get('description'),
            itinerary: [{ day: 1, activities: "Day 1 activities" }],
            gear: ["Basic gear"],
            schedules: [{ date: "2026-07-01", slots: 10, booked: 0 }]
        };
        trips.push(newTrip);
        showToast('Trip berhasil ditambahkan');
        closeModal('add-trip-modal');
        e.target.reset();
        renderAdminTrips();
        renderTrips();
    });
}

// =============================================
// INITIALIZATION
// =============================================

document.addEventListener('DOMContentLoaded', () => {
    try {
        checkAuth();
    } catch(e) { console.log('checkAuth skipped'); }
    
    try {
        renderMembers();
    } catch(e) { console.log('renderMembers skipped'); }
    
    try {
        renderTrips();
    } catch(e) { console.log('renderTrips skipped'); }
    
    // Weather section - search only, no auto fetch
    try {
        const searchInput = document.getElementById('weather-search-input');
        if (searchInput) {
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') searchWeather();
            });
        }
    } catch(e) {}
    
    try {
        renderGallery();
    } catch(e) { console.log('renderGallery skipped'); }
    
    try {
        setupNavigation();
    } catch(e) { console.log('setupNavigation skipped'); }
    
    try {
        setupEventListeners();
    } catch(e) { console.log('setupEventListeners skipped'); }
    
    setTimeout(() => {
        try {
            setupScrollAnimations();
        } catch(e) {}
        try {
            animateCounters();
        } catch(e) {}
    }, 100);
});

// Global reset function - call this in console to reset everything
function resetAllData() {
    // Reset forum
    localStorage.removeItem('jajakTarus_forum');
    localStorage.removeItem('jajakTarus_forum_replies');
    localStorage.removeItem('jajakTarus_messages');
    localStorage.removeItem('jajakTarus_bookings');
    
    // Reload page
    location.reload();
}

// Debug function
function debugData() {
    console.log('=== DEBUG INFO ===');
    console.log('forumTopics:', forumTopics);
    console.log('trips:', trips);
    console.log('members:', members);
    console.log('currentUser:', currentUser);
    console.log('weatherData:', currentWeather);
}

// Make functions globally available (with safe assignment)
const globalFunctions = [
    ['selectCalendarDate', selectCalendarDate],
    ['openForumTopic', openForumTopic],
    ['likeTopic', likeTopic],
    ['likeReply', likeReply],
    ['toggleSticky', toggleSticky],
    ['deleteTopic', deleteTopic],
    ['editUser', editUser],
    ['deleteUser', deleteUser],
    ['updateBookingStatus', updateBookingStatus],
    ['editTrip', editTrip],
    ['deleteTrip', deleteTrip],
    ['filterForum', filterForum],
    ['resetAllData', resetAllData],
    ['debugData', debugData],
    ['searchWeather', searchWeather],
    ['quickSearch', quickSearch]
];

globalFunctions.forEach(([name, fn]) => {
    try {
        if (typeof fn === 'function') window[name] = fn;
    } catch(e) {}
});

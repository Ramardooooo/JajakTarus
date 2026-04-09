/**
 * Jajak Tarus - Unified Database System
 * SQLite with AES-256 encryption
 */

class JajakTarusDB {
    constructor() {
        this.db = null;
        this.SQL = null;
        this.dbPassword = null;
        this.isInitialized = false;
    }

    async init() {
        try {
            this.SQL = await initSqlJs({
                locateFile: file => `https://sql.js.org/dist/${file}`
            });
            return true;
        } catch (error) {
            console.error('Failed to initialize SQL.js:', error);
            return false;
        }
    }

    generatePasswordHash(password) {
        return CryptoJS.SHA256(password + 'jajak_tarus_salt_2024').toString();
    }

    deriveKey(password) {
        return CryptoJS.SHA256(password + 'jajak_tarus_key').toString();
    }

    encrypt(data) {
        if (!this.dbPassword) return data;
        const key = this.deriveKey(this.dbPassword);
        return CryptoJS.AES.encrypt(JSON.stringify(data), key).toString();
    }

    decrypt(encryptedData) {
        if (!this.dbPassword) return encryptedData;
        try {
            const key = this.deriveKey(this.dbPassword);
            const bytes = CryptoJS.AES.decrypt(encryptedData, key);
            return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        } catch (e) {
            return null;
        }
    }

    async createDatabase() {
        this.db = new this.SQL.Database();
        
        this.db.run(`
            CREATE TABLE users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT UNIQUE NOT NULL,
                whatsapp TEXT,
                password_hash TEXT NOT NULL,
                role TEXT DEFAULT 'member',
                join_date TEXT,
                level TEXT DEFAULT 'Pemula',
                xp INTEGER DEFAULT 0,
                avatar TEXT DEFAULT ''
            );
            
            CREATE TABLE trips (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                location TEXT NOT NULL,
                height INTEGER,
                difficulty TEXT DEFAULT 'easy',
                duration INTEGER,
                distance REAL DEFAULT 0,
                price INTEGER,
                image TEXT,
                description TEXT,
                schedules TEXT DEFAULT '[]',
                created_at TEXT
            );
            
            CREATE TABLE forum_topics (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                content TEXT,
                category TEXT,
                author_id INTEGER,
                author_name TEXT,
                likes INTEGER DEFAULT 0,
                replies INTEGER DEFAULT 0,
                is_sticky INTEGER DEFAULT 0,
                created_at TEXT
            );
            
            CREATE TABLE forum_replies (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                topic_id INTEGER,
                author_id INTEGER,
                author_name TEXT,
                content TEXT,
                likes INTEGER DEFAULT 0,
                created_at TEXT
            );
            
            CREATE TABLE bookings (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                trip_id INTEGER,
                trip_name TEXT,
                user_id INTEGER,
                user_name TEXT,
                user_email TEXT,
                user_whatsapp TEXT,
                schedule_date TEXT,
                participants INTEGER,
                total_price INTEGER,
                status TEXT DEFAULT 'pending',
                created_at TEXT
            );
            
            CREATE TABLE settings (
                key TEXT PRIMARY KEY,
                value TEXT
            );
        `);

        await this.insertDefaultData();
        return true;
    }

    async insertDefaultData() {
        const now = new Date().toISOString();
        const passwordHash = this.generatePasswordHash('admin123');
        
        this.db.run(`INSERT INTO users (name, email, whatsapp, password_hash, role, join_date, level, xp) VALUES 
            ('Admin Jajak Tarus', 'admin@jajaktarus.id', '081234567890', '${passwordHash}', 'admin', '${now}', 'Admin', 1000)`);
        
        this.db.run(`INSERT INTO trips (name, location, height, difficulty, duration, distance, price, image, description, schedules, created_at) VALUES 
            ('Gunung Bromo', 'Jawa Timur', 2329, 'easy', 2, 8, 350000, 'https://images.unsplash.com/photo-1537979268529-3a3d3a5e9b0f?w=600&h=400&fit=crop', 'Nikmati keindahan matahari terbit di atas lautan pasir Bromo. Experience the breathtaking sunrise over the sea of sand.', '[{"date":"2026-04-15","slots":20,"booked":5},{"date":"2026-04-22","slots":20,"booked":12}]', '${now}'),
            ('Gunung Merbabu', 'Jawa Tengah', 3145, 'easy', 2, 12, 450000, 'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=600&h=400&fit=crop', 'Gunung populer dengan padang savana yang luas di puncaknya.', '[{"date":"2026-04-18","slots":15,"booked":3},{"date":"2026-04-25","slots":15,"booked":8}]', '${now}'),
            ('Gunung Semeru', 'Jawa Timur', 3676, 'hard', 4, 18, 750000, 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&h=400&fit=crop', 'Gunung tertinggi di Jawa! Pendakian menantang dengan pemandangan spektakuler.', '[{"date":"2026-04-20","slots":10,"booked":6}]', '${now}'),
            ('Gunung Rinjani', 'Lombok, NTB', 3726, 'hard', 4, 20, 850000, 'https://images.unsplash.com/photo-1580502304784-8985b7eb7260?w=600&h=400&fit=crop', 'Gunung favorit dengan Danau Segara Anak yang cantik.', '[{"date":"2026-04-23","slots":12,"booked":4}]', '${now}')`);
        
        this.db.run(`INSERT INTO forum_topics (title, content, category, author_id, author_name, likes, replies, is_sticky, created_at) VALUES 
            ('Tips Mendaki Gunung untuk Pemula', 'Hai semua! Buat kalian yang baru pertama kali mendaki gunung, berikut tips dari saya:\\n\\n1. Latihan fisik minimal 2 minggu sebelum pendakian\\n2. Pastikan perlengkapan lengkap\\n3. Jangan malu bertanya pada guide\\n4. Bawa air yang cukup\\n5. Jangan mendaki sendirian\\n\\nSemoga bermanfaat!', 'tips', 1, 'Admin Jajak Tarus', 15, 2, 1, '${now}'),
            ('Rekomendasi Sleeping Bag untuk Pendakian 2 Hari', 'Mau tanya rekomendasi sleeping bag yang cocok untuk pendakian 2 hari di gunung medium? Budget sekitar 500rb-1jt. Terima kasih!', 'gear', 1, 'Admin Jajak Tarus', 8, 1, 0, '${now}'),
            ('Cerita Pendakian Saya ke Semeru Bulan Lalu', 'Seneng banget finally bisa summit Semeru! Perjalanan 4 hari 3 malam emang nggak gampang, tapi view di atas sana bikin lupa capek. Ranu Kumbolo nya cantik banget!', 'story', 1, 'Admin Jajak Tarus', 23, 0, 0, '${now}')`);
        
        this.db.run(`INSERT INTO forum_replies (topic_id, author_id, author_name, content, likes, created_at) VALUES 
            (1, 1, 'Admin Jajak Tarus', 'Bagus banget tipsnya! Saya tambahkan: selalu bawa obat pribadi dan P3K.', 5, '${now}'),
            (2, 1, 'Admin Jajak Tarus', 'Kalau budget 500rb-1jt, saya recommend Decathlon Forclaz MT500. Sudah cukup hangat!', 9, '${now}')`);
    }

    async saveToStorage() {
        if (!this.db || !this.dbPassword) return false;
        
        try {
            const data = this.db.export();
            const uint8Array = new Uint8Array(data);
            const base64 = btoa(String.fromCharCode.apply(null, uint8Array));
            const encrypted = this.encrypt(base64);
            localStorage.setItem('jajak_tarus_db', encrypted);
            return true;
        } catch (e) {
            console.error('Save error:', e);
            return false;
        }
    }

    async loadFromStorage() {
        const encrypted = localStorage.getItem('jajak_tarus_db');
        if (!encrypted) return false;
        
        try {
            const base64 = this.decrypt(encrypted);
            if (!base64) return false;
            
            const binary = atob(base64);
            const bytes = new Uint8Array(binary.length);
            for (let i = 0; i < binary.length; i++) {
                bytes[i] = binary.charCodeAt(i);
            }
            this.db = new this.SQL.Database(bytes);
            return true;
        } catch (e) {
            console.error('Load error:', e);
            return false;
        }
    }

    async unlock(password) {
        this.dbPassword = password;
        
        const loaded = await this.loadFromStorage();
        if (loaded) {
            this.isInitialized = true;
            return { success: true, isNew: false };
        }
        
        await this.init();
        await this.createDatabase();
        await this.saveToStorage();
        
        this.isInitialized = true;
        return { success: true, isNew: true };
    }

    async unlockWithKey(password, encryptionKey) {
        this.dbPassword = encryptionKey || password;
        
        const loaded = await this.loadFromStorage();
        if (loaded) {
            this.isInitialized = true;
            return { success: true, isNew: false };
        }
        
        await this.init();
        await this.createDatabase();
        await this.saveToStorage();
        
        this.isInitialized = true;
        return { success: true, isNew: true };
    }

    changePassword(oldPassword, newPassword) {
        const oldHash = this.generatePasswordHash(oldPassword);
        const result = this.query(`SELECT * FROM users WHERE role = 'admin' LIMIT 1`);
        
        if (result.length === 0 || result[0].password_hash !== oldHash) {
            return { success: false, message: 'Password lama salah' };
        }
        
        const newHash = this.generatePasswordHash(newPassword);
        this.run(`UPDATE users SET password_hash = '${newHash}' WHERE role = 'admin'`);
        this.dbPassword = newPassword;
        this.saveToStorage();
        return { success: true };
    }

    query(sql) {
        if (!this.db) return [];
        try {
            const result = this.db.exec(sql);
            if (result.length === 0) return [];
            const columns = result[0].columns;
            return result[0].values.map(row => {
                const obj = {};
                columns.forEach((col, i) => { obj[col] = row[i]; });
                return obj;
            });
        } catch (e) {
            console.error('Query error:', e);
            return [];
        }
    }

    run(sql) {
        if (!this.db) return false;
        try {
            this.db.run(sql);
            this.saveToStorage();
            return true;
        } catch (e) {
            console.error('Run error:', e);
            return false;
        }
    }

    getLastInsertId() {
        const result = this.query('SELECT last_insert_rowid() as id');
        return result[0]?.id || 0;
    }

    exportToFile(filename = 'jajak_tarus.db') {
        if (!this.db) return;
        const data = this.db.export();
        const uint8Array = new Uint8Array(data);
        let binary = '';
        for (let i = 0; i < uint8Array.length; i++) {
            binary += String.fromCharCode(uint8Array[i]);
        }
        const base64 = btoa(binary);
        const link = document.createElement('a');
        link.href = 'data:application/octet-stream;base64,' + base64;
        link.download = filename;
        link.click();
    }

    reset() {
        localStorage.removeItem('jajak_tarus_db');
        localStorage.removeItem('jajak_tarus_current_user');
        this.db = null;
        this.isInitialized = false;
        this.dbPassword = null;
    }

    // ==================== USER FUNCTIONS ====================
    
    getUsers() {
        return this.query('SELECT * FROM users ORDER BY join_date DESC');
    }

    getUserByEmail(email) {
        return this.query(`SELECT * FROM users WHERE email = '${email}'`)[0] || null;
    }

    getUserById(id) {
        return this.query(`SELECT * FROM users WHERE id = ${id}`)[0] || null;
    }

    registerUser(name, email, whatsapp, password) {
        const existing = this.getUserByEmail(email);
        if (existing) {
            return { success: false, message: 'Email sudah terdaftar' };
        }
        
        const passwordHash = this.generatePasswordHash(password);
        const now = new Date().toISOString();
        
        this.run(`INSERT INTO users (name, email, whatsapp, password_hash, join_date, level, xp) VALUES 
            ('${name}', '${email}', '${whatsapp}', '${passwordHash}', '${now}', 'Pemula', 0)`);
        
        return { success: true, userId: this.getLastInsertId() };
    }

    loginUser(email, password) {
        const user = this.getUserByEmail(email);
        if (!user) {
            return { success: false, message: 'Email belum terdaftar' };
        }
        
        const passwordHash = this.generatePasswordHash(password);
        if (user.password_hash !== passwordHash) {
            return { success: false, message: 'Password salah' };
        }
        
        return { success: true, user };
    }

    updateUserXP(userId, xp) {
        const user = this.getUserById(userId);
        if (!user) return;
        
        let level = 'Pemula';
        if (xp >= 500) level = 'Lanjutan';
        else if (xp >= 200) level = 'Menengah';
        
        this.run(`UPDATE users SET xp = ${xp}, level = '${level}' WHERE id = ${userId}`);
    }

    // ==================== TRIP FUNCTIONS ====================
    
    getTrips() {
        return this.query('SELECT * FROM trips ORDER BY created_at DESC');
    }

    getTripById(id) {
        return this.query(`SELECT * FROM trips WHERE id = ${id}`)[0] || null;
    }

    addTrip(trip) {
        const now = new Date().toISOString();
        const schedules = JSON.stringify(trip.schedules || []);
        
        this.run(`INSERT INTO trips (name, location, height, difficulty, duration, distance, price, image, description, schedules, created_at) VALUES 
            ('${trip.name}', '${trip.location}', ${trip.height}, '${trip.difficulty}', ${trip.duration}, ${trip.distance || 0}, ${trip.price}, '${trip.image}', '${trip.description}', '${schedules}', '${now}')`);
        
        return { success: true, tripId: this.getLastInsertId() };
    }

    updateTrip(id, trip) {
        const schedules = JSON.stringify(trip.schedules || []);
        return this.run(`UPDATE trips SET 
            name='${trip.name}', 
            location='${trip.location}', 
            height=${trip.height}, 
            difficulty='${trip.difficulty}', 
            duration=${trip.duration}, 
            distance=${trip.distance || 0}, 
            price=${trip.price}, 
            image='${trip.image}', 
            description='${trip.description}',
            schedules='${schedules}' 
            WHERE id=${id}`);
    }

    deleteTrip(id) {
        return this.run(`DELETE FROM trips WHERE id = ${id}`);
    }

    // ==================== FORUM FUNCTIONS ====================
    
    getForumTopics(category = 'all') {
        if (category === 'all') {
            return this.query('SELECT * FROM forum_topics ORDER BY is_sticky DESC, created_at DESC');
        }
        return this.query(`SELECT * FROM forum_topics WHERE category = '${category}' ORDER BY is_sticky DESC, created_at DESC`);
    }

    getForumTopicById(id) {
        return this.query(`SELECT * FROM forum_topics WHERE id = ${id}`)[0] || null;
    }

    addForumTopic(title, content, category, authorId, authorName) {
        const now = new Date().toISOString();
        this.run(`INSERT INTO forum_topics (title, content, category, author_id, author_name, created_at) VALUES 
            ('${title}', '${content}', '${category}', ${authorId}, '${authorName}', '${now}')`);
        return { success: true, topicId: this.getLastInsertId() };
    }

    likeForumTopic(id) {
        this.run(`UPDATE forum_topics SET likes = likes + 1 WHERE id = ${id}`);
    }

    getForumReplies(topicId) {
        return this.query(`SELECT * FROM forum_replies WHERE topic_id = ${topicId} ORDER BY created_at ASC`);
    }

    addForumReply(topicId, authorId, authorName, content) {
        const now = new Date().toISOString();
        this.run(`INSERT INTO forum_replies (topic_id, author_id, author_name, content, created_at) VALUES 
            (${topicId}, ${authorId}, '${authorName}', '${content}', '${now}')`);
        this.run(`UPDATE forum_topics SET replies = replies + 1 WHERE id = ${topicId}`);
    }

    // ==================== BOOKING FUNCTIONS ====================
    
    getBookings() {
        return this.query('SELECT * FROM bookings ORDER BY created_at DESC');
    }

    getBookingsByUser(userId) {
        return this.query(`SELECT * FROM bookings WHERE user_id = ${userId} ORDER BY created_at DESC`);
    }

    addBooking(booking) {
        const now = new Date().toISOString();
        this.run(`INSERT INTO bookings (trip_id, trip_name, user_id, user_name, user_email, user_whatsapp, schedule_date, participants, total_price, status, created_at) VALUES 
            (${booking.tripId}, '${booking.tripName}', ${booking.userId}, '${booking.userName}', '${booking.userEmail}', '${booking.userWhatsapp}', '${booking.scheduleDate}', ${booking.participants}, ${booking.totalPrice}, 'pending', '${now}')`);
        return { success: true, bookingId: this.getLastInsertId() };
    }

    updateBookingStatus(id, status) {
        return this.run(`UPDATE bookings SET status = '${status}' WHERE id = ${id}`);
    }

    // ==================== STATS ====================
    
    getStats() {
        const users = this.query('SELECT COUNT(*) as count FROM users')[0]?.count || 0;
        const trips = this.query('SELECT COUNT(*) as count FROM trips')[0]?.count || 0;
        const topics = this.query('SELECT COUNT(*) as count FROM forum_topics')[0]?.count || 0;
        const bookings = this.query('SELECT COUNT(*) as count FROM bookings')[0]?.count || 0;
        return { users, trips, topics, bookings };
    }
}

const db = new JajakTarusDB();

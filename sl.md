"use strict";

/*=========================================================
    GAMEVERSE STORAGE MANAGER
    ------------------------------------
    Wrapper around Local Storage
=========================================================*/

const Storage = {

    /*====================================
        Save Data
    ====================================*/
    save(key, data) {

        try {

            localStorage.setItem(

                key,

                JSON.stringify(data)

            );

            return true;

        }

        catch (error) {

            console.error("Storage Save Error:", error);

            return false;

        }

    },

    /*====================================
        Load Data
    ====================================*/
    load(key) {

        try {

            const data = localStorage.getItem(key);

            if (!data)

                return [];

            return JSON.parse(data);

        }

        catch (error) {

            console.error("Storage Load Error:", error);

            return [];

        }

    },

    /*====================================
        Check Key Exists
    ====================================*/
    exists(key) {

        return localStorage.getItem(key) !== null;

    },

    /*====================================
        Delete Entire Collection
    ====================================*/
    delete(key) {

        localStorage.removeItem(key);

    },

    /*====================================
        Clear Everything
    ====================================*/
    clear() {

        localStorage.clear();

    },

    /*====================================
        Add Record
    ====================================*/
    add(key, object) {

        const data = this.load(key);

        data.push(object);

        this.save(key, data);

        return object;

    },

    /*====================================
        Update Record By ID
    ====================================*/
    update(key, id, newData) {

        const data = this.load(key);

        const index = data.findIndex(

            item => item.id === id

        );

        if (index === -1)

            return false;

        data[index] = {

            ...data[index],

            ...newData

        };

        this.save(key, data);

        return true;

    },

    /*====================================
        Remove Record By ID
    ====================================*/
    remove(key, id) {

        const data = this.load(key);

        const filtered = data.filter(

            item => item.id !== id

        );

        this.save(key, filtered);

    },

    /*====================================
        Find By ID
    ====================================*/
    getById(key, id) {

        return this.load(key)

            .find(item => item.id === id);

    },

    /*====================================
        Find First Match
    ====================================*/
    find(key, callback) {

        return this.load(key)

            .find(callback);

    },

    /*====================================
        Filter Records
    ====================================*/
    filter(key, callback) {

        return this.load(key)

            .filter(callback);

    },

    /*====================================
        Count Records
    ====================================*/
    count(key) {

        return this.load(key).length;

    },

    /*====================================
        Replace Entire Collection
    ====================================*/
    replace(key, data) {

        this.save(key, data);

    },

    /*====================================
        Generate Next ID
    ====================================*/
    nextId(key) {

        const data = this.load(key);

        if (data.length === 0)

            return 1;

        return Math.max(

            ...data.map(item => item.id)

        ) + 1;

    },

    /*====================================
        Toggle Boolean Value
    ====================================*/
    toggle(key, id, field) {

        const data = this.load(key);

        const index = data.findIndex(

            item => item.id === id

        );

        if (index === -1)

            return false;

        data[index][field] =

            !data[index][field];

        this.save(key, data);

        return true;

    },

    /*====================================
        Search Collection
    ====================================*/
    search(key, text) {

        const value = text.toLowerCase();

        return this.load(key)

            .filter(item =>

                JSON.stringify(item)

                .toLowerCase()

                .includes(value)

            );

    },

    /*====================================
        Sort Collection
    ====================================*/
    sort(key, field, ascending = true) {

        const data = this.load(key);

        data.sort((a, b) => {

            if (a[field] > b[field])

                return ascending ? 1 : -1;

            if (a[field] < b[field])

                return ascending ? -1 : 1;

            return 0;

        });

        this.save(key, data);

        return data;

    },

    /*====================================
        Pagination
    ====================================*/
    paginate(key, page = 1, limit = 10) {

        const data = this.load(key);

        const start = (page - 1) * limit;

        const end = start + limit;

        return {

            total: data.length,

            page: page,

            limit: limit,

            pages: Math.ceil(data.length / limit),

            data: data.slice(start, end)

        };

    },

    /*====================================
        Backup Storage
    ====================================*/
    backup() {

        const backup = {};

        for (let i = 0; i < localStorage.length; i++) {

            const key = localStorage.key(i);

            backup[key] =

                JSON.parse(

                    localStorage.getItem(key)

                );

        }

        return backup;

    },

    /*====================================
        Restore Backup
    ====================================*/
    restore(data) {

        Object.keys(data).forEach(key => {

            localStorage.setItem(

                key,

                JSON.stringify(data[key])

            );

        });

    }

};

/*=========================================================
    DEFAULT COLLECTION NAMES
=========================================================*/

const COLLECTIONS = {

    USERS: "users",

    INFLUENCERS: "influencers",

    BRANDS: "brands",

    TOURNAMENTS: "tournaments",

    SUBSCRIPTIONS: "subscriptions",

    SETTINGS: "settings",

    REPORTS: "reports",

    ANALYTICS: "analytics",

    ACTIVITY_LOGS: "activityLogs",

    SUPPORT_TICKETS: "supportTickets",

    SYSTEM_LOGS: "systemLogs"

};

Object.freeze(COLLECTIONS);

console.log("✅ Storage Manager Loaded");








"use strict";

/*=========================================================
    GAMEVERSE DATABASE SEED
=========================================================*/

(function () {

    initializeSeed();

})();

/*=========================================================
    INITIALIZE DATABASE
=========================================================*/

function initializeSeed() {

    seedUsers();

    seedInfluencers();

}

/*=========================================================
    DEFAULT USERS
=========================================================*/

function seedUsers() {

    if (Storage.exists(COLLECTIONS.USERS))

        return;

    const users = [

        {
            id: 1,
            username: "Rohit Sharma",
            email: "rohit@gmail.com",
            phone: "9876543210",
            role: "Player",
            country: "India",
            game: "BGMI",
            status: "Pending",
            verified: false,
            joined: "2026-07-01",
            avatar: "../images/user1.png"
        },

        {
            id: 2,
            username: "Karthik",
            email: "karthik@gmail.com",
            phone: "9876543211",
            role: "Player",
            country: "India",
            game: "Valorant",
            status: "Approved",
            verified: true,
            joined: "2026-06-20",
            avatar: "../images/user2.png"
        },

        {
            id: 3,
            username: "Sanjay",
            email: "sanjay@gmail.com",
            phone: "9876543212",
            role: "Streamer",
            country: "India",
            game: "Free Fire",
            status: "Rejected",
            verified: false,
            joined: "2026-06-18",
            avatar: "../images/user3.png"
        },

        {
            id: 4,
            username: "Akash",
            email: "akash@gmail.com",
            phone: "9876543213",
            role: "Player",
            country: "India",
            game: "COD Mobile",
            status: "Pending",
            verified: false,
            joined: "2026-06-25",
            avatar: "../images/user4.png"
        },

        {
            id: 5,
            username: "Harish",
            email: "harish@gmail.com",
            phone: "9876543214",
            role: "Caster",
            country: "India",
            game: "PUBG",
            status: "Approved",
            verified: true,
            joined: "2026-06-15",
            avatar: "../images/user5.png"
        }

    ];

    Storage.save(

        COLLECTIONS.USERS,

        users

    );

    console.log("Users Seeded");

}

/*=========================================================
    DEFAULT INFLUENCERS
=========================================================*/

function seedInfluencers() {

    if (Storage.exists(COLLECTIONS.INFLUENCERS))

        return;

    const influencers = [

        {

            id: 1,

            name: "Gaming Beast",

            email: "beast@gmail.com",

            platform: "YouTube",

            followers: 245000,

            subscribers: 245000,

            engagement: "9.5%",

            status: "Pending",

            verified: false,

            channel:

                "https://youtube.com/@gamingbeast"

        },

        {

            id: 2,

            name: "Shadow Gamer",

            email: "shadow@gmail.com",

            platform: "Instagram",

            followers: 182000,

            subscribers: 0,

            engagement: "8.2%",

            status: "Approved",

            verified: true,

            channel:

                "https://instagram.com/shadow"

        },

        {

            id: 3,

            name: "Esports King",

            email: "king@gmail.com",

            platform: "YouTube",

            followers: 910000,

            subscribers: 910000,

            engagement: "11.4%",

            status: "Pending",

            verified: false,

            channel:

                "https://youtube.com/@esportsking"

        },

        {

            id: 4,

            name: "Nova Plays",

            email: "nova@gmail.com",

            platform: "Twitch",

            followers: 125000,

            subscribers: 125000,

            engagement: "7.9%",

            status: "Rejected",

            verified: false,

            channel:

                "https://twitch.tv/novaplays"

        },

        {

            id: 5,

            name: "Game Freak",

            email: "gamefreak@gmail.com",

            platform: "Kick",

            followers: 86000,

            subscribers: 86000,

            engagement: "10.1%",

            status: "Approved",

            verified: true,

            channel:

                "https://kick.com/gamefreak"

        }

    ];

    Storage.save(

        COLLECTIONS.INFLUENCERS,

        influencers

    );

    console.log("Influencers Seeded");

}
/*=========================================================
    DEFAULT BRANDS
=========================================================*/

function seedBrands() {

    if (Storage.exists(COLLECTIONS.BRANDS))

        return;

    const brands = [

        {
            id: 1,
            company: "Red Bull Gaming",
            email: "gaming@redbull.com",
            website: "https://www.redbull.com",
            category: "Energy Drink",
            country: "Austria",
            gst: "GST10001",
            phone: "9876500001",
            status: "Approved",
            verified: true
        },

        {
            id: 2,
            company: "NVIDIA",
            email: "esports@nvidia.com",
            website: "https://www.nvidia.com",
            category: "Hardware",
            country: "USA",
            gst: "GST10002",
            phone: "9876500002",
            status: "Pending",
            verified: false
        },

        {
            id: 3,
            company: "AMD Gaming",
            email: "amd@amd.com",
            website: "https://www.amd.com",
            category: "Processor",
            country: "USA",
            gst: "GST10003",
            phone: "9876500003",
            status: "Rejected",
            verified: false
        },

        {
            id: 4,
            company: "ASUS ROG",
            email: "rog@asus.com",
            website: "https://rog.asus.com",
            category: "Laptop",
            country: "Taiwan",
            gst: "GST10004",
            phone: "9876500004",
            status: "Approved",
            verified: true
        },

        {
            id: 5,
            company: "Logitech G",
            email: "gaming@logitech.com",
            website: "https://www.logitechg.com",
            category: "Accessories",
            country: "Switzerland",
            gst: "GST10005",
            phone: "9876500005",
            status: "Pending",
            verified: false
        }

    ];

    Storage.save(

        COLLECTIONS.BRANDS,

        brands

    );

    console.log("Brands Seeded");

}

/*=========================================================
    DEFAULT TOURNAMENTS
=========================================================*/

function seedTournaments() {

    if (Storage.exists(COLLECTIONS.TOURNAMENTS))

        return;

    const tournaments = [

        {
            id: 1,
            name: "BGMI Championship",
            game: "BGMI",
            organizer: "GameVerse",
            prizePool: 200000,
            entryFee: 500,
            teams: 64,
            registered: 64,
            startDate: "2026-07-15",
            endDate: "2026-07-20",
            status: "Active"
        },

        {
            id: 2,
            name: "Valorant Masters",
            game: "Valorant",
            organizer: "Red Bull",
            prizePool: 150000,
            entryFee: 400,
            teams: 32,
            registered: 20,
            startDate: "2026-08-02",
            endDate: "2026-08-05",
            status: "Upcoming"
        },

        {
            id: 3,
            name: "Free Fire League",
            game: "Free Fire",
            organizer: "Garena",
            prizePool: 100000,
            entryFee: 300,
            teams: 48,
            registered: 48,
            startDate: "2026-06-01",
            endDate: "2026-06-05",
            status: "Completed"
        },

        {
            id: 4,
            name: "COD Mobile Cup",
            game: "COD Mobile",
            organizer: "Activision",
            prizePool: 120000,
            entryFee: 350,
            teams: 32,
            registered: 28,
            startDate: "2026-07-25",
            endDate: "2026-07-29",
            status: "Pending"
        },

        {
            id: 5,
            name: "PUBG Pro League",
            game: "PUBG",
            organizer: "Krafton",
            prizePool: 500000,
            entryFee: 1000,
            teams: 64,
            registered: 64,
            startDate: "2026-09-10",
            endDate: "2026-09-18",
            status: "Upcoming"
        }

    ];

    Storage.save(

        COLLECTIONS.TOURNAMENTS,

        tournaments

    );

    console.log("Tournaments Seeded");

}

/*=========================================================
    DEFAULT SUBSCRIPTIONS
=========================================================*/

function seedSubscriptions() {

    if (Storage.exists(COLLECTIONS.SUBSCRIPTIONS))

        return;

    const subscriptions = [

        {
            id: 1,
            plan: "Free",
            monthly: 0,
            yearly: 0,
            users: 1500,
            status: "Active"
        },

        {
            id: 2,
            plan: "Silver",
            monthly: 199,
            yearly: 1999,
            users: 820,
            status: "Active"
        },

        {
            id: 3,
            plan: "Gold",
            monthly: 499,
            yearly: 4999,
            users: 410,
            status: "Active"
        },

        {
            id: 4,
            plan: "Platinum",
            monthly: 999,
            yearly: 9999,
            users: 180,
            status: "Active"
        },

        {
            id: 5,
            plan: "Enterprise",
            monthly: 2999,
            yearly: 29999,
            users: 32,
            status: "Active"
        }

    ];

    Storage.save(

        COLLECTIONS.SUBSCRIPTIONS,

        subscriptions

    );

    console.log("Subscriptions Seeded");

}
/*=========================================================
    DEFAULT SETTINGS
=========================================================*/

function seedSettings() {

    if (Storage.exists(COLLECTIONS.SETTINGS))

        return;

    const settings = {

        platformName: "GameVerse",

        supportEmail: "support@gameverse.com",

        supportPhone: "9876543210",

        timezone: "Asia/Kolkata",

        currency: "INR",

        language: "English",

        notifications: true,

        maintenanceMode: false,

        theme: "dark"

    };

    Storage.save(

        COLLECTIONS.SETTINGS,

        settings

    );

    console.log("Settings Seeded");

}

/*=========================================================
    DEFAULT ACTIVITY LOGS
=========================================================*/

function seedActivityLogs() {

    if (Storage.exists(COLLECTIONS.ACTIVITY_LOGS))

        return;

    const logs = [

        {

            id: 1,

            admin: "Super Admin",

            action: "Logged into dashboard",

            module: "Authentication",

            date: "2026-07-02",

            time: "09:30 AM"

        },

        {

            id: 2,

            admin: "Super Admin",

            action: "Approved User",

            module: "User Verification",

            date: "2026-07-02",

            time: "09:45 AM"

        },

        {

            id: 3,

            admin: "Super Admin",

            action: "Approved Brand",

            module: "Brand Verification",

            date: "2026-07-02",

            time: "10:05 AM"

        }

    ];

    Storage.save(

        COLLECTIONS.ACTIVITY_LOGS,

        logs

    );

}

/*=========================================================
    DEFAULT SUPPORT TICKETS
=========================================================*/

function seedSupportTickets() {

    if (Storage.exists(COLLECTIONS.SUPPORT_TICKETS))

        return;

    const tickets = [

        {

            id: 1,

            user: "Rohit",

            subject: "Tournament Registration",

            priority: "High",

            status: "Open"

        },

        {

            id: 2,

            user: "Gaming Beast",

            subject: "Influencer Verification",

            priority: "Medium",

            status: "Pending"

        },

        {

            id: 3,

            user: "Red Bull",

            subject: "Brand Approval",

            priority: "Low",

            status: "Resolved"

        }

    ];

    Storage.save(

        COLLECTIONS.SUPPORT_TICKETS,

        tickets

    );

}

/*=========================================================
    DEFAULT REPORTS
=========================================================*/

function seedReports() {

    if (Storage.exists(COLLECTIONS.REPORTS))

        return;

    const reports = [

        {

            id: 1,

            title: "Monthly Verification Report",

            created: "2026-07-01"

        },

        {

            id: 2,

            title: "Tournament Performance",

            created: "2026-07-01"

        }

    ];

    Storage.save(

        COLLECTIONS.REPORTS,

        reports

    );

}

/*=========================================================
    DEFAULT ANALYTICS
=========================================================*/

function seedAnalytics() {

    if (Storage.exists(COLLECTIONS.ANALYTICS))

        return;

    const analytics = {

        totalUsers: 5,

        totalInfluencers: 5,

        totalBrands: 5,

        totalTournaments: 5,

        totalSubscriptions: 5,

        monthlyRevenue: 350000,

        activeUsers: 4200,

        onlineUsers: 218

    };

    Storage.save(

        COLLECTIONS.ANALYTICS,

        analytics

    );

}

/*=========================================================
    DEFAULT SYSTEM LOGS
=========================================================*/

function seedSystemLogs() {

    if (Storage.exists(COLLECTIONS.SYSTEM_LOGS))

        return;

    const logs = [

        {

            id: 1,

            type: "INFO",

            message: "Server Started",

            date: "2026-07-02"

        },

        {

            id: 2,

            type: "INFO",

            message: "Database Initialized",

            date: "2026-07-02"

        },

        {

            id: 3,

            type: "SUCCESS",

            message: "Seed Completed",

            date: "2026-07-02"

        }

    ];

    Storage.save(

        COLLECTIONS.SYSTEM_LOGS,

        logs

    );

}

/*=========================================================
    UPDATE INITIALIZE
=========================================================*/

function initializeSeed() {

    seedUsers();

    seedInfluencers();

    seedBrands();

    seedTournaments();

    seedSubscriptions();

    seedSettings();

    seedActivityLogs();

    seedSupportTickets();

    seedReports();

    seedAnalytics();

    seedSystemLogs();

    console.log("✅ GameVerse Database Initialized");

}

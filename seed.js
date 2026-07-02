"use strict";

/*=========================================================
                GAMEVERSE DATABASE SEED
=========================================================*/

(function () {

    /*=====================================================
                    CHECK STORAGE
    =====================================================*/

    if (Storage.load(COLLECTIONS.USERS)?.length) {

        console.log("Seed already exists.");

        return;

    }

    console.log("Creating GameVerse demo database...");

    /*=====================================================
                    COLLECTIONS
    =====================================================*/

    const users = [];

    const influencers = [];

    const brands = [];

    const tournaments = [];

    const subscriptions = [];

    const supportTickets = [];

    const activityLogs = [];

    const analytics = {

        activeUsers: 328,

        onlineUsers: 146,

        monthlyGrowth: 12,

        revenue: 845000,

        tournamentsHosted: 20,

        verifiedUsers: 0,

        pendingUsers: 0

    };

    /*=====================================================
                    MASTER DATA
    =====================================================*/

    const firstNames = [

        "Shadow",

        "Dark",

        "Ghost",

        "Alpha",

        "Blaze",

        "Nova",

        "Venom",

        "Frost",

        "Inferno",

        "Hunter",

        "Falcon",

        "Rogue",

        "Titan",

        "Wolf",

        "Storm",

        "Ace",

        "Knight",

        "Viper",

        "Phoenix",

        "Dragon"

    ];

    const lastNames = [

        "X",

        "Gaming",

        "YT",

        "Live",

        "Pro",

        "OP",

        "Esports",

        "TV",

        "Plays",

        "Legend"

    ];

    const countries = [

        "India",

        "Singapore",

        "Malaysia",

        "Indonesia",

        "UAE",

        "Nepal",

        "Bangladesh",

        "Sri Lanka"

    ];

    const games = [

        "BGMI",

        "Valorant",

        "Free Fire",

        "COD Mobile",

        "PUBG PC",

        "CS2"

    ];

    const roles = [

        "Player",

        "Streamer",

        "Caster"

    ];

    const statuses = [

        "Pending",

        "Approved",

        "Rejected"

    ];

    const brandNames = [

        "Red Bull",

        "HyperX",

        "ASUS ROG",

        "Logitech",

        "MSI",

        "Intel",

        "AMD",

        "NVIDIA"

    ];

    const influencerPlatforms = [

        "YouTube",

        "Instagram",

        "Twitch",

        "Kick"

    ];

    /*=====================================================
                    HELPERS
    =====================================================*/

    function random(array) {

        return array[

            Math.floor(

                Math.random() *

                array.length

            )

        ];

    }

    function randomNumber(min, max) {

        return Math.floor(

            Math.random() *

            (max - min + 1)

        ) + min;

    }

    function randomPhone() {

        return "9" +

            randomNumber(

                100000000,

                999999999

            );

    }

    function randomEmail(username) {

        return (

            username.toLowerCase()

            +

            "@gmail.com"

        );

    }

    function randomDate() {

        const day =

            randomNumber(1, 28);

        const month =

            random([

                "Jan",

                "Feb",

                "Mar",

                "Apr",

                "May",

                "Jun",

                "Jul"

            ]);

        return day +

            " " +

            month +

            " 2026";

    }

    function avatar(id) {

        const image =

            ((id - 1) % 5) + 1;

        return `../images/user${image}.png`;

    }

    /*=====================================================
                    SUBSCRIPTIONS
    =====================================================*/

    subscriptions.push(

        {

            id:1,

            name:"Free",

            monthly:0,

            users:520

        },

        {

            id:2,

            name:"Silver",

            monthly:299,

            users:210

        },

        {

            id:3,

            name:"Gold",

            monthly:499,

            users:145

        },

        {

            id:4,

            name:"Platinum",

            monthly:799,

            users:86

        },

        {

            id:5,

            name:"Enterprise",

            monthly:1499,

            users:18

        }

    );
/*=====================================================
                GENERATE USERS
=====================================================*/

for (let i = 1; i <= 100; i++) {

    const username =

        random(firstNames) +

        random(lastNames) +

        i;

    const status = random(statuses);

    const verified = status === "Approved";

    users.push({

        id: i,

        username: username,

        email: randomEmail(username),

        phone: randomPhone(),

        country: random(countries),

        role: random(roles),

        game: random(games),

        status: status,

        verified: verified,

        avatar: avatar(i),

        joined: randomDate(),

        notes: verified

            ? "Verified Successfully"

            : "",

        age: randomNumber(18, 35),

        gender:

            Math.random() > 0.5

                ? "Male"

                : "Female",

        city: random([

            "Chennai",

            "Bangalore",

            "Hyderabad",

            "Mumbai",

            "Delhi",

            "Pune",

            "Kolkata",

            "Coimbatore"

        ]),

        state: random([

            "Tamil Nadu",

            "Karnataka",

            "Maharashtra",

            "Telangana",

            "Kerala"

        ]),

        bio:

            "Competitive esports player on GameVerse.",

        rank: random([

            "Bronze",

            "Silver",

            "Gold",

            "Platinum",

            "Diamond",

            "Conqueror"

        ]),

        followers: randomNumber(

            100,

            50000

        ),

        following: randomNumber(

            50,

            5000

        ),

        matchesPlayed: randomNumber(

            50,

            2500

        ),

        wins: randomNumber(

            10,

            1200

        ),

        winRate:

            randomNumber(

                40,

                90

            ) + "%",

        kda:

            (

                Math.random() * 5 + 1

            ).toFixed(2),

        earnings:

            randomNumber(

                0,

                500000

            ),

        lastLogin:

            randomDate(),

        createdAt:

            new Date().toISOString()

    });

}

/*=====================================================
            UPDATE ANALYTICS
=====================================================*/

analytics.verifiedUsers =

    users.filter(

        user => user.verified

    ).length;

analytics.pendingUsers =

    users.filter(

        user =>

            user.status === "Pending"

    ).length;

console.log(

    users.length +

    " demo users generated."

);
/*=====================================================
                GENERATE INFLUENCERS
=====================================================*/

for (let i = 1; i <= 40; i++) {

    const username =

        random(firstNames) +

        "Creator" +

        i;

    const subscribers = randomNumber(10000, 5000000);

    const views = randomNumber(50000, 50000000);

    const status = random(statuses);

    influencers.push({

        id: i,

        username: username,

        email: randomEmail(username),

        phone: randomPhone(),

        country: random(countries),

        platform: random(influencerPlatforms),

        category: random([

            "Gaming",

            "FPS",

            "MOBA",

            "Battle Royale",

            "Esports"

        ]),

        game: random(games),

        status: status,

        verified: status === "Approved",

        avatar: avatar(i),

        joined: randomDate(),

        subscribers: subscribers,

        followers: subscribers,

        views: views,

        engagement: randomNumber(3, 15) + "%",

        avgLikes: randomNumber(1000, 100000),

        avgComments: randomNumber(100, 10000),

        avgShares: randomNumber(50, 5000),

        sponsorships: randomNumber(1, 30),

        earnings: randomNumber(10000, 1000000),

        bio: "Professional Gaming Content Creator",

        notes: "",

        createdAt: new Date().toISOString()

    });

}

console.log(

    influencers.length +

    " influencers generated."

);

/*=====================================================
                    GENERATE BRANDS
=====================================================*/

for (let i = 1; i <= 25; i++) {

    const company =

        random(brandNames) +

        " " +

        i;

    const status = random(statuses);

    brands.push({

        id: i,

        company: company,

        email:

            company

            .replace(/\s+/g, "")

            .toLowerCase()

            + "@company.com",

        phone: randomPhone(),

        website:

            "https://www."

            +

            company

            .replace(/\s+/g, "")

            .toLowerCase()

            +

            ".com",

        country: random(countries),

        industry: random([

            "Gaming",

            "Hardware",

            "Software",

            "Accessories",

            "Energy Drinks",

            "PC Components"

        ]),

        status: status,

        verified: status === "Approved",

        logo: "../images/brand.png",

        employees: randomNumber(20, 5000),

        revenue:

            randomNumber(

                5,

                500

            ) + " Cr",

        campaigns: randomNumber(1, 50),

        partnerships: randomNumber(1, 100),

        founded: randomNumber(2000, 2025),

        description:

            "Official esports sponsor and gaming brand.",

        notes: "",

        joined: randomDate(),

        createdAt: new Date().toISOString()

    });

}

console.log(

    brands.length +

    " brands generated."

);

/*=====================================================
            UPDATE ANALYTICS
=====================================================*/

analytics.totalInfluencers = influencers.length;

analytics.totalBrands = brands.length;

analytics.approvedInfluencers =

    influencers.filter(

        item => item.verified

    ).length;

analytics.approvedBrands =

    brands.filter(

        item => item.verified

    ).length;

/*=====================================================
                GENERATE TOURNAMENTS
=====================================================*/

for (let i = 1; i <= 20; i++) {

    const status = random([
        "Upcoming",
        "Ongoing",
        "Completed",
        "Pending"
    ]);

    tournaments.push({

        id: i,

        name: random([
            "Championship",
            "Masters Cup",
            "Battle Royale",
            "Elite League",
            "Arena Clash",
            "Ultimate Cup"
        ]) + " " + i,

        game: random(games),

        organizer: random([
            "GameVerse",
            "Red Bull",
            "HyperX",
            "ASUS ROG",
            "MSI",
            "Intel"
        ]),

        status: status,

        prizePool: randomNumber(50000, 1000000),

        registered: randomNumber(20, 128),

        maxTeams: 128,

        entryFee: randomNumber(0, 1000),

        location: random(countries),

        startDate: randomDate(),

        endDate: randomDate(),

        spectators: randomNumber(500, 50000),

        winner:

            status === "Completed"

            ? random(firstNames)

            : "",

        banner: "../images/tournament.jpg",

        description:

            "Official GameVerse esports tournament.",

        createdAt: new Date().toISOString()

    });

}

console.log(

    tournaments.length +

    " tournaments generated."

);

/*=====================================================
                GENERATE SUPPORT TICKETS
=====================================================*/

const ticketCategories = [

    "Verification",

    "Payment",

    "Tournament",

    "Bug Report",

    "Subscription",

    "Technical"

];

const ticketPriority = [

    "Low",

    "Medium",

    "High"

];

const ticketStatus = [

    "Open",

    "In Progress",

    "Resolved"

];

for (let i = 1; i <= 35; i++) {

    supportTickets.push({

        id: i,

        ticketNo: "GV-" +

            (1000 + i),

        username:

            users[randomNumber(0, users.length - 1)]

            .username,

        category:

            random(ticketCategories),

        priority:

            random(ticketPriority),

        status:

            random(ticketStatus),

        subject:

            "Support Request #" + i,

        description:

            "Dummy support ticket generated for testing.",

        assignedTo:

            "Support Team",

        created: randomDate(),

        updated: randomDate()

    });

}

console.log(

    supportTickets.length +

    " support tickets generated."

);

/*=====================================================
                UPDATE ANALYTICS
=====================================================*/

analytics.totalTournaments = tournaments.length;

analytics.openTickets =

    supportTickets.filter(

        ticket =>

            ticket.status !== "Resolved"

    ).length;

analytics.completedTournaments =

    tournaments.filter(

        tournament =>

            tournament.status === "Completed"

    ).length;

analytics.ongoingTournaments =

    tournaments.filter(

        tournament =>

            tournament.status === "Ongoing"

    ).length;
/*=====================================================
                GENERATE ACTIVITY LOGS
=====================================================*/

const actions = [

    "Approved User",

    "Rejected User",

    "User Registered",

    "Brand Verified",

    "Influencer Verified",

    "Tournament Created",

    "Tournament Updated",

    "Tournament Completed",

    "Support Ticket Opened",

    "Support Ticket Resolved",

    "Subscription Purchased"

];

for (let i = 1; i <= 100; i++) {

    activityLogs.push({

        id: i,

        action: random(actions),

        target:

            users[

                randomNumber(0, users.length - 1)

            ].username,

        admin: "Super Admin",

        module: random([

            "Dashboard",

            "User Verification",

            "Influencer Verification",

            "Brand Verification",

            "Tournament",

            "Support"

        ]),

        date: randomDate(),

        time:

            randomNumber(1, 12)

            + ":"

            + String(randomNumber(0, 59))

            .padStart(2, "0")

            + " "

            + random(["AM", "PM"])

    });

}

console.log(

    activityLogs.length +

    " activity logs generated."

);

/*=====================================================
                FINAL ANALYTICS
=====================================================*/

analytics.totalUsers = users.length;

analytics.totalInfluencers = influencers.length;

analytics.totalBrands = brands.length;

analytics.totalTournaments = tournaments.length;

analytics.totalRevenue = subscriptions.reduce(

    (total, plan) =>

        total + (plan.monthly * plan.users),

    0

);

analytics.pendingUsers =

    users.filter(

        u => u.status === "Pending"

    ).length;

analytics.approvedUsers =

    users.filter(

        u => u.status === "Approved"

    ).length;

analytics.rejectedUsers =

    users.filter(

        u => u.status === "Rejected"

    ).length;

/*=====================================================
                SAVE TO LOCAL STORAGE
=====================================================*/

Storage.save(

    COLLECTIONS.USERS,

    users

);

Storage.save(

    COLLECTIONS.INFLUENCERS,

    influencers

);

Storage.save(

    COLLECTIONS.BRANDS,

    brands

);

Storage.save(

    COLLECTIONS.TOURNAMENTS,

    tournaments

);

Storage.save(

    COLLECTIONS.SUBSCRIPTIONS,

    subscriptions

);

Storage.save(

    COLLECTIONS.SUPPORT_TICKETS,

    supportTickets

);

Storage.save(

    COLLECTIONS.ACTIVITY_LOGS,

    activityLogs

);

Storage.save(

    COLLECTIONS.ANALYTICS,

    analytics

);

/*=====================================================
                SUCCESS MESSAGE
=====================================================*/

console.log(

    "%cGameVerse Demo Database Created Successfully",

    "color:#22C55E;font-size:18px;font-weight:bold;"

);

console.table({

    Users: users.length,

    Influencers: influencers.length,

    Brands: brands.length,

    Tournaments: tournaments.length,

    Tickets: supportTickets.length,

    ActivityLogs: activityLogs.length

});

})();
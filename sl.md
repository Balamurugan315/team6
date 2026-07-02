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

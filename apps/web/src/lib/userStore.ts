// Robust User Store with in-memory persistence fallback for Serverless environments (Vercel)

export interface StoredUser {
  id: string;
  username: string;
  email: string;
  passwordHash: string;
  role: string;
  credits: number;
  hwid?: string | null;
  apiKey: string;
  status: string;
  createdAt: string;
}

// Global in-memory storage to persist across requests in serverless lambda instances
declare global {
  // eslint-disable-next-line no-var
  var __pst_memory_users__: Map<string, StoredUser> | undefined;
}

function getMemoryStore(): Map<string, StoredUser> {
  if (!globalThis.__pst_memory_users__) {
    const store = new Map<string, StoredUser>();

    // Default Seed Accounts
    const defaultUsers: StoredUser[] = [
      {
        id: "usr_tech1",
        username: "technician1",
        email: "tech1@phoenix.test",
        passwordHash: "tech123",
        role: "TECHNICIAN",
        credits: 85,
        hwid: "HWID-A49F-83CD-9011-B7E2",
        apiKey: "pst_live_9021839218391283",
        status: "ACTIVE",
        createdAt: new Date().toISOString(),
      },
      {
        id: "usr_reseller",
        username: "reseller_gsm",
        email: "reseller@phoenix.test",
        passwordHash: "reseller123",
        role: "RESELLER",
        credits: 5400,
        hwid: null,
        apiKey: "pst_live_reseller_88291039",
        status: "ACTIVE",
        createdAt: new Date().toISOString(),
      },
      {
        id: "usr_admin",
        username: "admin",
        email: "admin@phoenixservicetool.com",
        passwordHash: "admin123",
        role: "ADMIN",
        credits: 99999,
        hwid: "HWID-ADMIN-ROOT-SERVER",
        apiKey: "pst_live_admin_secret_key",
        status: "ACTIVE",
        createdAt: new Date().toISOString(),
      },
    ];

    defaultUsers.forEach((u) => {
      store.set(u.id, u);
      store.set(u.username.toLowerCase(), u);
      store.set(u.email.toLowerCase(), u);
    });

    globalThis.__pst_memory_users__ = store;
  }

  return globalThis.__pst_memory_users__;
}

export const memoryUserStore = {
  findUser: (query: string): StoredUser | null => {
    const store = getMemoryStore();
    return store.get(query.toLowerCase()) || store.get(query) || null;
  },

  createUser: (user: Omit<StoredUser, "id" | "createdAt">): StoredUser => {
    const store = getMemoryStore();
    const id = "usr_" + Math.random().toString(36).substring(2, 9);
    const fullUser: StoredUser = {
      ...user,
      id,
      createdAt: new Date().toISOString(),
    };

    store.set(id, fullUser);
    store.set(fullUser.username.toLowerCase(), fullUser);
    store.set(fullUser.email.toLowerCase(), fullUser);
    return fullUser;
  },

  updateUser: (id: string, updates: Partial<StoredUser>): StoredUser | null => {
    const store = getMemoryStore();
    const existing = store.get(id);
    if (!existing) return null;

    const updated = { ...existing, ...updates };
    store.set(id, updated);
    store.set(updated.username.toLowerCase(), updated);
    store.set(updated.email.toLowerCase(), updated);
    return updated;
  },
};


// Mock Local Storage Backend (Development Only)
// This allows you to test the CMS without Firebase
// Replace with real Firebase when ready

const STORAGE_PREFIX = 'leadcore_cms_';

class MockCMSService {
    constructor() {
        this.initializeStorage();
    }

    initializeStorage() {
        // Initialize with mock data if empty
        if (!localStorage.getItem(`${STORAGE_PREFIX}initialized`)) {
            this.seedMockData();
            localStorage.setItem(`${STORAGE_PREFIX}initialized`, 'true');
        }
    }

    seedMockData() {
        // Seed with your existing data
        const mockBlogs = [];
        const mockCaseStudies = [
            // Your existing case study data
            {
                id: '1',
                slug: 'doubling-pipeline',
                title: 'Doubling Pipeline with LinkedIn',
                subtitle: 'SaaS Company',
                metric: '+180%',
                excerpt: 'How we scaled targeted outreach',
                image: '#6C5CE7',
                service: 'LinkedIn Lead Generation',
                industry: 'SaaS',
                problem: 'Low qualified lead volume',
                solution: 'Multi-channel LinkedIn automation',
                results: 'Pipeline grew 180% in 8 weeks',
                status: 'published',
                order: 1,
                createdAt: new Date().toISOString()
            }
            // Add more from your existing data
        ];

        localStorage.setItem(`${STORAGE_PREFIX}blogs`, JSON.stringify(mockBlogs));
        localStorage.setItem(`${STORAGE_PREFIX}caseStudies`, JSON.stringify(mockCaseStudies));
        localStorage.setItem(`${STORAGE_PREFIX}pricingPlans`, JSON.stringify([]));
        localStorage.setItem(`${STORAGE_PREFIX}teamMembers`, JSON.stringify([]));
        localStorage.setItem(`${STORAGE_PREFIX}contactMethods`, JSON.stringify([]));
    }

    // Generic CRUD operations
    getAll(collection) {
        const data = localStorage.getItem(`${STORAGE_PREFIX}${collection}`);
        return data ? JSON.parse(data) : [];
    }

    getById(collection, id) {
        const items = this.getAll(collection);
        return items.find(item => item.id === id) || null;
    }

    getBySlug(collection, slug) {
        const items = this.getAll(collection);
        return items.find(item => item.slug === slug) || null;
    }

    create(collection, data) {
        const items = this.getAll(collection);
        const newItem = {
            ...data,
            id: Date.now().toString(),
            createdAt: new Date().toISOString()
        };
        items.push(newItem);
        localStorage.setItem(`${STORAGE_PREFIX}${collection}`, JSON.stringify(items));
        return newItem.id;
    }

    update(collection, id, data) {
        const items = this.getAll(collection);
        const index = items.findIndex(item => item.id === id);
        if (index !== -1) {
            items[index] = { ...items[index], ...data, updatedAt: new Date().toISOString() };
            localStorage.setItem(`${STORAGE_PREFIX}${collection}`, JSON.stringify(items));
            return true;
        }
        return false;
    }

    delete(collection, id) {
        const items = this.getAll(collection);
        const filtered = items.filter(item => item.id !== id);
        localStorage.setItem(`${STORAGE_PREFIX}${collection}`, JSON.stringify(filtered));
        return true;
    }
}

const mockCMS = new MockCMSService();

// Mock Auth
const MOCK_USER_KEY = `${STORAGE_PREFIX}auth_user`;
const MOCK_ADMIN = {
    email: 'admin@leadcore.com',
    password: 'admin123' // Change this!
};

export const mockAuth = {
    login: async (email, password) => {
        await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
        if (email === MOCK_ADMIN.email && password === MOCK_ADMIN.password) {
            const user = { email, uid: 'mock-user-id' };
            localStorage.setItem(MOCK_USER_KEY, JSON.stringify(user));
            return user;
        }
        throw new Error('Invalid credentials');
    },

    logout: async () => {
        localStorage.removeItem(MOCK_USER_KEY);
    },

    getCurrentUser: () => {
        const user = localStorage.getItem(MOCK_USER_KEY);
        return user ? JSON.parse(user) : null;
    }
};

// Blog Service
export const blogService = {
    getPublishedBlogs: async () => {
        await new Promise(resolve => setTimeout(resolve, 300));
        return mockCMS.getAll('blogs').filter(b => b.status === 'published');
    },
    getAllBlogs: async () => {
        await new Promise(resolve => setTimeout(resolve, 300));
        return mockCMS.getAll('blogs');
    },
    getBlogBySlug: async (slug) => {
        await new Promise(resolve => setTimeout(resolve, 300));
        return mockCMS.getBySlug('blogs', slug);
    },
    getBlogById: async (id) => {
        await new Promise(resolve => setTimeout(resolve, 300));
        return mockCMS.getById('blogs', id);
    },
    createBlog: async (data) => {
        await new Promise(resolve => setTimeout(resolve, 300));
        return mockCMS.create('blogs', data);
    },
    updateBlog: async (id, data) => {
        await new Promise(resolve => setTimeout(resolve, 300));
        return mockCMS.update('blogs', id, data);
    },
    deleteBlog: async (id) => {
        await new Promise(resolve => setTimeout(resolve, 300));
        return mockCMS.delete('blogs', id);
    },
    publishBlog: async (id) => {
        await new Promise(resolve => setTimeout(resolve, 300));
        return mockCMS.update('blogs', id, { status: 'published', publishedAt: new Date().toISOString() });
    },
    unpublishBlog: async (id) => {
        await new Promise(resolve => setTimeout(resolve, 300));
        return mockCMS.update('blogs', id, { status: 'draft' });
    }
};

// Case Study Service
export const caseStudyService = {
    getPublishedCaseStudies: async () => {
        await new Promise(resolve => setTimeout(resolve, 300));
        return mockCMS.getAll('caseStudies').filter(c => c.status === 'published').sort((a, b) => a.order - b.order);
    },
    getAllCaseStudies: async () => {
        await new Promise(resolve => setTimeout(resolve, 300));
        return mockCMS.getAll('caseStudies').sort((a, b) => a.order - b.order);
    },
    getCaseStudyBySlug: async (slug) => {
        await new Promise(resolve => setTimeout(resolve, 300));
        return mockCMS.getBySlug('caseStudies', slug);
    },
    createCaseStudy: async (data) => {
        await new Promise(resolve => setTimeout(resolve, 300));
        return mockCMS.create('caseStudies', data);
    },
    updateCaseStudy: async (id, data) => {
        await new Promise(resolve => setTimeout(resolve, 300));
        return mockCMS.update('caseStudies', id, data);
    },
    deleteCaseStudy: async (id) => {
        await new Promise(resolve => setTimeout(resolve, 300));
        return mockCMS.delete('caseStudies', id);
    }
};

// Pricing Service
export const pricingService = {
    getVisiblePlans: async () => {
        await new Promise(resolve => setTimeout(resolve, 300));
        return mockCMS.getAll('pricingPlans').filter(p => p.visible).sort((a, b) => a.order - b.order);
    },
    getAllPlans: async () => {
        await new Promise(resolve => setTimeout(resolve, 300));
        return mockCMS.getAll('pricingPlans').sort((a, b) => a.order - b.order);
    },
    createPlan: async (data) => {
        await new Promise(resolve => setTimeout(resolve, 300));
        return mockCMS.create('pricingPlans', data);
    },
    updatePlan: async (id, data) => {
        await new Promise(resolve => setTimeout(resolve, 300));
        return mockCMS.update('pricingPlans', id, data);
    },
    deletePlan: async (id) => {
        await new Promise(resolve => setTimeout(resolve, 300));
        return mockCMS.delete('pricingPlans', id);
    }
};

// Team Service
export const teamService = {
    getVisibleMembers: async () => {
        await new Promise(resolve => setTimeout(resolve, 300));
        return mockCMS.getAll('teamMembers').filter(m => m.visible).sort((a, b) => a.order - b.order);
    },
    getAllMembers: async () => {
        await new Promise(resolve => setTimeout(resolve, 300));
        return mockCMS.getAll('teamMembers').sort((a, b) => a.order - b.order);
    },
    createMember: async (data) => {
        await new Promise(resolve => setTimeout(resolve, 300));
        return mockCMS.create('teamMembers', data);
    },
    updateMember: async (id, data) => {
        await new Promise(resolve => setTimeout(resolve, 300));
        return mockCMS.update('teamMembers', id, data);
    },
    deleteMember: async (id) => {
        await new Promise(resolve => setTimeout(resolve, 300));
        return mockCMS.delete('teamMembers', id);
    }
};

// Contact Methods Service
export const contactMethodService = {
    getVisibleMethods: async () => {
        await new Promise(resolve => setTimeout(resolve, 300));
        return mockCMS.getAll('contactMethods').filter(m => m.visible).sort((a, b) => a.order - b.order);
    },
    getAllMethods: async () => {
        await new Promise(resolve => setTimeout(resolve, 300));
        return mockCMS.getAll('contactMethods').sort((a, b) => a.order - b.order);
    },
    createMethod: async (data) => {
        await new Promise(resolve => setTimeout(resolve, 300));
        return mockCMS.create('contactMethods', data);
    },
    updateMethod: async (id, data) => {
        await new Promise(resolve => setTimeout(resolve, 300));
        return mockCMS.update('contactMethods', id, data);
    },
    deleteMethod: async (id) => {
        await new Promise(resolve => setTimeout(resolve, 300));
        return mockCMS.delete('contactMethods', id);
    }
};

// Utility functions
export function generateSlug(title) {
    return title
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
}

export async function isSlugUnique(collection, slug, excludeId = null) {
    const items = mockCMS.getAll(collection);
    if (excludeId) {
        return items.every(item => item.slug !== slug || item.id === excludeId);
    }
    return !items.some(item => item.slug === slug);
}

console.log('🚀 Mock CMS Service initialized. Using localStorage for development.');
console.log('📧 Login with: admin@leadcore.com / admin123');

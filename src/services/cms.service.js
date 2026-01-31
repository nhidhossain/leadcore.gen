import {
    collection,
    doc,
    getDocs,
    getDoc,
    addDoc,
    updateDoc,
    deleteDoc,
    query,
    where,
    orderBy,
    Timestamp,
    serverTimestamp
} from 'firebase/firestore';
import { db } from '../config/firebase';

/**
 * CMS Service - Handles all Firebase Firestore operations
 */

// ==================== BLOG OPERATIONS ====================

export const blogService = {
    // Get all published blogs
    async getPublishedBlogs() {
        const q = query(
            collection(db, 'blogs'),
            where('status', '==', 'published'),
            orderBy('publishedAt', 'desc')
        );
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    },

    // Get all blogs (admin only)
    async getAllBlogs() {
        const q = query(collection(db, 'blogs'), orderBy('createdAt', 'desc'));
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    },

    // Get blog by slug
    async getBlogBySlug(slug) {
        const q = query(collection(db, 'blogs'), where('slug', '==', slug));
        const snapshot = await getDocs(q);
        if (snapshot.empty) return null;
        const doc = snapshot.docs[0];
        return { id: doc.id, ...doc.data() };
    },

    // Get blog by ID
    async getBlogById(id) {
        const docRef = doc(db, 'blogs', id);
        const docSnap = await getDoc(docRef);
        return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
    },

    // Create blog
    async createBlog(blogData) {
        const docRef = await addDoc(collection(db, 'blogs'), {
            ...blogData,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
            viewCount: 0
        });
        return docRef.id;
    },

    // Update blog
    async updateBlog(id, blogData) {
        const docRef = doc(db, 'blogs', id);
        await updateDoc(docRef, {
            ...blogData,
            updatedAt: serverTimestamp()
        });
    },

    // Delete blog
    async deleteBlog(id) {
        await deleteDoc(doc(db, 'blogs', id));
    },

    // Publish blog
    async publishBlog(id) {
        const docRef = doc(db, 'blogs', id);
        await updateDoc(docRef, {
            status: 'published',
            publishedAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        });
    },

    // Unpublish blog
    async unpublishBlog(id) {
        const docRef = doc(db, 'blogs', id);
        await updateDoc(docRef, {
            status: 'draft',
            updatedAt: serverTimestamp()
        });
    }
};

// ==================== CASE STUDY OPERATIONS ====================

export const caseStudyService = {
    // Get all published case studies
    async getPublishedCaseStudies() {
        const q = query(
            collection(db, 'caseStudies'),
            where('status', '==', 'published'),
            orderBy('order', 'asc')
        );
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    },

    // Get all case studies (admin only)
    async getAllCaseStudies() {
        const q = query(collection(db, 'caseStudies'), orderBy('order', 'asc'));
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    },

    // Get case study by slug
    async getCaseStudyBySlug(slug) {
        const q = query(collection(db, 'caseStudies'), where('slug', '==', slug));
        const snapshot = await getDocs(q);
        if (snapshot.empty) return null;
        const doc = snapshot.docs[0];
        return { id: doc.id, ...doc.data() };
    },

    // Create case study
    async createCaseStudy(caseStudyData) {
        const docRef = await addDoc(collection(db, 'caseStudies'), {
            ...caseStudyData,
            createdAt: serverTimestamp()
        });
        return docRef.id;
    },

    // Update case study
    async updateCaseStudy(id, caseStudyData) {
        const docRef = doc(db, 'caseStudies', id);
        await updateDoc(docRef, caseStudyData);
    },

    // Delete case study
    async deleteCaseStudy(id) {
        await deleteDoc(doc(db, 'caseStudies', id));
    }
};

// ==================== PRICING OPERATIONS ====================

export const pricingService = {
    // Get all visible pricing plans
    async getVisiblePlans() {
        const q = query(
            collection(db, 'pricingPlans'),
            where('visible', '==', true),
            orderBy('order', 'asc')
        );
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    },

    // Get all pricing plans (admin only)
    async getAllPlans() {
        const q = query(collection(db, 'pricingPlans'), orderBy('order', 'asc'));
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    },

    // Create pricing plan
    async createPlan(planData) {
        const docRef = await addDoc(collection(db, 'pricingPlans'), {
            ...planData,
            createdAt: serverTimestamp()
        });
        return docRef.id;
    },

    // Update pricing plan
    async updatePlan(id, planData) {
        const docRef = doc(db, 'pricingPlans', id);
        await updateDoc(docRef, planData);
    },

    // Delete pricing plan
    async deletePlan(id) {
        await deleteDoc(doc(db, 'pricingPlans', id));
    }
};

// ==================== TEAM OPERATIONS ====================

export const teamService = {
    // Get all visible team members
    async getVisibleMembers() {
        const q = query(
            collection(db, 'teamMembers'),
            where('visible', '==', true),
            orderBy('order', 'asc')
        );
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    },

    // Get all team members (admin only)
    async getAllMembers() {
        const q = query(collection(db, 'teamMembers'), orderBy('order', 'asc'));
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    },

    // Create team member
    async createMember(memberData) {
        const docRef = await addDoc(collection(db, 'teamMembers'), {
            ...memberData,
            createdAt: serverTimestamp()
        });
        return docRef.id;
    },

    // Update team member
    async updateMember(id, memberData) {
        const docRef = doc(db, 'teamMembers', id);
        await updateDoc(docRef, memberData);
    },

    // Delete team member
    async deleteMember(id) {
        await deleteDoc(doc(db, 'teamMembers', id));
    }
};

// ==================== CONTACT METHODS OPERATIONS ====================

export const contactMethodService = {
    // Get all visible contact methods
    async getVisibleMethods() {
        const q = query(
            collection(db, 'contactMethods'),
            where('visible', '==', true),
            orderBy('order', 'asc')
        );
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    },

    // Get all contact methods (admin only)
    async getAllMethods() {
        const q = query(collection(db, 'contactMethods'), orderBy('order', 'asc'));
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    },

    // Create contact method
    async createMethod(methodData) {
        const docRef = await addDoc(collection(db, 'contactMethods'), {
            ...methodData,
            createdAt: serverTimestamp()
        });
        return docRef.id;
    },

    // Update contact method
    async updateMethod(id, methodData) {
        const docRef = doc(db, 'contactMethods', id);
        await updateDoc(docRef, methodData);
    },

    // Delete contact method
    async deleteMethod(id) {
        await deleteDoc(doc(db, 'contactMethods', id));
    }
};

// ==================== PAGE CONTENT OPERATIONS ====================

export const pageContentService = {
    // Get page content
    async getPageContent(pageId) {
        const docRef = doc(db, 'pageContent', pageId);
        const docSnap = await getDoc(docRef);
        return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
    },

    // Update page content
    async updatePageContent(pageId, contentData) {
        const docRef = doc(db, 'pageContent', pageId);
        await updateDoc(docRef, contentData);
    }
};

// ==================== UTILITY FUNCTIONS ====================

// Generate unique slug from title
export function generateSlug(title) {
    return title
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
}

// Check if slug is unique
export async function isSlugUnique(collectionName, slug, excludeId = null) {
    const q = query(collection(db, collectionName), where('slug', '==', slug));
    const snapshot = await getDocs(q);

    if (excludeId) {
        return snapshot.docs.every(doc => doc.id === excludeId);
    }

    return snapshot.empty;
}

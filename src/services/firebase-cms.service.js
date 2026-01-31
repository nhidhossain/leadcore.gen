// Firebase CMS Service
// Real Firebase backend integration
// Switch between this and mock-cms.service.js based on environment

import {
    collection,
    doc,
    getDoc,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    query,
    where,
    orderBy,
    serverTimestamp
} from 'firebase/firestore';
import {
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'firebase/auth';
import { db, auth } from '../config/firebase.config';

// Helper function to convert Firestore timestamp to ISO string
const timestampToDate = (timestamp) => {
    if (!timestamp) return new Date().toISOString();
    if (timestamp.toDate) return timestamp.toDate().toISOString();
    return timestamp;
};

// Generic Firebase CRUD operations
class FirebaseCMSService {
    async getAll(collectionName) {
        try {
            const querySnapshot = await getDocs(collection(db, collectionName));
            return querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                createdAt: timestampToDate(doc.data().createdAt),
                updatedAt: timestampToDate(doc.data().updatedAt)
            }));
        } catch (error) {
            console.error(`Error fetching ${collectionName}:`, error);
            throw error;
        }
    }

    async getById(collectionName, id) {
        try {
            const docRef = doc(db, collectionName, id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                return {
                    id: docSnap.id,
                    ...docSnap.data(),
                    createdAt: timestampToDate(docSnap.data().createdAt),
                    updatedAt: timestampToDate(docSnap.data().updatedAt)
                };
            }
            return null;
        } catch (error) {
            console.error(`Error fetching document from ${collectionName}:`, error);
            throw error;
        }
    }

    async getBySlug(collectionName, slug) {
        try {
            const q = query(collection(db, collectionName), where('slug', '==', slug));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const doc = querySnapshot.docs[0];
                return {
                    id: doc.id,
                    ...doc.data(),
                    createdAt: timestampToDate(doc.data().createdAt),
                    updatedAt: timestampToDate(doc.data().updatedAt)
                };
            }
            return null;
        } catch (error) {
            console.error(`Error fetching by slug from ${collectionName}:`, error);
            throw error;
        }
    }

    async create(collectionName, data) {
        try {
            const docData = {
                ...data,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp()
            };

            const docRef = await addDoc(collection(db, collectionName), docData);
            return docRef.id;
        } catch (error) {
            console.error(`Error creating document in ${collectionName}:`, error);
            throw error;
        }
    }

    async update(collectionName, id, data) {
        try {
            const docRef = doc(db, collectionName, id);
            await updateDoc(docRef, {
                ...data,
                updatedAt: serverTimestamp()
            });
            return true;
        } catch (error) {
            console.error(`Error updating document in ${collectionName}:`, error);
            throw error;
        }
    }

    async delete(collectionName, id) {
        try {
            await deleteDoc(doc(db, collectionName, id));
            return true;
        } catch (error) {
            console.error(`Error deleting document from ${collectionName}:`, error);
            throw error;
        }
    }

    async getPublished(collectionName) {
        try {
            const q = query(
                collection(db, collectionName),
                where('status', '==', 'published'),
                orderBy('publishedAt', 'desc')
            );
            const querySnapshot = await getDocs(q);
            return querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                createdAt: timestampToDate(doc.data().createdAt),
                updatedAt: timestampToDate(doc.data().updatedAt),
                publishedAt: timestampToDate(doc.data().publishedAt)
            }));
        } catch (error) {
            console.error(`Error fetching published ${collectionName}:`, error);
            throw error;
        }
    }

    async getVisible(collectionName) {
        try {
            const q = query(
                collection(db, collectionName),
                where('visible', '==', true),
                orderBy('order', 'asc')
            );
            const querySnapshot = await getDocs(q);
            return querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                createdAt: timestampToDate(doc.data().createdAt),
                updatedAt: timestampToDate(doc.data().updatedAt)
            }));
        } catch (error) {
            console.error(`Error fetching visible ${collectionName}:`, error);
            throw error;
        }
    }
}

const firebaseCMS = new FirebaseCMSService();

// Firebase Auth
export const firebaseAuth = {
    login: async (email, password) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            return {
                email: userCredential.user.email,
                uid: userCredential.user.uid
            };
        } catch (error) {
            console.error('Login error:', error);
            throw new Error('Invalid credentials');
        }
    },

    logout: async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error('Logout error:', error);
            throw error;
        }
    },

    getCurrentUser: () => {
        const user = auth.currentUser;
        if (user) {
            return {
                email: user.email,
                uid: user.uid
            };
        }
        return null;
    },

    onAuthChange: (callback) => {
        return onAuthStateChanged(auth, (user) => {
            if (user) {
                callback({
                    email: user.email,
                    uid: user.uid
                });
            } else {
                callback(null);
            }
        });
    }
};

// Blog Service (Firebase)
export const blogService = {
    getPublishedBlogs: async () => {
        return await firebaseCMS.getPublished('blogs');
    },
    getAllBlogs: async () => {
        return await firebaseCMS.getAll('blogs');
    },
    getBlogBySlug: async (slug) => {
        return await firebaseCMS.getBySlug('blogs', slug);
    },
    getBlogById: async (id) => {
        return await firebaseCMS.getById('blogs', id);
    },
    createBlog: async (data) => {
        return await firebaseCMS.create('blogs', data);
    },
    updateBlog: async (id, data) => {
        return await firebaseCMS.update('blogs', id, data);
    },
    deleteBlog: async (id) => {
        return await firebaseCMS.delete('blogs', id);
    },
    publishBlog: async (id) => {
        return await firebaseCMS.update('blogs', id, {
            status: 'published',
            publishedAt: serverTimestamp()
        });
    },
    unpublishBlog: async (id) => {
        return await firebaseCMS.update('blogs', id, { status: 'draft' });
    }
};

// Case Study Service (Firebase)
export const caseStudyService = {
    getPublishedCaseStudies: async () => {
        return await firebaseCMS.getPublished('caseStudies');
    },
    getAllCaseStudies: async () => {
        const items = await firebaseCMS.getAll('caseStudies');
        return items.sort((a, b) => (a.order || 0) - (b.order || 0));
    },
    getCaseStudyBySlug: async (slug) => {
        return await firebaseCMS.getBySlug('caseStudies', slug);
    },
    getCaseStudyById: async (id) => {
        return await firebaseCMS.getById('caseStudies', id);
    },
    createCaseStudy: async (data) => {
        return await firebaseCMS.create('caseStudies', data);
    },
    updateCaseStudy: async (id, data) => {
        return await firebaseCMS.update('caseStudies', id, data);
    },
    deleteCaseStudy: async (id) => {
        return await firebaseCMS.delete('caseStudies', id);
    }
};

// Pricing Service (Firebase)
export const pricingService = {
    getVisiblePlans: async () => {
        return await firebaseCMS.getVisible('pricingPlans');
    },
    getAllPlans: async () => {
        const items = await firebaseCMS.getAll('pricingPlans');
        return items.sort((a, b) => (a.order || 0) - (b.order || 0));
    },
    createPlan: async (data) => {
        return await firebaseCMS.create('pricingPlans', data);
    },
    updatePlan: async (id, data) => {
        return await firebaseCMS.update('pricingPlans', id, data);
    },
    deletePlan: async (id) => {
        return await firebaseCMS.delete('pricingPlans', id);
    }
};

// Team Service (Firebase)
export const teamService = {
    getVisibleMembers: async () => {
        return await firebaseCMS.getVisible('teamMembers');
    },
    getAllMembers: async () => {
        const items = await firebaseCMS.getAll('teamMembers');
        return items.sort((a, b) => (a.order || 0) - (b.order || 0));
    },
    createMember: async (data) => {
        return await firebaseCMS.create('teamMembers', data);
    },
    updateMember: async (id, data) => {
        return await firebaseCMS.update('teamMembers', id, data);
    },
    deleteMember: async (id) => {
        return await firebaseCMS.delete('teamMembers', id);
    }
};

// Contact Methods Service (Firebase)
export const contactMethodService = {
    getVisibleMethods: async () => {
        return await firebaseCMS.getVisible('contactMethods');
    },
    getAllMethods: async () => {
        const items = await firebaseCMS.getAll('contactMethods');
        return items.sort((a, b) => (a.order || 0) - (b.order || 0));
    },
    createMethod: async (data) => {
        return await firebaseCMS.create('contactMethods', data);
    },
    updateMethod: async (id, data) => {
        return await firebaseCMS.update('contactMethods', id, data);
    },
    deleteMethod: async (id) => {
        return await firebaseCMS.delete('contactMethods', id);
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

export async function isSlugUnique(collectionName, slug, excludeId = null) {
    try {
        const item = await firebaseCMS.getBySlug(collectionName, slug);
        if (!item) return true;
        return item.id === excludeId;
    } catch (error) {
        console.error('Error checking slug uniqueness:', error);
        return false;
    }
}

console.log('🔥 Firebase CMS Service initialized');

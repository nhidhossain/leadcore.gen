# CMS Admin Panel - User Guide

## 🚀 Getting Started

### Access the Admin Panel

1. Navigate to: `http://localhost:5173/admin/login`
2. Login credentials:
   - **Email:** `admin@leadcore.com`
   - **Password:** `admin123`

### Dashboard Overview

After logging in, you'll see your admin dashboard with:
- **Statistics cards** showing counts of blogs, case studies, pricing plans, and team members
- **Quick action buttons** to create new content
- **Navigation sidebar** to access different sections

---

## 📝 Blog Management

### Creating a Blog Post

1. Click **"Create Blog Post"** from the dashboard or blog management page
2. Fill in the required fields:
   - **Title** (required): Your blog post title
   - **Slug** (auto-generated): URL-friendly version of your title
   - **Excerpt**: Brief description shown in blog listings
   - **Content** (required): Full blog content using the rich text editor
   - **Author**: Post author name
   - **Category**: Blog category for organization
   - **Tags**: Separate multiple tags with commas
   - **Featured Image**: Image URL for the blog post
3. **SEO Settings** (optional but recommended):
   - **SEO Title**: Optimized title for search engines
   - **SEO Description**: Meta description for search results
4. Choose what to do:
   - **Save Draft**: Save without publishing (not visible on website)
   - **Publish**: Make the blog post live on your website

### Editing a Blog Post

1. Go to **Admin → Blog Posts**
2. Find your blog post in the list
3. Click the **"Edit"** button
4. Make your changes
5. Click **"Save Draft"** or **"Publish"**

### Managing Blog Posts

From the blog management page, you can:

- **Search**: Use the search box to find specific posts
- **Filter**: View all posts, only published, or only drafts
- **Publish/Unpublish**: Toggle the visibility of any post
- **Delete**: Remove posts (with confirmation)

---

## 💡 Tips & Best Practices

### Slugs
- Slugs are auto-generated from your title
- You can manually edit them if needed
- Slugs must be unique across all blog posts
- Use lowercase, hyphens for spaces, no special characters

### Rich Text Editor
- Use the toolbar to format your content
- Supports headings, lists, bold, italic, links, images
- Add code blocks for technical content
- Add blockquotes for emphasis

### SEO
- Always fill in SEO Title and Description for better search visibility
- Keep SEO Description under 160 characters
- Use keywords naturally in your content

---

## 🔒 Data Storage

Currently using **localStorage** for development:
- ✅ All data is saved in your browser
- ✅ Perfect for testing and development
- ⚠️ Data is local to your browser only
- ⚠️ Clearing browser data will remove all content

When you migrate to Firebase:
- Data will be stored in the cloud
- Accessible from any device
- Real-time synchronization
- Automatic backups

---

## 🆘 Common Issues

**My blog post isn't showing on the website**
- Make sure the post status is "Published" (not "Draft")
- Check that all required fields are filled

**I can't save my blog post**
- Ensure you have a title
- Check that the slug is unique
- Try refreshing the page and trying again

**The rich text editor isn't loading**
- Refresh the page
- Check browser console for errors
- Make sure you're using a modern, updated browser

---

## 🎯 Next Steps

The following features are coming soon:
- Case Studies Management  
- Pricing Plans Management
- Team Members Management
- Media Library (upload & manage images)
- Advanced SEO controls
- Analytics integration

---

## Need Help?

For questions or issues, contact your developer or check the `FIREBASE_SETUP.md` file for technical setup instructions.

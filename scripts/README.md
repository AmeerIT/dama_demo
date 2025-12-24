# Appwrite Setup Script

This script automatically creates all database tables (collections) and storage buckets in Appwrite.

## Prerequisites

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Get your Appwrite API Key**:
   - Go to your Appwrite Console
   - Navigate to **Settings** → **API Keys**
   - Create a new API key with **Databases** and **Storage** scopes
   - Copy the API key

3. **Set environment variables**:

   Create a `.env.local` file in the project root (or set these in your environment):
   ```env
   APPWRITE_API_KEY=your-api-key-here
   NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
   NEXT_PUBLIC_APPWRITE_DATABASE_ID=dama_db
   ```

## Running the Script

### Option 1: Using npm script (Recommended)
```bash
npm run setup:appwrite
```

### Option 2: Using tsx directly
```bash
npx tsx scripts/setup-appwrite.ts
```

## What the Script Does

1. ✅ Creates the `dama_db` database (if it doesn't exist)
2. ✅ Creates 4 tables (collections):
   - `posts` - Blog posts with all attributes and indexes
   - `services` - Service pages with all attributes and indexes
   - `tags` - Tags for categorization
   - `fonts` - Custom font metadata
3. ✅ Creates 3 storage buckets:
   - `images` - Featured images (10MB max)
   - `media` - Uploaded media files (50MB max)
   - `fonts` - Font files (300MB max)

## Troubleshooting

### Error: "APPWRITE_API_KEY environment variable is required"
- Make sure you've set the `APPWRITE_API_KEY` in your `.env.local` file
- Or export it in your terminal: `export APPWRITE_API_KEY=your-key`

### Error: "Failed to create attribute"
- Attributes are created sequentially and must be "available" before creating the next one
- The script waits for each attribute to be ready automatically
- If it fails, check the Appwrite Console for any errors

### Error: "Collection already exists"
- This is normal if you run the script multiple times
- The script is idempotent and will skip existing resources

### Attribute creation is slow
- Appwrite processes attributes asynchronously
- The script waits up to 30 seconds per attribute
- This is normal behavior

## Verification

After running the script, verify in your Appwrite Console:

1. **Database**: Go to **Databases** → Check `dama_db` exists
2. **Tables**: Check all 4 collections exist with correct attributes
3. **Buckets**: Go to **Storage** → Check all 3 buckets exist

## Next Steps

1. Test the CMS by logging in at `/cms/login`
2. Create a test post to verify the `posts` table works
3. Upload a test image to verify the `images` bucket works
4. Create a test service to verify the `services` table works


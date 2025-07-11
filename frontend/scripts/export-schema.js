/**
 * Export schema and data for database migration
 * This script helps to migrate the database to another machine
 */

const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

console.log('🚀 Starting database export...')

try {
  // 1. Export current database as SQL dump
  console.log('💾 Creating database backup...')
  const dbPath = path.join(__dirname, '../prisma/dev.db')
  const backupPath = path.join(__dirname, '../database-backup.sql')
  
  if (fs.existsSync(dbPath)) {
    try {
      execSync(`sqlite3 "${dbPath}" .dump > "${backupPath}"`, { stdio: 'inherit' })
      console.log(`✅ Database exported to: ${backupPath}`)
    } catch (sqliteError) {
      console.log('⚠️  sqlite3 command not found, copying database file instead...')
      fs.copyFileSync(dbPath, path.join(__dirname, '../database-backup.db'))
      console.log('✅ Database file copied to: database-backup.db')
    }
  } else {
    console.log('⚠️  No database file found')
  }
  
  // 2. Create migration package
  const packageData = {
    version: "1.0.0",
    created: new Date().toISOString(),
    instructions: [
      "=== SETUP INSTRUCTIONS FOR NEW PC ===",
      "",
      "1. Copy this entire project to your new machine",
      "2. Create .env file with content below",
      "3. Run: npm install",
      "4. Run: npx prisma generate",
      "5. Run: npx prisma db push",
      "6. Run: npx prisma db seed (creates test users)",
      "",
      "OR use shortcut: npm run setup-db",
      "",
      "=== RESTORE DATA (Optional) ===",
      "If database-backup.sql exists:",
      "  sqlite3 prisma/dev.db < database-backup.sql",
      "",
      "If database-backup.db exists:",
      "  Copy it to prisma/dev.db"
    ],
    schema: fs.readFileSync(path.join(__dirname, '../prisma/schema.prisma'), 'utf8'),
    seed: fs.readFileSync(path.join(__dirname, '../prisma/seed.ts'), 'utf8'),
    packageJson: {
      prisma: JSON.parse(fs.readFileSync(path.join(__dirname, '../package.json'), 'utf8')).prisma,
      scripts: {
        "setup-db": "npx prisma generate && npx prisma db push && npx prisma db seed"
      }
    },
    env_example: `# Database URL for SQLite
DATABASE_URL="file:./prisma/dev.db"

# Next.js
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"`,
    troubleshooting: [
      "Common issues and solutions:",
      "",
      "1. 'prisma generate' fails:",
      "   - Make sure Node.js 18+ is installed",
      "   - Delete node_modules and run npm install",
      "",
      "2. 'prisma db push' fails:",
      "   - Check if .env file exists with correct DATABASE_URL",
      "   - Make sure prisma/ directory exists",
      "",
      "3. Import errors in TypeScript:",
      "   - Run: npx prisma generate",
      "   - Restart VS Code/TypeScript server",
      "",
      "4. Seed fails:",
      "   - Make sure database exists (run db push first)",
      "   - Check if tsx is installed: npm install tsx"
    ]
  }
  
  const migrationPath = path.join(__dirname, '../migration-package.json')
  fs.writeFileSync(migrationPath, JSON.stringify(packageData, null, 2))
  
  console.log('\n🎉 Export completed successfully!')
  console.log('📦 Files created:')
  console.log('  - migration-package.json (contains all setup info)')
  if (fs.existsSync(backupPath)) {
    console.log('  - database-backup.sql (contains all your data)')
  }
  if (fs.existsSync(path.join(__dirname, '../database-backup.db'))) {
    console.log('  - database-backup.db (database file copy)')
  }
  console.log('\n📋 To migrate to another PC:')
  console.log('  1. Copy the entire frontend/ folder')
  console.log('  2. Follow instructions in migration-package.json')
  console.log('  3. Or run: npm run setup-db')
  
} catch (error) {
  console.error('❌ Export failed:', error.message)
  process.exit(1)
} 
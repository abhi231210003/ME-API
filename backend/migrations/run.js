const fs = require('fs');
const path = require('path');
const db = require('../db');

function runMigrations() {
  try {
    console.log('Running migrations...');
    
    // Read schema.sql
    const schemaPath = path.join(__dirname, '../database/schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');
    
    // Execute schema statements
    const statements = schema.split(';').filter(s => s.trim());
    statements.forEach(statement => {
      if (statement.trim()) {
        db.exec(statement);
      }
    });
    console.log('✓ Schema created successfully');
    
    // Read and execute seed.sql
    const seedPath = path.join(__dirname, '../database/seed.sql');
    if (fs.existsSync(seedPath)) {
      const seed = fs.readFileSync(seedPath, 'utf8');
      const seedStatements = seed.split(';').filter(s => s.trim());
      seedStatements.forEach(statement => {
        if (statement.trim()) {
          db.exec(statement);
        }
      });
      console.log('✓ Seed data inserted successfully');
    }
    
    console.log('✓ All migrations completed');
    process.exit(0);
  } catch (error) {
    console.error('Migration error:', error);
    process.exit(1);
  }
}

runMigrations();

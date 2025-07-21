#!/usr/bin/env node

/**
 * Orchestration File Validator
 * Validates orchestration files against the defined conventions
 * 
 * Usage: node validate-orchestration.js [file-path]
 *        node validate-orchestration.js --all
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

// Constants based on conventions
const VALID_DOMAINS = [
  'business-market-intelligence',
  'competitive-analysis-strategy',
  'knowledge-academic-research',
  'meta',
  'social-media-community-insights',
  'technical-developer-research'
];

const REQUIRED_METADATA = [
  'id', 'name', 'version', 'category', 'tags', 
  'complexity', 'estimated_duration', 'status', 'dependencies'
];

const VALID_COMPLEXITY = ['low', 'medium', 'high'];
const VALID_STATUS = ['draft', 'active', 'deprecated'];

const REQUIRED_SECTIONS = [
  '# ', // Title
  '## Overview',
  '## Component Workflows Used',
  '## Process Flow',
  '## Input Requirements',
  '## Expected Outputs',
  '## Usage Examples',
  '## Version History'
];

class OrchestrationValidator {
  constructor() {
    this.errors = [];
    this.warnings = [];
  }

  validateFile(filePath) {
    this.errors = [];
    this.warnings = [];
    
    console.log(`\nValidating: ${filePath}`);
    
    // Check file exists
    if (!fs.existsSync(filePath)) {
      this.errors.push(`File not found: ${filePath}`);
      return this.report();
    }

    // Check file extension
    if (path.extname(filePath) !== '.md') {
      this.errors.push('File must have .md extension');
    }

    // Check file location
    const relativePath = path.relative(process.cwd(), filePath);
    if (!relativePath.startsWith('src/resources/orchestrations/')) {
      this.warnings.push('File should be in src/resources/orchestrations/');
    }

    // Check naming convention
    const fileName = path.basename(filePath, '.md');
    this.validateFileName(fileName);

    // Read and parse file
    const content = fs.readFileSync(filePath, 'utf8');
    this.validateContent(content, filePath);

    return this.report();
  }

  validateFileName(fileName) {
    // Check for kebab-case
    if (fileName !== fileName.toLowerCase()) {
      this.errors.push('File name must be lowercase');
    }

    if (fileName.includes('_')) {
      this.errors.push('File name must use hyphens, not underscores');
    }

    if (fileName.includes(' ')) {
      this.errors.push('File name cannot contain spaces');
    }

    if (fileName.length > 60) {
      this.errors.push('File name exceeds 60 character limit');
    }

    // Check naming pattern
    const parts = fileName.split('-');
    if (parts.length < 2) {
      this.warnings.push('File name should follow {action}-{target}-{modifier} pattern');
    }
  }

  validateContent(content, filePath) {
    // Extract frontmatter
    const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
    if (!frontmatterMatch) {
      this.errors.push('Missing YAML frontmatter');
      return;
    }

    try {
      const metadata = yaml.load(frontmatterMatch[1]);
      this.validateMetadata(metadata, filePath);
    } catch (e) {
      this.errors.push(`Invalid YAML frontmatter: ${e.message}`);
    }

    // Check required sections
    const mainContent = content.substring(frontmatterMatch[0].length);
    this.validateSections(mainContent);

    // Check for Mermaid diagrams
    if (!mainContent.includes('```mermaid')) {
      this.warnings.push('No Mermaid diagram found for process flow');
    }
  }

  validateMetadata(metadata, filePath) {
    // Check required fields
    REQUIRED_METADATA.forEach(field => {
      if (!metadata.hasOwnProperty(field)) {
        this.errors.push(`Missing required metadata field: ${field}`);
      }
    });

    // Validate specific fields
    if (metadata.id && typeof metadata.id !== 'string') {
      this.errors.push('Metadata "id" must be a string');
    }

    if (metadata.version && !this.isValidSemver(metadata.version)) {
      this.errors.push('Version must follow semantic versioning (e.g., 1.0.0)');
    }

    if (metadata.category) {
      const expectedCategory = this.getExpectedCategory(filePath);
      if (metadata.category !== expectedCategory) {
        this.errors.push(`Category "${metadata.category}" doesn't match directory "${expectedCategory}"`);
      }
    }

    if (metadata.complexity && !VALID_COMPLEXITY.includes(metadata.complexity)) {
      this.errors.push(`Invalid complexity. Must be one of: ${VALID_COMPLEXITY.join(', ')}`);
    }

    if (metadata.status && !VALID_STATUS.includes(metadata.status)) {
      this.errors.push(`Invalid status. Must be one of: ${VALID_STATUS.join(', ')}`);
    }

    if (metadata.tags && !Array.isArray(metadata.tags)) {
      this.errors.push('Tags must be an array');
    }

    if (metadata.dependencies && !Array.isArray(metadata.dependencies)) {
      this.errors.push('Dependencies must be an array');
    }
  }

  validateSections(content) {
    REQUIRED_SECTIONS.forEach(section => {
      if (!content.includes(section)) {
        this.errors.push(`Missing required section: ${section}`);
      }
    });
  }

  isValidSemver(version) {
    const pattern = /^\d+\.\d+\.\d+$/;
    return pattern.test(version);
  }

  getExpectedCategory(filePath) {
    const parts = filePath.split(path.sep);
    const orchestrationsIndex = parts.indexOf('orchestrations');
    if (orchestrationsIndex >= 0 && orchestrationsIndex < parts.length - 2) {
      return parts[orchestrationsIndex + 1];
    }
    return null;
  }

  report() {
    const hasErrors = this.errors.length > 0;
    const hasWarnings = this.warnings.length > 0;

    if (!hasErrors && !hasWarnings) {
      console.log('✅ Validation passed!');
      return true;
    }

    if (this.errors.length > 0) {
      console.log('\n❌ Errors:');
      this.errors.forEach(error => console.log(`   - ${error}`));
    }

    if (this.warnings.length > 0) {
      console.log('\n⚠️  Warnings:');
      this.warnings.forEach(warning => console.log(`   - ${warning}`));
    }

    return !hasErrors;
  }
}

// CLI Interface
function main() {
  const args = process.argv.slice(2);
  const validator = new OrchestrationValidator();

  if (args.length === 0) {
    console.log('Usage: node validate-orchestration.js [file-path]');
    console.log('       node validate-orchestration.js --all');
    process.exit(1);
  }

  if (args[0] === '--all') {
    // Validate all orchestration files
    const orchestrationsDir = path.join(process.cwd(), 'src/resources/orchestrations');
    let allValid = true;

    function validateDirectory(dir) {
      const items = fs.readdirSync(dir);
      items.forEach(item => {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory() && !item.startsWith('_') && item !== 'TEMPLATE.md') {
          validateDirectory(fullPath);
        } else if (stat.isFile() && item.endsWith('.md') && 
                   item !== 'CONVENTIONS.md' && 
                   item !== 'QUICK_REFERENCE.md' && 
                   item !== 'TEMPLATE.md') {
          const isValid = validator.validateFile(fullPath);
          if (!isValid) allValid = false;
        }
      });
    }

    validateDirectory(orchestrationsDir);
    
    console.log('\n' + '='.repeat(50));
    if (allValid) {
      console.log('✅ All orchestrations are valid!');
    } else {
      console.log('❌ Some orchestrations have validation errors');
      process.exit(1);
    }
  } else {
    // Validate single file
    const filePath = path.resolve(args[0]);
    const isValid = validator.validateFile(filePath);
    process.exit(isValid ? 0 : 1);
  }
}

// Note: This validator requires js-yaml package
// Install with: npm install js-yaml

if (require.main === module) {
  main();
}

module.exports = OrchestrationValidator;

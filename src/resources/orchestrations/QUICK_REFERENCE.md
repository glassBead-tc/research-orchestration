# Orchestration Conventions - Quick Reference

## 📍 Location
```
src/resources/orchestrations/{domain}/{orchestration-name}.md
```

## 📝 Naming Format
```
{action}-{target}-{modifier}.md
```
- **All lowercase, kebab-case**
- **Max 60 characters**
- **Examples**: `analyze-competitor-pricing.md`, `monitor-social-trends.md`

## 📁 Domain Folders
- `business-market-intelligence/` - Market & business research
- `competitive-analysis-strategy/` - Competitor analysis
- `knowledge-academic-research/` - Academic & educational
- `meta/` - Meta-workflows (orchestrate other workflows)
- `social-media-community-insights/` - Social media analysis
- `technical-developer-research/` - Technical research

## 🏷️ Required Metadata
```yaml
---
id: "unique-id"
name: "Human Name"
version: "1.0.0"
category: "domain-folder-name"
tags: ["tag1", "tag2"]
complexity: "low|medium|high"
estimated_duration: "X-Y hours"
status: "draft|active|deprecated"
dependencies: ["tool1", "tool2"]
---
```

## 📄 Required Sections
1. Title & Description
2. Overview
3. Component Workflows Used
4. Process Flow (with diagram)
5. Input Requirements
6. Expected Outputs
7. Usage Examples
8. Version History

## 🔢 Versioning
- **Format**: `MAJOR.MINOR.PATCH`
- **MAJOR**: Breaking changes
- **MINOR**: New features (backward-compatible)
- **PATCH**: Bug fixes, docs

## ✅ Checklist for New Orchestrations
- [ ] Follows naming convention
- [ ] In correct domain folder
- [ ] Has complete metadata
- [ ] Includes all required sections
- [ ] Has Mermaid flow diagram
- [ ] Includes usage examples
- [ ] Peer reviewed
- [ ] Version 1.0.0 for new files

## 🚫 Common Mistakes
- ❌ `UPPERCASE_NAMES.md`
- ❌ `workflow with spaces.md`
- ❌ `v2-final-final-updated.md`
- ❌ Missing metadata
- ❌ No version history

## 💡 Tips
- Keep names descriptive but concise
- Use existing orchestrations as templates
- Test with sample inputs before committing
- Update version for any changes
- Document edge cases and limitations

---
*See [CONVENTIONS.md](./CONVENTIONS.md) for full documentation*

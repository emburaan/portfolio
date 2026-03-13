/**
 * DOMAIN LAYER — Models
 * Clean Architecture: innermost layer, no dependencies
 */

// Portfolio owner entity
export class Developer {
  constructor({
    name, title, tagline, yearsOfExperience,
    company, role, email, github, linkedin
  }) {
    this.name = name;
    this.title = title;
    this.tagline = tagline;
    this.yearsOfExperience = yearsOfExperience;
    this.company = company;
    this.role = role;
    this.email = email;
    this.github = github;
    this.linkedin = linkedin;
  }
}

// Project entity
export class Project {
  constructor({ id, index, title, role, description, tags, impact, featured, link }) {
    this.id = id;
    this.index = index;
    this.title = title;
    this.role = role;
    this.description = description;
    this.tags = tags;
    this.impact = impact;
    this.featured = featured ?? false;
    this.link = link;
  }
}

// Skill entity
export class Skill {
  constructor({ name, level, category }) {
    this.name = name;
    this.level = level; // 0–100
    this.category = category;
  }
}

// SkillGroup entity
export class SkillGroup {
  constructor({ title, kanji, skills }) {
    this.title = title;
    this.kanji = kanji;
    this.skills = skills; // Skill[]
  }
}

// ContactMessage value object
export class ContactMessage {
  constructor({ senderName, senderEmail, body }) {
    if (!senderName || !senderEmail || !body) {
      throw new Error('ContactMessage: all fields are required');
    }
    this.senderName = senderName;
    this.senderEmail = senderEmail;
    this.body = body;
    this.timestamp = new Date().toISOString();
  }
}

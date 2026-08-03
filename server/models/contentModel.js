// This is a simple model for validation purposes
// Since we're using JSON files, this serves as a schema definition

const ContentSchema = {
  metadata: {
    board: { type: String, required: true },
    subject: { type: String, required: true },
    type: { type: String, enum: ['pyq', 'notes', 'book_solutions'], required: true },
    years: { type: [Number], default: [] },
    chapters: { type: [String], default: [] },
    topics: { type: [String], default: [] },
    totalQuestions: { type: Number, default: 0 },
    lastUpdated: { type: Date, default: Date.now }
  },
  items: [{
    id: { type: String, required: true },
    year: { type: Number },
    chapter: { type: String },
    topic: { type: String },
    difficulty: { type: String, enum: ['easy', 'medium', 'hard'] },
    marks: { type: Number },
    content: { type: String, required: true },
    solution: { type: String },
    hint: { type: String },
    tags: { type: [String], default: [] },
    commonMistakes: { type: [String], default: [] }
  }]
};

// Validation function
const validateContent = (content) => {
  if (!content.metadata || !content.items) {
    throw new Error('Invalid content structure: missing metadata or items');
  }

  if (!content.metadata.board) {
    throw new Error('Metadata must include board');
  }

  if (!content.metadata.subject) {
    throw new Error('Metadata must include subject');
  }

  if (!content.metadata.type) {
    throw new Error('Metadata must include type');
  }

  if (!Array.isArray(content.items)) {
    throw new Error('Items must be an array');
  }

  content.items.forEach((item, index) => {
    if (!item.id) {
      throw new Error(`Item at index ${index} missing id`);
    }
    if (!item.content) {
      throw new Error(`Item ${item.id} missing content`);
    }
  });

  return true;
};

module.exports = { ContentSchema, validateContent };
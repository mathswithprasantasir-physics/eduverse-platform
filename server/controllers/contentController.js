const fs = require('fs').promises;
const path = require('path');

class ContentController {
  // Get content for specific board/subject/type
  async getContent(req, res) {
    try {
      const { board, subject, type } = req.params;
      const filePath = path.join(__dirname, '../../src/data', board, type, `${subject}.json`);
      
      const data = await fs.readFile(filePath, 'utf8');
      const content = JSON.parse(data);
      
      res.json(content);
    } catch (error) {
      if (error.code === 'ENOENT') {
        return res.status(404).json({ error: 'Content not found' });
      }
      res.status(500).json({ error: 'Failed to load content' });
    }
  }

  // Save/Update content
  async saveContent(req, res) {
    try {
      const { board, subject, type } = req.params;
      const content = req.body;
      
      const filePath = path.join(__dirname, '../../src/data', board, type, `${subject}.json`);
      
      // Ensure directory exists
      const dir = path.dirname(filePath);
      await fs.mkdir(dir, { recursive: true });
      
      // Add metadata
      content.metadata = {
        ...content.metadata,
        lastUpdated: new Date().toISOString(),
        updatedBy: req.user?.id || 'system'
      };
      
      await fs.writeFile(filePath, JSON.stringify(content, null, 2), 'utf8');
      
      res.json({ 
        success: true, 
        message: 'Content saved successfully',
        path: filePath
      });
    } catch (error) {
      console.error('Error saving content:', error);
      res.status(500).json({ error: 'Failed to save content' });
    }
  }

  // Delete content
  async deleteContent(req, res) {
    try {
      const { board, subject, type } = req.params;
      const filePath = path.join(__dirname, '../../src/data', board, type, `${subject}.json`);
      
      await fs.unlink(filePath);
      
      res.json({ 
        success: true, 
        message: 'Content deleted successfully' 
      });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete content' });
    }
  }

  // Get all available content
  async getAllContent(req, res) {
    try {
      const boards = ['WBBSE', 'WBCHSE', 'ISC', 'ICSE', 'CBSE'];
      const subjects = ['mathematics', 'science', 'english', 'physics', 'chemistry', 'biology', 'history', 'geography'];
      const types = ['pyq', 'notes', 'book_solutions'];
      
      const contentList = [];
      
      for (const board of boards) {
        for (const subject of subjects) {
          for (const type of types) {
            const filePath = path.join(__dirname, '../../src/data', board, type, `${subject}.json`);
            try {
              await fs.access(filePath);
              contentList.push({ board, subject, type, exists: true });
            } catch {
              contentList.push({ board, subject, type, exists: false });
            }
          }
        }
      }
      
      res.json({ 
        total: contentList.length,
        available: contentList.filter(c => c.exists).length,
        content: contentList 
      });
    } catch (error) {
      res.status(500).json({ error: 'Failed to list content' });
    }
  }

  // Search content
  async searchContent(req, res) {
    try {
      const { query } = req.query;
      const { board, subject, type } = req.params;
      
      if (!query) {
        return res.status(400).json({ error: 'Search query is required' });
      }
      
      const filePath = path.join(__dirname, '../../src/data', board, type, `${subject}.json`);
      const data = await fs.readFile(filePath, 'utf8');
      const content = JSON.parse(data);
      
      // Simple search implementation
      const searchResults = content.items.filter(item => {
        const searchable = [
          item.content,
          item.solution,
          item.topic,
          ...(item.tags || [])
        ].join(' ').toLowerCase();
        
        return searchable.includes(query.toLowerCase());
      });
      
      res.json({
        query,
        totalResults: searchResults.length,
        results: searchResults
      });
    } catch (error) {
      res.status(500).json({ error: 'Search failed' });
    }
  }
}

module.exports = new ContentController();
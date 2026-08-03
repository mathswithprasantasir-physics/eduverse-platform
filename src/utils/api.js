import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Fetch content with filters
export const fetchContent = async (board, subject, contentType, filters = {}) => {
  try {
    const response = await api.get(`/content/${board}/${subject}/${contentType}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching content:', error);
    throw error;
  }
};

// Apply filters to content
export const applyFilters = (content, filters, searchQuery = '') => {
  if (!content || !content.items) return content;

  let filteredItems = [...content.items];

  // Apply filters
  if (filters.year) {
    filteredItems = filteredItems.filter(item => item.year === parseInt(filters.year));
  }

  if (filters.chapter) {
    filteredItems = filteredItems.filter(item => 
      item.chapter?.toLowerCase() === filters.chapter.toLowerCase()
    );
  }

  if (filters.difficulty) {
    filteredItems = filteredItems.filter(item => 
      item.difficulty?.toLowerCase() === filters.difficulty.toLowerCase()
    );
  }

  if (filters.topic) {
    filteredItems = filteredItems.filter(item => 
      item.topic?.toLowerCase().includes(filters.topic.toLowerCase())
    );
  }

  // Apply search
  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    filteredItems = filteredItems.filter(item => {
      const content = item.content?.toLowerCase() || '';
      const topic = item.topic?.toLowerCase() || '';
      const solution = item.solution?.toLowerCase() || '';
      const tags = item.tags?.join(' ').toLowerCase() || '';
      
      return content.includes(query) || 
             topic.includes(query) || 
             solution.includes(query) || 
             tags.includes(query);
    });
  }

  return {
    ...content,
    items: filteredItems,
    filteredCount: filteredItems.length,
    originalCount: content.items.length
  };
};

// Upload image
export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append('image', file);

  try {
    const response = await api.post('/upload/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};

// Search across all content
export const searchAllContent = async (query, boards = ['WBBSE', 'WBCHSE', 'ISC', 'ICSE', 'CBSE']) => {
  try {
    const results = [];
    const subjects = ['mathematics', 'science', 'english', 'physics', 'chemistry', 'biology', 'history', 'geography'];
    const types = ['pyq', 'notes', 'book_solutions'];

    const searchPromises = boards.flatMap(board =>
      subjects.flatMap(subject =>
        types.map(async (type) => {
          try {
            const data = await fetchContent(board, subject, type);
            const filtered = applyFilters(data, {}, query);
            if (filtered.items.length > 0) {
              results.push({
                board,
                subject,
                type,
                items: filtered.items,
                count: filtered.items.length
              });
            }
          } catch (error) {
            // Skip if content not found
          }
        })
      )
    );

    await Promise.all(searchPromises);
    return results;
  } catch (error) {
    console.error('Error searching all content:', error);
    throw error;
  }
};

// Save content (admin function)
export const saveContent = async (board, subject, contentType, content) => {
  try {
    const response = await api.post(`/content/${board}/${subject}/${contentType}`, content);
    return response.data;
  } catch (error) {
    console.error('Error saving content:', error);
    throw error;
  }
};
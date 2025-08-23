import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Configure axios defaults
axios.defaults.timeout = 10000; // 10 seconds timeout

// API service class
class ApiService {
  
  // Vehicles API
  async getVehicles(params = {}) {
    try {
      const response = await axios.get(`${API}/vehicles/`, { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching vehicles:', error);
      throw error;
    }
  }

  async getVehicleById(id) {
    try {
      const response = await axios.get(`${API}/vehicles/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching vehicle:', error);
      throw error;
    }
  }

  // Contact API
  async submitContactForm(contactData) {
    try {
      const response = await axios.post(`${API}/contact/`, contactData);
      return response.data;
    } catch (error) {
      console.error('Error submitting contact form:', error);
      throw error;
    }
  }

  async submitCustomSearch(searchData) {
    try {
      const response = await axios.post(`${API}/contact/custom-search`, searchData);
      return response.data;
    } catch (error) {
      console.error('Error submitting custom search:', error);
      throw error;
    }
  }

  // FAQs API
  async getFAQs() {
    try {
      const response = await axios.get(`${API}/faqs/`);
      return response.data;
    } catch (error) {
      console.error('Error fetching FAQs:', error);
      throw error;
    }
  }

  async submitFAQQuestion(questionData) {
    try {
      const response = await axios.post(`${API}/faqs/questions`, questionData);
      return response.data;
    } catch (error) {
      console.error('Error submitting FAQ question:', error);
      throw error;
    }
  }

  // Promotions API
  async getPromotions(activeOnly = true) {
    try {
      const response = await axios.get(`${API}/promotions/`, {
        params: { active_only: activeOnly }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching promotions:', error);
      throw error;
    }
  }

  // Testimonials API
  async getTestimonials(approvedOnly = true) {
    try {
      const response = await axios.get(`${API}/testimonials/`, {
        params: { approved_only: approvedOnly }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      throw error;
    }
  }

  // Health check
  async healthCheck() {
    try {
      const response = await axios.get(`${API}/health`);
      return response.data;
    } catch (error) {
      console.error('Error checking API health:', error);
      throw error;
    }
  }
}

// Create and export singleton instance
const apiService = new ApiService();
export default apiService;
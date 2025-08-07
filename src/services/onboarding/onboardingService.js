import {
  mockOnboardingApplications,
  getApplicationById,
  getApplicationsByStatus,
  getApplicationsByCity,
  getApplicationsByCuisine,
  getApplicationsByAssignee,
  getApplicationCities,
  getApplicationCuisines,
  getApplicationStatuses,
  getApplicationAssignees
} from '../../data/onboarding/mockOnboarding';

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Onboarding service for the Riwayat Admin Portal
 * In a real application, these methods would make actual API calls
 * For now, they simulate API behavior with mock data
 */
export const onboardingService = {
  /**
   * Get all onboarding applications
   * @returns {Promise<Array>} - List of all applications
   */
  getAllApplications: async () => {
    // Simulate API call delay
    await delay(800);
    return [...mockOnboardingApplications];
  },
  
  /**
   * Get application by ID
   * @param {string} applicationId - Application ID
   * @returns {Promise<Object>} - Application details
   */
  getApplicationById: async (applicationId) => {
    // Simulate API call delay
    await delay(500);
    
    const application = getApplicationById(applicationId);
    if (!application) {
      throw new Error(`Application with ID ${applicationId} not found`);
    }
    
    return { ...application };
  },
  
  /**
   * Filter applications based on various criteria
   * @param {Object} filters - Filter criteria
   * @returns {Promise<Array>} - Filtered list of applications
   */
  filterApplications: async (filters = {}) => {
    // Simulate API call delay
    await delay(1000);
    
    let result = [...mockOnboardingApplications];
    
    // Filter by search term (kitchen name, owner name, or email)
    if (filters.searchTerm) {
      const term = filters.searchTerm.toLowerCase();
      result = result.filter(app => 
        app.kitchenName.toLowerCase().includes(term) || 
        app.ownerName.toLowerCase().includes(term) ||
        app.email.toLowerCase().includes(term)
      );
    }
    
    // Filter by status
    if (filters.status) {
      result = result.filter(app => app.status === filters.status);
    }
    
    // Filter by city
    if (filters.city) {
      result = result.filter(app => app.city === filters.city);
    }
    
    // Filter by cuisine type
    if (filters.cuisineType) {
      result = result.filter(app => app.cuisineType === filters.cuisineType);
    }
    
    // Filter by assignee
    if (filters.assignedTo) {
      if (filters.assignedTo === 'unassigned') {
        result = result.filter(app => app.assignedTo === null);
      } else {
        result = result.filter(app => app.assignedTo === filters.assignedTo);
      }
    }
    
    // Filter by submission date range
    if (filters.startDate && filters.endDate) {
      const start = new Date(filters.startDate).getTime();
      const end = new Date(filters.endDate).getTime();
      
      result = result.filter(app => {
        const submissionDate = new Date(app.submissionDate).getTime();
        return submissionDate >= start && submissionDate <= end;
      });
    }
    
    // Sort results
    if (filters.sortBy) {
      switch (filters.sortBy) {
        case 'kitchenName':
          result.sort((a, b) => a.kitchenName.localeCompare(b.kitchenName));
          break;
        case 'ownerName':
          result.sort((a, b) => a.ownerName.localeCompare(b.ownerName));
          break;
        case 'submissionDate':
          result.sort((a, b) => new Date(a.submissionDate) - new Date(b.submissionDate));
          break;
        case 'lastUpdated':
          result.sort((a, b) => new Date(a.lastUpdated) - new Date(b.lastUpdated));
          break;
        default:
          break;
      }
      
      // Apply sort direction
      if (filters.sortDirection === 'desc') {
        result.reverse();
      }
    } else {
      // Default sort by submission date (newest first)
      result.sort((a, b) => new Date(b.submissionDate) - new Date(a.submissionDate));
    }
    
    return result;
  },
  
  /**
   * Get filter options for applications
   * @returns {Promise<Object>} - Filter options
   */
  getFilterOptions: async () => {
    // Simulate API call delay
    await delay(500);
    
    return {
      cities: getApplicationCities(),
      cuisineTypes: getApplicationCuisines(),
      statuses: getApplicationStatuses(),
      assignees: ['unassigned', ...getApplicationAssignees()]
    };
  },
  
  /**
   * Update application status
   * @param {string} applicationId - Application ID
   * @param {string} status - New status
   * @param {string} [reason] - Reason for rejection (required if status is 'rejected')
   * @returns {Promise<Object>} - Updated application
   */
  updateApplicationStatus: async (applicationId, status, reason = null) => {
    // Simulate API call delay
    await delay(1000);
    
    const application = getApplicationById(applicationId);
    if (!application) {
      throw new Error(`Application with ID ${applicationId} not found`);
    }
    
    if (status === 'rejected' && !reason) {
      throw new Error('Rejection reason is required when rejecting an application');
    }
    
    // In a real app, this would update the backend
    const updatedApplication = { 
      ...application, 
      status,
      lastUpdated: new Date().toISOString()
    };
    
    if (status === 'rejected') {
      updatedApplication.rejectionReason = reason;
    } else if (status !== 'rejected' && updatedApplication.rejectionReason) {
      // Remove rejection reason if status is not rejected
      delete updatedApplication.rejectionReason;
    }
    
    return updatedApplication;
  },
  
  /**
   * Assign application to admin
   * @param {string} applicationId - Application ID
   * @param {string} adminName - Admin name
   * @returns {Promise<Object>} - Updated application
   */
  assignApplication: async (applicationId, adminName) => {
    // Simulate API call delay
    await delay(800);
    
    const application = getApplicationById(applicationId);
    if (!application) {
      throw new Error(`Application with ID ${applicationId} not found`);
    }
    
    // In a real app, this would update the backend
    const updatedApplication = { 
      ...application, 
      assignedTo: adminName,
      lastUpdated: new Date().toISOString()
    };
    
    return updatedApplication;
  },
  
  /**
   * Add note to application
   * @param {string} applicationId - Application ID
   * @param {string} authorName - Author name
   * @param {string} content - Note content
   * @returns {Promise<Object>} - Updated application
   */
  addApplicationNote: async (applicationId, authorName, content) => {
    // Simulate API call delay
    await delay(700);
    
    const application = getApplicationById(applicationId);
    if (!application) {
      throw new Error(`Application with ID ${applicationId} not found`);
    }
    
    const newNote = {
      author: authorName,
      date: new Date().toISOString(),
      content
    };
    
    // In a real app, this would update the backend
    const updatedApplication = { 
      ...application, 
      notes: [...application.notes, newNote],
      lastUpdated: new Date().toISOString()
    };
    
    return updatedApplication;
  },
  
  /**
   * Update document verification status
   * @param {string} applicationId - Application ID
   * @param {string} documentType - Document type (identity, address, foodHandler)
   * @param {boolean} verified - Verification status
   * @returns {Promise<Object>} - Updated application
   */
  updateDocumentVerification: async (applicationId, documentType, verified) => {
    // Simulate API call delay
    await delay(900);
    
    const application = getApplicationById(applicationId);
    if (!application) {
      throw new Error(`Application with ID ${applicationId} not found`);
    }
    
    const documentIndex = application.documents.findIndex(doc => doc.type === documentType);
    if (documentIndex === -1) {
      throw new Error(`Document type ${documentType} not found for application ${applicationId}`);
    }
    
    // Create a new documents array with the updated document
    const updatedDocuments = [...application.documents];
    updatedDocuments[documentIndex] = {
      ...updatedDocuments[documentIndex],
      verified
    };
    
    // In a real app, this would update the backend
    const updatedApplication = { 
      ...application, 
      documents: updatedDocuments,
      lastUpdated: new Date().toISOString()
    };
    
    return updatedApplication;
  },
  
  /**
   * Get onboarding statistics
   * @returns {Promise<Object>} - Onboarding statistics
   */
  getOnboardingStatistics: async () => {
    // Simulate API call delay
    await delay(700);
    
    // Calculate statistics from mock data
    const totalApplications = mockOnboardingApplications.length;
    
    // Count by status
    const pendingApplications = mockOnboardingApplications.filter(app => app.status === 'pending').length;
    const inReviewApplications = mockOnboardingApplications.filter(app => app.status === 'in_review').length;
    const approvedApplications = mockOnboardingApplications.filter(app => app.status === 'approved').length;
    const rejectedApplications = mockOnboardingApplications.filter(app => app.status === 'rejected').length;
    
    // Count by city
    const cityDistribution = {};
    getApplicationCities().forEach(city => {
      const appsInCity = getApplicationsByCity(city).length;
      cityDistribution[city] = {
        count: appsInCity,
        percentage: Math.round((appsInCity / totalApplications) * 100)
      };
    });
    
    // Count by cuisine type
    const cuisineDistribution = {};
    getApplicationCuisines().forEach(cuisine => {
      cuisineDistribution[cuisine] = getApplicationsByCuisine(cuisine).length;
    });
    
    // Calculate average processing time (for approved and rejected applications)
    const processedApplications = mockOnboardingApplications.filter(
      app => app.status === 'approved' || app.status === 'rejected'
    );
    
    let totalProcessingTime = 0;
    processedApplications.forEach(app => {
      const submissionDate = new Date(app.submissionDate).getTime();
      const lastUpdatedDate = new Date(app.lastUpdated).getTime();
      totalProcessingTime += (lastUpdatedDate - submissionDate) / (1000 * 60 * 60 * 24); // Convert to days
    });
    
    const averageProcessingTime = processedApplications.length > 0 
      ? totalProcessingTime / processedApplications.length 
      : 0;
    
    // Count unassigned applications
    const unassignedApplications = mockOnboardingApplications.filter(app => app.assignedTo === null).length;
    
    return {
      totalApplications,
      pendingApplications,
      inReviewApplications,
      approvedApplications,
      rejectedApplications,
      cityDistribution,
      cuisineDistribution,
      averageProcessingTime,
      unassignedApplications
    };
  }
};

export default onboardingService;

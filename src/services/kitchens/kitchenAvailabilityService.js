// Utility function to simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Deep clone function to avoid mutating mock data
const cloneData = (data) => JSON.parse(JSON.stringify(data));

// Mock data for kitchen availability
const mockAvailabilityData = {
  // Map of kitchen IDs to availability data
  '1': {
    monday: {
      breakfast: {
        isAvailable: true,
        startTime: '08:00',
        endTime: '11:00'
      },
      lunch: {
        isAvailable: true,
        startTime: '12:00',
        endTime: '15:00'
      },
      dinner: {
        isAvailable: false,
        startTime: '',
        endTime: ''
      }
    },
    tuesday: {
      breakfast: {
        isAvailable: false,
        startTime: '',
        endTime: ''
      },
      lunch: {
        isAvailable: false,
        startTime: '',
        endTime: ''
      },
      dinner: {
        isAvailable: true,
        startTime: '18:00',
        endTime: '21:00'
      }
    },
    wednesday: {
      breakfast: {
        isAvailable: false,
        startTime: '',
        endTime: ''
      },
      lunch: {
        isAvailable: true,
        startTime: '12:30',
        endTime: '15:30'
      },
      dinner: {
        isAvailable: false,
        startTime: '',
        endTime: ''
      }
    },
    thursday: {
      breakfast: {
        isAvailable: false,
        startTime: '',
        endTime: ''
      },
      lunch: {
        isAvailable: false,
        startTime: '',
        endTime: ''
      },
      dinner: {
        isAvailable: false,
        startTime: '',
        endTime: ''
      }
    },
    friday: {
      breakfast: {
        isAvailable: true,
        startTime: '07:30',
        endTime: '10:30'
      },
      lunch: {
        isAvailable: false,
        startTime: '',
        endTime: ''
      },
      dinner: {
        isAvailable: false,
        startTime: '',
        endTime: ''
      }
    },
    saturday: {
      breakfast: {
        isAvailable: false,
        startTime: '',
        endTime: ''
      },
      lunch: {
        isAvailable: false,
        startTime: '',
        endTime: ''
      },
      dinner: {
        isAvailable: true,
        startTime: '19:00',
        endTime: '22:00'
      }
    },
    sunday: {
      breakfast: {
        isAvailable: false,
        startTime: '',
        endTime: ''
      },
      lunch: {
        isAvailable: true,
        startTime: '13:00',
        endTime: '16:00'
      },
      dinner: {
        isAvailable: false,
        startTime: '',
        endTime: ''
      }
    }
  },
  '2': {
    monday: {
      breakfast: {
        isAvailable: true,
        startTime: '08:00',
        endTime: '11:00'
      },
      lunch: {
        isAvailable: true,
        startTime: '12:00',
        endTime: '15:00'
      },
      dinner: {
        isAvailable: true,
        startTime: '18:00',
        endTime: '21:00'
      }
    },
    tuesday: {
      breakfast: {
        isAvailable: true,
        startTime: '08:00',
        endTime: '11:00'
      },
      lunch: {
        isAvailable: true,
        startTime: '12:00',
        endTime: '15:00'
      },
      dinner: {
        isAvailable: true,
        startTime: '18:00',
        endTime: '21:00'
      }
    },
    wednesday: {
      breakfast: {
        isAvailable: true,
        startTime: '08:00',
        endTime: '11:00'
      },
      lunch: {
        isAvailable: true,
        startTime: '12:00',
        endTime: '15:00'
      },
      dinner: {
        isAvailable: true,
        startTime: '18:00',
        endTime: '21:00'
      }
    },
    thursday: {
      breakfast: {
        isAvailable: true,
        startTime: '08:00',
        endTime: '11:00'
      },
      lunch: {
        isAvailable: true,
        startTime: '12:00',
        endTime: '15:00'
      },
      dinner: {
        isAvailable: true,
        startTime: '18:00',
        endTime: '21:00'
      }
    },
    friday: {
      breakfast: {
        isAvailable: true,
        startTime: '08:00',
        endTime: '11:00'
      },
      lunch: {
        isAvailable: true,
        startTime: '12:00',
        endTime: '15:00'
      },
      dinner: {
        isAvailable: true,
        startTime: '18:00',
        endTime: '22:00'
      }
    },
    saturday: {
      breakfast: {
        isAvailable: false,
        startTime: '',
        endTime: ''
      },
      lunch: {
        isAvailable: true,
        startTime: '12:00',
        endTime: '16:00'
      },
      dinner: {
        isAvailable: true,
        startTime: '18:00',
        endTime: '22:00'
      }
    },
    sunday: {
      breakfast: {
        isAvailable: true,
        startTime: '09:00',
        endTime: '12:00'
      },
      lunch: {
        isAvailable: true,
        startTime: '13:00',
        endTime: '16:00'
      },
      dinner: {
        isAvailable: false,
        startTime: '',
        endTime: ''
      }
    }
  }
};

// Service methods
export const kitchenAvailabilityService = {
  getKitchenAvailability: async (kitchenId) => {
    await delay(600);
    const kitchenData = mockAvailabilityData[kitchenId];
    
    if (!kitchenData) {
      // Return default empty availability if kitchen not found
      const emptySchedule = {
        monday: {},
        tuesday: {},
        wednesday: {},
        thursday: {},
        friday: {},
        saturday: {},
        sunday: {}
      };
      
      // Add empty meal periods to each day
      Object.keys(emptySchedule).forEach(day => {
        emptySchedule[day] = {
          breakfast: { isAvailable: false, startTime: '', endTime: '' },
          lunch: { isAvailable: false, startTime: '', endTime: '' },
          dinner: { isAvailable: false, startTime: '', endTime: '' }
        };
      });
      
      return emptySchedule;
    }
    
    return cloneData(kitchenData);
  },
  
  updateKitchenAvailability: async (kitchenId, availabilityData) => {
    await delay(800);
    
    // In a real app, this would update the backend
    // For now, just update our mock data
    mockAvailabilityData[kitchenId] = {
      ...mockAvailabilityData[kitchenId],
      ...availabilityData
    };
    
    return { success: true, data: cloneData(mockAvailabilityData[kitchenId]) };
  }
};

export default kitchenAvailabilityService;

import React, { useState, useEffect, useContext } from 'react';
import { XMarkIcon, PencilIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
// TODO: Replace with RTK Query hooks when migrating API calls
import { mockKitchenAvailabilityService } from '../../../utils/mockServiceHelpers';
import { useAuth } from '../../../context/useAuth';
import { KitchenContext } from './index';
import PermissionButton from '../../../components/PermissionButton';
import PermissionGate from '../../../components/PermissionGate';

const KitchenAvailabilityTab = () => {
  const { id: kitchenId } = useContext(KitchenContext);
  const { hasPermission } = useAuth();

  // State variables
  const [availabilitySettings, setAvailabilitySettings] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingDay, setEditingDay] = useState(null);
  const [editingMeal, setEditingMeal] = useState(null);
  const [formData, setFormData] = useState({
    isAvailable: false,
    startTime: '08:00',
    endTime: '10:00'
  });

  // Days of the week
  const daysOfWeek = [
    'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
  ];

  // Meal periods
  const mealPeriods = [
    { id: 'breakfast', name: 'Breakfast', defaultStart: '08:00', defaultEnd: '11:00' },
    { id: 'lunch', name: 'Lunch', defaultStart: '12:00', defaultEnd: '15:00' },
    { id: 'dinner', name: 'Dinner', defaultStart: '18:00', defaultEnd: '21:00' }
  ];

  // Fetch availability settings
  useEffect(() => {
    const fetchAvailabilitySettings = async () => {
      try {
        setIsLoading(true);
        const settings = await mockKitchenAvailabilityService.getKitchenAvailability(kitchenId);
        setAvailabilitySettings(settings);
      } catch (err) {
        console.error('Failed to load kitchen availability settings:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAvailabilitySettings();
  }, [kitchenId]);

  // Handle edit time slot
  const handleEditTimeSlot = (day, meal) => {
    if (!hasPermission('edit_kitchen')) return;
    
    const daySettings = availabilitySettings?.[day.toLowerCase()] || {};
    const mealSettings = daySettings[meal.id] || { 
      isAvailable: false, 
      startTime: meal.defaultStart, 
      endTime: meal.defaultEnd 
    };
    
    setFormData({
      isAvailable: mealSettings.isAvailable || false,
      startTime: mealSettings.startTime || meal.defaultStart,
      endTime: mealSettings.endTime || meal.defaultEnd
    });
    
    setEditingDay(day);
    setEditingMeal(meal);
    setShowEditModal(true);
  };

  // Handle form change
  const handleFormChange = (e) => {
    const { name, checked, value } = e.target;
    
    if (name === 'isAvailable') {
      setFormData({ ...formData, isAvailable: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Save availability settings
  const saveAvailabilitySettings = async () => {
    if (!editingDay || !editingMeal) return;

    try {
      setIsLoading(true);
      
      const dayKey = editingDay.toLowerCase();
      
      // Create updated settings object
      const updatedSettings = {
        ...availabilitySettings,
        [dayKey]: {
          ...(availabilitySettings?.[dayKey] || {}),
          [editingMeal.id]: {
            isAvailable: formData.isAvailable,
            startTime: formData.startTime,
            endTime: formData.endTime
          }
        }
      };
      
      await mockKitchenAvailabilityService.updateKitchenAvailability(
        kitchenId,
        updatedSettings
      );
      
      // Update local state
      setAvailabilitySettings(updatedSettings);
      setShowEditModal(false);
    } catch (err) {
      console.error('Failed to update kitchen availability:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Format time for display
  const formatTime = (timeString) => {
    try {
      const [hours, minutes] = timeString.split(':');
      const time = new Date();
      time.setHours(parseInt(hours, 10));
      time.setMinutes(parseInt(minutes, 10));
      return time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch (err) {
      return timeString;
    }
  };

  // Get availability cell content
  const getAvailabilityCell = (day, meal) => {
    const dayKey = day.toLowerCase();
    const daySettings = availabilitySettings?.[dayKey] || {};
    const mealSettings = daySettings[meal.id] || { isAvailable: false };
    
    if (mealSettings.isAvailable) {
      return (
        <div className="bg-green-50 text-center p-4 rounded-md">
          <div className="flex items-center justify-center">
            <CheckCircleIcon className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-sm font-medium text-green-700">Available</span>
          </div>
          <div className="text-xs text-green-600 mt-1">
            {formatTime(mealSettings.startTime)} - {formatTime(mealSettings.endTime)}
          </div>
        </div>
      );
    } else {
      return (
        <div 
          className="text-center p-4 cursor-pointer hover:bg-neutral-50 rounded-md"
          onClick={() => handleEditTimeSlot(day, meal)}
        >
          <div className="text-sm font-medium text-neutral-500">Not Available</div>
          <div className="text-xs text-neutral-400 mt-1">Click to set</div>
        </div>
      );
    }
  };

  if (isLoading && !availabilitySettings) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
        <span className="ml-2 text-neutral-600">Loading availability settings...</span>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h3 className="text-lg font-medium text-neutral-900">Kitchen Availability Schedule</h3>
        <p className="mt-1 text-sm text-neutral-500">
          Set when this kitchen is available to accept orders for different meal periods.
        </p>
      </div>

      <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-neutral-200">
            <thead className="bg-neutral-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider w-1/4">
                  Day
                </th>
                {mealPeriods.map(meal => (
                  <th key={meal.id} scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    {meal.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-neutral-200">
              {daysOfWeek.map((day) => (
                <tr key={day}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-neutral-900">{day}</div>
                  </td>
                  {mealPeriods.map(meal => (
                    <td key={`${day}-${meal.id}`} className="px-6 py-4">
                      {getAvailabilityCell(day, meal)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Time Slot Modal */}
      {showEditModal && editingDay && editingMeal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-neutral-900">
                {editingDay} {editingMeal.name} Availability
              </h3>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-neutral-500 hover:text-neutral-700"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>
            
            <div className="mb-6">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isAvailable"
                  name="isAvailable"
                  checked={formData.isAvailable}
                  onChange={handleFormChange}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                />
                <label htmlFor="isAvailable" className="ml-2 block text-sm text-neutral-900">
                  Available for {editingMeal.name} on {editingDay}
                </label>
              </div>
            </div>
            
            {formData.isAvailable && (
              <div className="mb-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                      Start Time
                    </label>
                    <input
                      type="time"
                      name="startTime"
                      value={formData.startTime}
                      onChange={handleFormChange}
                      className="w-full p-2 border border-neutral-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                      End Time
                    </label>
                    <input
                      type="time"
                      name="endTime"
                      value={formData.endTime}
                      onChange={handleFormChange}
                      className="w-full p-2 border border-neutral-300 rounded-lg"
                    />
                  </div>
                </div>
              </div>
            )}
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 bg-white border border-neutral-300 text-neutral-700 rounded-full hover:bg-neutral-50 transition-colors text-sm font-medium"
              >
                Cancel
              </button>
              <button
                onClick={saveAvailabilitySettings}
                className="px-4 py-2 bg-primary-600 text-white rounded-full hover:bg-primary-700 transition-colors text-sm font-medium"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default KitchenAvailabilityTab;

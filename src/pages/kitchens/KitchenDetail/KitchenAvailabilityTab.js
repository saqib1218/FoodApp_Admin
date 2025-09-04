import React, { useState, useContext } from 'react';
import { XMarkIcon, PencilIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { useGetKitchenAvailabilityQuery } from '../../../store/api/modules/kitchens/kitchensApi';
import { useAuth } from '../../../hooks/useAuth';
import { PERMISSIONS } from '../../../contexts/PermissionRegistry';
import { KitchenContext } from './index';
import PermissionGate, { PermissionButton } from '../../../components/PermissionGate';

const KitchenAvailabilityTab = () => {
  const { kitchen } = useContext(KitchenContext);
  const kitchenId = kitchen?.id;
  const { hasPermission } = useAuth();
  
  // Check permission for viewing kitchen availability
  const canViewKitchenAvailability = hasPermission(PERMISSIONS.KITCHEN_AVAILABILITY_VIEW);
  
  // RTK Query to fetch kitchen availability data - only if user has permission
  const { data: availabilityResponse, isLoading, error } = useGetKitchenAvailabilityQuery(kitchenId, {
    skip: !canViewKitchenAvailability || !kitchenId
  });
  
  // Extract availability data from API response
  const availabilityData = availabilityResponse?.data || [];

  // State variables
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
    { id: 'Mon', name: 'Monday' },
    { id: 'Tue', name: 'Tuesday' },
    { id: 'Wed', name: 'Wednesday' },
    { id: 'Thu', name: 'Thursday' },
    { id: 'Fri', name: 'Friday' },
    { id: 'Sat', name: 'Saturday' },
    { id: 'Sun', name: 'Sunday' }
  ];

  // Meal periods (slots)
  const mealPeriods = [
    { id: 1, name: 'breakfast', label: 'Breakfast' },
    { id: 2, name: 'lunch', label: 'Lunch' },
    { id: 3, name: 'dinner', label: 'Dinner' },
    { id: 4, name: 'iftar', label: 'Iftar' },
    { id: 5, name: 'full_day', label: 'Full Day' }
  ];

  // Helper function to get availability data for a specific day and slot
  const getAvailabilityForDaySlot = (dayId, slotId) => {
    return availabilityData.find(item => 
      item.day.id === dayId && item.slot.id === slotId
    );
  };

  // Format time for display
  const formatTime = (timeString) => {
    if (!timeString) return 'N/A';
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

  // Handle edit time slot
  const handleEditTimeSlot = (day, slot) => {
    setEditingDay(day);
    setEditingMeal(slot);
    
    const availability = getAvailabilityForDaySlot(day.id, slot.id);
    
    setFormData({
      isAvailable: availability?.isAvailable || false,
      startTime: availability?.customStartTime || availability?.slot?.defaultStartTime || '08:00',
      endTime: availability?.customEndTime || availability?.slot?.defaultEndTime || '10:00'
    });
    
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

  // Handle save changes
  const handleSaveChanges = async () => {
    try {
      // TODO: Implement API call to update availability
      console.log('Update availability:', {
        kitchenId,
        day: editingDay,
        slot: editingMeal,
        availability: formData
      });
      
      setShowEditModal(false);
    } catch (err) {
      console.error('Failed to update kitchen availability:', err);
    }
  };

  // Get availability cell content
  const getAvailabilityCell = (day, slot) => {
    const availability = getAvailabilityForDaySlot(day.id, slot.id);
    
    if (availability?.isAvailable) {
      const startTime = availability.customStartTime || availability.slot.defaultStartTime;
      const endTime = availability.customEndTime || availability.slot.defaultEndTime;
      
      return (
        <div className="bg-green-50 text-center p-3 rounded-md border border-green-200">
          <div className="flex items-center justify-center">
            <CheckCircleIcon className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-sm font-medium text-green-700">Available</span>
          </div>
          <div className="text-xs text-green-600 mt-1">
            {formatTime(startTime)} - {formatTime(endTime)}
          </div>
        </div>
      );
    } else {
      return (
        <div className="text-center p-3 rounded-md border border-neutral-200">
          <div className="text-sm font-medium text-neutral-500">Not Available</div>
        </div>
      );
    }
  };

  if (isLoading) {
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

      {!canViewKitchenAvailability ? (
        <div className="flex items-center justify-center min-h-96">
          <div className="text-center">
            <h3 className="text-lg font-medium text-neutral-900 mb-2">Access Denied</h3>
            <p className="text-neutral-500">You don't have permission to access the kitchen availability.</p>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-neutral-200">
              <thead className="bg-neutral-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider w-1/6">
                    Day
                  </th>
                  {mealPeriods.map(slot => (
                    <th key={slot.id} scope="col" className="px-6 py-3 text-center text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      {slot.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-neutral-200">
                {daysOfWeek.map((day) => (
                  <tr key={day.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-neutral-900">{day.name}</div>
                    </td>
                    {mealPeriods.map(slot => (
                      <td key={`${day.id}-${slot.id}`} className="px-6 py-4">
                        {getAvailabilityCell(day, slot)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

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
                onClick={handleSaveChanges}
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

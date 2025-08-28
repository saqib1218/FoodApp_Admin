import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { KitchenContext } from './index';
import { useAuth } from '../../../hooks/useAuth';
import PermissionGate from '../../../components/PermissionGate';

const KitchenInfoTab = () => {
  const { kitchen, isLoading, updateKitchen } = useContext(KitchenContext);
  const { hasPermission } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    email: '',
    phone: '',
    cuisineType: '',
    priceRange: '',
    website: '',
    socialLinks: {
      facebook: '',
      instagram: '',
      twitter: ''
    }
  });
  const [errors, setErrors] = useState({});

  // Initialize form data when kitchen data is loaded
  useEffect(() => {
    if (kitchen) {
      setFormData({
        name: kitchen.name || '',
        description: kitchen.description || '',
        email: kitchen.email || '',
        phone: kitchen.phone || '',
        cuisineType: kitchen.cuisineType || '',
        priceRange: kitchen.priceRange || '',
        website: kitchen.website || '',
        socialLinks: {
          facebook: kitchen.socialLinks?.facebook || '',
          instagram: kitchen.socialLinks?.instagram || '',
          twitter: kitchen.socialLinks?.twitter || ''
        }
      });
    }
  }, [kitchen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      await updateKitchen(formData);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update kitchen info:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="p-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Kitchen Information</h2>
        <PermissionGate permissions="edit_kitchen">
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-primary-600 text-white rounded-full hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              Edit Information
            </button>
          ) : (
            <div className="flex space-x-2">
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-full hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-primary-600 text-white rounded-full hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                Save Changes
              </button>
            </div>
          )}
        </PermissionGate>
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Kitchen Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-xl focus:ring-primary-500 focus:border-primary-500 ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-xl focus:ring-primary-500 focus:border-primary-500 ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone
              </label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-xl focus:ring-primary-500 focus:border-primary-500 ${
                  errors.phone ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cuisine Type
              </label>
              <input
                type="text"
                name="cuisineType"
                value={formData.cuisineType}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price Range
              </label>
              <select
                name="priceRange"
                value={formData.priceRange}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="">Select Price Range</option>
                <option value="$">$ (Budget)</option>
                <option value="$$">$$ (Moderate)</option>
                <option value="$$$">$$$ (Expensive)</option>
                <option value="$$$$">$$$$ (Very Expensive)</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Website
              </label>
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-2">Social Media Links</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Facebook
                </label>
                <input
                  type="url"
                  name="socialLinks.facebook"
                  value={formData.socialLinks.facebook}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Instagram
                </label>
                <input
                  type="url"
                  name="socialLinks.instagram"
                  value={formData.socialLinks.instagram}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Twitter
                </label>
                <input
                  type="url"
                  name="socialLinks.twitter"
                  value={formData.socialLinks.twitter}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
            </div>
          </div>
        </form>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Kitchen Name</h3>
              <p className="mt-1">{kitchen?.name}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-500">Email</h3>
              <p className="mt-1">{kitchen?.email}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-500">Phone</h3>
              <p className="mt-1">{kitchen?.phone}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-500">Cuisine Type</h3>
              <p className="mt-1">{kitchen?.cuisineType || 'Not specified'}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-500">Price Range</h3>
              <p className="mt-1">{kitchen?.priceRange || 'Not specified'}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-500">Website</h3>
              <p className="mt-1">
                {kitchen?.website ? (
                  <a 
                    href={kitchen.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary-600 hover:text-primary-800"
                  >
                    {kitchen.website}
                  </a>
                ) : (
                  'Not specified'
                )}
              </p>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-500">Description</h3>
            <p className="mt-1 whitespace-pre-line">{kitchen?.description || 'No description provided.'}</p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-2">Social Media</h3>
            <div className="flex space-x-4">
              {kitchen?.socialLinks?.facebook && (
                <a 
                  href={kitchen.socialLinks.facebook} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary-600 hover:text-primary-800"
                >
                  Facebook
                </a>
              )}
              
              {kitchen?.socialLinks?.instagram && (
                <a 
                  href={kitchen.socialLinks.instagram} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary-600 hover:text-primary-800"
                >
                  Instagram
                </a>
              )}
              
              {kitchen?.socialLinks?.twitter && (
                <a 
                  href={kitchen.socialLinks.twitter} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary-600 hover:text-primary-800"
                >
                  Twitter
                </a>
              )}
              
              {!kitchen?.socialLinks?.facebook && 
               !kitchen?.socialLinks?.instagram && 
               !kitchen?.socialLinks?.twitter && (
                <p className="text-gray-500">No social media links provided.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default KitchenInfoTab;

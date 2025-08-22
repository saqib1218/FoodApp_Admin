import React,{useState} from 'react'
import { XMarkIcon, PencilIcon, EyeIcon,PlusIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useParams, useNavigate } from 'react-router-dom';
import PermissionButton from '../../../../components/PermissionButton';
import {currency} from '../../../../data/Currency/currency'
import ConfirmationModal from '../../../../components/ConfirmationModal';
const AddEditDish = () => {
  const { id: kitchenId } = useParams();
  const navigate = useNavigate();
  console.log(currency)
  // Form data state
  const [formData, setFormData] = useState({
    dishName: '',
    tagLine: '',
    category: '',
    dishType: '',
    description: '',
    preparationTime: ''
  });

  // Tags state
  const [dishTags, setDishTags] = useState([]);
  const [cuisineTags, setCuisineTags] = useState([]);
  const [dishTagInput, setDishTagInput] = useState('');
  const [cuisineTagInput, setCuisineTagInput] = useState('');

  // Customization toggle state
  const [allowCustomizations, setAllowCustomizations] = useState(false);
  const [allowNegotiation, setAllowNegotiation] = useState(false);

  // Daily order limit toggle and value
  const [enableDailyOrderLimit, setEnableDailyOrderLimit] = useState(false);
  const [dailyOrderLimit, setDailyOrderLimit] = useState("");
  const [showAddVariationModal, setShowAddVariationModal] = useState(false);
  const [variations, setVariations] = useState([]);
  const [variationForm, setVariationForm] = useState({
    name: '',
    description: '',
    unit: '',
    quantity:'',
    price: '',
    perLimit:"",
    dailyLimit: '',
    status: 'true'
  });
  
  // State for catering package dish names functionality
  const [showDishNamesModal, setShowDishNamesModal] = useState(false);
  const [selectedVariationId, setSelectedVariationId] = useState(null);
  const [dishItemInput, setDishItemInput] = useState('');
  const [dishDescriptionInput, setDishDescriptionInput] = useState('');
  const [variationDishNames, setVariationDishNames] = useState({}); // Store dish names for each variation
  
  // State for confirmation modals
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [confirmationAction, setConfirmationAction] = useState(null);
  const [confirmationComment, setConfirmationComment] = useState('');
  const [pendingAction, setPendingAction] = useState(null);
  
  // State for add item confirmation
  const [showAddItemConfirmation, setShowAddItemConfirmation] = useState(false);
  const [addItemComment, setAddItemComment] = useState('');
  const [pendingAddItem, setPendingAddItem] = useState(null);
  
  // State for variation save confirmation
  const [showVariationSaveConfirmation, setShowVariationSaveConfirmation] = useState(false);
  const [variationSaveComment, setVariationSaveComment] = useState('');
  const [pendingVariationSave, setPendingVariationSave] = useState(null);
  const [editingVariationId, setEditingVariationId] = useState(null);
  const daysOfWeek = [
    "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
  ];
  const timeSlots = ["Breakfast", "Lunch", "Dinner"];
  const [availability, setAvailability] = useState({
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
    Sunday: [],
  });

  // Add state for images at the top of the component
  const [selectedImages, setSelectedImages] = useState([]);
  // Add state for videos at the top of the component
  const [selectedVideos, setSelectedVideos] = useState([]);
  // Add state for audio file at the top of the component
  const [selectedAudio, setSelectedAudio] = useState(null);
  // Add state for thumbnail image at the top of the component
  const [thumbnailImage, setThumbnailImage] = useState(null);
  const [preparationType, setPreparationType] = useState('made_only_after_order');
  const [specialDay, setSpecialDay] = useState({
    date: null,
    startTime: '',
    endTime: ''
  });
  const handleCancel = () => {
    navigate(`/kitchens/${kitchenId}`);
  };
  const handleAddVariation = () => {
    setEditingVariationId(null); // Clear editing state for new variation
    setShowAddVariationModal(true);
    setVariationForm({
      name: '',
      description: '',
      unit: '',
      quantity:'',
      price: '',
      perLimit:'',
      dailyLimit: '',
      status: 'true'
    });
  };

  // Handler for editing variation
  const handleEditVariation = (variation) => {
    setEditingVariationId(variation.id);
    setVariationForm({
      name: variation.name,
      description: variation.description,
      unit: variation.unit,
      quantity: variation.quantity,
      price: variation.price,
      perLimit: variation.perLimit,
      dailyLimit: variation.dailyLimit,
      status: variation.status
    });
    setShowAddVariationModal(true);
  };
  const handleSaveVariation = () => {
    if (variationForm.name && variationForm.unit && variationForm.price) {
      const variationData = editingVariationId 
        ? { ...variationForm, id: editingVariationId }
        : { ...variationForm, id: Date.now() };
      
      setPendingVariationSave(variationData);
      setShowVariationSaveConfirmation(true);
      setVariationSaveComment('');
    }
  };

  // Handler for confirming variation save
  const handleConfirmVariationSave = () => {
    if (pendingVariationSave && variationSaveComment.trim()) {
      if (editingVariationId) {
        // Update existing variation
        setVariations(prev => prev.map(variation => 
          variation.id === editingVariationId ? pendingVariationSave : variation
        ));
      } else {
        // Add new variation
        setVariations(prev => [...prev, pendingVariationSave]);
        // Initialize empty dish names array for new variation if catering package
        if (preparationType === 'catering_package') {
          setVariationDishNames(prev => ({ ...prev, [pendingVariationSave.id]: [] }));
        }
      }
      setShowAddVariationModal(false);
      setShowVariationSaveConfirmation(false);
      setVariationSaveComment('');
      setPendingVariationSave(null);
      setEditingVariationId(null);
    }
  };

  // Handler for canceling variation save
  const handleCancelVariationSave = () => {
    setShowVariationSaveConfirmation(false);
    setVariationSaveComment('');
    setPendingVariationSave(null);
  };

  // Handler for opening dish names modal
  const handleAddDishNames = (variationId) => {
    setSelectedVariationId(variationId);
    setShowDishNamesModal(true);
    setDishItemInput('');
    setDishDescriptionInput('');
  };

  // Handler for adding dish item to variation
  const handleAddDishItem = () => {
    if (dishItemInput.trim() && selectedVariationId) {
      const newItem = {
        id: Date.now(), 
        name: dishItemInput.trim(), 
        description: dishDescriptionInput.trim(),
        status: true // default to active
      };
      
      setPendingAddItem(newItem);
      setShowAddItemConfirmation(true);
      setAddItemComment('');
    }
  };

  // Handler for confirming add item
  const handleConfirmAddItem = () => {
    if (pendingAddItem && addItemComment.trim() && selectedVariationId) {
      setVariationDishNames(prev => ({
        ...prev,
        [selectedVariationId]: [
          ...(prev[selectedVariationId] || []),
          pendingAddItem
        ]
      }));
      setDishItemInput('');
      setDishDescriptionInput('');
      setShowAddItemConfirmation(false);
      setAddItemComment('');
      setPendingAddItem(null);
    }
  };

  // Handler for canceling add item
  const handleCancelAddItem = () => {
    setShowAddItemConfirmation(false);
    setAddItemComment('');
    setPendingAddItem(null);
  };

  // Handler for toggling dish item status
  const handleToggleDishStatus = (variationId, dishId) => {
    const dish = variationDishNames[variationId].find(d => d.id === dishId);
    const newStatus = !dish.status;
    
    setConfirmationAction('status');
    setPendingAction({ variationId, dishId, newStatus, dishName: dish.name });
    setShowConfirmationModal(true);
    setConfirmationComment('');
  };

  // Handler for confirming status change
  const handleConfirmStatusChange = () => {
    if (pendingAction && confirmationComment.trim()) {
      setVariationDishNames(prev => ({
        ...prev,
        [pendingAction.variationId]: prev[pendingAction.variationId].map(dish => 
          dish.id === pendingAction.dishId ? { ...dish, status: pendingAction.newStatus } : dish
        )
      }));
      setShowConfirmationModal(false);
      setConfirmationComment('');
      setPendingAction(null);
    }
  };

  // Handler for editing dish item
  const handleEditDishItem = (dish) => {
    setDishItemInput(dish.name);
    setDishDescriptionInput(dish.description || '');
    // Remove the item from the list so it can be re-added with updated info
    
  };

  // Handler for removing dish name
  const handleRemoveDishName = (variationId, dishId) => {
    const dish = variationDishNames[variationId].find(d => d.id === dishId);
    
    setConfirmationAction('delete');
    setPendingAction({ variationId, dishId, dishName: dish.name });
    setShowConfirmationModal(true);
    setConfirmationComment('');
  };
  //handler remove variation
  const handleRemoveVariation = (variationId) => {
    const variation = variations.find(v => v.id === variationId);
    
    setConfirmationAction('delete');
    setPendingAction({ variationId, variationName: variation.name });
    setShowConfirmationModal(true);
    setConfirmationComment('');
  };

  // Handler for confirming delete
  const handleConfirmDelete = () => {
    if (pendingAction && confirmationComment.trim()) {
      // Check if it's a variation deletion or dish item deletion
      if (pendingAction.variationId && !pendingAction.dishId) {
        // Delete variation
        setVariations(prev => prev.filter(variation => variation.id !== pendingAction.variationId));
        // Also remove associated dish names
        setVariationDishNames(prev => {
          const newState = { ...prev };
          delete newState[pendingAction.variationId];
          return newState;
        });
      } else {
        // Delete dish item
        setVariationDishNames(prev => ({
          ...prev,
          [pendingAction.variationId]: prev[pendingAction.variationId].filter(dish => dish.id !== pendingAction.dishId)
        }));
      }
      setShowConfirmationModal(false);
      setConfirmationComment('');
      setPendingAction(null);
    }
  };

  // Handler for canceling confirmation
  const handleCancelConfirmation = () => {
    setShowConfirmationModal(false);
    setConfirmationComment('');
    setPendingAction(null);
  };

  // Handle form input changes
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle tag input for dish tags
  const handleDishTagKeyPress = (e) => {
    if (e.key === 'Enter' && dishTagInput.trim()) {
      e.preventDefault();
      if (!dishTags.includes(dishTagInput.trim())) {
        setDishTags([...dishTags, dishTagInput.trim()]);
      }
      setDishTagInput('');
    }
  };

  // Handle tag input for cuisine tags
  const handleCuisineTagKeyPress = (e) => {
    if (e.key === 'Enter' && cuisineTagInput.trim()) {
      e.preventDefault();
      if (!cuisineTags.includes(cuisineTagInput.trim())) {
        setCuisineTags([...cuisineTags, cuisineTagInput.trim()]);
      }
      setCuisineTagInput('');
    }
  };

  // Remove dish tag
  const removeDishTag = (tagToRemove) => {
    setDishTags(dishTags.filter(tag => tag !== tagToRemove));
  };

  // Remove cuisine tag
  const removeCuisineTag = (tagToRemove) => {
    setCuisineTags(cuisineTags.filter(tag => tag !== tagToRemove));
  };

  const handleVariationFormChange = (e) => {
    const { name, value } = e.target;
    setVariationForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    // Handle form submission here
    console.log('Submitting dish data...');
    navigate(`/kitchens/${kitchenId}`);
  };

  return (
    
    <div className="space-y-6">
    {/* Header */}
    <div>
      <h1 className="text-2xl font-bold text-neutral-800">Dish Management</h1>
      <p className="mt-1 text-sm text-neutral-600">
        Add your dish here
      </p>
    </div>
        {/* Form Container */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="section-header">
            <span className="section-title">Basic Information</span>
            <div className="flex-1 border-b border-gray-100 ml-4"></div>
          </div>
          
          {/* Dish Name and Tag Line in one row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Dish Name
              </label>
              <input
                type="text"
                name="dishName"
                value={formData.dishName}
                onChange={handleFormChange}
                className="w-full p-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Enter dish name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Dish Tag Line
              </label>
              <input
                type="text"
                name="tagLine"
                value={formData.tagLine}
                onChange={handleFormChange}
                className="w-full p-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Enter tag line"
              />
            </div>
          </div>

          {/* Dish Category and Dish Type in one row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Dish Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleFormChange}
                className="w-full p-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="">Select category</option>
                <option value="appetizer">Appetizer</option>
                <option value="main_course">Main Course</option>
                <option value="dessert">Dessert</option>
                <option value="beverage">Beverage</option>
                <option value="snack">Snack</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Dish Type
              </label>
              <select
                name="dishType"
                value={formData.dishType}
                onChange={handleFormChange}
                className="w-full p-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="">Select dish type</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="non_vegetarian">Non-Vegetarian</option>
                <option value="vegan">Vegan</option>
                <option value="gluten_free">Gluten Free</option>
              </select>
            </div>
          </div>

          {/* Dish Description */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Dish Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleFormChange}
              className="w-full p-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              placeholder="Enter dish description"
              rows={4}
            />
          </div>

          {/* Dish Tags and Cuisine Tags in one row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Dish Tags
              </label>
              <div className="border border-neutral-300 rounded-lg p-3 min-h-[120px] focus-within:ring-2 focus-within:ring-primary-500 focus-within:border-primary-500">
                <div className="flex flex-wrap gap-2 mb-2">
                  {dishTags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeDishTag(tag)}
                        className="ml-2 text-blue-600 hover:text-blue-800"
                      >
                        <XMarkIcon className="h-4 w-4" />
                      </button>
                    </span>
                  ))}
                </div>
                <input
                  type="text"
                  value={dishTagInput}
                  onChange={(e) => setDishTagInput(e.target.value)}
                  onKeyPress={handleDishTagKeyPress}
                  className="w-full border-none outline-none text-sm"
                  placeholder="Type and press Enter to add tags"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Dish Cuisine
              </label>
              <div className="border border-neutral-300 rounded-lg p-3 min-h-[120px] focus-within:ring-2 focus-within:ring-primary-500 focus-within:border-primary-500">
                <div className="flex flex-wrap gap-2 mb-2">
                  {cuisineTags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeCuisineTag(tag)}
                        className="ml-2 text-green-600 hover:text-green-800"
                      >
                        <XMarkIcon className="h-4 w-4" />
                      </button>
                    </span>
                  ))}
                </div>
                <input
                  type="text"
                  value={cuisineTagInput}
                  onChange={(e) => setCuisineTagInput(e.target.value)}
                  onKeyPress={handleCuisineTagKeyPress}
                  className="w-full border-none outline-none text-sm"
                  placeholder="Type and press Enter to add cuisine tags"
                />
              </div>
            </div>
          </div>

          {/* Customization and Negotiation toggles in one row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-neutral-800">
                Allow customer customizations?
              </span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={allowCustomizations}
                  onChange={e => setAllowCustomizations(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary-500 rounded-full peer peer-checked:bg-primary-600 transition-colors"></div>
                <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full shadow transform transition-transform peer-checked:translate-x-5"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-neutral-800">
                Allow customer negotiation?
              </span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={allowNegotiation}
                  onChange={e => setAllowNegotiation(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary-500 rounded-full peer peer-checked:bg-primary-600 transition-colors"></div>
                <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full shadow transform transition-transform peer-checked:translate-x-5"></div>
              </label>
            </div>
          </div>

          {/* Daily Order Limit and Dish Preparation Type in one row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-neutral-800">
                  Set daily order limit?
                </span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={enableDailyOrderLimit}
                    onChange={e => setEnableDailyOrderLimit(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary-500 rounded-full peer peer-checked:bg-primary-600 transition-colors"></div>
                  <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full shadow transform transition-transform peer-checked:translate-x-5"></div>
                </label>
              </div>
              {enableDailyOrderLimit && (
                <input
                  type="number"
                  value={dailyOrderLimit}
                  onChange={(e) => setDailyOrderLimit(e.target.value)}
                  className="w-full p-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Enter daily limit"
                />
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Dish Preparation Type
              </label>
              <select 
                className="w-full p-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                value={preparationType}
                onChange={(e) => setPreparationType(e.target.value)}
              >
                <option value="made_only_after_order">Made Only After Order</option>
                <option value="ready_during_the_day">Ready During the Day</option>
                <option value="for_special_day">For a Special Day Only</option>
                <option value="catering_package">Catering Package</option>
              </select>
            </div>
          </div>
          {preparationType !== 'for_special_day' ? (
            null
          ):(
            <>
            <div className="section-header mt-8">
              <span className="section-title">Dish Offer Day</span>
              <div className="flex-1 border-b border-gray-100 ml-4"></div>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Select the Date
              </label>
              <input
                type="date"
                className="w-full p-2 border border-neutral-300 rounded-lg"
                value={specialDay.date || ''}
                onChange={(e) => setSpecialDay({...specialDay, date: e.target.value})}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Start Time
                </label>
                <input
                  type="time"
                  className="w-full p-2 border border-neutral-300 rounded-lg"
                  value={specialDay.startTime}
                  onChange={(e) => setSpecialDay({...specialDay, startTime: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  End Time
                </label>
                <input
                  type="time"
                  className="w-full p-2 border border-neutral-300 rounded-lg"
                  value={specialDay.endTime}
                  onChange={(e) => setSpecialDay({...specialDay, endTime: e.target.value})}
                />
              </div>
            </div>
          </>
    
          )}
           
          <div className="section-header">
            <span className="section-title">Dish Variation</span>
            <div className="flex-1 border-b border-gray-100 ml-4"></div>
          </div>
         
          <div className="mb-4">
          <PermissionButton
          permission="edit_kitchen"
          onClick={handleAddVariation}
          className="px-4 py-2 bg-primary-600 text-white rounded-full hover:bg-primary-700 transition-colors text-sm font-medium flex items-center"
        >
          <PlusIcon className="h-4 w-4 mr-1" />
          Add Variation
        </PermissionButton>
          </div>

{/* Display saved variations */}
{variations.length > 0 && (
  <div className="mb-6">
    <h4 className="text-sm font-medium text-neutral-700 mb-3">Variations</h4>
    <div className="space-y-3">
      {variations.map((variation) => (
        <div key={variation.id} className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="font-medium text-neutral-900">{variation.name}</div>
              <div className="text-sm text-neutral-600">{variation.quantity} {variation.unit}</div>
              <div className="text-xs text-neutral-500 mt-1">{variation.description}</div>
            </div>
            <div className="text-center">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                variation.status === 'true' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {variation.status === 'true' ? 'Active' : 'Inactive'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-right">
                <div className="font-medium text-neutral-900">
                  PKR {variation.price}
                </div>
              </div>
              {/* Show + icon only for catering package */}
              {preparationType === 'catering_package' && (
                <button
                  onClick={() => handleAddDishNames(variation.id)}
                  className="px-4 py-2 bg-primary-600 text-white rounded-full hover:bg-primary-700 transition-colors text-sm font-medium flex items-center"
                  title="Add dish names"
                >
                  <PlusIcon className="h-4 w-4 mr-1" />
                 Catering Package
                </button>
              )}
                <div className="flex items-center justify-center gap-2">
                                <button
                                 onClick={() => handleEditVariation(variation)}
                                  className="text-blue-600 hover:text-blue-800 transition-colors"
                                  title="Edit variation"
                                >
                                  <PencilIcon className="h-4 w-4" />
                                </button>
                                <button
                                  onClick={() => handleRemoveVariation(variation.id)}
                                  className="text-red-600 hover:text-red-800 transition-colors"
                                  title="Remove variation"
                                >
                                  <XMarkIcon className="h-4 w-4" />
                                </button>
                              </div>
            </div>
          </div>
          
          {/* Display dish names if catering package and has dish names */}
       
        </div>
      ))}
    </div>
  </div>
)}

{showAddVariationModal && (
        <div className="fixed inset-0  bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white h-[90vh] overflow-y-auto  rounded-xl shadow-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-neutral-900">
                {editingVariationId ? 'Edit Variation' : 'Add Variation'}
              </h3>
              <button
                onClick={() => setShowAddVariationModal(false)}
                className="text-neutral-500 hover:text-neutral-700"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>
            
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-neutral-700 mb-1">
               Variation Name
              </label>
              <input
                type="text"
                name="name"
                value={variationForm.name}
                onChange={handleVariationFormChange}
                className="w-full p-2 border border-neutral-300 rounded-lg"
                placeholder="Enter a variation name"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Variation Description
              </label>
              <input
                type="text"
                name="description"
                value={variationForm.description}
                onChange={handleVariationFormChange}
                className="w-full p-2 border border-neutral-300 rounded-lg"
                placeholder="Enter a variation description"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-neutral-700 mb-1">
            Variation Unit
              </label>
             
              <select
      name="unit"
      value={variationForm.unit}
      onChange={handleVariationFormChange}
                className="w-full p-2 border border-neutral-300 rounded-lg"
              >
                <option value="">Select variation unit</option>
                <option value="kg">kg</option>
                <option value="grams">grams</option>
                <option value="litre">litre</option>
                <option value="pounds">pounds</option>
                <option value="serving">serving</option>
                <option value="dozen">dozen</option>
                <option value="other">other</option>
              </select>
            </div>
            <div className="mb-4 ">
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Variation Unit Quantity
              </label>
              <input
                type="number"
                name="quantity"
                value={variationForm.quantity}
                onChange={handleVariationFormChange}
                className="w-full p-2 border border-neutral-300 rounded-lg"
                placeholder="Enter a variation quatity"
              />
            </div>
            <div className="flex gap-4 mb-4">
                <div className="w-full">
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                Variation Price
              </label>
              <input
                type="number"
                name="price"
                value={variationForm.price}
                onChange={handleVariationFormChange}
                className="w-full p-2 border border-neutral-300 rounded-lg"
                placeholder="Enter a variation price"
              />
                </div>
                <div className="w-full">
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                Currency
              </label>
              
              <select
                
                className="w-full p-2 border border-neutral-300 rounded-lg"
                disabled
              >
                {currency.map((curr) => (
                    <option key={curr.code} value={curr.code}>
                      {curr.code}
                    </option>
                  ))}
       
               
              </select>
                </div>
               
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-neutral-700 mb-1">
              Variation Per Order Limit
              </label>
              <input
                type="number"
                name="perLimit"
                value={variationForm.perLimit}
                onChange={handleVariationFormChange}
                className="w-full p-2 border border-neutral-300 rounded-lg"
                placeholder="Enter a Variation Per Order Limit"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Variation Daily Limit
              </label>
              <input
                type="number"
                name="dailyLimit"
                value={variationForm.dailyLimit}
                onChange={handleVariationFormChange}
                className="w-full p-2 border border-neutral-300 rounded-lg"
                placeholder="Enter a variation daily limit"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Variation Status
              </label>
              <select
                name="status"
                value={variationForm.status}
                onChange={handleVariationFormChange}
                className="w-full p-2 border border-neutral-300 rounded-lg"
              >
                <option value="true">Active</option>
                <option value="false">Inactive</option>
                <option value="pending">Pending</option>

              </select>
            </div>
           
           
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowAddVariationModal(false)}
                className="px-4 py-2 bg-white border border-neutral-300 text-neutral-700 rounded-full hover:bg-neutral-50 transition-colors text-sm font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveVariation}
                className="px-4 py-2 bg-primary-600 text-white rounded-full hover:bg-primary-700 transition-colors text-sm font-medium"
              >
                {editingVariationId ? 'Update' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}

        
          <div className="section-header">
            <span className="section-title">Dish Media</span>
            <div className="flex-1 border-b border-gray-100 ml-4"></div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-neutral-700 mb-1">
            Dish Display Picture
            </label>
            <input
              type="file"
              accept="image/*"
              className="w-full p-2 border border-neutral-300 rounded-lg"
              onChange={e => {
                const file = e.target.files[0];
                setThumbnailImage(file || null);
              }}
            />
            {thumbnailImage && (
              <div className="mt-4 relative inline-block" style={{ width: '60px', height: '60px' }}>
                <img
                  src={URL.createObjectURL(thumbnailImage)}
                  alt="thumbnail-preview"
                  className="object-cover rounded-lg border border-gray-200 w-full h-full"
                />
                <button
                  type="button"
                  className="absolute -top-2 -right-2 bg-white border border-gray-300 rounded-full p-1 shadow hover:bg-gray-100"
                  style={{ zIndex: 10 }}
                  onClick={() => setThumbnailImage(null)}
                >
                  <XMarkIcon className="h-4 w-4 text-gray-600" />
                </button>
              </div>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-neutral-700 mb-1">
            Other Images
            </label>
            <input
              type="file"
              accept="image/*"
              multiple
              className="w-full p-2 border border-neutral-300 rounded-lg"
              onChange={e => {
                const newFiles = Array.from(e.target.files);
                setSelectedImages(prev => {
                  // Combine previous and new files, filter duplicates by name+size, and limit to 10
                  const combined = [...prev, ...newFiles];
                  const unique = combined.filter((file, idx, arr) =>
                    arr.findIndex(f => f.name === file.name && f.size === file.size) === idx
                  );
                  return unique.slice(0, 10);
                });
              }}
            />
            {selectedImages.length > 0 && (
              <div className="mt-4">
                <div className="font-medium text-sm mb-2">Preview</div>
                <div className="flex flex-wrap gap-4">
                  {selectedImages.map((file, idx) => (
                    <div key={idx} className="relative group">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`preview-${idx}`}
                        className="object-cover rounded-lg border border-gray-200"
                        style={{ height: '60px', width: '60px' }}
                      />
                      <button
                        type="button"
                        className="absolute -top-2 -right-2 bg-white border border-gray-300 rounded-full p-1 shadow group-hover:opacity-100 opacity-80 transition"
                        onClick={() => {
                          setSelectedImages(prev => prev.filter((_, i) => i !== idx));
                        }}
                      >
                        <XMarkIcon className="h-4 w-4 text-gray-600" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Dish Videos Section */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Dish Videos
            </label>
            <input
              type="file"
              accept="video/*"
              multiple
              className="w-full p-2 border border-neutral-300 rounded-lg"
              onChange={e => {
                const newFiles = Array.from(e.target.files);
                setSelectedVideos(prev => {
                  // Combine previous and new files, filter duplicates by name+size, and limit to 5
                  const combined = [...prev, ...newFiles];
                  const unique = combined.filter((file, idx, arr) =>
                    arr.findIndex(f => f.name === file.name && f.size === file.size) === idx
                  );
                  return unique.slice(0, 5);
                });
              }}
            />
            {selectedVideos.length > 0 && (
              <div className="mt-4">
                <div className="font-medium text-sm mb-2">Video Preview</div>
                <div className="flex flex-wrap gap-4">
                  {selectedVideos.map((file, idx) => (
                    <div key={idx} className="relative group">
                      <video
                        src={URL.createObjectURL(file)}
                        className="object-cover rounded-lg border border-gray-200"
                        style={{ height: '80px', width: '120px' }}
                        controls={false}
                        muted
                      />
                      <div className="absolute bottom-1 left-1 bg-black bg-opacity-60 text-white text-xs px-1 rounded">
                        Video
                      </div>
                      <button
                        type="button"
                        className="absolute -top-2 -right-2 bg-white border border-gray-300 rounded-full p-1 shadow group-hover:opacity-100 opacity-80 transition"
                        onClick={() => {
                          setSelectedVideos(prev => prev.filter((_, i) => i !== idx));
                        }}
                      >
                        <XMarkIcon className="h-4 w-4 text-gray-600" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Dish Audio Section */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Dish Audio
            </label>
            <input
              type="file"
              accept="audio/*"
              className="w-full p-2 border border-neutral-300 rounded-lg"
              onChange={e => {
                const file = e.target.files[0];
                setSelectedAudio(file);
              }}
            />
            {selectedAudio && (
              <div className="mt-3 flex items-center gap-4">
                <audio controls src={URL.createObjectURL(selectedAudio)} className="h-8" />
                <span className="text-sm text-neutral-700">{selectedAudio.name}</span>
                <button
                  type="button"
                  className="ml-2 bg-white border border-gray-300 rounded-full p-1 shadow hover:bg-gray-100"
                  onClick={() => setSelectedAudio(null)}
                >
                  <XMarkIcon className="h-4 w-4 text-gray-600" />
                </button>
              </div>
            )}
          </div>
          <div className="section-header mt-8">
            <span className="section-title">Dish Management</span>
            <div className="flex-1 border-b border-gray-100 ml-4"></div>
          </div>
          
          {/* Replace the Dish Availability section with a table-like UI */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Dish Availability
            </label>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider border-b">Day</th>
                    <th className="px-4 py-2 text-center text-xs font-medium text-neutral-500 uppercase tracking-wider border-b">Breakfast</th>
                    <th className="px-4 py-2 text-center text-xs font-medium text-neutral-500 uppercase tracking-wider border-b">Lunch</th>
                    <th className="px-4 py-2 text-center text-xs font-medium text-neutral-500 uppercase tracking-wider border-b">Dinner</th>
                  </tr>
                </thead>
                <tbody>
                  {daysOfWeek.map(day => {
                    const dayEnabled = availability[day].length > 0;
                    return (
                      <tr key={day} className="even:bg-white odd:bg-gray-50">
                        <td className="px-4 py-2 font-medium text-neutral-800 border-b flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={dayEnabled}
                            onChange={e => {
                              setAvailability(prev => ({
                                ...prev,
                                [day]: e.target.checked ? ["Breakfast", "Lunch", "Dinner"] : [],
                              }));
                            }}
                          />
                          <span>{day}</span>
                        </td>
                        {timeSlots.map(slot => (
                          <td key={slot} className="px-4 py-2 text-center border-b">
                            <input
                              type="checkbox"
                              checked={availability[day].includes(slot)}
                              onChange={e => {
                                setAvailability(prev => {
                                  const alreadyEnabled = prev[day].length > 0;
                                  let newSlots;
                                  if (e.target.checked) {
                                    newSlots = [...prev[day], slot].filter((v, i, a) => a.indexOf(v) === i);
                                  } else {
                                    newSlots = prev[day].filter(s => s !== slot);
                                  }
                                  return {
                                    ...prev,
                                    [day]: newSlots,
                                  };
                                });
                              }}
                              // Allow checking a slot even if day is not enabled, and auto-enable the day
                              disabled={false}
                            />
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
         {/* Daily order limit toggle */}
         
         <div className="mb-4 flex items-center justify-between">
            <span className="text-sm font-medium text-neutral-800">
              Want to set a daily order limit for this dish?
            </span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={enableDailyOrderLimit}
                onChange={e => setEnableDailyOrderLimit(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary-500 rounded-full peer peer-checked:bg-primary-600 transition-colors"></div>
              <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full shadow transform transition-transform peer-checked:translate-x-5"></div>
            </label>
          </div>
          {enableDailyOrderLimit && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Daily Order Limit
              </label>
              <input
                type="number"
                min="1"
                className="w-full p-2 border border-neutral-300 rounded-lg"
                placeholder="Enter daily order limit"
                value={dailyOrderLimit}
                onChange={e => setDailyOrderLimit(e.target.value)}
              />
            </div>
          )}
          <div className="flex justify-end space-x-3 mt-8">
            <button
              onClick={handleCancel}
              className="px-4 py-2 bg-white border border-neutral-300 text-neutral-700 rounded-full hover:bg-neutral-50 transition-colors text-sm font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-primary-600 text-white rounded-full hover:bg-primary-700 transition-colors text-sm font-medium"
            >
              Add Dish
            </button>
          </div>
        </div>

        {/* Dish Names Modal for Catering Package */}
        {showDishNamesModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-lg max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-neutral-900">
                  Add Catering Dish Items
                </h3>
                <button
                  onClick={() => setShowDishNamesModal(false)}
                  className="text-neutral-500 hover:text-neutral-700"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </div>
              
              {/* Input Fields */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Catering Dish Item
                </label>
                <input
                  type="text"
                  value={dishItemInput}
                  onChange={(e) => setDishItemInput(e.target.value)}
                  className="w-full p-2 border border-neutral-300 rounded-lg"
                  placeholder="Enter catering dish item"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Description
                </label>
                <textarea
                  value={dishDescriptionInput}
                  onChange={(e) => setDishDescriptionInput(e.target.value)}
                  className="w-full p-2 border border-neutral-300 rounded-lg"
                  placeholder="Enter description"
                  rows={3}
                />
              </div>

              {/* Add Button */}
              <div className="mb-6">
                <button
                  onClick={handleAddDishItem}
                  disabled={!dishItemInput.trim()}
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Add Item
                </button>
              </div>

              {/* Table displaying added items */}
              {selectedVariationId && variationDishNames[selectedVariationId] && variationDishNames[selectedVariationId].length > 0 && (
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-neutral-700 mb-3">Added Items</h4>
                  <div className="overflow-x-auto">
                    <table className="min-w-full border border-gray-200 rounded-lg">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-2 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider border-b">Item Name</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider border-b">Description</th>
                          <th className="px-4 py-2 text-center text-xs font-medium text-neutral-500 uppercase tracking-wider border-b">Status</th>
                          <th className="px-4 py-2 text-center text-xs font-medium text-neutral-500 uppercase tracking-wider border-b">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {variationDishNames[selectedVariationId].map((dish, index) => (
                          <tr key={dish.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                            <td className="px-4 py-2 text-sm text-neutral-900 border-b">{dish.name}</td>
                            <td className="px-4 py-2 text-sm text-neutral-600 border-b">{dish.description || '-'}</td>
                            <td className="px-4 py-2 text-center border-b">
                              <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={dish.status}
                                  onChange={() => handleToggleDishStatus(selectedVariationId, dish.id)}
                                  className="sr-only peer"
                                />
                                <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary-500 rounded-full peer peer-checked:bg-primary-600 transition-colors"></div>
                                <div className="absolute left-0.5 top-0.5 bg-white w-4 h-4 rounded-full shadow transform transition-transform peer-checked:translate-x-4"></div>
                              </label>
                            </td>
                            <td className="px-4 py-2 text-center border-b">
                              <div className="flex items-center justify-center gap-2">
                                <button
                                  onClick={() => handleEditDishItem(dish)}
                                  className="text-blue-600 hover:text-blue-800 transition-colors"
                                  title="Edit item"
                                >
                                  <PencilIcon className="h-4 w-4" />
                                </button>
                                <button
                                  onClick={() => handleRemoveDishName(selectedVariationId, dish.id)}
                                  className="text-red-600 hover:text-red-800 transition-colors"
                                  title="Remove item"
                                >
                                  <XMarkIcon className="h-4 w-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
              
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowDishNamesModal(false)}
                  className="px-4 py-2 bg-white border border-neutral-300 text-neutral-700 rounded-full hover:bg-neutral-50 transition-colors text-sm font-medium"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Confirmation Modal for Status Update and Delete */}
        <ConfirmationModal
          isOpen={showConfirmationModal}
          title={confirmationAction === 'status' ? 'Confirm Status Change' : 'Confirm Delete'}
          message={
            confirmationAction === 'status' 
              ? `Are you sure you want to ${pendingAction?.newStatus ? 'activate' : 'deactivate'} "${pendingAction?.dishName}"?`
              : `Are you sure you want to delete "${pendingAction?.dishName || pendingAction?.variationName}"?`
          }
          comment={confirmationComment}
          onCommentChange={setConfirmationComment}
          onConfirm={confirmationAction === 'status' ? handleConfirmStatusChange : handleConfirmDelete}
          onCancel={handleCancelConfirmation}
          confirmButtonText={confirmationAction === 'status' ? 'Confirm Change' : 'Confirm Delete'}
          confirmButtonColor="primary"
        />

        {/* Confirmation Modal for Add Item */}
        <ConfirmationModal
          isOpen={showAddItemConfirmation}
          title="Confirm Add Item"
          message={`Are you sure you want to add "${pendingAddItem?.name}" to the catering package?`}
          comment={addItemComment}
          onCommentChange={setAddItemComment}
          onConfirm={handleConfirmAddItem}
          onCancel={handleCancelAddItem}
          confirmButtonText="Add Item"
          confirmButtonColor="primary"
        />

        {/* Confirmation Modal for Variation Save/Update */}
        <ConfirmationModal
          isOpen={showVariationSaveConfirmation}
          title={editingVariationId ? "Confirm Update Variation" : "Confirm Save Variation"}
          message={editingVariationId 
            ? `Are you sure you want to update the variation "${pendingVariationSave?.name}"?`
            : `Are you sure you want to save the new variation "${pendingVariationSave?.name}"?`
          }
          comment={variationSaveComment}
          onCommentChange={setVariationSaveComment}
          onConfirm={handleConfirmVariationSave}
          onCancel={handleCancelVariationSave}
          confirmButtonText={editingVariationId ? "Update Variation" : "Save Variation"}
          confirmButtonColor="primary"
        />
      </div>
   
  )
}

export default AddEditDish
import React,{useState} from 'react'
import { XMarkIcon, PencilIcon, EyeIcon,PlusIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useParams, useNavigate } from 'react-router-dom';
import PermissionButton from '../../../../components/PermissionButton';
import {currency} from '../../../../data/Currency/currency'
const AddEditDish = () => {
  const { id: kitchenId } = useParams();
  const navigate = useNavigate();
  console.log(currency)
  // Customization toggle state
  const [allowCustomizations, setAllowCustomizations] = useState(false);
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
  const handleSaveVariation = () => {
    if (variationForm.name && variationForm.unit && variationForm.price) {
      setVariations(prev => [...prev, { ...variationForm, id: Date.now() }]);
      setShowAddVariationModal(false);
    }
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
          <div className="mb-4">
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Dish Name
            </label>
            <input
              type="text"
              className="w-full p-2 border border-neutral-300 rounded-lg"
              placeholder="Enter a dish name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Tag Line
            </label>
            <input
              type="text"
              className="w-full p-2 border border-neutral-300 rounded-lg"
              placeholder="Enter a tag line"
            />
          </div>
         
          <div className="mb-4">
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Dish Preparation Time
            </label>
            <input
              type="number"
              className="w-full p-2 border border-neutral-300 rounded-lg"
              placeholder="Enter a dish preparation time in minutes"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Dish Preparation Type
            </label>
            <select className="w-full p-2 border border-neutral-300 rounded-lg"
             value={preparationType}
             onChange={(e) => setPreparationType(e.target.value)}
             >
              <option value="made_only_after_order">Made Only After Order</option>
              <option value="ready_during_the_day">Ready During the Day</option>
              <option value="for_special_day">For a Special Day Only</option>
              <option value="catering_package">Catering Package</option>
            </select>
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
          <div className="mb-4">
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Description
            </label>
            <textarea
              className="w-full p-2 border border-neutral-300 rounded-lg"
              placeholder="Enter a description"
              rows={3}
            />
          </div>
          {/* Customization toggle */}
          <div className="mb-4 flex items-center justify-between">
            <span className="text-sm font-medium text-neutral-800">
              Would you like to allow customers to request customizations for this dish?
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
        <div key={variation.id} className="bg-gray-50 rounded-lg p-4 flex items-center justify-between">
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
          <div className="text-right">
            <div className="font-medium text-neutral-900">
              PKR {variation.price}
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
)}

{showAddVariationModal && (
        <div className="fixed inset-0  bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white h-[90vh] overflow-y-auto  rounded-xl shadow-lg max-w-md w-full p-6">
            <div className="flex  justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-neutral-900">
                Add Variation
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
                Save
              </button>
            </div>
          </div>
        </div>
      )}

        
          <div className="section-header">
            <span className="section-title">Dish Image Upload</span>
            <div className="flex-1 border-b border-gray-100 ml-4"></div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Dish Thumbnail
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
            Dish Image
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
          <div className="section-header mt-8">
            <span className="section-title">Dish Audio</span>
            <div className="flex-1 border-b border-gray-100 ml-4"></div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Upload Dish Audio 
            </label>
            <input
              type="file"
              accept="audio/mp3"
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
      </div>
   
  )
}

export default AddEditDish
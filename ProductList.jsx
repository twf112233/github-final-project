import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';
import './ProductList.css';

function ProductList() {
  const [showCart, setShowCart] = useState(false);
  const [addedNodes, setAddedNodes] = useState({});
  const dispatch = useDispatch();

  // جلب العناصر الموجودة في السلة لحساب العدد الكلي
  const cartItems = useSelector(state => state.cart.items);
  const totalCartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  // قائمة النباتات مصنفة حسب الفئات
  const plantsArray = [
    {
      category: "Air Purifying Plants",
      plants: [
        {
          name: "Snake Plant",
          image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg",
          description: "Produces oxygen at night, improving air quality.",
          cost: "$15"
        },
        {
          name: "Spider Plant",
          image: "https://cdn.pixabay.com/photo/2018/07/05/22/11/plant-3519343_1280.jpg",
          description: "Filters formaldehyde and xylene from the air.",
          cost: "$12"
        },
        {
          name: "Peace Lily",
          image: "https://cdn.pixabay.com/photo/2019/06/12/14/14/peace-lilies-4269365_1280.jpg",
          description: "Removes harmful mold spores and purifies surroundings.",
          cost: "$18"
        }
      ]
    },
    {
      category: "Aromatic & Fragrant Plants",
      plants: [
        {
          name: "Lavender",
          image: "https://images.unsplash.com/photo-1528722828814-77b9b83aafb2?auto=format&fit=crop&w=600&q=80",
          description: "Calming aroma that promotes relaxation and better sleep.",
          cost: "$20"
        },
        {
          name: "Jasmine",
          image: "https://images.unsplash.com/photo-1592729961255-cc3a44635533?auto=format&fit=crop&w=600&q=80",
          description: "Sweet fragrance that creates a refreshing natural ambiance.",
          cost: "$22"
        },
        {
          name: "Rosemary",
          image: "https://images.unsplash.com/photo-1515586000433-45406d8e6662?auto=format&fit=crop&w=600&q=80",
          description: "Invigorating herbal scent and excellent for culinary use.",
          cost: "$14"
        }
      ]
    },
    {
      category: "Low Maintenance Plants",
      plants: [
        {
          name: "Aloe Vera",
          image: "https://cdn.pixabay.com/photo/2018/04/02/07/42/leaf-3283175_1280.jpg",
          description: "Drought-tolerant succulent with numerous medicinal uses.",
          cost: "$10"
        },
        {
          name: "ZZ Plant",
          image: "https://images.unsplash.com/photo-1632207691143-643e2a9a9361?auto=format&fit=crop&w=600&q=80",
          description: "Thrives in low light conditions and requires minimal water.",
          cost: "$25"
        }
      ]
    }
  ];

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
    setAddedNodes((prevState) => ({
      ...prevState,
      [plant.name]: true,
    }));
  };

  const handleCartClick = (e) => {
    e.preventDefault();
    setShowCart(true);
  };

  const handlePlantsClick = (e) => {
    e.preventDefault();
    setShowCart(false);
  };

  const handleContinueShopping = (e) => {
    e.preventDefault();
    setShowCart(false);
  };

  return (
    <div>
      {/* شريط الملاحة Navbar */}
      <nav className="navbar" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#4CAF50',
        color: '#fff',
        padding: '10px 25px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }} onClick={handlePlantsClick}>
          <h3 style={{ margin: 0 }}>Paradise Nursery</h3>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <button 
            onClick={handlePlantsClick} 
            style={{ background: 'none', border: 'none', color: '#fff', fontSize: '18px', cursor: 'pointer' }}
          >
            Plants
          </button>
          
          <button 
            onClick={handleCartClick} 
            style={{ background: 'none', border: 'none', color: '#fff', fontSize: '18px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
          >
            🛒 Cart ({totalCartCount})
          </button>
        </div>
      </nav>

      {/* التبديل بين صفحة المنتجات وصفحة السلة */}
      {!showCart ? (
        <div className="product-grid" style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
          {plantsArray.map((categoryGroup, index) => (
            <div key={index} style={{ marginBottom: '40px' }}>
              <h2 style={{ textAlign: 'center', borderBottom: '2px solid #4CAF50', paddingBottom: '10px' }}>
                {categoryGroup.category}
              </h2>
              
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center', marginTop: '20px' }}>
                {categoryGroup.plants.map((plant, pIndex) => (
                  <div 
                    key={pIndex} 
                    style={{
                      border: '1px solid #ddd',
                      borderRadius: '8px',
                      padding: '15px',
                      width: '260px',
                      textAlign: 'center',
                      boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
                    }}
                  >
                    <img 
                      src={plant.image} 
                      alt={plant.name} 
                      style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '4px' }} 
                    />
                    <h3 style={{ margin: '10px 0 5px' }}>{plant.name}</h3>
                    <p style={{ fontSize: '13px', color: '#666', minHeight: '36px' }}>{plant.description}</p>
                    <p style={{ fontWeight: 'bold', fontSize: '18px', margin: '8px 0' }}>{plant.cost}</p>
                    
                    <button
                      onClick={() => handleAddToCart(plant)}
                      disabled={addedNodes[plant.name] || cartItems.some(item => item.name === plant.name)}
                      style={{
                        padding: '8px 16px',
                        backgroundColor: (addedNodes[plant.name] || cartItems.some(item => item.name === plant.name)) ? '#9E9E9E' : '#4CAF50',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: (addedNodes[plant.name] || cartItems.some(item => item.name === plant.name)) ? 'not-allowed' : 'pointer'
                      }}
                    >
                      {(addedNodes[plant.name] || cartItems.some(item => item.name === plant.name)) ? 'Added to Cart' : 'Add to Cart'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <CartItem onContinueShopping={handleContinueShopping} />
      )}
    </div>
  );
}

export default ProductList;

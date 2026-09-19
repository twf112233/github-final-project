import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // حساب التكلفة الإجمالية لجميع المنتجات في السلة
  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => {
      const cost = parseFloat(item.cost.replace('$', '')) || 0;
      return total + cost * item.quantity;
    }, 0).toFixed(2);
  };

  // العودة إلى قائمة المنتجات
  const handleContinueShopping = (e) => {
    if (onContinueShopping) {
      onContinueShopping(e);
    }
  };

  // رسالة عند الضغط على Checkout
  const handleCheckoutShopping = () => {
    alert('Functionality to be added for future reference');
  };

  // زيادة كمية المنتج بمقدار 1
  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  // تقليل الكمية بمقدار 1 أو حذف العنصر إذا أصبحت الكمية 0
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  // حذف العنصر من السلة نهائياً
  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  // حساب التكلفة الإجمالية لعنصر محدد (السعر × الكمية)
  const calculateTotalCost = (item) => {
    const cost = parseFloat(item.cost.replace('$', '')) || 0;
    return (cost * item.quantity).toFixed(2);
  };

  return (
    <div className="cart-container" style={{ padding: '20px', maxWidth: '900px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center', color: '#333' }}>
        Total Cart Amount: ${calculateTotalAmount()}
      </h2>

      <div>
        {cart.length === 0 ? (
          <p style={{ textAlign: 'center', fontSize: '18px', margin: '40px 0' }}>
            Your cart is empty!
          </p>
        ) : (
          cart.map((item) => (
            <div 
              className="cart-item" 
              key={item.name} 
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '1px solid #ddd',
                padding: '15px 0'
              }}
            >
              <img 
                className="cart-item-image" 
                src={item.image} 
                alt={item.name} 
                style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: '8px' }} 
              />
              
              <div className="cart-item-details" style={{ flex: '1', marginLeft: '20px' }}>
                <div className="cart-item-name" style={{ fontSize: '18px', fontWeight: 'bold' }}>{item.name}</div>
                <div className="cart-item-cost" style={{ color: '#555', margin: '5px 0' }}>Unit Price: {item.cost}</div>
                
                <div className="cart-item-quantity" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '10px' }}>
                  <button 
                    className="cart-item-button" 
                    onClick={() => handleDecrement(item)}
                    style={{ padding: '4px 10px', cursor: 'pointer', fontWeight: 'bold' }}
                  >
                    -
                  </button>
                  <span className="cart-item-quantity-value">{item.quantity}</span>
                  <button 
                    className="cart-item-button" 
                    onClick={() => handleIncrement(item)}
                    style={{ padding: '4px 10px', cursor: 'pointer', fontWeight: 'bold' }}
                  >
                    +
                  </button>
                </div>

                <div className="cart-item-total" style={{ fontWeight: 'bold', marginTop: '10px' }}>
                  Subtotal: ${calculateTotalCost(item)}
                </div>
              </div>

              <button 
                className="cart-item-delete" 
                onClick={() => handleRemove(item)}
                style={{
                  backgroundColor: '#e53935',
                  color: '#fff',
                  border: 'none',
                  padding: '8px 14px',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>

      <div style={{ marginTop: '30px', display: 'flex', justifyContent: 'center', gap: '20px' }}>
        <button 
          onClick={handleContinueShopping}
          style={{
            backgroundColor: '#4CAF50',
            color: '#fff',
            border: 'none',
            padding: '10px 20px',
            fontSize: '16px',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Continue Shopping
        </button>
        <button 
          onClick={handleCheckoutShopping}
          style={{
            backgroundColor: '#2196F3',
            color: '#fff',
            border: 'none',
            padding: '10px 20px',
            fontSize: '16px',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartItem;

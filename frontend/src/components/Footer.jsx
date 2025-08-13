import React from 'react';

export default function Footer() {
  return (
    <footer style={{
      width: '100%',
      background: '#f5f5f5',
      color: '#888',
      textAlign: 'center',
      padding: '18px 0 12px 0',
      position: 'fixed',
      left: 0,
      bottom: 0,
      zIndex: 1000,
      fontSize: 15,
      borderTop: '1px solid #e0e0e0'
    }}>
      <span>© 2025 CityCare Hospital. All rights reserved. | Hospital License #HMS-2025-XYZ | Powered by HealthTech Solutions</span>
    </footer>
  );
}

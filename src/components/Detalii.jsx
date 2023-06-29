import React from 'react';

function PhoneDetails({ phone }) {
  return (
    <div>
      <h2>{phone.brand}</h2>
      <p>Operating System: {phone.operatingSystem}</p>
      {/* Afisați și alte informații despre telefon */}
    </div>
  );
}

export default PhoneDetails;

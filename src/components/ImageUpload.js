// import React from 'react';

// export default function ImageUpload() {
//   const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
//   return (
//     <div className="image-upload-container">
//       <h2>Upload an Image for Analysis</h2>
//       <form className="image-upload-form">
//         <input type="file" accept="image/*" disabled={!isLoggedIn} />
//         <button className="cta-btn" type="button" disabled={!isLoggedIn}>
//           Analyze
//         </button>
//       </form>
//       {!isLoggedIn && (
//         <p className="image-upload-info">Please login or sign up to analyze your image.</p>
//       )}
//     </div>
//   );
// }



import React, { useState } from 'react';

export default function ImageUpload() {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setResult(null);
    setError('');
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select an image.');
      return;
    }
    setLoading(true);
    setError('');
    setResult(null);

    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await fetch('http://localhost:5000/api/segment', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      setError('Upload failed.');
    }
    setLoading(false);
  };

  return (
    <div className="image-upload-container">
      <h2>Upload an Image for Analysis</h2>
      <form className="image-upload-form" onSubmit={e => e.preventDefault()}>
        <input type="file" accept="image/*" disabled={!isLoggedIn} onChange={handleFileChange} />
        <button className="cta-btn" type="button" disabled={!isLoggedIn || loading} onClick={handleUpload}>
          {loading ? 'Analyzing...' : 'Analyze'}
        </button>
      </form>
      {!isLoggedIn && (
        <p className="image-upload-info">Please login or sign up to analyze your image.</p>
      )}
      {error && <div className="flash-message">{error}</div>}
      {result && (
        <div className="result-section">
          <h3>Segmentation Results</h3>
          <img src={`http://localhost:5000${result.maskUrl}`} alt="Segmentation Mask" style={{ maxWidth: '100%', margin: '1rem 0' }} />
          <ul>
            <li>Dice Similarity Index: {result.metrics.dice}</li>
            <li>Jaccard Index: {result.metrics.jaccard}</li>
            <li>Accuracy: {result.metrics.accuracy}</li>
            <li>Sensitivity: {result.metrics.sensitivity}</li>
            <li>Specificity: {result.metrics.specificity}</li>
          </ul>
        </div>
      )}
    </div>
  );
}
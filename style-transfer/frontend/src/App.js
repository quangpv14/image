import React, { useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [loading, setLoading] = useState(false); // Trạng thái đang tải loading
  const [contentImage, setContentImage] = useState(null); // Ảnh content
  const [styleImage, setStyleImage] = useState(null); // Ảnh style
  const [contentImagePreview, setContentImagePreview] = useState(null);  //// State để lưu ảnh content
  const [styleImagePreview, setStyleImagePreview] = useState(null);  //// State để lưu ảnh style

  const [processedImage, setProcessedImage] = useState(null); // State để lưu ảnh đã xử lý

  const handleFileContentChange = (e) => {
    const file = e.target.files[0]; // Lấy file từ input
    setContentImage(file);          // Lưu content-image

    // Tạo URL từ file để hiển thị ảnh preview
    const imageUrl = URL.createObjectURL(e.target.files[0]);
    setContentImagePreview(imageUrl);
  };

  const handleFileStyleChange = (e) => {
    const file = e.target.files[0]; // Lấy file từ input
    setStyleImage(file);            // Lưu style-image

    // Tạo URL từ file để hiển thị ảnh preview
    const imageUrl = URL.createObjectURL(e.target.files[0]);
    setStyleImagePreview(imageUrl);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!contentImage && !styleImage) {
      alert('Please upload both content and style images!');
      return;
    }

    const formData = new FormData();
    formData.append('content_image', contentImage); // Append content_image vào FormData
    formData.append('style_image', styleImage);     // Append style_image vào FormData
    setLoading(true); // Bắt đầu quá trình tải và hiển thị overlay
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/process-image/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data' //cho phép gửi nhiều file trong một yêu cầu.
        },
        responseType: 'blob' // Nhận dữ liệu ảnh đã xử lý dưới dạng blob( nhị phân)
      });

      // Tạo một URL từ blob để hiển thị ảnh đã xử lý
      const imageUrl = URL.createObjectURL(response.data);
      setProcessedImage(imageUrl); // Cập nhật ảnh đã xử lý vào state
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      // Kết thúc quá trình tải và ẩn overlay
      setLoading(false);
    }
  };

  return (
    <div className="App">
      {loading && <div className="overlay"><span className='loading'>Loading...</span></div>}
      <header class="header">
        <div class="header-left">
          <div class="header-text">
            <div>
              <h2>ĐẠI HỌC BÁCH KHOA HÀ NỘI</h2>
            </div>
            <hr></hr>
            <div>
              <div>KHOA TOÁN_TIN</div>
            </div>

          </div>
        </div>
        <div class="header-right">
          <div className='panel'>
            <div className="item-search">
              <input type="text" placeholder="Tìm kiếm..." className="search-input" />
            </div>
            <div className='panel-icon'>
              <div className="info-icon">
                <span>i</span>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className='nav-default'>
        <div className='title'>Style Transfer Image</div>
      </div>

      <div className='container'>
        <div className='content'>
          <div class='area-upload'>
            <div className='input-image'>
              <div className='content-img'>
                {/* Hiển thị ảnh xem trước */}
                <div className='title-img'>Content Image Preview</div>
                {contentImagePreview ? (
                  <div>
                    <img src={contentImagePreview} alt="Content Preview" style={{ maxWidth: '300px', height: '250px' }} />
                  </div>
                ) : (
                  <div className='choose-image'>
                    <i className="fas fa-upload icon-upload"></i>
                    <span style={{ color: '#aaa' }}>Choose content image</span>
                  </div>
                )}
              </div>

              <div className='style-img'>
                <div className='title-img'>Style Image Preview</div>
                {styleImagePreview ? (
                  <div>
                    <img src={styleImagePreview} alt="Style Preview" style={{ maxWidth: '300px', height: '250px' }} />
                  </div>
                ) : (
                  <div className='choose-image'>
                    <i className="fas fa-upload icon-upload"></i>
                    <span style={{ color: '#aaa' }}>Choose style image</span>
                  </div>
                )}
              </div>
              <div className='function'></div>
            </div>

            <div className='button-upload'>
              {/* Form để upload ảnh */}
              <form onSubmit={handleSubmit} style={{
                display: 'flex',
                width: '100%'
              }}>
                <div className='btn-upload'>
                  <input className='input-file' type="file" onChange={handleFileContentChange} accept="image/*" />
                </div>
                <div className='btn-upload'>
                  <input className='input-file' type="file" onChange={handleFileStyleChange} accept="image/*" />
                </div>
                <div className='function'>
                  <button type="submit">Upload</button>
                </div>
              </form>
            </div>
          </div>

          <div className='area-result'>
            {/* Hiển thị ảnh đã xử lý */}
            {processedImage && (
              <div>
                <div className='title-img'>Processed Image:</div>
                <img src={processedImage} alt="Processed" style={{ maxWidth: '300px', height: '250px' }} />
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;

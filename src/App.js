import React from 'react';
import './styles/app.css';
import FormModal from './components/FormModal';
import ImageGrid from './components/ImageGrid';
import Header from './components/Header';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="app-container">
      <Header />
      <FormModal />
      <ImageGrid />
      <Footer />
    </div>
  );
}
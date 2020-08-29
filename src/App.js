import React from 'react';
import './styles/app.css';
import FormModal from './components/FormModal';
import ImageGrid from './components/ImageGrid';
import Header from './components/Header';

export default function App() {
  return (
    <div className="app-container">
      <Header />
      <FormModal />
      <ImageGrid />
    </div>
  );
}
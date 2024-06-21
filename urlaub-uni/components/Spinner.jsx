// components/Spinner.js
import React from 'react';

const Spinner = () => (
  <div className="spinner">
    <style jsx>{`
      .spinner {
        display: inline-block;
        width: 80px;
        height: 80px;
      }
      .spinner::after {
        content: " ";
        display: block;
        width: 64px;
        height: 64px;
        margin: 8px;
        border-radius: 50%;
        border: 6px solid #000;
        border-color: #000 transparent #000 transparent;
        animation: spinner 1.2s linear infinite;
      }
      @keyframes spinner {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
    `}</style>
  </div>
);

export default Spinner;
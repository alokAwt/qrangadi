'use client'
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import QR from '../../public/QR.png';
import Apple from '../../public/Stick/Logo.png';
import Heart from '../../public/Stick/Whatsapp.png';
import Kiwi from '../../public/Stick/Facebook.png';
import Sunflower from '../../public/Stick/Instagram.png';
import Snapchat from '../../public/Stick/Snapchat.png';

const QRsticker = () => {
  const images = [Apple, Heart, Kiwi, Snapchat, Sunflower];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000); 

    return () => clearInterval(interval);
  }, []);

  return (
    <div className=''>
      <div className='flex justify-center items-start relative '>
        <Image className='md:w-[32rem] w-[32rem] h-[24rem] md:h-[32rem]' src={QR} alt="QR Code" />
        <AnimatePresence>
          {images.map((image, index) => (
            index === currentIndex && (
              <motion.div
                key={index}
                className="absolute md:top-48 top-32 md:h-24 md:w-24 h-24 w-24"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Image src={image} alt={`Image ${index}`} />
              </motion.div>
            )
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default QRsticker;

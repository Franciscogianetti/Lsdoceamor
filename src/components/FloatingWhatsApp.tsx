import React from 'react';
import { MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';

interface FloatingWhatsAppProps {
  number: string;
}

const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({ number }) => {
  const whatsappUrl = `https://wa.me/${number.replace(/\D/g, '') || '5511988789335'}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-24 right-6 z-40 bg-[#25D366] text-white p-4 rounded-full shadow-2xl shadow-green-500/30 flex items-center justify-center border-4 border-white dark:border-slate-900 transition-all cursor-pointer"
    >
      <MessageCircle className="w-8 h-8 fill-white/10" />
      <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white dark:border-slate-900 animate-pulse" />
    </motion.a>
  );
};

export default FloatingWhatsApp;

import React from 'react';
import { MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { supabase } from '../lib/supabase';

interface FloatingWhatsAppProps {
  number: string;
}

const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({ number }) => {
  const phone = (() => {
    const clean = (number || '').replace(/\D/g, '');
    if (!clean || clean.length < 10) return '5511988789335';
    const withoutLeadingZero = clean.replace(/^0+/, '');
    if (withoutLeadingZero.startsWith('55')) return withoutLeadingZero;
    return '55' + withoutLeadingZero;
  })();
  const whatsappUrl = `whatsapp://send?phone=${phone}`;

  const handleContact = () => {
    const userName = localStorage.getItem('userName') || 'Cliente';
    
    // Record as a contact entry in the orders table - don't await to not block window navigation
    supabase.from('orders').insert([{
      customer_name: userName,
      items: [{ name: 'Contato Direto (Botão Flutuante)', price: 0, quantity: 1 }],
      total_price: 0,
      whatsapp_link: whatsappUrl,
      status: 'contato'
    }]).then(() => {});
  };

  return (
    <a
      href={whatsappUrl}
      onClick={() => {
        try {
          handleContact();
        } catch (e) {
          console.error('Contact recording error:', e);
        }
        window.location.href = whatsappUrl;
      }}
      className="fixed bottom-24 right-6 z-40 bg-[#25D366] text-white p-4 rounded-full shadow-2xl shadow-green-500/30 flex items-center justify-center border-4 border-white dark:border-slate-900 transition-all cursor-pointer"
    >
      <MessageCircle className="w-8 h-8 fill-white/10" />
      <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white dark:border-slate-900 animate-pulse" />
    </a>
  );
};

export default FloatingWhatsApp;

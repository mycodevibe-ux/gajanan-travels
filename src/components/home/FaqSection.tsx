'use client';

import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface FaqItem {
  question: string;
  answer: string;
}

export const FaqSection: React.FC = () => {
  const { language, t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqsEn: FaqItem[] = [
    {
      question: 'How much advance payment is required?',
      answer: 'Most bookings need a 20% advance to confirm the vehicle; the rest is paid at the end of the trip.',
    },
    {
      question: 'What is your cancellation policy?',
      answer: 'Zero cancellation charges if cancelled up to 6 hours before pickup time. Hassle-free refunds guaranteed.',
    },
    {
      question: 'Do you offer self-drive vehicles?',
      answer: 'No, all our vehicles come with licensed, background-verified, and polite commercial chauffeurs for your safety and comfort.',
    },
    {
      question: 'Are toll and parking charges included?',
      answer: 'No, Toll, Parking, and State Border Taxes are not included in the cab tariff. They are paid separately as per actual receipts during the journey.',
    },
  ];

  const faqsMr: FaqItem[] = [
    {
      question: 'बुकिंगसाठी किती अ‍ॅडव्हान्स रक्कम द्यावी लागते?',
      answer: 'गाडी कन्फर्म करण्यासाठी फक्त २०% अ‍ॅडव्हान्स आवश्यक असतो; उर्वरित रक्कम प्रवास संपल्यावर द्यावी.',
    },
    {
      question: 'कॅन्सलेशन आणि रिफंडचे नियम काय आहेत?',
      answer: 'प्रवासाच्या ६ तास आधीपर्यंत कोणतेही कॅन्सलेशन शुल्क आकारले जात नाही. १००% सुलभ रिफंडची हमी.',
    },
    {
      question: 'तुम्ही सेल्फ-ड्राइव्ह गाड्या देता का?',
      answer: 'नाही, प्रवाशांच्या सुरक्षिततेसाठी आमच्या सर्व गाड्यांसोबत अनुभवी आणि प्रशिक्षित व्यावसायिक चालक असतात.',
    },
    {
      question: 'टोल आणि पार्किंगचे शुल्क समाविष्ट आहे का?',
      answer: 'नाही, टोल, पार्किंग आणि राज्य कर हे मूळ गाडी भाड्यात समाविष्ट नसतात; ते प्रवासादरम्यान प्रत्यक्ष पावतीनुसार स्वतंत्र द्यावे लागतात.',
    },
  ];

  const faqs = language === 'mr' ? faqsMr : faqsEn;

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" style={{
      backgroundColor: '#f0f7fc',
      padding: '75px 0 70px 0',
      borderTop: '1px solid #e2e8f0',
      borderBottom: '1px solid #e2e8f0',
    }}>
      <div className="container-custom" style={{ maxWidth: '800px', margin: '0 auto' }}>
        {/* Section Header matching mockup */}
        <div style={{ textAlign: 'center', marginBottom: '38px' }}>
          <h2 style={{
            fontSize: '2.4rem',
            fontWeight: 'normal',
            color: '#0c2338',
            fontFamily: 'var(--font-heading)',
            marginBottom: '6px',
            letterSpacing: '0.3px',
          }}>
            {t.faq_title}
          </h2>
        </div>

        {/* FAQ Accordion List matching mockup */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '12px',
                  padding: '16px 20px',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 2px 8px rgba(12, 35, 56, 0.03)',
                  transition: 'all 0.2s ease',
                }}
              >
                {/* Question Trigger */}
                <button
                  onClick={() => toggleFaq(index)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: 'transparent',
                    border: 'none',
                    padding: 0,
                    cursor: 'pointer',
                    textAlign: 'left',
                    gap: '16px',
                  }}
                  aria-expanded={isOpen}
                >
                  <span style={{
                    fontSize: '0.98rem',
                    fontWeight: 'normal',
                    color: '#0c2338',
                    fontFamily: 'var(--font-body)',
                  }}>
                    {faq.question}
                  </span>

                  <span style={{
                    color: '#f97316',
                    fontWeight: 'normal',
                    fontSize: '1.2rem',
                    lineHeight: 1,
                  }}>
                    {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                  </span>
                </button>

                {/* Answer Content */}
                {isOpen && (
                  <div style={{
                    paddingTop: '10px',
                    color: '#64748b',
                    fontSize: '0.9rem',
                    lineHeight: 1.6,
                    borderTop: '1px solid #f1f5f9',
                    marginTop: '10px',
                  }}>
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

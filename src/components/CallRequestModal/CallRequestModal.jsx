import { useState, useEffect, useCallback } from 'react';
import styles from './CallRequestModal.module.css';

const TELEGRAM_BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID;

const CallRequestModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [phone, setPhone] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [countdown, setCountdown] = useState(60);

  // Закриття модалки
  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  // Відправка в Telegram
  const handleSend = async () => {
    if (!phone.trim()) return;

    try {
      const res = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: `📞 Нове замовлення дзвінка:\nНомер: ${phone}`,
        }),
      });

      if (res.ok) {
        setIsSent(true);
        setCountdown(60);
      } else {
        alert('Помилка надсилання. Перевірте токен/ID');
      }
    } catch (err) {
      console.error(err);
      alert('Не вдалося надіслати повідомлення');
    }
  };

  // Таймер
  useEffect(() => {
    let timer;
    if (isSent && countdown > 0) {
      timer = setTimeout(() => setCountdown((prev) => prev - 1), 1000);
    }
    if (isSent && countdown === 0) {
      setIsSent(false);
      setPhone('');
      setIsOpen(false); // автоматичне закриття
    }
    return () => clearTimeout(timer);
  }, [isSent, countdown]);

  // Обробка Escape
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') closeModal();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
    }
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, closeModal]);

  // Заборона скролу
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Обробка бекдропу
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) closeModal();
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)} className={styles.btn}>
        Замовити дзвінок
      </button>

      {isOpen && (
        <div className={styles.modal_overlay} onClick={handleOverlayClick}>
          <div className={styles.modal}>
            <button onClick={closeModal} className={styles.close_btn}>×</button>

            {!isSent ? (
              <>
                <h2 className={styles.title}>Введіть номер телефону</h2>
                <input
                  type="tel"
                  placeholder="+380..."
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={styles.phone_input}
                />
                <button onClick={handleSend} className={styles.btn}>
                  Замовити дзвінок
                </button>
              </>
            ) : (
              <div className={styles.success_block}>
                <p className={styles.text}>
                  ✅ Дякуємо! Ми зателефонуємо вам протягом {countdown} сек.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default CallRequestModal;

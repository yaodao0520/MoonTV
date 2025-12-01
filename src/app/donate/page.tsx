
'use client';

import { useEffect } from 'react';

const DonatePage = () => {
  useEffect(() => {
    /**
     * 初始化打赏功能
     */
    function initDonateFeature() {
      // 获取打赏按钮和弹窗元素
      const donateBtn = document.getElementById('donateBtn');
      const donateModal = document.getElementById('donateModal');

      // 点击打赏按钮显示弹窗
      if (donateBtn) {
        donateBtn.addEventListener('click', function(e) {
          e.preventDefault();
          openDonateModal();
        });
      }

      // 点击关闭按钮隐藏弹窗
      const closeBtn = document.getElementById('donateCloseBtn');
      if (closeBtn) {
        closeBtn.addEventListener('click', function() {
          closeDonateModal();
        });
      }

      // 点击弹窗背景关闭弹窗
      if (donateModal) {
        donateModal.addEventListener('click', function(e) {
          if (e.target === donateModal) {
            closeDonateModal();
          }
        });
      }
    }

    /**
     * 打开打赏弹窗
     */
    function openDonateModal() {
      const donateModal = document.getElementById('donateModal');
      if (donateModal) {
        // 确保弹窗可见
        donateModal.style.display = 'flex';
        // 短暂延迟添加动画类，确保display生效
        setTimeout(() => {
          donateModal.classList.remove('hide');
          donateModal.classList.add('show');
          // 阻止背景滚动
          document.body.style.overflow = 'hidden';
        }, 10);
      }
    }

    /**
     * 关闭打赏弹窗
     */
    function closeDonateModal() {
      const donateModal = document.getElementById('donateModal');
      if (donateModal) {
        donateModal.classList.remove('show');
        donateModal.classList.add('hide');
        // 延迟后隐藏弹窗并恢复背景滚动
        setTimeout(() => {
          donateModal.classList.remove('hide');
          donateModal.style.display = 'none';
          document.body.style.overflow = '';
        }, 300);
      }
    }

    initDonateFeature();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-8">打赏作者</h1>
      <button id="donateBtn" className="px-6 py-3 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition-colors duration-300">
        点击打赏
      </button>

      {/* 打赏弹窗 */}
      <div id="donateModal" className="donate-modal hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="donate-container bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg text-center relative">
          <h3 className="donate-title text-2xl font-semibold text-gray-800 dark:text-white mb-4">感谢你赞助我前进的力量</h3>
          <p className="donate-subtitle text-gray-600 dark:text-gray-300 mb-6">因为你们的支持让我感受到了价值 🙏</p>
          <div className="donate-qrcodes flex justify-center space-x-8">
            <div className="donate-qrcode flex flex-col items-center">
              <img src="https://5f4480c.webp.li/2025/04/83427cf17e1bf1874c5e391df35f1c9a.png" alt="微信打赏" className="qrcode-img w-48 h-48 object-contain mb-2" />
              <span className="qrcode-label text-gray-700 dark:text-gray-200 text-lg font-medium">微信</span>
            </div>
            <div className="donate-qrcode flex flex-col items-center">
              <img src="https://5f4480c.webp.li/2025/04/3046cde05fab442e147234ec503ea9ee.png" alt="支付宝打赏" className="qrcode-img w-48 h-48 object-contain mb-2" />
              <span className="qrcode-label text-gray-700 dark:text-gray-200 text-lg font-medium">支付宝</span>
            </div>
          </div>
          <button id="donateCloseBtn" className="donate-close mt-8 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300">
            关闭
          </button>
        </div>
      </div>

      <style jsx>{`
        .donate-modal {
          transition: opacity 0.3s ease-in-out;
          opacity: 0;
          pointer-events: none;
        }
        .donate-modal.show {
          opacity: 1;
          pointer-events: auto;
        }
        .donate-modal.hide {
          opacity: 0;
          pointer-events: none;
        }
        .donate-container {
          transform: translateY(20px);
          transition: transform 0.3s ease-in-out;
        }
        .donate-modal.show .donate-container {
          transform: translateY(0);
        }
      `}</style>
    </div>
  );
};

export default DonatePage;


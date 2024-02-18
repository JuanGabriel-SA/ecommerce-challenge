import { useEffect, useState } from 'react'
import './App.css'
import CartIcon from './components/CartIcon'
import Preview from './components/Preview';
import { PiShoppingCart } from 'react-icons/pi';
import { FaTrashCan } from 'react-icons/fa6';
import { IoMenu } from 'react-icons/io5';
import { AnimatePresence, motion, useAnimate } from 'framer-motion';;
import { GrClose } from 'react-icons/gr';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
function App() {
  const [previewImage, setPreviewImage] = useState<number>(1);
  const [showModalPreview, setShowModalPreview] = useState<boolean>(false);
  const [showCart, setShowCart] = useState<boolean>(false);
  const [itemQnt, setItemQnt] = useState<number>(0);
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [showItemsCart, setShowItemsCart] = useState<boolean>(false);
  const [imageRef, animatePreview] = useAnimate();

  useEffect(() => {
    animatePreview(imageRef.current, {
      opacity: [0, 1]
    });

  }, [previewImage])

  return (

    <div className="home-container md:container mx-auto px-20 h-screen items-center flex flex-col xs:w-screen xs:px-0 xs:w-full xs:-0">
      <Preview visible={showModalPreview} trigger={setShowModalPreview} />

      {/* Responsive home-header */}
      <div className='responsive-home-header xs:flex md:hidden w-full h-[150px] my-3 justify-center items-center'>
        <span className='cursor-pointer' onClick={() => setShowMenu(true)}>
          <IoMenu size={25} className='ml-5' />
        </span>
        <img className='h-[20px] mr-auto ml-5' src='images/logo.svg' width={138} height={20} />
        <span className='cursor-pointer transition-colors' onClick={() => setShowCart(!showCart)}>
          <PiShoppingCart size={25} />
        </span>
        <img className='h-[30px] w-[30px] ml-7 mr-5 cursor-pointer transition-all rounded-full hover:border-orange-400 hover:border-2'
          src='images/image-avatar.png' width={40} height={40} />
      </div>

      {/* Responsive-menu*/}
      <AnimatePresence>
        {showMenu &&
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{
              opacity: 0,
              transition: {
                delay: 0.3
              }
            }}
            className='responsive-menu z-20'>
            <motion.div
              initial={{ x: -300 }}
              animate={{
                x: 0,
                transition: {
                  ease: 'circOut',
                  duration: 0.3
                }
              }}
              exit={{
                x: -300,
                transition: {
                  ease: 'circIn',
                  duration: 0.3
                }
              }}
              className='menu-content flex flex-col'>
              <span className='ml-5 mt-5 cursor-pointer' onClick={() => setShowMenu(false)}>
                <GrClose color='gray' />
              </span>
              <ul className='link-list mt-10 h-full items-start ml-5 flex flex-col mr-auto font-bold'>
                <li>Collections</li>
                <li>Men</li>
                <li>Women</li>
                <li>About</li>
                <li>Contact</li>
              </ul>
            </motion.div>
          </motion.div>
        }
      </AnimatePresence>

      {/* Default home-header */}
      <div className='home-header w-full h-[110px] flex-row xs:hidden justify-center items-center md:flex'>
        <img className='h-[20px]' src='images/logo.svg' width={138} height={20} />
        <ul className='link-list h-full items-center flex mr-auto ml-20 font-normal text-slate-500'>
          <li>Collections</li>
          <li>Men</li>
          <li>Women</li>
          <li>About</li>
          <li>Contact</li>
        </ul>
        <span className='cursor-pointer transition-colors' onClick={() => setShowCart(!showCart)}>
          <PiShoppingCart size={25} />
        </span>
        <img className='h-[50px] w-[50px] ml-7 cursor-pointer transition-all rounded-full hover:border-orange-400 hover:border-2'
          src='images/image-avatar.png' width={50} height={50} />
      </div>

      {/* Cart*/}
      <AnimatePresence>
        {showCart &&
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 100, opacity: 0 }}
            className={`cart-section z-10 md:top-[80px] md:right-[90px] md:right-[90px] xs:left-auto xs:right-auto xs:top-16
        shadow-2xl rounded-lg flex-col xs:w-11/12 md:w-[370px] ${showCart ? 'flex' : 'hidden'}`}>
            <div className='cart-header flex h-[70px] items-center'>
              <h1 className='font-bold ml-5'>Cart</h1>
            </div>
            <div className='cart-body flex justify-center items-start text-gray-700'>
              {showItemsCart ?
                <div className='cart-content w-full p-5 flex flex-col'>
                  <div className="item-cart-information flex items-center mb-7">
                    <img className='max-w-12 rounded-lg' src='images/image-product-1.jpg' />
                    <div className="item-cart-description mx-3">
                      <h1>Fall Limited Edition Sneakers</h1>
                      <h1>$125.00 x {itemQnt} <strong className='ml-1'>${125 * itemQnt}.00</strong></h1>
                      <div className="item-price-quantity">
                      </div>
                    </div>
                    <span className='ml-auto cursor-pointer hover:opacity-60 transition-opacity' onClick={() => setShowItemsCart(false)}>
                      <FaTrashCan color='#828282' />
                    </span>
                  </div>
                  <button className='w-full h-[50px] mb-5 flex items-center justify-center font-semibold hover:opacity-60 transition-opacity'>
                    Checkout
                  </button>
                </div>
                :
                <h1 className='my-auto h-[200px] flex items-center font-bold'>Your cart is empty</h1>
              }
            </div>
          </motion.div>
        }
      </AnimatePresence>

      <div className='home-body w-5/6 flex justify-center items-center mt-auto mb-auto xs:w-full lg:w-4/5 xs:flex-col md:flex-row'>
        <div className='product-preview-section'>

          {/* Responsive image caroussel */}
          <div className='image-preview-caroussel xs:flex md:hidden w-full items-center justify-center'>
            <span
              className='flex z-10 justify-center items-center mr-[-40px] cursor-pointer relative left-0'
              onClick={() => previewImage > 1 && setPreviewImage(prev => prev - 1)}>
              <IoIosArrowBack />
            </span>
            <img
              ref={imageRef}
              className='w-full' 
              src={`images/image-product-${previewImage}.jpg`} />
            <span
              className='flex z-10 justify-center items-center ml-[-40px] cursor-pointer relative right-0'
              onClick={() => previewImage < 4 && setPreviewImage(prev => prev + 1)}>
              <IoIosArrowForward />
            </span>
          </div>

          <img
            ref={imageRef}
            className='w-[520px] xs:hidden md:block lg:rounded-xl cursor-pointer'
            src={`images/image-product-${previewImage}.jpg`} onClick={() => setShowModalPreview(true)} />
          <div className='thumbnails-section flex xs:hidden md:flex'>
            <div
              onClick={() => setPreviewImage(1)}
              className={`image-thumb-container bg-white flex${previewImage === 1 ? ' image-selected' : ''}`}>
              <img
                className="cursor-pointer hover:opacity-60  transition-opacity"
                src='images/image-product-1-thumbnail.jpg' />
            </div>
            <div
              onClick={() => setPreviewImage(2)}
              className={`image-thumb-container bg-white flex${previewImage === 2 ? ' image-selected' : ''}`}>
              <img
                className='cursor-pointer hover:opacity-60  transition-opacity'
                src='images/image-product-2-thumbnail.jpg' />
            </div>
            <div
              onClick={() => setPreviewImage(3)}
              className={`image-thumb-container bg-white flex${previewImage === 3 ? ' image-selected' : ''}`}>
              <img
                className='cursor-pointer hover:opacity-60  transition-opacity'
                src='images/image-product-3-thumbnail.jpg' />
            </div>
            <div
              onClick={() => setPreviewImage(4)}
              className={`image-thumb-container mr-0 bg-white flex${previewImage === 4 ? ' image-selected' : ''}`}>
              <img
                className='cursor-pointer hover:opacity-60  transition-opacity'
                src='images/image-product-4-thumbnail.jpg' />
            </div>
          </div>
        </div>
        <div className='product-description-section xs:px-5 xs:pt-5 lg:p-[90px]'>
          <h3 className='font-semibold text-sm'>SNEAKER COMPANY</h3>
          <h1 className='font-bold text-5xl mt-5'>Fall Limited Edition Sneakers</h1>
          <p className='mt-10 text-gray-700'>
            These low-profile sneakers are your perfect casual wear companion. Featuring a
            durable rubber outer sole, they’ll withstand everything the weather can offer.
          </p>
          <div className='price-section mt-10 flex items-center'>
            <h4 className='font-bold text-3xl'>$125.00</h4>
            <span className='ml-5 font-semibold'>50%</span>
          </div>
          <h5 className='font-bold mt-2 text-gray-400'>
            <del>$250.00</del>
          </h5>
          <div className='description-footer mt-8 flex xs:flex-col justify-center items-center lg:flex-row'>
            <div className='quantity-buttons flex items-center rounded-xl xs:w-full lg:w-52 xs:justify-center xs:h-16 xs:mb-5 lg:mb-0'>
              <span
                className='hover:opacity-60 transition-opacity cursor-pointer p-2'
                onClick={() => {
                  if (itemQnt > 0)
                    setItemQnt(prev => prev - 1);
                }}>
                <img className='max-w-[15px] h-[4px]' src='images/icon-minus.svg' />
              </span>
              <span className='font-bold mx-10'>
                {itemQnt}
              </span>
              <span
                className='hover:opacity-60 transition-opacity cursor-pointer p-2'
                onClick={() => setItemQnt(prev => prev + 1)}>
                <img className='max-w-[12px] h-[12px]' src='images/icon-plus.svg' />
              </span>
            </div>
            <button className='ml-5 flex w-full items-center justify-center
             font-semibold hover:opacity-60 transition-opacity xs:ml-0 lg:ml-5' onClick={() => setShowItemsCart(true)}>
              <CartIcon width={40} height={40} fill='white' />
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App

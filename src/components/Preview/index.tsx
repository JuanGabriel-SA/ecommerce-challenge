import { HTMLAttributes, useEffect, useState } from 'react';
import './Preview.css';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";
import { motion, useAnimate } from 'framer-motion';
interface PreviewProps extends HTMLAttributes<HTMLDivElement> {
    visible: boolean,
    trigger: (show: boolean) => void
}

const Modal = ({ visible, trigger }: PreviewProps) => {
    const [previewImage, setPreviewImage] = useState<number>(1);
    const [imageRef, animate] = useAnimate();

    function nextElement() {
        if (previewImage < 4)
            setPreviewImage(prev => prev + 1)
    }

    function prevElement() {
        if (previewImage > 1)
            setPreviewImage(prev => prev - 1)
    }

    function closeModal(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        if (event.target === event.currentTarget)
            trigger(false);
    }

    useEffect(() => {
        animate(imageRef.current, {
            opacity: [0, 1]
        })
    }, [previewImage])

    return (
        <motion.div
            onClick={e => closeModal(e)}
            className={`preview justify-center items-center ${visible ? 'flex opacity-1000' : 'hidden opacity-0'}`}>
            <div className='preview-content flex flex-col justify-center'>
                <span onClick={e => trigger(false)} className="close-icon max-w-8 ml-auto mb-3 mr-[40px] cursor-pointer transition-colors">
                    <IoCloseSharp size={30} />
                </span>
                <div className="image-section flex justify-center items-center">
                    <span
                        className='flex justify-center items-center mr-[-20px] cursor-pointer'
                        onClick={() => prevElement()}>
                        <IoIosArrowBack />
                    </span>
                    <img ref={imageRef} className='max-w-xl rounded-2xl transition-all' src={`src/assets/images/image-product-${previewImage}.jpg`} />
                    <span
                        className='flex justify-center items-center ml-[-20px] cursor-pointer'
                        onClick={() => nextElement()}>
                        <IoIosArrowForward />
                    </span>
                </div>
                <div className='thumbnails-section flex justify-center'>
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
        </motion.div>
    );
}

export default Modal;
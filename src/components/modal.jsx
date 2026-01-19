'use client'
import { useRef } from 'react'
// https://medium.com/@bomber.marek/how-to-use-dialog-in-react-easy-modals-tooltips-81e44d570c8a

const Modal = ({ children, openElement }) => {
    const dialogRef = useRef(null);

    const openDialog = () => dialogRef.current?.showModal()

    const closeDialog = () => dialogRef.current?.close()

    const handleClickOutside = (e) => {
        if (dialogRef.current) {
            const rect = dialogRef.current.getBoundingClientRect();
            const isInDialog = (rect.top <= e.clientY
                && e.clientY <= rect.top + rect.height
                && rect.left <= e.clientX
                && e.clientX <= rect.left + rect.width);
            if (!isInDialog) {
                dialogRef.current.close();
            }
        }
    }

    return (
        <>
            <div onClick={openDialog} className='w-fit inline-block cursor-pointer'>
                {openElement}
            </div>

            <dialog
                ref={dialogRef}
                onMouseDown={handleClickOutside}
                className="m-auto backdrop:bg-black/50 backdrop:backdrop-blur-sm w-[90%] md:w-[60%] lg:w-[40%] p-0 rounded-xl shadow-2xl bg-transparent outline-none open:animate-in open:fade-in open:zoom-in-95 backdrop:open:animate-in backdrop:open:fade-in duration-200"
            >
                <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-100 dark:border-slate-800 relative">
                    <div onClick={closeDialog} className="absolute top-4 right-4 cursor-pointer text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors z-10 p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </div>
                    {children}
                </div>
            </dialog>
        </>
    );
};

export default Modal;

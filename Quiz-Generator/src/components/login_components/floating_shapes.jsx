export default function FloatingShapes() {
    return (
      <>
        <div className="floating-shape absolute w-20 h-20 bg-blue-400/20 rounded-xl top-[15%] left-[10%] transform rotate-45"></div>
        <div className="floating-shape absolute w-15 h-15 bg-indigo-400/25 rounded-full top-[20%] right-[15%]"></div>
        <div className="floating-shape absolute w-10 h-10 bg-blue-400/20 rounded-lg bottom-[25%] right-[20%] transform rotate-[30deg]"></div>
        <div className="floating-shape absolute w-8 h-8 bg-pink-400/15 rounded-full top-[60%] left-[5%]"></div>
        <div className="floating-shape absolute w-12 h-12 bg-purple-400/20 rounded-lg bottom-[15%] left-[15%] transform rotate-12"></div>
      </>
    );
  }
  
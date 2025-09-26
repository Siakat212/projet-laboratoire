
const LoadingDots = () => {
  return (<div className="fixed inset-0 z-[999] bg-black bg-opacity-75 flex flex-col items-center justify-center text-white">
  <div className="flex space-x-1 mb-4">
    <div className="w-3 h-3 bg-white rounded-full animate-bounce"></div>
    <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
    <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
  </div>
  <p className="text-lg font-medium">Chargement...</p>
</div>
    
  );
};

export default LoadingDots;
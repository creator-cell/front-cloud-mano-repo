// components/Banner.js
const Banner = () => {
    return (
        <section
            className="pt-0 overflow-hidden bg-cover bg-center"
            style={{ backgroundImage: 'url(/images/veg-3/home-bg.png)' }}
        >
            <div className="container mx-auto p-0">
                <div className="flex flex-col">
                    <div className="w-full">
                        <div className="relative rounded-lg overflow-hidden">
                            <img
                                src="/images/grocery/banner/1.jpg"
                                className="w-full h-auto object-cover"
                                alt="Dry Fruits Banner"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-start p-6 lg:p-12">
                                <div className="w-full">
                                    <h6 className="text-orange-500 text-sm uppercase mb-3 tracking-wide">
                                        Weekend Special offer
                                    </h6>
                                    <h1 className="text-white text-3xl md:text-5xl font-bold uppercase mb-3">
                                        Premium Quality Dry Fruits
                                    </h1>
                                    <h2 className="text-white text-xl md:text-3xl font-medium mb-4">
                                        Dryfruits shopping made Easy
                                    </h2>
                                    <h5 className="text-white text-md md:text-lg mb-4">
                                        Fresh & Top Quality Dry Fruits are available here!
                                    </h5>
                                    <button
                                        className="bg-orange-500 text-white px-6 py-2 mt-4 font-bold hover:bg-orange-600 flex items-center"
                                        onClick={() => (window.location.href = "/shop-left-sidebar")}
                                    >
                                        Shop Now <i className="fa-solid fa-arrow-right ml-2"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Banner;

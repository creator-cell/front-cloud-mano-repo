"use client";

import { Button } from '@/components/ui/button';
import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-10">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 px-5">
                {/* Navigation Links */}
                <div>
                    <h3 className="font-semibold text-lg mb-4">Navigate</h3>
                    <ul>
                        <li className="mb-2"><a href="/shipping-returns">Shipping & Returns</a></li>
                        <li className="mb-2"><a href="/contact-us">Contact Us</a></li>
                        <li className="mb-2"><a href="/blog">Blog</a></li>
                        <li className="mb-2"><a href="/sitemap">Sitemap</a></li>
                    </ul>
                </div>

                {/* Categories */}
                <div>
                    <h3 className="font-semibold text-lg mb-4">Categories</h3>
                    <ul>
                        <li className="mb-2"><a href="/shop-all">Shop All</a></li>
                        <li className="mb-2"><a href="/bath">Bath</a></li>
                        <li className="mb-2"><a href="/garden">Garden</a></li>
                        <li className="mb-2"><a href="/kitchen">Kitchen</a></li>
                        <li className="mb-2"><a href="/publications">Publications</a></li>
                        <li className="mb-2"><a href="/utility">Utility</a></li>
                    </ul>
                </div>

                {/* Popular Brands & Newsletter */}
                <div>
                    <h3 className="font-semibold text-lg mb-4">Popular Brands</h3>
                    <ul>
                        <li className="mb-2"><a href="/brands/ofs">OFS</a></li>
                        <li className="mb-2"><a href="/brands/common-good">Common Good</a></li>
                        <li className="mb-2"><a href="/brands/sagaform">Sagaform</a></li>
                        <li className="mb-2"><a href="/brands/view-all">View All</a></li>
                    </ul>

                    {/* Newsletter Subscription */}
                    <div className="mt-6">
                        <h3 className="font-semibold text-lg mb-4">Subscribe to our newsletter</h3>
                        <p className="mb-4">Get the latest updates on new products and upcoming sales</p>
                        <form className="flex">
                            <input
                                type="email"
                                placeholder="Your email address"
                                className="p-2 flex-grow rounded-l-md min-w-28 text-gray-900 placeholder:text-sm pl-2 focus:outline-none"
                                required
                            />
                            {/* <button type="submit" className="bg-blue-500 text-white p-2 rounded-r-md hover:bg-blue-600">
                            </button> */}
                            <Button className='rounded-r rounded-l-none'>
                                Subscribe
                            </Button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Footer Bottom Section */}
            <div className="bg-gray-800 text-center py-4 mt-10">
                <p>&copy; {new Date().getFullYear()} Your Company Name. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;

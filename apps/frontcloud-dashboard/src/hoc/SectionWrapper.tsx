import React from 'react';

/*
    This is a Higher Order Component (HOC) that wraps a section.
    It takes a component and an idName as props and renders the component inside a section tag.
    It also adds an empty span tag with a margin-top of -90px to the top of the section.
    This is used to offset the fixed header.
*/
/**
 * A Higher Order Component (HOC) that wraps a section.
 * 
 * @param {React.ComponentType} Component - The component to be rendered inside the section.
 * @param {string} idName - The ID to be assigned to the span element for offsetting the fixed header.
 * 
 * @returns {JSX.Element} A section that contains the given component, with an offset for the fixed header.
 * 
 * @example
 * ```jsx
 * const MyComponent = () => <div>Content</div>;
 * const WrappedComponent = SectionWrapper({ Component: MyComponent, idName: 'my-section' });
 * 
 *  This will render MyComponent inside a section with the necessary offset.
 * ```
 */

const SectionWrapper = ({ Component, idName }: { Component: any, idName: string }): JSX.Element => {

    const HOC = () => {
        return (
            <section className={` max-w-7xl mx-auto relative z-0`}>
                <span id={idName} className='mt-[-90px] pb-[60px] block'>
                    &nbsp;
                </span>
                <Component />
            </section>
        );
    };

    return <HOC />;
};

export default SectionWrapper;

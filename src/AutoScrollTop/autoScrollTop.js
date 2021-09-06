import React from 'react';

export default function AutoScrollToTop({ children }) {
    React.useEffect(() => window.scrollTo(0, 0))
    return (children)
}
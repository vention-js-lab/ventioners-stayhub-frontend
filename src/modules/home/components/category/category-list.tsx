import Box from '@mui/material/Box';
import { CategoryItem } from './category-item';
import { CategoryScrollArrow } from './category-scroll-arrow';
import { categories } from '../../data/category-data';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCallback, useEffect, useRef, useState } from 'react';

const containerStyles = {
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
};

const scrollContainerStyles = {
  display: 'flex',
  overflowX: 'auto',
  scrollBehavior: 'smooth',
  scrollbarWidth: 'none',
  alignItems: 'center',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
};

export function CategoryList() {
  const location = useLocation();
  const queryParam = new URLSearchParams(location.search);
  const navigate = useNavigate();
  const selectedCategory = queryParam.get('category') || '';
  const scrollContainerRef = useRef<HTMLElement | null>(null);
  const [showLeftArrow, setShowLeftArrow] = useState<boolean>(false);
  const [showRightArrow, setShowRightArrow] = useState<boolean>(false);

  const handleCategoryClick = useCallback(
    (categoryName: string) => {
      navigate(`/?category=${encodeURIComponent(categoryName.toLowerCase())}`);
    },
    [navigate]
  );

  const handleScroll = useCallback((direction: 'left' | 'right') => {
    const container = scrollContainerRef.current;

    if (!container) return;

    const scrollAmount = 600;
    const newScrollPosition = direction === 'right' ? container.scrollLeft + scrollAmount : container.scrollLeft - scrollAmount;

    container.scrollTo({
      left: newScrollPosition,
      behavior: 'smooth',
    });
  }, []);

  const handleScrollPosition = useCallback(() => {
    const container = scrollContainerRef.current;

    if (!container) return;

    const isAtStart = container.scrollLeft === 0;
    const isAtEnd = container.scrollLeft + container.clientWidth >= container.scrollWidth;

    setShowLeftArrow(!isAtStart);
    setShowRightArrow(!isAtEnd);
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;

    container?.addEventListener('scroll', handleScrollPosition);
    handleScrollPosition();

    return () => container?.removeEventListener('scroll', handleScrollPosition);
  }, []);

  return (
    <Box sx={containerStyles}>
      {showLeftArrow ? <CategoryScrollArrow direction="left" onClick={() => handleScroll('left')} /> : null}
      <Box ref={scrollContainerRef} sx={scrollContainerStyles}>
        {categories.map((category) => (
          <CategoryItem
            key={category.id}
            icon={category.icon}
            name={category.name}
            onClick={() => handleCategoryClick(category.name)}
            isActive={category.name.toLowerCase() === selectedCategory}
          />
        ))}
      </Box>
      {showRightArrow ? <CategoryScrollArrow direction="right" onClick={() => handleScroll('right')} /> : null}
    </Box>
  );
}

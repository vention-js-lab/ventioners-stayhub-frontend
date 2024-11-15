import Box from '@mui/material/Box';
import { CategoryItem } from './category-item';
import { CategoryScrollArrow } from './category-scroll-arrow';
import { categories } from '../../data/category-data';
import { useCallback, useEffect, useRef, useState } from 'react';
import { categoryListStyles } from './category-list.styles';

type CategoryListProps = {
  selectedCategory: string;
  setSelectedCategory: (newState: string) => void;
};

export function CategoryList({ selectedCategory, setSelectedCategory }: CategoryListProps) {
  const scrollContainerRef = useRef<HTMLElement | null>(null);
  const [showLeftArrow, setShowLeftArrow] = useState<boolean>(false);
  const [showRightArrow, setShowRightArrow] = useState<boolean>(false);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category === selectedCategory ? '' : category);
  };

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
    <Box sx={categoryListStyles.container}>
      {showLeftArrow ? <CategoryScrollArrow direction="left" onClick={() => handleScroll('left')} /> : null}
      <Box ref={scrollContainerRef} sx={categoryListStyles.scrollContainer}>
        {categories.map((category) => (
          <CategoryItem
            key={category.id}
            icon={category.icon}
            name={category.name}
            onClick={() => handleCategoryClick(category.id)}
            isActive={category.id === selectedCategory}
          />
        ))}
      </Box>
      {showRightArrow ? <CategoryScrollArrow direction="right" onClick={() => handleScroll('right')} /> : null}
    </Box>
  );
}

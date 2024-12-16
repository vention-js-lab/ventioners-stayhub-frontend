import Box from '@mui/material/Box';
import { CategoryItem } from './category-item';
import { CategoryScrollArrow } from './category-scroll-arrow';
import { useEffect, useRef, useState } from 'react';
import { categoryListStyles } from './category-list.styles';
import { useCategories } from '../../api/get-categories';
import { categoryToIconMap } from '../../constants/category-icon-map.constant';
import { type GetPropertiesParams } from '../../api/get-properties';

type CategoryListProps = {
  selectedCategory: string;
  setParams: React.Dispatch<React.SetStateAction<GetPropertiesParams>>;
};

export function CategoryList({ selectedCategory, setParams }: CategoryListProps) {
  const { data, isLoading } = useCategories();
  const scrollContainerRef = useRef<HTMLElement | null>(null);
  const [showLeftArrow, setShowLeftArrow] = useState<boolean>(false);
  const [showRightArrow, setShowRightArrow] = useState<boolean>(false);

  const handleCategoryClick = (category: string) => {
    setParams((prevParams) => ({ ...prevParams, categoryId: category === selectedCategory ? '' : category }));
  };

  const handleScroll = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current;

    if (!container) return;

    const scrollAmount = 600;
    const newScrollPosition = direction === 'right' ? container.scrollLeft + scrollAmount : container.scrollLeft - scrollAmount;

    container.scrollTo({
      left: newScrollPosition,
      behavior: 'smooth',
    });
  };

  const handleScrollPosition = () => {
    const container = scrollContainerRef.current;

    if (!container) return;

    const scrollThreshold = 20;
    const isAtStart = container.scrollLeft === 0;
    const isAtEnd = container.scrollLeft + container.clientWidth >= container.scrollWidth - scrollThreshold;

    setShowLeftArrow(!isAtStart);
    setShowRightArrow(!isAtEnd);
  };

  useEffect(() => {
    const container = scrollContainerRef.current;

    container?.addEventListener('scroll', handleScrollPosition);
    handleScrollPosition();

    return () => container?.removeEventListener('scroll', handleScrollPosition);
  }, [data]);

  if (isLoading) {
    return <Box>Loading Categories...</Box>;
  }

  const categories = data?.data ?? [];

  if (!categories.length) {
    return null;
  }

  return (
    <Box sx={categoryListStyles.container}>
      {showLeftArrow ? <CategoryScrollArrow direction="left" onClick={() => handleScroll('left')} /> : null}
      <Box ref={scrollContainerRef} sx={categoryListStyles.scrollContainer}>
        {categories.map((category) => (
          <CategoryItem
            key={category.id}
            icon={categoryToIconMap[category.name]}
            name={category.name}
            name_ru={category.name_ru}
            onClick={() => handleCategoryClick(category.id)}
            isActive={category.id === selectedCategory}
          />
        ))}
      </Box>
      {showRightArrow ? <CategoryScrollArrow direction="right" onClick={() => handleScroll('right')} /> : null}
    </Box>
  );
}

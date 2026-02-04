import { FC, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { selectIngredients } from '@slices';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

export const IngredientDetails: FC = () => {
  const { id } = useParams<{ id?: string }>();

  /** TODO: взять переменную из стора */
  const ingredients = useSelector(selectIngredients);

  const ingredientData = useMemo(() => {
    if (!id) return null;
    return ingredients.find((ing) => ing._id === id) || null;
  }, [id, ingredients]);
  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};

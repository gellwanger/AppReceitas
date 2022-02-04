import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { nameApi } from '../service/ApiFoods';
import { detailDrinksApi } from '../service/ApiDrinks';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

function DetailDrinks({ match }) {
  const [objDetail, setObjDetail] = useState([]);
  const [recomFood, setRecomFood] = useState([]);

  const { params: { id } } = match;
  const idReceita = Number(id);
  console.log(`idReceita: ${idReceita}`);

  useEffect(() => {
    const apiDrinksRequest = async () => {
      const foods = await nameApi('');
      const SIX = 6;
      if (foods !== null) {
        return setRecomFood(foods.slice(0, SIX));
      }
    };
    apiDrinksRequest();
  }, []);

  useEffect(() => {
    const apiRequest = async () => {
      const detail = await detailDrinksApi(idReceita);
      console.log(`detail: ${detail}`);
      setObjDetail(detail);
    };
    apiRequest();
  }, [idReceita]);

  if (objDetail.length === 0) return null;

  const QUINZE = 15;
  const arrayIngred = [];
  for (let i = 1; i <= QUINZE; i += 1) {
    if (objDetail[0][`strIngredient${i}`]) {
      arrayIngred.push(
        `- ${objDetail[0][`strIngredient${i}`]} - ${objDetail[0][`strMeasure${i}`]}`,
      );
    }
  }

  console.log(arrayIngred);

  return (
    <div className="w-full h-full flex-col items-center truncate">
      <img
        src={ objDetail[0].strDrinkThumb }
        alt="drink"
        data-testid="recipe-photo"
        className="w-full"
      />
      <div className="w-full h-auto flex flex-col">
        <h2 data-testid="recipe-title">{ objDetail[0].strDrink }</h2>
        <button type="button" data-testid="share-btn">{ shareIcon }</button>
        <button type="button" data-testid="favorite-btn">{ whiteHeartIcon }</button>
        <p data-testid="recipe-category">{ objDetail[0].strAlcoholic }</p>
      </div>
      <h4 data-testid="recipe-category">{ objDetail[0].strCategory }</h4>
      <h3>Ingredients</h3>
      <ul className="bg-gray-200">
        {arrayIngred.map((ingredient, i) => (
          <li
            className="ml-4"
            key={ i }
            data-testid={ `${i}-ingredient-name-and-measure` }
          >
            {ingredient}
          </li>
        ))}
      </ul>
      <h3>Instruction</h3>
      <span
        className="h-full w-full flex"
        data-testid="instructions"
      >
        { objDetail[0].strInstructions }
      </span>

      <h3>Recommended</h3>
      { recomFood && (
        <div className="h-full w-20 flex flex-wrap-nowrap overflow-x-scroll">
          { recomFood.map((food, index) => (
            <div
              data-testid={ `${index}-recomendation-card` }
              key={ food.idMeal }
            >
              <Link to={ `/foods/${food.idMeal}` }>
                <img
                  src={ `${food.strMealThumb}/preview` }
                  alt={ food.strMeal }
                />
                <p>{food.strAlcoholic}</p>
                <h4 data-testid={ `${index}-recomendation-title` }>
                  { food.strMeal }
                </h4>
              </Link>
              <br />
            </div>
          )) }
        </div>
      ) }
      <div>
        <button
          className="w-full fixed bottom-0 bg-blue-500 hover:bg-blue-500
          text-white font-bold
          py-2 border border-blue-700 rounded"
          data-testid="start-recipe-btn"
          type="button"
        >
          Start Recipe
        </button>
      </div>
    </div>
  );
}

DetailDrinks.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
};

DetailDrinks.defaultProps = {
  match: {},
};

export default DetailDrinks;

export default function(dishCollection, mealCollection) {
  return (mealId) => {
    const dishes = dishCollection.findByMeal(mealId).fetch();

    mealCollection.update(mealId, {
      $set: {
        dishes,
      },
    });
  };
}

export default function(mealDishCollection) {
  return mealId => {
    return mealDishCollection.find({
      mealId,
    }, {
      sort: {
        position: 1,
      },
    });
  };
}

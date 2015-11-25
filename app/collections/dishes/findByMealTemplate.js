export default function(mealDishCollection) {
  return mealTemplateId => {
    return mealDishCollection.find({
      mealTemplateId,
    }, {
      sort: {
        position: 1,
      },
    });
  };
}

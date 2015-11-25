export default function(dishCollection, updateMealDishes) {
  dishCollection.after.insert((userId, doc) => updateMealDishes(doc.mealId));

  dishCollection.after.update(function updateMealDishesAfterDishUpdate(userId, doc) {
    if (this.previous.mealId !== doc.mealId) {
      updateMealDishes(this.previous.mealId);
    }
    updateMealDishes(doc.mealId);
  });

  dishCollection.after.remove((userId, doc) => updateMealDishes(doc.mealId));
}

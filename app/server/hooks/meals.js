export default function(mealCollection, dishCollection) {
  mealCollection.after.remove((userId, doc) => dishCollection.remove({
    mealId: doc._id,
  }));
}
